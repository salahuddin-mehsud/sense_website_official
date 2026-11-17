import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Ticket } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import EventRegistrationModal from '../events/EventRegistrationModal';

const EventAnnouncementBar = () => {
  const { sessionEvents } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [registeringEvent, setRegisteringEvent] = useState(null);

  // Filter only upcoming events
  const upcomingEvents = sessionEvents.filter(e => e.status === 'UPCOMING');

  // Helper to format or shorten deadline
  const formatDeadline = (deadline) => {
    if (!deadline) return 'Closing Soon';
    return deadline;
  };

  // Helper to check if deadline has passed
  const isExpired = (deadline) => {
    if (!deadline) return false;
    const d = new Date(deadline.replace(/\s*PKT\s*/i, ''));
    return !isNaN(d.getTime()) && new Date() > d;
  };

  // Auto-cycle every 4 seconds
  useEffect(() => {
    if (upcomingEvents.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % upcomingEvents.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [upcomingEvents.length, isPaused]);

  // Keep index within bounds if events change
  useEffect(() => {
    if (currentIndex >= upcomingEvents.length) {
      setCurrentIndex(0);
    }
  }, [upcomingEvents.length, currentIndex]);

  if (upcomingEvents.length === 0) return null;

  const currentEvent = upcomingEvents[currentIndex];
  const deadlineExpired = isExpired(currentEvent.registrationDeadline);

  return (
    <>
      <aside
        aria-label="Upcoming Events Registration Announcement"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="w-full bg-amber-400 text-slate-950 font-bold border-b border-amber-500/50 relative z-50 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
            
            {/* Left / Center: Announcement Content */}
            <div className="flex-1 flex items-center justify-center sm:justify-start gap-2 sm:gap-3 min-w-0 overflow-hidden">
              {/* Badge */}
              <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-none bg-slate-950 text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>UPCOMING</span>
              </span>

              {/* Event Info (Rotates every 4s) */}
              <div
                key={currentEvent.id}
                className="flex items-center gap-2 sm:gap-3 truncate transition-opacity duration-300 animate-fadeIn"
              >
                <Link
                  to="/events"
                  className="font-extrabold hover:underline truncate text-slate-950"
                  title={currentEvent.title}
                >
                  {currentEvent.title}
                </Link>

                {/* Deadline Info */}
                <span className="hidden sm:inline-flex items-center gap-1 font-semibold text-slate-900 shrink-0 text-xs">
                  <span className="text-slate-800 font-bold">Registration Closes:</span>
                  <span className={`px-1.5 py-0.2 rounded-none font-mono ${
                    deadlineExpired ? 'bg-red-700 text-white font-bold' : 'bg-slate-950/10 text-slate-950 font-bold'
                  }`}>
                    {formatDeadline(currentEvent.registrationDeadline)}
                  </span>
                </span>
              </div>
            </div>

            {/* Right: Action Button & Controls */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Deadline badge for mobile screens */}
              <span className="sm:hidden text-[11px] font-mono font-bold text-slate-900 bg-slate-950/10 px-1 py-0.5">
                {currentEvent.registrationDeadline ? currentEvent.registrationDeadline.split(' ')[0] : 'Open'}
              </span>

              {/* Direct Register Action */}
              {!deadlineExpired ? (
                <button
                  type="button"
                  onClick={() => setRegisteringEvent(currentEvent)}
                  className="inline-flex items-center gap-1 bg-slate-950 hover:bg-slate-800 text-amber-300 px-2.5 sm:px-3 py-1 rounded-none text-[11px] sm:text-xs font-black uppercase tracking-wider transition shadow-xs"
                >
                  <Ticket className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden xs:inline">Register Now</span>
                  <span className="xs:hidden">Join</span>
                  <span>→</span>
                </button>
              ) : (
                <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 font-bold uppercase">
                  Closed
                </span>
              )}
            </div>

          </div>
        </div>
      </aside>

      {/* Direct Registration Modal Triggered from Announcement Bar */}
      {registeringEvent && (
        <EventRegistrationModal
          event={registeringEvent}
          onClose={() => setRegisteringEvent(null)}
        />
      )}
    </>
  );
};

export default EventAnnouncementBar;

