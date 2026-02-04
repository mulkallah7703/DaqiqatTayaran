const express = require('express');
const Course = require('../models/Course');
const User = require('../models/User');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all published courses
router.get('/', async (req, res) => {
  try {
    const { category, level, search, page = 1, limit = 12 } = req.query;
    
    const query = { isPublished: true };
    
    if (category) query.category = category;
    if (level) query.level = level;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const courses = await Course.find(query)
      .select('-modules.lessons.content') // Exclude lesson content for performance
      .populate('author', 'name')
      .sort({ isFeatured: -1, createdAt: -1 })
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
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured courses
router.get('/featured', async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true, isFeatured: true })
      .select('-modules.lessons.content')
      .populate('author', 'name')
      .limit(6);

    res.json(courses);
  } catch (error) {
    console.error('Get featured courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('author', 'name avatar bio');

    if (!course || !course.isPublished) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll in course
router.post('/:id/enroll', auth, async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.userId;

    const course = await Course.findById(courseId);
    if (!course || !course.isPublished) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(userId);
    const existingEnrollment = user.enrolledCourses.find(
      enrollment => enrollment.courseId.toString() === courseId
    );

    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push({
      courseId,
      enrolledAt: new Date(),
      progress: 0,
      completedLessons: []
    });

    course.enrollmentCount += 1;

    await Promise.all([user.save(), course.save()]);

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    console.error('Enroll course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update lesson progress
router.post('/:courseId/lessons/:lessonId/complete', auth, async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    const enrollment = user.enrolledCourses.find(
      e => e.courseId.toString() === courseId
    );

    if (!enrollment) {
      return res.status(400).json({ message: 'Not enrolled in this course' });
    }

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }

    // Calculate progress
    const course = await Course.findById(courseId);
    const totalLessons = course.modules.reduce((total, module) => 
      total + module.lessons.length, 0
    );
    enrollment.progress = Math.round((enrollment.completedLessons.length / totalLessons) * 100);

    await user.save();

    res.json({ 
      message: 'Lesson completed',
      progress: enrollment.progress 
    });
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create course (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      author: req.user.userId
    };

    if (courseData.isPublished) {
      courseData.publishedAt = new Date();
    }

    const course = new Course(courseData);
    await course.save();

    const populatedCourse = await Course.findById(course._id)
      .populate('author', 'name');

    res.status(201).json(populatedCourse);
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update course (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.isPublished && !updateData.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const course = await Course.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'name');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete course (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;