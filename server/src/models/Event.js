import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ['Hackathon', 'Technical Workshop', 'Bootcamp', 'Seminar', 'Competition', 'Ceremony'],
    default: 'Technical Workshop'
  },
  status: {
    type: String,
    enum: ['UPCOMING', 'COMPLETED'],
    required: true,
    default: 'UPCOMING'
  },
  date: { type: String, required: true },
  time: { type: String },
  registrationDeadline: { type: String, trim: true, default: '' },
  venue: { type: String, required: true },
  summary: { type: String, required: true },
  description: { type: String },
  registerUrl: {
    type: String,
    trim: true,
    default: ''
  },
  driveUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        if (this.status === 'COMPLETED') return !!v && v.length > 0;
        return true;
      },
      message: "A valid Google Drive folder link (driveUrl) is required for 'COMPLETED' events."
    }
  },
  bannerImage: { type: String, default: '' },
  cloudinaryPublicId: { type: String },
  seatsTotal: { type: Number, default: 100 },
  seatsRemaining: { type: Number, default: 20 },
  tags: [{ type: String }],
  isPublished: { type: Boolean, default: true },
  featured: { type: Boolean, default: false }
}, {
  timestamps: true
});

eventSchema.index({ sessionId: 1, date: -1 });
eventSchema.index({ sessionId: 1, status: 1 });

export default mongoose.model('Event', eventSchema);

