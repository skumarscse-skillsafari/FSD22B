const express = require('express');
const User = require('../models/User');
const Post = require('../models/Post');
const { protect, admin, ownerOrAdmin } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private (Admin)
router.get('/', protect, admin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build query
    let query = {};
    
    // Search filter
    if (req.query.search) {
      query.$or = [
        { username: { $regex: req.query.search, $options: 'i' } },
        { firstName: { $regex: req.query.search, $options: 'i' } },
        { lastName: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    // Role filter
    if (req.query.role) {
      query.role = req.query.role;
    }
    
    // Active status filter
    if (req.query.isActive !== undefined) {
      query.isActive = req.query.isActive === 'true';
    }
    
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await User.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user by ID or username
// @route   GET /api/users/:identifier
// @access  Public
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Try to find by ID first, then by username
    let user;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      // It's a valid ObjectId
      user = await User.findById(identifier);
    } else {
      // It's a username
      user = await User.findOne({ username: identifier });
    }
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!user.isActive) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get user's published posts count
    const postCount = await Post.countDocuments({ 
      author: user._id, 
      status: 'published' 
    });
    
    // Get user's recent posts (last 5)
    const recentPosts = await Post.find({ 
      author: user._id, 
      status: 'published' 
    })
    .select('title slug publishedAt views likeCount')
    .sort({ publishedAt: -1 })
    .limit(5);
    
    const userProfile = {
      ...user.getPublicProfile(),
      postCount,
      recentPosts
    };
    
    res.json({ user: userProfile });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update user (Admin or Owner)
// @route   PUT /api/users/:userId
// @access  Private (Admin or Owner)
router.put('/:userId', protect, ownerOrAdmin, async (req, res) => {
  try {
    const { firstName, lastName, bio, username, socialLinks, role, isActive } = req.body;
    
    // Check if username is already taken (if being updated)
    if (username) {
      const existingUser = await User.findOne({ 
        username, 
        _id: { $ne: req.params.userId } 
      });
      if (existingUser) {
        return res.status(400).json({
          message: 'Username is already taken'
        });
      }
    }
    
    // Only admins can update role and isActive
    const updateData = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(bio !== undefined && { bio }),
      ...(username && { username }),
      ...(socialLinks && { socialLinks })
    };
    
    if (req.user.role === 'admin') {
      if (role) updateData.role = role;
      if (isActive !== undefined) updateData.isActive = isActive;
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      message: 'User updated successfully',
      user: updatedUser.getPublicProfile()
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:userId
// @access  Private (Admin)
router.delete('/:userId', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Don't allow deletion of the last admin
    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin', isActive: true });
      if (adminCount <= 1) {
        return res.status(400).json({ 
          message: 'Cannot delete the last active admin user' 
        });
      }
    }
    
    // Soft delete - deactivate instead of deleting
    user.isActive = false;
    user.email = `deleted_${Date.now()}_${user.email}`;
    user.username = `deleted_${Date.now()}_${user.username}`;
    await user.save();
    
    // Update posts to show as deleted user
    await Post.updateMany(
      { author: req.params.userId },
      { $set: { status: 'archived' } }
    );
    
    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user's public posts
// @route   GET /api/users/:identifier/posts
// @access  Public
router.get('/:identifier/posts', async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Find user by ID or username
    let user;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      user = await User.findById(identifier);
    } else {
      user = await User.findOne({ username: identifier });
    }
    
    if (!user || !user.isActive) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const posts = await Post.find({ 
      author: user._id, 
      status: 'published' 
    })
    .populate('author', 'username firstName lastName avatar')
    .select('-content') // Exclude content for list view
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit);
    
    const total = await Post.countDocuments({ 
      author: user._id, 
      status: 'published' 
    });
    
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

// @desc    Get user statistics
// @route   GET /api/users/:userId/stats
// @access  Private (Owner or Admin)
router.get('/:userId/stats', protect, ownerOrAdmin, async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Get post statistics
    const postStats = await Post.aggregate([
      { $match: { author: mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: { $size: '$likes' } }
        }
      }
    ]);
    
    // Get comment count
    const commentCount = await Comment.countDocuments({ 
      author: userId,
      status: 'active'
    });
    
    // Format statistics
    const stats = {
      posts: {
        published: 0,
        draft: 0,
        archived: 0,
        totalViews: 0,
        totalLikes: 0
      },
      comments: commentCount
    };
    
    postStats.forEach(stat => {
      if (stats.posts.hasOwnProperty(stat._id)) {
        stats.posts[stat._id] = stat.count;
        stats.posts.totalViews += stat.totalViews || 0;
        stats.posts.totalLikes += stat.totalLikes || 0;
      }
    });
    
    res.json({ stats });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;