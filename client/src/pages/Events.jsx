import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Calendar, MapPin, Search, Filter, ExternalLink,
  FolderGit2, Users, Tag, Clock, ArrowRight, CheckCircle2,
  X, Ticket
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import EventRegistrationModal from '../components/events/EventRegistrationModal';

const Events = () => {
  const {
    sessions,
    selectedSessionId,
    setSelectedSessionId,
    currentSession,
    sessionEvents
  } = useApp();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialStatus = searchParams.get('status') || 'ALL';

  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registeringEvent, setRegisteringEvent] = useState(null);

  // Extract available categories
  const categories = useMemo(() => {
    const cats = new Set(sessionEvents.map(e => e.category));
    return ['ALL', ...Array.from(cats)];
  }, [sessionEvents]);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return sessionEvents.filter(event => {
      // Status filter
      if (statusFilter !== 'ALL' && event.status !== statusFilter) {
        return false;
      }
      // Category filter
      if (categoryFilter !== 'ALL' && event.category !== categoryFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = event.title.toLowerCase().includes(q);
        const matchesSummary = event.summary.toLowerCase().includes(q);
        const matchesTags = event.tags && event.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesTags) return false;
      }
      return true;
    });
  }, [sessionEvents, statusFilter, categoryFilter, searchQuery]);

  return (
    <div className="flex-1 font-sans bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-sense-darkest via-sense-navy to-slate-900 text-white py-16 border-b-4 border-sense-cyan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Events & Hackathons
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Explore hackathons, specialized coding workshops, industry seminars, and technical bootcamps curated by SENSE IIUI.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl w-full md:w-auto">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition uppercase ${
                statusFilter === 'ALL'
                  ? 'bg-sense-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({sessionEvents.length})
            </button>
            <button
              onClick={() => setStatusFilter('UPCOMING')}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition uppercase ${
                statusFilter === 'UPCOMING'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upcoming ({sessionEvents.filter(e => e.status === 'UPCOMING').length})
            </button>
            <button
              onClick={() => setStatusFilter('COMPLETED')}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition uppercase ${
                statusFilter === 'COMPLETED'
                  ? 'bg-sense-blue text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Completed ({sessionEvents.filter(e => e.status === 'COMPLETED').length})
            </button>
          </div>

          {/* Search Input & Category Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sense-blue"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:border-sense-blue cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'ALL' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Events Found</h3>
              <p className="text-xs text-slate-500">
                No events match your current filter criteria. Try changing your filters or search keywords.
              </p>
              <button
                onClick={() => { setStatusFilter('ALL'); setCategoryFilter('ALL'); setSearchQuery(''); }}
                className="text-xs text-sense-blue font-bold hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => {
                const isUpcoming = event.status === 'UPCOMING';
                const isClosed = isUpcoming && event.registrationDeadline && (() => {
                  const d = new Date(event.registrationDeadline.replace(/\s*PKT\s*/i, ''));
                  return !isNaN(d.getTime()) && new Date() > d;
                })();

                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition duration-200 flex flex-col group"
                  >
                    {/* Event Banner */}
                    <div className="relative h-52 overflow-hidden bg-slate-950 rounded-none">
                      <img
                        src={event.bannerImage}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100 rounded-none"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`text-xs font-bold px-3 py-1 rounded-none shadow-md uppercase tracking-wider ${
                          isUpcoming
                            ? isClosed
                              ? 'bg-slate-700 text-slate-200'
                              : 'bg-amber-500 text-slate-950 font-extrabold'
                            : 'bg-slate-900/90 text-slate-200 border border-slate-700'
                        }`}>
                          {isUpcoming ? (isClosed ? 'REGISTRATION CLOSED' : 'UPCOMING') : event.status}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-none bg-white/90 text-slate-800 shadow-sm backdrop-blur-sm">
                          {event.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        {/* Date and Time */}
                        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-sense-blue shrink-0" />
                          <span className="font-semibold text-slate-700">{event.date}</span>
                          {event.time && <span>• {event.time}</span>}
                        </div>

                        {/* Title */}
                        <h3
                          onClick={() => setSelectedEvent(event)}
                          className="font-bold text-lg text-slate-900 group-hover:text-sense-blue transition cursor-pointer line-clamp-2 leading-snug"
                        >
                          {event.title}
                        </h3>

                        {/* Summary */}
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {event.summary}
                        </p>

                        {/* Venue */}
                        <div className="flex items-start gap-2 text-xs text-slate-500 pt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{event.venue}</span>
                        </div>

                        {/* Registration Deadline Display */}
                        {isUpcoming && event.registrationDeadline && (
                          <div className="flex items-center gap-1.5 text-xs text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-none font-medium">
                            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>Deadline: <strong className="font-mono text-slate-950 font-bold">{event.registrationDeadline}</strong></span>
                          </div>
                        )}

                        {/* Tags */}
                        {event.tags && event.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {event.tags.map((tag, idx) => (
                              <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action Button: Enforces Requirement Document Rule */}
                      <div className="pt-4 border-t border-slate-100 space-y-2">
                        {isUpcoming ? (
                          isClosed ? (
                            <div className="w-full py-3 text-center bg-slate-100 text-slate-400 font-bold text-xs uppercase tracking-wider border border-slate-200">
                              Registration Closed
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setRegisteringEvent(event)}
                              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-none bg-sense-accent hover:bg-sense-accentHover text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm"
                            >
                              <Ticket className="w-4 h-4" />
                              <span>Register for Event</span>
                            </button>
                          )
                        ) : (
                          <a
                            href={event.driveUrl || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-none bg-slate-900 hover:bg-slate-800 text-sense-lightCyan font-bold text-xs transition"
                          >
                            <FolderGit2 className="w-4 h-4" />
                            <span>View Google Drive Folder / Slides</span>
                          </a>
                        )}

                        <button
                          onClick={() => setSelectedEvent(event)}
                          className="w-full text-center text-[11px] font-semibold text-slate-500 hover:text-sense-blue transition"
                        >
                          View Full Agenda & Details →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-none shadow-2xl border border-slate-200 overflow-hidden text-slate-800 max-h-[90vh] flex flex-col animate-slideDown"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Banner */}
            <div className="relative h-48 bg-slate-900 overflow-hidden shrink-0 rounded-none">
              <img
                src={selectedEvent.bannerImage}
                alt={selectedEvent.title}
                className="w-full h-full object-cover opacity-90 rounded-none"
              />
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-none uppercase tracking-wider ${
                  selectedEvent.status === 'UPCOMING' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-200'
                }`}>
                  {selectedEvent.status}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <span className="text-xs font-semibold text-sense-blue uppercase tracking-wider">
                  {selectedEvent.category}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  {selectedEvent.title}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-4 h-4 text-sense-blue" />
                  <span><strong>Date:</strong> {selectedEvent.date}</span>
                </div>
                {selectedEvent.time && (
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock className="w-4 h-4 text-sense-blue" />
                    <span><strong>Time:</strong> {selectedEvent.time}</span>
                  </div>
                )}
                <div className="col-span-2 flex items-start gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-sense-blue shrink-0 mt-0.5" />
                  <span><strong>Venue:</strong> {selectedEvent.venue}</span>
                </div>
                {selectedEvent.registrationDeadline && (
                  <div className="col-span-2 flex items-center gap-2 text-amber-900 bg-amber-100/60 p-2 rounded-none font-medium">
                    <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                    <span><strong>Registration Deadline:</strong> <span className="font-mono font-bold text-slate-950">{selectedEvent.registrationDeadline}</span></span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Event Description & Agenda
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedEvent.description || selectedEvent.summary}
                </p>
              </div>

              {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Topics Covered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4 shrink-0">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>

              {selectedEvent.status === 'UPCOMING' ? (
                (() => {
                  const d = selectedEvent.registrationDeadline
                    ? new Date(selectedEvent.registrationDeadline.replace(/\s*PKT\s*/i, ''))
                    : null;
                  const isClosed = d && !isNaN(d.getTime()) && new Date() > d;

                  return isClosed ? (
                    <span className="px-6 py-2.5 bg-slate-200 text-slate-500 font-bold text-xs uppercase tracking-wider">
                      Registration Closed
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const evt = selectedEvent;
                        setSelectedEvent(null);
                        setRegisteringEvent(evt);
                      }}
                      className="px-6 py-2.5 rounded-none bg-sense-accent hover:bg-sense-accentHover text-slate-950 font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-sm"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>Register for Event</span>
                    </button>
                  );
                })()
              ) : (
                <a
                  href={selectedEvent.driveUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 rounded-none bg-slate-900 hover:bg-slate-800 text-sense-lightCyan font-bold text-xs transition flex items-center gap-2"
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>Access Google Drive Folder</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Event Registration Modal */}
      {registeringEvent && (
        <EventRegistrationModal
          event={registeringEvent}
          onClose={() => setRegisteringEvent(null)}
        />
      )}
    </div>
  );
};

export default Events;

