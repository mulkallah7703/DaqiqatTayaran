const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    enum: ['company', 'avtech', 'academy', 'global']
  },
  type: {
    type: String,
    required: true,
    enum: ['hero', 'about', 'vision', 'mission', 'metrics', 'team', 'clients', 'services', 'features']
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  videos: [{
    url: String,
    title: String,
    thumbnail: String
  }],
  metadata: {
    seoTitle: String,
    seoDescription: String,
    keywords: [String]
  },
  order: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  publishedAt: {
    type: Date
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
contentSchema.index({ section: 1, type: 1, order: 1 });

module.exports = mongoose.model('Content', contentSchema);