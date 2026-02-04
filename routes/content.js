const express = require('express');
const Content = require('../models/Content');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all content for a section
router.get('/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const content = await Content.find({ 
      section, 
      isPublished: true 
    })
    .sort({ order: 1, createdAt: 1 })
    .populate('author', 'name');

    res.json(content);
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific content by type
router.get('/:section/:type', async (req, res) => {
  try {
    const { section, type } = req.params;
    const content = await Content.findOne({ 
      section, 
      type, 
      isPublished: true 
    }).populate('author', 'name');

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create content (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const contentData = {
      ...req.body,
      author: req.user.userId
    };

    if (contentData.isPublished) {
      contentData.publishedAt = new Date();
    }

    const content = new Content(contentData);
    await content.save();

    const populatedContent = await Content.findById(content._id)
      .populate('author', 'name');

    res.status(201).json(populatedContent);
  } catch (error) {
    console.error('Create content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update content (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.isPublished && !updateData.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const content = await Content.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'name');

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete content (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findByIdAndDelete(id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;