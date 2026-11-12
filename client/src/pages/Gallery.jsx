import React, { useState, useMemo } from 'react';
import {
  Image, Calendar, FolderGit2, ExternalLink, Filter, Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Lightbox from '../components/ui/Lightbox';

const Gallery = () => {
  const {
    sessions,
    selectedSessionId,
    setSelectedSessionId,
    currentSession,
    sessionGallery
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [activeLightboxItem, setActiveLightboxItem] = useState(null);

  // Available categories
  const categories = useMemo(() => {
    const cats = new Set(sessionGallery.map(g => g.category));
    return ['ALL', ...Array.from(cats)];
  }, [sessionGallery]);

  // Filtered gallery items
  const filteredGallery = useMemo(() => {
    if (categoryFilter === 'ALL') return sessionGallery;
    return sessionGallery.filter(g => g.category === categoryFilter);
  }, [sessionGallery, categoryFilter]);

  return (
    <div className="flex-1 font-sans bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-sense-darkest via-sense-navy to-slate-900 text-white py-16 border-b-4 border-sense-cyan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Photo Gallery
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Explore memories, hackathon sprints, keynote addresses, and inauguration ceremonies captured across SENSE IIUI sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition uppercase tracking-wider ${
                  categoryFilter === cat
                    ? 'bg-sense-navy text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'ALL' ? `All (${sessionGallery.length})` : cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Showing {filteredGallery.length} Photos
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredGallery.length === 0 ? (
            <div className="bg-white rounded-none p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 rounded-none bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Image className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Photos In This Category</h3>
              <p className="text-xs text-slate-500">
                No gallery items found for "{categoryFilter}". Try selecting "All" or exploring other categories.
              </p>
              <button
                onClick={() => setCategoryFilter('ALL')}
                className="text-xs text-sense-blue font-bold hover:underline"
              >
                Show All Photos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxItem(item)}
                  className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group cursor-pointer flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-slate-950 rounded-none">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-95 group-hover:opacity-100 rounded-none"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-none bg-slate-950/70 text-sense-lightCyan border border-slate-700 backdrop-blur-sm uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Caption & Metadata */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      {item.date && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-sense-blue" />
                          <span>{item.date}</span>
                        </div>
                      )}
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-sense-blue transition line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {item.caption}
                      </p>
                    </div>

                    {item.driveFolderUrl && (
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-sense-blue font-semibold">
                        <span className="flex items-center gap-1">
                          <FolderGit2 className="w-3.5 h-3.5" /> Drive Album Available
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sense-blue group-hover:translate-x-0.5 transition" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <Lightbox
          item={activeLightboxItem}
          onClose={() => setActiveLightboxItem(null)}
        />
      )}
    </div>
  );
};

export default Gallery;

