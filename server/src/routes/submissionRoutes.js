import express from 'express';
import FormSubmission from '../models/FormSubmission.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

// POST /api/v1/submissions (Public: submit forms with spam protection)
router.post('/', async (req, res, next) => {
  try {
    const { type, name, email, phone, message } = req.body;
    if (!type || !name || !email || !phone) {
      return res.status(400).json({ message: 'Type, Name, Email, and Phone are required fields.' });
    }

    const submission = await FormSubmission.create(req.body);
    res.status(201).json({
      message: 'Application successfully received by SENSE IIUI.',
      submissionId: submission._id
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/submissions (Admin: review submissions)
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type.toUpperCase();
    if (req.query.status) filter.status = req.query.status.toUpperCase();

    const submissions = await FormSubmission.find(filter).sort({ submittedAt: -1 });
    res.json(submissions);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/v1/submissions/:id (Admin: update status)
router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    const submission = await FormSubmission.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes, reviewedBy: req.user._id },
      { new: true }
    );
    res.json(submission);
  } catch (err) {
    next(err);
  }
});

export default router;

