const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String
  },
  resources: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['pdf', 'video', 'link', 'document']
    }
  }],
  duration: {
    type: Number, // in minutes
    default: 0
  },
  order: {
    type: Number,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: true
  }
});

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  lessons: [lessonSchema],
  order: {
    type: Number,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: true
  }
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String
  },
  thumbnail: {
    type: String
  },
  category: {
    type: String,
    required: true,
    enum: ['aviation-basics', 'ai-tools', 'safety', 'regulations', 'technology', 'leadership']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  modules: [moduleSchema],
  instructor: {
    name: String,
    bio: String,
    avatar: String,
    credentials: [String]
  },
  price: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number, // total duration in minutes
    default: 0
  },
  enrollmentCount: {
    type: Number,
    default: 0
  },
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  tags: [String],
  prerequisites: [String],
  learningOutcomes: [String],
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
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

// Calculate total duration before saving
courseSchema.pre('save', function(next) {
  let totalDuration = 0;
  this.modules.forEach(module => {
    module.lessons.forEach(lesson => {
      totalDuration += lesson.duration || 0;
    });
  });
  this.duration = totalDuration;
  next();
});

module.exports = mongoose.model('Course', courseSchema);