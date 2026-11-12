import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g. 'about', 'mission', 'vision', 'contact'
  title: { type: String },
  body: { type: mongoose.Schema.Types.Mixed, required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' }
}, {
  timestamps: true
});

export default mongoose.model('SiteContent', siteContentSchema);

