import express from 'express';
import CabinetMember from '../models/CabinetMember.js';
import TeamMember from '../models/TeamMember.js';
import Session from '../models/Session.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

// GET /api/v1/people/cabinet (Public: list cabinet members)
router.get('/cabinet', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.session) {
      const sessionObj = await Session.findOne({
        $or: [{ _id: req.query.session }, { slug: req.query.session }]
      });
      if (sessionObj) filter.sessionId = sessionObj._id;
    }
    const cabinet = await CabinetMember.find(filter).sort({ displayOrder: 1 });
    res.json(cabinet);
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/people/teams (Public: list team members)
router.get('/teams', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.session) {
      const sessionObj = await Session.findOne({
        $or: [{ _id: req.query.session }, { slug: req.query.session }]
      });
      if (sessionObj) filter.sessionId = sessionObj._id;
    }
    if (req.query.category) {
      filter.teamCategory = req.query.category;
    }
    const teams = await TeamMember.find(filter).sort({ displayOrder: 1 });
    res.json(teams);
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/people/cabinet (Admin)
router.post('/cabinet', requireAuth, async (req, res, next) => {
  try {
    const member = await CabinetMember.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/people/teams (Admin)
router.post('/teams', requireAuth, async (req, res, next) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    next(err);
  }
});

export default router;

