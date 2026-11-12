import mongoose from 'mongoose';

const formSubmissionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['MEMBERSHIP', 'VOLUNTEER', 'COLLABORATION'],
    required: true
  },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true },
  studentId: { type: String },
  semester: { type: String },
  domainInterest: { type: String },
  message: { type: String },
  links: { type: String },
  status: {
    type: String,
    enum: ['NEW', 'IN_REVIEW', 'CONTACTED', 'CLOSED'],
    default: 'NEW'
  },
  adminNotes: { type: String },
  submittedAt: { type: Date, default: Date.now },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' }
}, {
  timestamps: true
});

formSubmissionSchema.index({ type: 1, status: 1 });
formSubmissionSchema.index({ submittedAt: -1 });

export default mongoose.model('FormSubmission', formSubmissionSchema);

