import express from 'express';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// POST /api/v1/upload
router.post('/', async (req, res) => {
  try {
    const { image, folder = 'sense_iiui' } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Image data is required (base64 Data URI or image URL)'
      });
    }

    // Check if Cloudinary is configured
    const isCloudinaryConfigured =
      Boolean(process.env.CLOUDINARY_CLOUD_NAME) &&
      Boolean(process.env.CLOUDINARY_API_KEY) &&
      Boolean(process.env.CLOUDINARY_API_SECRET);

    if (!isCloudinaryConfigured) {
      // Graceful fallback to raw data URI
      return res.json({
        success: true,
        url: image,
        fallback: true,
        message: 'Cloudinary credentials not set, stored as data URI'
      });
    }

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(image, {
      folder,
      resource_type: 'image'
    });

    return res.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id
    });
  } catch (error) {
    console.error('[Upload Error]', error.message);

    // If Cloudinary fails (e.g. timeout or auth issue), return the data URI fallback
    if (req.body.image && req.body.image.startsWith('data:image')) {
      return res.json({
        success: true,
        url: req.body.image,
        fallback: true,
        message: 'Cloudinary upload failed, saved as local data URI'
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || 'Image upload failed'
    });
  }
});

export default router;
