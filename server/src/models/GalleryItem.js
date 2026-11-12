import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  title: { type: String, required: true, trim: true },
  imageUrl: { type: String, required: true },
  cloudinaryPublicId: { type: String },
  altText: { type: String },
  caption: { type: String },
  category: { type: String, default: 'General' },
  driveFolderUrl: { type: String },
  date: { type: String },
  displayOrder: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true }
}, {
  timestamps: true
});

galleryItemSchema.index({ sessionId: 1, displayOrder: 1 });

export default mongoose.model('GalleryItem', galleryItemSchema);

