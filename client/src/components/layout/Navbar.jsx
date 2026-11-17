import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import EventAnnouncementBar from './EventAnnouncementBar';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header ref={navRef} className="relative z-40 w-full font-sans shadow-md bg-white">
      {/* 0. UPCOMING EVENT REGISTRATION ANNOUNCEMENT TOPPER (Yellow bar, bold black text, 4s cycle) */}
      <EventAnnouncementBar />

      {/* 1. MAIN NAVIGATION BAR */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand Identity */}
            <Link to="/" className="flex items-center space-x-3 group shrink-0">
              <img
                src="/sense-logo.jpg"
                alt="SENSE IIUI Logo"
                className="w-12 h-12 object-contain rounded-full border border-slate-200 shadow-sm shrink-0"
                style={{ width: '48px', height: '48px' }}
              />
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-sense-darkest">
                  SENSE IIUI
                </span>
                <span className="text-xs font-medium text-slate-500 max-w-[280px] sm:max-w-none truncate">
                  Software Engineering Society for Excellence
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (ABOUT, EVENTS, GALLERY, TEAMS) */}
            <nav className="hidden lg:flex items-center space-x-2 font-semibold text-sm text-slate-700">
              <Link
                to="/about"
                className={`py-2 px-3.5 rounded-lg transition ${
                  location.pathname === '/about'
                    ? 'text-sense-blue bg-blue-50/70 font-bold'
                    : 'text-slate-800 hover:text-sense-blue hover:bg-slate-50'
                }`}
              >
                ABOUT
              </Link>

              <Link
                to="/events"
                className={`py-2 px-3.5 rounded-lg transition ${
                  location.pathname === '/events'
                    ? 'text-sense-blue bg-blue-50/70 font-bold'
                    : 'text-slate-800 hover:text-sense-blue hover:bg-slate-50'
                }`}
              >
                EVENTS
              </Link>

              <Link
                to="/gallery"
                className={`py-2 px-3.5 rounded-lg transition ${
                  location.pathname === '/gallery'
                    ? 'text-sense-blue bg-blue-50/70 font-bold'
                    : 'text-slate-800 hover:text-sense-blue hover:bg-slate-50'
                }`}
              >
                GALLERY
              </Link>

              <Link
                to="/team"
                className={`py-2 px-3.5 rounded-none transition ${
                  location.pathname === '/team' || location.pathname === '/cabinet'
                    ? 'text-sense-blue bg-blue-50/70 font-bold'
                    : 'text-slate-800 hover:text-sense-blue hover:bg-slate-50'
                }`}
              >
                TEAMS
              </Link>
            </nav>

            {/* Right Side: Join SENSE Button */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                to="/membership"
                className="bg-sense-accent hover:bg-sense-accentHover text-slate-950 font-bold text-sm px-5 py-2.5 rounded-none shadow-sm transition uppercase tracking-wide"
              >
                JOIN SENSE
              </Link>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MOBILE NAVIGATION DRAWER (Overlay over hero section without pushing it down) */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="lg:hidden fixed inset-0 top-24 bg-slate-950/40 backdrop-blur-xs z-40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Floating Dropdown Drawer */}
          <div className="lg:hidden absolute top-full left-0 right-0 w-full bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-2xl z-50 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="space-y-1 text-sm font-medium">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-none hover:bg-slate-100 text-slate-800 font-semibold"
              >
                HOME
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-none hover:bg-slate-100 text-slate-800 font-semibold"
              >
                ABOUT
              </Link>
              <Link
                to="/events"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-none hover:bg-slate-100 text-slate-800 font-semibold"
              >
                EVENTS
              </Link>
              <Link
                to="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-none hover:bg-slate-100 text-slate-800 font-semibold"
              >
                GALLERY
              </Link>
              <Link
                to="/team"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-none hover:bg-slate-100 text-slate-800 font-semibold"
              >
                TEAMS
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/membership"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-sense-accent hover:bg-sense-accentHover text-slate-950 font-bold text-sm py-2.5 rounded-none shadow uppercase"
              >
                JOIN SENSE
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
