const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Content = require('./models/Content');
const Course = require('./models/Course');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aviation-platform');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Content.deleteMany({});
    await Course.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@daqiqattayaran.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Created admin user');

    // Create sample content
    const contentData = [
      // Company Section
      {
        section: 'company',
        type: 'hero',
        title: 'Aviation Media & Platform',
        subtitle: 'Leading the Future of Aviation',
        content: 'We are a premium aviation-focused company driving innovation, digital transformation, and excellence in the aviation industry, aligned with Saudi Vision 2030.',
        author: adminUser._id,
        isPublished: true,
        publishedAt: new Date()
      },
      {
        section: 'company',
        type: 'vision',
        title: 'Our Vision',
        content: 'To be the leading aviation platform that empowers professionals with cutting-edge AI technology and comprehensive learning solutions, contributing to Saudi Arabia\'s vision of a thriving, diversified economy.',
        author: adminUser._id,
        isPublished: true,
        publishedAt: new Date()
      },
      {
        section: 'company',
        type: 'mission',
        title: 'Our Mission',
        content: 'We provide innovative aviation solutions, world-class education, and AI-powered tools that enable aviation professionals to excel in their careers while supporting the Kingdom\'s digital transformation goals.',
        author: adminUser._id,
        isPublished: true,
        publishedAt: new Date()
      },
      // AvTech Section
      {
        section: 'avtech',
        type: 'hero',
        title: 'AvTech Solutions',
        subtitle: 'AI-Powered Aviation Technology',
        content: 'Revolutionary AI and technology solutions designed specifically for aviation professionals. Enhance productivity, streamline operations, and drive innovation with our cutting-edge tools.',
        author: adminUser._id,
        isPublished: true,
        publishedAt: new Date()
      },
      // Academy Section
      {
        section: 'academy',
        type: 'hero',
        title: 'Digital Academy',
        subtitle: 'Comprehensive Aviation Learning Platform',
        content: 'Master aviation skills with our comprehensive LMS featuring expert-led courses, certifications, and hands-on learning experiences designed for professionals.',
        author: adminUser._id,
        isPublished: true,
        publishedAt: new Date()
      }
    ];

    await Content.insertMany(contentData);
    console.log('Created sample content');

    // Create sample courses
    const coursesData = [
      {
        title: 'Aviation Fundamentals',
        description: 'Comprehensive introduction to aviation principles, covering aerodynamics, aircraft systems, and basic flight operations.',
        shortDescription: 'Learn the fundamentals of aviation and flight operations.',
        category: 'aviation-basics',
        level: 'beginner',
        modules: [
          {
            title: 'Introduction to Aviation',
            description: 'Basic concepts and history of aviation',
            order: 1,
            lessons: [
              {
                title: 'History of Flight',
                description: 'From Wright Brothers to modern aviation',
                content: 'This lesson covers the fascinating history of human flight...',
                duration: 45,
                order: 1
              },
              {
                title: 'Basic Aerodynamics',
                description: 'Understanding lift, drag, thrust, and weight',
                content: 'Learn the four fundamental forces of flight...',
                duration: 60,
                order: 2
              }
            ]
          }
        ],
        instructor: {
          name: 'Captain Ahmed Al-Rashid',
          bio: 'Commercial pilot with 20+ years experience',
          credentials: ['ATPL', 'Flight Instructor', 'Aviation Safety Expert']
        },
        price: 0,
        tags: ['aviation', 'fundamentals', 'beginner'],
        prerequisites: [],
        learningOutcomes: [
          'Understand basic aviation principles',
          'Identify aircraft components',
          'Explain flight operations'
        ],
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date(),
        author: adminUser._id,
        rating: { average: 4.8, count: 156 },
        enrollmentCount: 1250
      },
      {
        title: 'AI Tools for Aviation Professionals',
        description: 'Master AI-powered tools and technologies that are transforming the aviation industry.',
        shortDescription: 'Harness the power of AI in aviation operations.',
        category: 'ai-tools',
        level: 'intermediate',
        modules: [
          {
            title: 'Introduction to AI in Aviation',
            description: 'Overview of AI applications in aviation',
            order: 1,
            lessons: [
              {
                title: 'AI Fundamentals',
                description: 'Basic concepts of artificial intelligence',
                content: 'Understanding machine learning, neural networks, and AI applications...',
                duration: 50,
                order: 1
              }
            ]
          }
        ],
        instructor: {
          name: 'Dr. Sarah Al-Mahmoud',
          bio: 'AI researcher and aviation technology expert',
          credentials: ['PhD Computer Science', 'AI Specialist', 'Aviation Consultant']
        },
        price: 299,
        tags: ['ai', 'technology', 'automation'],
        prerequisites: ['Basic aviation knowledge'],
        learningOutcomes: [
          'Implement AI tools in aviation workflows',
          'Understand machine learning applications',
          'Optimize operations with AI'
        ],
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date(),
        author: adminUser._id,
        rating: { average: 4.9, count: 89 },
        enrollmentCount: 567
      },
      {
        title: 'Aviation Safety Management',
        description: 'Comprehensive safety management systems and risk assessment in aviation operations.',
        shortDescription: 'Master aviation safety protocols and risk management.',
        category: 'safety',
        level: 'advanced',
        modules: [
          {
            title: 'Safety Management Systems',
            description: 'Understanding SMS implementation',
            order: 1,
            lessons: [
              {
                title: 'SMS Framework',
                description: 'Components of effective safety management',
                content: 'Learn the four pillars of SMS and implementation strategies...',
                duration: 75,
                order: 1
              }
            ]
          }
        ],
        instructor: {
          name: 'Captain Mohammed Al-Qahtani',
          bio: 'Aviation safety expert with regulatory experience',
          credentials: ['Safety Management Certificate', 'ICAO Auditor', 'Risk Assessment Specialist']
        },
        price: 499,
        tags: ['safety', 'management', 'compliance'],
        prerequisites: ['Aviation experience', 'Basic management knowledge'],
        learningOutcomes: [
          'Implement SMS programs',
          'Conduct risk assessments',
          'Ensure regulatory compliance'
        ],
        isPublished: true,
        isFeatured: true,
        publishedAt: new Date(),
        author: adminUser._id,
        rating: { average: 4.7, count: 234 },
        enrollmentCount: 892
      }
    ];

    await Course.insertMany(coursesData);
    console.log('Created sample courses');

    console.log('Seed data created successfully!');
    console.log(`Admin login: ${adminUser.email}`);
    console.log(`Admin password: ${process.env.ADMIN_PASSWORD || 'AdminPass123!'}`);

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the seed function
seedData();