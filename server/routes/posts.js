const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { protect, optionalAuth, admin } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all published posts with pagination and filtering
// @route   GET /api/posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build query
    let query = { status: 'published' };
    
    // Category filter
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Tag filter
    if (req.query.tag) {
      query.tags = { $in: [req.query.tag] };
    }
    
    // Search
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } },
        { excerpt: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Author filter
    if (req.query.author) {
      query.author = req.query.author;
    }
    
    // Sort options
    let sortOption = { publishedAt: -1 }; // Default: newest first
    if (req.query.sort === 'oldest') {
      sortOption = { publishedAt: 1 };
    } else if (req.query.sort === 'popular') {
      sortOption = { views: -1 };
    } else if (req.query.sort === 'likes') {
      sortOption = { 'likes.length': -1 };
    }
    
    const posts = await Post.find(query)
      .populate('author', 'username firstName lastName avatar')
      .populate('commentCount')
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .select('-content'); // Exclude content for list view
    
    const total = await Post.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
// @access  Public
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const post = await Post.findOne({ 
      slug: req.params.slug, 
      status: 'published' 
    })
    .populate('author', 'username firstName lastName avatar bio socialLinks')
    .populate('commentCount');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Increment view count
    await Post.findByIdAndUpdate(post._id, { $inc: { views: 1 } });
    
    // Add user-specific data if authenticated
    let responseData = post.toJSON();
    if (req.user) {
      responseData.isLiked = post.isLikedBy(req.user._id);
    }
    
    res.json({ post: responseData });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
router.post('/', protect, [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('content')
    .notEmpty()
    .withMessage('Content is required'),
  body('category')
    .notEmpty()
    .withMessage('Category is required'),
  body('excerpt')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Excerpt cannot exceed 500 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const { title, content, excerpt, category, tags, featuredImage, status, seo } = req.body;
    
    const post = await Post.create({
      title,
      content,
      excerpt,
      category,
      tags: tags || [],
      featuredImage: featuredImage || '',
      author: req.user._id,
      status: status || 'draft',
      seo: seo || {}
    });
    
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'username firstName lastName avatar');
    
    res.status(201).json({
      message: 'Post created successfully',
      post: populatedPost
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private (Author or Admin)
router.put('/:id', protect, [
  body('title')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('excerpt')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Excerpt cannot exceed 500 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user is author or admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { title, content, excerpt, category, tags, featuredImage, status, seo } = req.body;
    
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title }),
        ...(content && { content }),
        ...(excerpt !== undefined && { excerpt }),
        ...(category && { category }),
        ...(tags && { tags }),
        ...(featuredImage !== undefined && { featuredImage }),
        ...(status && { status }),
        ...(seo && { seo })
      },
      { new: true, runValidators: true }
    ).populate('author', 'username firstName lastName avatar');
    
    res.json({
      message: 'Post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private (Author or Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user is author or admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Delete associated comments
    await Comment.deleteMany({ post: req.params.id });
    
    // Delete post
    await Post.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Toggle like on post
// @route   POST /api/posts/:id/like
// @access  Private
router.post('/:id/like', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const isLiked = post.toggleLike(req.user._id);
    await post.save();
    
    res.json({
      message: isLiked ? 'Post liked' : 'Post unliked',
      isLiked,
      likeCount: post.likeCount
    });
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user's posts (drafts and published)
// @route   GET /api/posts/user/:userId
// @access  Private (Own posts or Admin)
router.get('/user/:userId', protect, async (req, res) => {
  try {
    // Check if user is accessing their own posts or is admin
    if (req.params.userId !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let query = { author: req.params.userId };
    
    // Status filter
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    const posts = await Post.find(query)
      .populate('author', 'username firstName lastName avatar')
      .populate('commentCount')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Post.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get post categories
// @route   GET /api/posts/categories
// @access  Public
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Post.distinct('category', { status: 'published' });
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get popular tags
// @route   GET /api/posts/tags
// @access  Public
router.get('/meta/tags', async (req, res) => {
  try {
    const tags = await Post.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    
    res.json({ tags: tags.map(tag => ({ name: tag._id, count: tag.count })) });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;