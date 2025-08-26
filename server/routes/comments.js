const express = require('express');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get comments for a post
// @route   GET /api/comments/post/:postId
// @access  Public
router.get('/post/:postId', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Get top-level comments with nested replies
    const comments = await Comment.find({ 
      post: req.params.postId, 
      parentComment: null, 
      status: 'active' 
    })
    .populate('author', 'username firstName lastName avatar')
    .populate({
      path: 'replies',
      match: { status: 'active' },
      populate: {
        path: 'author',
        select: 'username firstName lastName avatar'
      },
      options: { sort: { createdAt: 1 } }
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    
    const total = await Comment.countDocuments({ 
      post: req.params.postId, 
      parentComment: null, 
      status: 'active' 
    });
    
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      comments,
      pagination: {
        currentPage: page,
        totalPages,
        totalComments: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create new comment
// @route   POST /api/comments
// @access  Private
router.post('/', protect, [
  body('content')
    .notEmpty()
    .withMessage('Comment content is required')
    .isLength({ max: 1000 })
    .withMessage('Comment cannot exceed 1000 characters'),
  body('post')
    .notEmpty()
    .withMessage('Post ID is required')
    .isMongoId()
    .withMessage('Invalid post ID')
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
    
    const { content, post, parentComment } = req.body;
    
    // Check if post exists
    const postExists = await Post.findById(post);
    if (!postExists) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if parent comment exists (for replies)
    if (parentComment) {
      const parentExists = await Comment.findById(parentComment);
      if (!parentExists) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }
      
      // Check if parent comment belongs to the same post
      if (parentExists.post.toString() !== post) {
        return res.status(400).json({ message: 'Parent comment does not belong to this post' });
      }
    }
    
    const comment = await Comment.create({
      content,
      author: req.user._id,
      post,
      parentComment: parentComment || null
    });
    
    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username firstName lastName avatar');
    
    res.status(201).json({
      message: 'Comment created successfully',
      comment: populatedComment
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private (Author only)
router.put('/:id', protect, [
  body('content')
    .notEmpty()
    .withMessage('Comment content is required')
    .isLength({ max: 1000 })
    .withMessage('Comment cannot exceed 1000 characters')
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
    
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    // Check if user is the author
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const { content } = req.body;
    
    comment.content = content;
    await comment.save();
    
    const updatedComment = await Comment.findById(comment._id)
      .populate('author', 'username firstName lastName avatar');
    
    res.json({
      message: 'Comment updated successfully',
      comment: updatedComment
    });
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private (Author or Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    // Check if user is author or admin
    if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Mark as deleted instead of actually deleting (to preserve replies structure)
    comment.status = 'deleted';
    comment.content = '[This comment has been deleted]';
    await comment.save();
    
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Toggle like on comment
// @route   POST /api/comments/:id/like
// @access  Private
router.post('/:id/like', protect, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    
    if (comment.status !== 'active') {
      return res.status(400).json({ message: 'Cannot like deleted comment' });
    }
    
    const isLiked = comment.toggleLike(req.user._id);
    await comment.save();
    
    res.json({
      message: isLiked ? 'Comment liked' : 'Comment unliked',
      isLiked,
      likeCount: comment.likeCount
    });
  } catch (error) {
    console.error('Toggle comment like error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user's comments
// @route   GET /api/comments/user/:userId
// @access  Private (Own comments or Admin)
router.get('/user/:userId', protect, async (req, res) => {
  try {
    // Check if user is accessing their own comments or is admin
    if (req.params.userId !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const comments = await Comment.find({ 
      author: req.params.userId,
      status: 'active'
    })
    .populate('author', 'username firstName lastName avatar')
    .populate('post', 'title slug')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    
    const total = await Comment.countDocuments({ 
      author: req.params.userId,
      status: 'active'
    });
    
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      comments,
      pagination: {
        currentPage: page,
        totalPages,
        totalComments: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get user comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get comment replies
// @route   GET /api/comments/:id/replies
// @access  Public
router.get('/:id/replies', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    
    const replies = await Comment.find({ 
      parentComment: req.params.id,
      status: 'active'
    })
    .populate('author', 'username firstName lastName avatar')
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);
    
    const total = await Comment.countDocuments({ 
      parentComment: req.params.id,
      status: 'active'
    });
    
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      replies,
      pagination: {
        currentPage: page,
        totalPages,
        totalReplies: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get replies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;