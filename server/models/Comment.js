const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'deleted', 'flagged'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Indexes for better performance
commentSchema.index({ post: 1, createdAt: -1 });
commentSchema.index({ author: 1 });
commentSchema.index({ parentComment: 1 });

// Virtual for like count
commentSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Pre-save middleware to handle replies
commentSchema.pre('save', async function(next) {
  // If this is a reply, add it to parent's replies array
  if (this.parentComment && this.isNew) {
    try {
      await mongoose.model('Comment').findByIdAndUpdate(
        this.parentComment,
        { $addToSet: { replies: this._id } }
      );
    } catch (error) {
      return next(error);
    }
  }
  
  // Mark as edited if content is modified (but not on creation)
  if (this.isModified('content') && !this.isNew) {
    this.isEdited = true;
    this.editedAt = new Date();
  }
  
  next();
});

// Method to check if user liked the comment
commentSchema.methods.isLikedBy = function(userId) {
  return this.likes.some(like => like.user.toString() === userId.toString());
};

// Method to toggle like
commentSchema.methods.toggleLike = function(userId) {
  const existingLikeIndex = this.likes.findIndex(like => like.user.toString() === userId.toString());
  
  if (existingLikeIndex > -1) {
    this.likes.splice(existingLikeIndex, 1);
    return false; // unliked
  } else {
    this.likes.push({ user: userId });
    return true; // liked
  }
};

// Static method to get comments for a post with nested replies
commentSchema.statics.getPostComments = function(postId) {
  return this.find({ 
    post: postId, 
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
  .sort({ createdAt: -1 });
};

// Method to get comment depth (for nested replies)
commentSchema.methods.getDepth = async function() {
  let depth = 0;
  let currentComment = this;
  
  while (currentComment.parentComment) {
    depth++;
    currentComment = await mongoose.model('Comment').findById(currentComment.parentComment);
    if (!currentComment) break;
  }
  
  return depth;
};

module.exports = mongoose.model('Comment', commentSchema);