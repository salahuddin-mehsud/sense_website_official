import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, ChevronDown, Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import EventAnnouncementBar from './EventAnnouncementBar';

const Navbar = () => {
  const {
    sessions,
    selectedSessionId,
    setSelectedSessionId,
    currentUser,
    logout
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header ref={navRef} className="sticky top-0 z-40 w-full font-sans shadow-md bg-white">
      {/* 0. UPCOMING EVENT REGISTRATION ANNOUNCEMENT TOPPER (Yellow bar, bold black text, 4s cycle) */}
      <EventAnnouncementBar />

      {/* 1. TOP UTILITY BAR (Dark Slate) */}
      <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          {/* Left: University Affiliation */}
          <div className="flex items-center space-x-3 truncate">
            <span className="font-medium text-slate-200">
              International Islamic University, Islamabad (IIUI)
            </span>
          </div>

          {/* Right: Socials & Sign In */}
          <div className="flex items-center space-x-4">
            {/* Admin Link or User Badge */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin"
                  className="text-sense-accent hover:text-amber-300 font-medium flex items-center gap-1 text-[11px] bg-slate-800 px-2 py-0.5 rounded-none border border-amber-500/30"
                >
                  <Lock className="w-3 h-3" /> Dashboard (Admin)
                </Link>
                <button
                  onClick={logout}
                  className="text-slate-400 hover:text-white text-[11px]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="hover:text-sense-lightCyan flex items-center gap-1 transition text-[11px]"
              >
                <Lock className="w-3 h-3 text-slate-400" /> Sign In
              </Link>
            )}

            {/* Social Icons */}
            <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-slate-700">
              <a
                href="https://www.linkedin.com/company/sense-iiui/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-slate-400 hover:text-sense-lightCyan transition"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.84 6.2a1.62 1.62 0 1 0 1.62 1.62A1.62 1.62 0 0 0 7.84 6.2Z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/sense.iiui/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-slate-400 hover:text-pink-400 transition"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand Identity (Clean, no 2026-2027 badge, no glowing dot, no tagline) */}
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

            {/* Desktop Navigation Links (Clean single pages: ABOUT, EVENTS, GALLERY, TEAM, VISION) */}
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

              <Link
                to="/mission-vision"
                className={`py-2 px-3.5 rounded-none transition ${
                  location.pathname === '/mission-vision'
                    ? 'text-sense-blue bg-blue-50/70 font-bold'
                    : 'text-slate-800 hover:text-sense-blue hover:bg-slate-50'
                }`}
              >
                VISION
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

      {/* 3. MOBILE NAVIGATION DRAWER (Overlay over hero section without pushing it down) */}
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
              <Link
                to="/mission-vision"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-none hover:bg-slate-100 text-slate-800 font-semibold"
              >
                VISION
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
              {currentUser ? (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-slate-800 text-white font-medium text-xs py-2 rounded-none"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-slate-100 text-slate-700 font-medium text-xs py-2 rounded-none"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
