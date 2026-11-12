import mongoose from 'mongoose';

const cabinetMemberSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  name: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  roleTag: { type: String, default: 'Executive Cabinet' },
  headline: { type: String },
  bio: { type: String },
  photoUrl: { type: String, required: true },
  cloudinaryPublicId: { type: String },
  linkedIn: { type: String },
  github: { type: String },
  email: { type: String },
  skills: [{ type: String }],
  displayOrder: { type: Number, default: 0 }
}, {
  timestamps: true
});

cabinetMemberSchema.index({ sessionId: 1, displayOrder: 1 });

export default mongoose.model('CabinetMember', cabinetMemberSchema);

