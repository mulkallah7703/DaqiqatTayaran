const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/User');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

/* =========================
   Security Middleware
========================= */

app.use(helmet());
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

/* =========================
   CORS Configuration
========================= */

if (process.env.NODE_ENV !== 'production') {
  const allowedOrigins = (
    process.env.CLIENT_URLS ||
    process.env.CLIENT_URL ||
    'http://localhost:5173,http://localhost:3000'
  )
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }));
}


/* =========================
   Body Parsers
========================= */

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* =========================
   Static Uploads
========================= */

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* =========================
   Ensure Default Admin
========================= */

const ensureAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@daqiqattayaran.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

  const adminExists = await User.exists({ role: 'admin' });
  if (adminExists) return;

  const emailInUse = await User.findOne({ email: adminEmail });
  if (emailInUse) {
    console.warn('Admin email already exists, skipping creation.');
    return;
  }

  const adminUser = new User({
    name: 'Admin',
    email: adminEmail,
    password: adminPassword,
    role: 'admin',
  });

  await adminUser.save();
  console.log('Default admin user created.');
};

/* =========================
   Routes
========================= */

app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/content', require('./routes/content'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/users', require('./routes/users'));
app.use('/api/ai', require('./routes/ai'));

/* =========================
   Serve Frontend (Production)
========================= */

if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, 'client', 'dist');

  // Serve static files
  app.use(express.static(distPath));

  // React SPA fallback (ONLY non-API routes)
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }

    res.sendFile(path.join(distPath, 'index.html'));
  });
}


/* =========================
   Error Handler
========================= */

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

/* =========================
   Start Server Safely
========================= */

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET) {
      console.warn('JWT_SECRET is not set.');
    }

    const mongoUri =
      process.env.MONGODB_URI ||
      'mongodb://mongo:27017/daqiqattayaran';

    await mongoose.connect(mongoUri);

    console.log('MongoDB connected successfully');

    await ensureAdminUser();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
};

/* =========================
   Global Error Guards
========================= */

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});

/* =========================
   Initialize
========================= */

startServer();
