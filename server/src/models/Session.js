import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  startYear: { type: Number, required: true },
  endYear: { type: Number, required: true },
  theme: { type: String, trim: true },
  description: { type: String, trim: true },
  isCurrent: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false }
}, {
  timestamps: true
});

sessionSchema.index({ isCurrent: 1 });

export default mongoose.model('Session', sessionSchema);

