import './config/env.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import peopleRoutes from './routes/peopleRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Security Middleware
app.use(helmet());

// Flexible CORS for Localhost & Vercel Preview/Production
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const clientOrigin = process.env.CLIENT_ORIGIN;
    if (
      !clientOrigin ||
      origin === clientOrigin ||
      origin.includes('localhost') ||
      origin.endsWith('.vercel.app')
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Serverless DB Connection Middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('[DB Middleware Error]', err.message);
    if (req.path === '/' || req.path === '/api/health') {
      return next();
    }
    return res.status(503).json({
      success: false,
      message: 'Database connection unavailable. Please check MONGODB_URI in environment variables.'
    });
  }
});

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'UP',
    name: 'SENSE IIUI Official API Server',
    society: 'Software Engineering Society for Excellence (SENSE)',
    university: 'International Islamic University Islamabad (IIUI)',
    endpoints: {
      health: '/api/health',
      auth: '/api/v1/auth',
      events: '/api/v1/events',
      sessions: '/api/v1/sessions',
      people: '/api/v1/people',
      gallery: '/api/v1/gallery',
      submissions: '/api/v1/submissions',
      content: '/api/v1/content',
      upload: '/api/v1/upload'
    },
    time: new Date().toISOString()
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'UP', society: 'SENSE IIUI', time: new Date().toISOString() });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/sessions', sessionRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/people', peopleRoutes);
app.use('/api/v1/submissions', submissionRoutes);
app.use('/api/v1/content', contentRoutes);
app.use('/api/v1/upload', uploadRoutes);

// 404 Route Catch-all
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Central Error Handler
app.use(errorHandler);

export default app;
