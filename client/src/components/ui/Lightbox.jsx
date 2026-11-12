import React from 'react';
import { X, ExternalLink, Calendar, Tag } from 'lucide-react';

const Lightbox = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-none overflow-hidden shadow-2xl text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Container */}
        <div className="max-h-[65vh] bg-black flex items-center justify-center overflow-hidden rounded-none">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain max-h-[65vh] rounded-none"
          />
        </div>

        {/* Metadata Details */}
        <div className="p-6 bg-slate-900 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-none bg-sense-blue text-white uppercase tracking-wider">
              {item.category}
            </span>
            {item.date && (
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5 text-sense-lightCyan" /> {item.date}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight">
            {item.title}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            {item.caption}
          </p>

          {item.driveFolderUrl && (
            <div className="pt-2">
              <a
                href={item.driveFolderUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sense-lightCyan transition border border-slate-700"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Full Album on Google Drive
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;

