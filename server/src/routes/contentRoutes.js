import express from 'express';
import SiteContent from '../models/SiteContent.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

// GET /api/v1/content/:key (Public)
router.get('/:key', async (req, res, next) => {
  try {
    const content = await SiteContent.findOne({ key: req.params.key });
    if (!content) {
      return res.status(404).json({ message: 'Content key not found.' });
    }
    res.json(content);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/v1/content/:key (Admin)
router.patch('/:key', requireAuth, async (req, res, next) => {
  try {
    const { body, title } = req.body;
    const content = await SiteContent.findOneAndUpdate(
      { key: req.params.key },
      { body, title, updatedBy: req.user._id },
      { new: true, upsert: true }
    );
    res.json(content);
  } catch (err) {
    next(err);
  }
});

export default router;

