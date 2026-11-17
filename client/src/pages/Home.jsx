import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, MapPin, ArrowRight, ExternalLink, Users,
  CheckCircle, Globe, CheckCircle2, FolderGit2, Ticket, Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Lightbox from '../components/ui/Lightbox';
import EventRegistrationModal from '../components/events/EventRegistrationModal';

const Home = () => {
  const {
    currentSession,
    sessionEvents,
    sessionCabinet,
    sessionGallery,
    siteContent
  } = useApp();

  const [activeLightboxItem, setActiveLightboxItem] = useState(null);
  const [registeringEvent, setRegisteringEvent] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Home page events preview (first 3 events)
  const displayEvents = sessionEvents.slice(0, 3);

  // Home page gallery preview (first 4 items)
  const displayGallery = sessionGallery.slice(0, 4);

  // Core Cabinet leaders preview (President, Vice President, General Secretary)
  const president = sessionCabinet.find(c =>
    c.position.toLowerCase() === 'president' ||
    c.position.toLowerCase().includes('founding president')
  ) || sessionCabinet.find(c => c.name.toLowerCase().includes('ahmed'));

  const vicePresident = sessionCabinet.find(c =>
    c.position.toLowerCase().includes('vice')
  ) || sessionCabinet.find(c => c.name.toLowerCase().includes('zain'));

  const generalSecretary = sessionCabinet.find(c =>
    c.position.toLowerCase().includes('secretary')
  ) || sessionCabinet.find(c => c.name.toLowerCase().includes('hamza'));

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setTimeout(() => setNewsletterSubmitted(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="flex-1 flex flex-col font-sans">
      {/* 1. HERO SECTION (Emblem at top on mobile, Full-width, Centered content on mobile) */}
      <section className="relative w-full bg-gradient-to-br from-sense-darkest via-sense-navy to-slate-900 text-white overflow-hidden py-12 sm:py-16 lg:py-24 border-b-4 border-sense-cyan">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            
            {/* Top on Mobile (order-1), Right Column on Desktop (order-2 lg:col-span-5) */}
            <div className="w-full order-1 lg:order-2 lg:col-span-5 flex justify-center">
              <div className="w-full max-w-xl lg:max-w-md bg-slate-900 border border-slate-800 rounded-none p-5 sm:p-8 shadow-xl">
                <div className="flex items-center justify-center mb-5 sm:mb-6">
                  <img
                    src="/sense-logo.jpg"
                    alt="SENSE IIUI Official Emblem"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-slate-700 shadow-md shrink-0"
                    style={{ width: '120px', height: '120px' }}
                  />
                </div>

                <div className="text-center space-y-1 mb-5 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                    SENSE IIUI
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    International Islamic University, Islamabad
                  </p>
                </div>

                {/* Society Highlights Grid */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                  <div className="py-3.5 px-3 rounded-none bg-slate-800/80 border border-slate-700 text-center flex items-center justify-center">
                    <span className="block font-bold text-white text-xs sm:text-sm tracking-wide">
                      Official Society
                    </span>
                  </div>

                  <div className="py-3.5 px-3 rounded-none bg-slate-800/80 border border-slate-700 text-center flex items-center justify-center">
                    <span className="block font-bold text-sense-accent text-xs sm:text-sm tracking-wide">
                      Student-Led
                    </span>
                  </div>

                  <div className="py-3.5 px-3 rounded-none bg-slate-800/80 border border-slate-700 text-center flex items-center justify-center">
                    <span className="block font-bold text-sense-lightCyan text-xs sm:text-sm tracking-wide">
                      Skill Development
                    </span>
                  </div>

                  <div className="py-3.5 px-3 rounded-none bg-slate-800/80 border border-slate-700 text-center flex items-center justify-center">
                    <span className="block font-bold text-emerald-400 text-xs sm:text-sm tracking-wide">
                      Knowledge Sharing
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Below Emblem on Mobile (order-2), Left Column on Desktop (order-1 lg:col-span-7) */}
            <div className="w-full order-2 lg:order-1 lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] text-center lg:text-left">
                Where Innovation Meets Integrity.
              </h1>

              {/* Tagline & Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
                Software Engineering Society for Excellence (SENSE) is the student-led organization at the International Islamic University Islamabad — fostering world-class developers, agentic AI researchers, competitive hackers, and principled leaders.
              </p>

              {/* Call to Action Buttons: Centered on Mobile only, Left-aligned on Desktop */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
                <Link
                  to="/membership"
                  className="bg-sense-accent hover:bg-sense-accentHover text-slate-950 font-bold px-7 py-3.5 rounded-none transition duration-200 flex items-center justify-center gap-2 text-sm uppercase tracking-wide shadow-sm min-w-[160px]"
                >
                  <span>Join SENSE</span>
                </Link>

                <Link
                  to="/events"
                  className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-none border border-slate-700 transition flex items-center justify-center gap-2 text-sm min-w-[160px]"
                >
                  <span>Explore Events</span>
                  <ArrowRight className="w-4 h-4 text-sense-lightCyan" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <section className="bg-slate-900 text-slate-200 border-b border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">30+</span>
              <p className="text-xs text-slate-400 font-medium">Students & Community Members</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-sense-lightCyan font-mono">15+</span>
              <p className="text-xs text-slate-400 font-medium">Workshops, Hackathons & Seminars</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-sense-accent font-mono">5 Teams</span>
              <p className="text-xs text-slate-400 font-medium">Web, R&D, Operations, Media, Graphics</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">2025</span>
              <p className="text-xs text-slate-400 font-medium">Established at IIUI Islamabad</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: EVENTS PREVIEW (No eyebrow pill badge, no animate-pulse) */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Events & Hackathons
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Showing latest department activities
              </p>
            </div>

            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-sense-blue hover:text-sense-navy"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {displayEvents.map((event) => {
              const isUpcoming = event.status === 'UPCOMING';
              const isClosed = isUpcoming && event.registrationDeadline && (() => {
                const d = new Date(event.registrationDeadline.replace(/\s*PKT\s*/i, ''));
                return !isNaN(d.getTime()) && new Date() > d;
              })();

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group"
                >
                  {/* Banner Image & Status Badge (Clean, no pulse) */}
                  <div className="relative h-48 overflow-hidden bg-slate-900 rounded-none">
                    <img
                      src={event.bannerImage}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300 rounded-none"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-none shadow uppercase tracking-wider ${
                        isUpcoming
                          ? isClosed
                            ? 'bg-slate-700 text-slate-200'
                            : 'bg-amber-500 text-slate-950 font-extrabold'
                          : 'bg-slate-800/90 text-slate-200'
                      }`}>
                        {isUpcoming ? (isClosed ? 'CLOSED' : 'UPCOMING') : event.status}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-none bg-white/90 text-slate-800 backdrop-blur-sm">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-sense-blue" />
                        <span>{event.date}</span>
                        {event.time && <span>• {event.time}</span>}
                      </div>

                      <h3 className="font-bold text-lg text-slate-900 group-hover:text-sense-blue transition line-clamp-2">
                        {event.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {event.summary}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>

                      {/* Registration Deadline display */}
                      {isUpcoming && event.registrationDeadline && (
                        <div className="flex items-center gap-1.5 text-xs text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-none font-medium mt-2">
                          <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Deadline: <strong className="font-mono text-slate-950 font-bold">{event.registrationDeadline}</strong></span>
                        </div>
                      )}
                    </div>

                    {/* Action Button: Enforces Requirement 3 rule & deadline check */}
                    <div className="pt-4 border-t border-slate-100">
                      {isUpcoming ? (
                        isClosed ? (
                          <div className="w-full py-2.5 text-center bg-slate-100 text-slate-500 font-bold text-xs uppercase tracking-wider border border-slate-200">
                            Registration Closed
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setRegisteringEvent(event)}
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-none bg-sense-accent hover:bg-sense-accentHover text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm"
                          >
                            <Ticket className="w-3.5 h-3.5" />
                            <span>Register for Event</span>
                          </button>
                        )
                      ) : (
                        <a
                          href={event.driveUrl || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-none bg-slate-900 hover:bg-slate-800 text-sense-lightCyan font-semibold text-xs transition"
                        >
                          <FolderGit2 className="w-3.5 h-3.5" />
                          <span>View Drive Folder / Recap</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-sm transition shadow-sm"
            >
              <span>Explore All {sessionEvents.length} Events</span>
              <ArrowRight className="w-4 h-4 text-sense-blue" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SECTION 3: GALLERY PREVIEW (No eyebrow pill badge) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Photo Gallery
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Moments of learning, collaboration, and victory across sessions.
              </p>
            </div>

            <Link
              to="/gallery"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-sense-blue hover:text-sense-navy"
            >
              <span>Explore Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {displayGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className="group relative h-64 rounded-none overflow-hidden bg-slate-900 cursor-pointer shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-90 group-hover:opacity-100 rounded-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-90 transition"></div>
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-none bg-black/60 text-sense-lightCyan border border-slate-700 backdrop-blur-sm uppercase">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-sense-lightCyan transition">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-1">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition"
            >
              <span>View All Albums</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. SECTION 4: CABINET PREVIEW (No eyebrow pill badge) */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Executive Cabinet
            </h2>
            <p className="text-sm text-slate-600">
              Meet the executive leaders steering SENSE IIUI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">
            {/* 1. Vice President (Left on desktop, 2nd on mobile) */}
            {vicePresident && (
              <div
                key={vicePresident.id}
                className="order-2 md:order-1 bg-white rounded-none border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col text-center p-6 space-y-4 group md:translate-y-2 md:scale-[0.98]"
              >
                <div className="relative mx-auto w-28 h-28 rounded-full overflow-hidden border-2 border-slate-200 group-hover:border-sense-lightCyan transition shadow-sm">
                  <img
                    src={vicePresident.photoUrl}
                    alt={vicePresident.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300 rounded-full"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sense-blue transition">
                    {vicePresident.name}
                  </h3>
                  <span className="inline-block px-3 py-0.5 rounded-none text-xs font-bold bg-slate-100 text-slate-700 uppercase tracking-wider">
                    {vicePresident.position}
                  </span>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 pt-2">
                    {vicePresident.headline}
                  </p>
                </div>

                {vicePresident.skills && vicePresident.skills.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                    {vicePresident.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-none font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 mt-auto flex justify-center">
                  {vicePresident.linkedIn && (
                    <a
                      href={vicePresident.linkedIn}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-sense-blue hover:text-sense-navy"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.84 6.2a1.62 1.62 0 1 0 1.62 1.62A1.62 1.62 0 0 0 7.84 6.2Z"/></svg>
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* 2. President (Center on desktop, 1st on mobile, HIGHLIGHTED & FORWARD) */}
            {president && (
              <div
                key={president.id}
                className="order-1 md:order-2 bg-white rounded-none border-2 border-sense-accent ring-4 ring-amber-400/20 overflow-hidden shadow-xl md:shadow-2xl transition flex flex-col text-center p-7 space-y-4 group md:-translate-y-4 md:scale-[1.05] z-20 relative"
              >
                {/* Prominent Header Banner */}
                <div className="bg-gradient-to-r from-amber-500 via-sense-accent to-amber-500 text-slate-950 font-black text-[11px] uppercase tracking-widest py-1.5 px-4 -mt-7 -mx-7 mb-2 shadow-xs">
                  Executive Leader
                </div>

                <div className="relative mx-auto w-36 h-36 rounded-full overflow-hidden border-4 border-sense-accent shadow-md group-hover:scale-105 transition duration-300">
                  <img
                    src={president.photoUrl}
                    alt={president.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-extrabold text-slate-950 group-hover:text-sense-blue transition">
                    {president.name}
                  </h3>
                  <span className="inline-block px-4 py-1 rounded-none text-xs font-black bg-sense-accent text-slate-950 uppercase tracking-wider shadow-xs">
                    {president.position}
                  </span>
                  <p className="text-xs text-slate-600 font-medium line-clamp-3 pt-2 leading-relaxed">
                    {president.headline}
                  </p>
                </div>

                {president.skills && president.skills.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                    {president.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-none font-mono font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 mt-auto flex justify-center">
                  {president.linkedIn && (
                    <a
                      href={president.linkedIn}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sense-blue hover:text-sense-navy"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.84 6.2a1.62 1.62 0 1 0 1.62 1.62A1.62 1.62 0 0 0 7.84 6.2Z"/></svg>
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* 3. General Secretary (Right on desktop, 3rd on mobile) */}
            {generalSecretary && (
              <div
                key={generalSecretary.id}
                className="order-3 md:order-3 bg-white rounded-none border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col text-center p-6 space-y-4 group md:translate-y-2 md:scale-[0.98]"
              >
                <div className="relative mx-auto w-28 h-28 rounded-full overflow-hidden border-2 border-slate-200 group-hover:border-sense-lightCyan transition shadow-sm">
                  <img
                    src={generalSecretary.photoUrl}
                    alt={generalSecretary.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300 rounded-full"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sense-blue transition">
                    {generalSecretary.name}
                  </h3>
                  <span className="inline-block px-3 py-0.5 rounded-none text-xs font-bold bg-slate-100 text-slate-700 uppercase tracking-wider">
                    {generalSecretary.position}
                  </span>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 pt-2">
                    {generalSecretary.headline}
                  </p>
                </div>

                {generalSecretary.skills && generalSecretary.skills.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                    {generalSecretary.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-none font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 mt-auto flex justify-center">
                  {generalSecretary.linkedIn && (
                    <a
                      href={generalSecretary.linkedIn}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-sense-blue hover:text-sense-navy"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.84 6.2a1.62 1.62 0 1 0 1.62 1.62A1.62 1.62 0 0 0 7.84 6.2Z"/></svg>
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link
              to="/team"
              className="px-6 py-3 rounded-none bg-sense-blue hover:bg-sense-navy text-white font-bold text-sm transition shadow-sm inline-flex items-center gap-2"
            >
              <span>Meet Our Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FEATURE HIGHLIGHTS (No eyebrow badges) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Thrive and Be a Part of the Computing Movement
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Software engineers shaping the future of enterprise software, AI agents, and ethical technology.
            </p>
          </div>

          <div className="space-y-16">
            {/* Feature 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Build Lasting Relationships"
                  className="rounded-none shadow-lg border border-slate-200 object-cover w-full h-72"
                />
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">Build Lasting Relationships</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Collaborate on open-source repositories, form competitive hackathon squads, and receive personalized career advice from senior alumni working at leading technology companies across Pakistan and abroad.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    Structured peer-to-peer mentorship across all university semesters.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    Direct access to inter-university hackathons, coding nights, and study cohorts.
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">Master Modern Stacks & Agentic AI</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Beyond theoretical coursework, SENSE IIUI equips you with production-grade engineering practices: MERN stack development, Docker containerization, REST API optimization, LangChain autonomous agents, and cybersecurity penetration testing (VAPT).
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    Hands-on project deliverables with GitHub code reviews.
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    Certification of achievement awarded upon bootcamp completion.
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-5">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                  alt="Continue Learning"
                  className="rounded-none shadow-lg border border-slate-200 object-cover w-full h-72"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER / ANNOUNCEMENTS SECTION (No eyebrow badge) */}
      <section className="py-14 bg-sense-darkest text-white border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Subscribe to SENSE IIUI Tech Updates & Hackathons
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Get key notifications regarding DevSprint registrations, technical workshops, speaker invitations, and volunteer callouts directly in your inbox.
          </p>

          <form onSubmit={handleNewsletter} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 pt-2">
            <input
              type="email"
              required
              placeholder="Enter your student email..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-none bg-slate-900 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sense-lightCyan"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-none bg-sense-accent hover:bg-sense-accentHover text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm shrink-0"
            >
              Subscribe
            </button>
          </form>

          {newsletterSubmitted && (
            <p className="text-xs text-emerald-400 font-semibold animate-fadeIn">
              ✓ Thank you! You've successfully subscribed to SENSE IIUI updates.
            </p>
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

      {/* Event Registration Modal */}
      {registeringEvent && (
        <EventRegistrationModal
          event={registeringEvent}
          onClose={() => setRegisteringEvent(null)}
        />
      )}
    </div>
  );
};

export default Home;
