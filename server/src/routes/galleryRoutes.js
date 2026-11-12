import express from 'express';
import GalleryItem from '../models/GalleryItem.js';
import Session from '../models/Session.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

// GET /api/v1/gallery (Public: list photos)
router.get('/', async (req, res, next) => {
  try {
    const filter = { isPublished: true };
    if (req.query.session) {
      const sessionObj = await Session.findOne({
        $or: [{ _id: req.query.session }, { slug: req.query.session }]
      });
      if (sessionObj) filter.sessionId = sessionObj._id;
    }
    const items = await GalleryItem.find(filter).sort({ displayOrder: 1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/gallery (Admin: add photo)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const item = await GalleryItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/v1/gallery/:id (Admin: delete photo)
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    await GalleryItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery item removed.' });
  } catch (err) {
    next(err);
  }
});

export default router;

