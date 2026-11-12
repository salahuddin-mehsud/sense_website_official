import './config/env.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import authRoutes from './routes/authRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import peopleRoutes from './routes/peopleRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

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

// Central Error Handler
app.use(errorHandler);

export default app;
