import express from 'express';
import Event from '../models/Event.js';
import Session from '../models/Session.js';
import EventRegistration from '../models/EventRegistration.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

// GET /api/v1/events (Public: list events, optional session filter)
router.get('/', async (req, res, next) => {
  try {
    const filter = { isPublished: true };
    if (req.query.session) {
      const sessionObj = await Session.findOne({
        $or: [{ _id: req.query.session }, { slug: req.query.session }]
      });
      if (sessionObj) filter.sessionId = sessionObj._id;
    }
    if (req.query.status) {
      filter.status = req.query.status.toUpperCase();
    }
    const events = await Event.find(filter).sort({ date: -1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/events/:id/register (Public: custom event registration form)
router.post('/:id/register', async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    // Check if registration deadline has passed
    if (event.registrationDeadline) {
      const deadlineDate = new Date(event.registrationDeadline);
      if (!isNaN(deadlineDate.getTime()) && new Date() > deadlineDate) {
        return res.status(400).json({ message: 'Registration for this event is now closed.' });
      }
    }

    const { name, email, phone, studentId, semester, department, teamName, motivation } = req.body;
    if (!name || !email || !phone || !studentId) {
      return res.status(400).json({ message: 'Name, email, phone, and student ID are required.' });
    }

    const registration = await EventRegistration.create({
      eventId: event._id,
      eventTitle: event.title,
      name,
      email,
      phone,
      studentId,
      semester: semester || 'Semester 3',
      department: department || 'Software Engineering',
      teamName: teamName || '',
      motivation: motivation || '',
      status: 'CONFIRMED'
    });

    // Optionally decrement seatsRemaining if available
    if (event.seatsRemaining && event.seatsRemaining > 0) {
      event.seatsRemaining -= 1;
      await event.save();
    }

    res.status(201).json({
      success: true,
      message: `Successfully registered for ${event.title}!`,
      registration
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/events/:id/participants (Admin: list all participants for this event)
router.get('/:id/participants', requireAuth, async (req, res, next) => {
  try {
    const participants = await EventRegistration.find({ eventId: req.params.id }).sort({ createdAt: -1 });
    res.json(participants);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/v1/events/:id/participants/:regId (Admin: update status e.g. ATTENDED)
router.patch('/:id/participants/:regId', requireAuth, async (req, res, next) => {
  try {
    const updated = await EventRegistration.findByIdAndUpdate(
      req.params.regId,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/v1/events/:id/participants/:regId (Admin: remove participant)
router.delete('/:id/participants/:regId', requireAuth, async (req, res, next) => {
  try {
    await EventRegistration.findByIdAndDelete(req.params.regId);
    res.json({ success: true, message: 'Participant removed successfully.' });
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/events (Admin: create event)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { status, driveUrl } = req.body;

    if (status === 'COMPLETED' && !driveUrl) {
      return res.status(400).json({ message: "Google Drive folder link (driveUrl) is required for 'COMPLETED' events." });
    }

    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/v1/events/:id (Admin: update event)
router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const { status, driveUrl } = req.body;
    if (status === 'COMPLETED' && !driveUrl && driveUrl !== undefined) {
      return res.status(400).json({ message: "Google Drive folder link (driveUrl) is required for 'COMPLETED' events." });
    }

    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(event);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/v1/events/:id (Admin: delete event)
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    await EventRegistration.deleteMany({ eventId: req.params.id });
    res.json({ message: 'Event successfully removed.' });
  } catch (err) {
    next(err);
  }
});

export default router;

