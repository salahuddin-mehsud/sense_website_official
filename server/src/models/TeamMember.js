import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  teamCategory: {
    type: String,
    enum: ['Operations', 'Web', 'Media', 'R&D', 'Graphics'],
    required: true
  },
  name: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  headline: { type: String },
  bio: { type: String },
  photoUrl: { type: String, required: true },
  cloudinaryPublicId: { type: String },
  linkedIn: { type: String },
  skills: [{ type: String }],
  displayOrder: { type: Number, default: 0 }
}, {
  timestamps: true
});

teamMemberSchema.index({ sessionId: 1, teamCategory: 1, displayOrder: 1 });

export default mongoose.model('TeamMember', teamMemberSchema);

