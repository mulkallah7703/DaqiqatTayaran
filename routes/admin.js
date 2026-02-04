const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');
const Content = require('../models/Content');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get dashboard statistics
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const [
      totalUsers,
      totalCourses,
      totalContent,
      activeUsers,
      publishedCourses,
      recentUsers,
      recentCourses
    ] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Content.countDocuments(),
      User.countDocuments({ isActive: true }),
      Course.countDocuments({ isPublished: true }),
      User.find().sort({ createdAt: -1 }).limit(5).select('name email createdAt'),
      Course.find().sort({ createdAt: -1 }).limit(5).select('title category createdAt')
    ]);

    // Calculate total enrollments
    const users = await User.find({}, 'enrolledCourses');
    const totalEnrollments = users.reduce((total, user) => 
      total + user.enrolledCourses.length, 0
    );

    // Get monthly user registrations for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyUsers = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Get course enrollments by category
    const courseStats = await Course.aggregate([
      {
        $match: { isPublished: true }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalEnrollments: { $sum: '$enrollmentCount' }
        }
      }
    ]);

    res.json({
      overview: {
        totalUsers,
        totalCourses,
        totalContent,
        activeUsers,
        publishedCourses,
        totalEnrollments
      },
      charts: {
        monthlyUsers,
        courseStats
      },
      recent: {
        users: recentUsers,
        courses: recentCourses
      }
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all content for admin management
router.get('/content', adminAuth, async (req, res) => {
  try {
    const { section, type, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (section) query.section = section;
    if (type) query.type = type;

    const content = await Content.find(query)
      .populate('author', 'name')
      .sort({ section: 1, order: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Content.countDocuments(query);

    res.json({
      content,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get admin content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all courses for admin management
router.get('/courses', adminAuth, async (req, res) => {
  try {
    const { category, status, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (category) query.category = category;
    if (status === 'published') query.isPublished = true;
    if (status === 'draft') query.isPublished = false;

    const courses = await Course.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Course.countDocuments(query);

    res.json({
      courses,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get admin courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Bulk operations
router.post('/bulk-action', adminAuth, async (req, res) => {
  try {
    const { action, type, ids } = req.body;

    if (!action || !type || !ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: 'Invalid bulk action parameters' });
    }

    let result;
    
    switch (type) {
      case 'users':
        if (action === 'activate') {
          result = await User.updateMany(
            { _id: { $in: ids } },
            { isActive: true }
          );
        } else if (action === 'deactivate') {
          result = await User.updateMany(
            { _id: { $in: ids } },
            { isActive: false }
          );
        } else if (action === 'delete') {
          result = await User.deleteMany({ _id: { $in: ids } });
        }
        break;

      case 'courses':
        if (action === 'publish') {
          result = await Course.updateMany(
            { _id: { $in: ids } },
            { isPublished: true, publishedAt: new Date() }
          );
        } else if (action === 'unpublish') {
          result = await Course.updateMany(
            { _id: { $in: ids } },
            { isPublished: false }
          );
        } else if (action === 'delete') {
          result = await Course.deleteMany({ _id: { $in: ids } });
        }
        break;

      case 'content':
        if (action === 'publish') {
          result = await Content.updateMany(
            { _id: { $in: ids } },
            { isPublished: true, publishedAt: new Date() }
          );
        } else if (action === 'unpublish') {
          result = await Content.updateMany(
            { _id: { $in: ids } },
            { isPublished: false }
          );
        } else if (action === 'delete') {
          result = await Content.deleteMany({ _id: { $in: ids } });
        }
        break;

      default:
        return res.status(400).json({ message: 'Invalid bulk action type' });
    }

    res.json({
      message: `Bulk ${action} completed successfully`,
      affected: result.modifiedCount || result.deletedCount
    });
  } catch (error) {
    console.error('Bulk action error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;