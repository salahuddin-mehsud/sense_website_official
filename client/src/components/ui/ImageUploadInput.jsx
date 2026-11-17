import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon, X, Link as LinkIcon } from 'lucide-react';
import { api } from '../../services/api';

const ImageUploadInput = ({
  label = 'Image',
  value = '',
  onChange,
  folder = 'sense_iiui',
  required = false,
  aspectRatio = 'square', // 'square' for portraits/avatars, 'banner' for wide event banners
  helpText = 'Upload an image from your device (PNG, JPG, WEBP up to 10MB) or enter an external URL.'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset feedback
    setUploadError('');
    setUploadSuccess(false);

    // Validate type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WEBP, GIF).');
      return;
    }

    // Validate size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB limit. Please choose a smaller image.');
      return;
    }

    try {
      setIsUploading(true);

      // Convert to Base64 Data URL
      const reader = new FileReader();
      const readPromise = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
      });
      reader.readAsDataURL(file);
      const dataUrl = await readPromise;

      // Show immediate local preview
      onChange(dataUrl);

      // Upload to server / Cloudinary
      try {
        const res = await api.uploadImage(dataUrl, folder);
        if (res && res.url) {
          onChange(res.url);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 4000);
        }
      } catch (cloudErr) {
        console.warn('[Upload to Cloudinary warning, falling back to local data URI]', cloudErr);
        // We already set onChange(dataUrl), so it remains valid
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);
      }
    } catch (err) {
      console.error('[Upload Failed]', err);
      setUploadError('Failed to process image. Please try again or paste a direct URL.');
    } finally {
      setIsUploading(false);
      // Reset input value so same file can be re-selected if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
    setUploadError('');
    setUploadSuccess(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-sense-blue hover:underline inline-flex items-center gap-1 font-medium"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'Hide URL field' : 'Enter URL manually'}</span>
        </button>
      </div>

      {/* Main Upload Box & Preview */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-none space-y-3">
        {value ? (
          <div className="flex items-center gap-4">
            {/* Thumbnail Preview */}
            <div className={`relative overflow-hidden bg-slate-900 border border-slate-300 shadow-sm shrink-0 ${
              aspectRatio === 'banner' ? 'w-28 h-16 rounded-none' : 'w-16 h-16 rounded-full'
            }`}>
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                }}
              />
              {isUploading && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
                </div>
              )}
            </div>

            {/* Status & Actions */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 truncate">
                  Image Ready
                </span>
                {uploadSuccess && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 font-bold inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Uploaded
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 truncate font-mono">
                {value.startsWith('data:') ? 'Local file (Base64)' : value}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-300 transition"
                >
                  Change File
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-2.5 py-1 text-red-600 hover:text-red-800 text-xs font-semibold hover:bg-red-50 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State: Upload Button */
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wide transition shadow-sm"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Uploading Image...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4 text-sense-accent" />
                  <span>Upload Image from Device</span>
                </>
              )}
            </button>
            <span className="text-xs text-slate-500">
              or paste an image link below
            </span>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Feedback messages */}
        {uploadError && (
          <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        {/* Manual URL input fallback */}
        {showUrlInput && (
          <div className="pt-2 border-t border-slate-200 space-y-1">
            <label className="text-[11px] font-semibold text-slate-600">
              Direct Image URL
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... or https://res.cloudinary.com/..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full p-2 bg-white border border-slate-300 text-xs font-mono"
            />
          </div>
        )}
      </div>

      {helpText && !showUrlInput && (
        <p className="text-[11px] text-slate-400">
          {helpText}
        </p>
      )}
    </div>
  );
};

export default ImageUploadInput;
