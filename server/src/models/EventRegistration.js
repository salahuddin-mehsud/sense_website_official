import mongoose from 'mongoose';

const eventRegistrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  eventTitle: { type: String, trim: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  studentId: { type: String, required: true, trim: true },
  semester: { type: String, default: 'Semester 3' },
  department: { type: String, default: 'Software Engineering' },
  teamName: { type: String, default: '' },
  motivation: { type: String, default: '' },
  status: {
    type: String,
    enum: ['CONFIRMED', 'ATTENDED', 'CANCELLED'],
    default: 'CONFIRMED'
  }
}, {
  timestamps: true
});

eventRegistrationSchema.index({ eventId: 1, email: 1 });
eventRegistrationSchema.index({ eventId: 1, createdAt: -1 });

export default mongoose.model('EventRegistration', eventRegistrationSchema);

