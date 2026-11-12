import express from 'express';
import Session from '../models/Session.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { requireRole } from '../middleware/requireRole.js';

const router = express.Router();

// GET /api/v1/sessions (Public: list visible sessions)
router.get('/', async (req, res, next) => {
  try {
    const sessions = await Session.find().sort({ startYear: -1 });
    res.json(sessions);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/sessions/current (Public: get active current session)
router.get('/current', async (req, res, next) => {
  try {
    let current = await Session.findOne({ isCurrent: true });
    if (!current) {
      current = await Session.findOne().sort({ startYear: -1 });
    }
    res.json(current);
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/sessions (Admin - Super Admin: create session)
router.post('/', requireAuth, requireRole('SUPER_ADMIN'), async (req, res, next) => {
  try {
    const { name, slug, startYear, endYear, theme, description, isCurrent } = req.body;
    if (isCurrent) {
      await Session.updateMany({}, { isCurrent: false });
    }
    const session = await Session.create({
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      startYear,
      endYear,
      theme,
      description,
      isCurrent: !!isCurrent
    });
    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/v1/sessions/:id (Admin: update session)
router.patch('/:id', requireAuth, requireRole('SUPER_ADMIN'), async (req, res, next) => {
  try {
    if (req.body.isCurrent) {
      await Session.updateMany({ _id: { $ne: req.params.id } }, { isCurrent: false });
    }
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(session);
  } catch (err) {
    next(err);
  }
});

export default router;

