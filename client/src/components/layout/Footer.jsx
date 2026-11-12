import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Code, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Footer = () => {
  const { siteContent } = useApp();
  const contact = siteContent.contact;

  return (
    <footer className="bg-sense-darkest text-slate-300 font-sans border-t-4 border-sense-blue mt-auto">
      {/* Upper Footer: Main Information Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-8 sm:pb-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          {/* Col 1 & 2: Branding & Affiliation (Full width on mobile/tablet, 2 cols on desktop) */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2 space-y-3.5">
            <div className="flex items-center space-x-3">
              <img
                src="/sense-logo.jpg"
                alt="SENSE IIUI Logo"
                className="w-12 h-12 object-contain rounded-full border border-slate-700 shadow-sm shrink-0"
                style={{ width: '48px', height: '48px' }}
              />
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-wide">
                  SENSE IIUI
                </h3>
                <p className="text-xs text-sense-lightCyan font-medium">
                  Software Engineering Society for Excellence
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pr-0 sm:pr-4">
              The official society of the Department of Software Engineering at International Islamic University Islamabad.
              Established in 2025 to empower computing students through technical hackathons, industry mentorship, and student leadership.
            </p>

            <div className="pt-1 flex items-center space-x-2.5">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-none bg-slate-800 hover:bg-sense-blue text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-700"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.84 6.2a1.62 1.62 0 1 0 1.62 1.62A1.62 1.62 0 0 0 7.84 6.2Z"/></svg>
              </a>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-none bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-700"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition border border-slate-700"
              >
                <Code className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Explore (Col 1 on mobile row 2) */}
          <div className="col-span-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 sm:mb-4 border-b border-slate-800 pb-1.5 sm:pb-2">
              Explore
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-sense-lightCyan transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-sense-lightCyan transition">About</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-sense-lightCyan transition">Events</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-sense-lightCyan transition">Gallery</Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-sense-lightCyan transition">Teams</Link>
              </li>
              <li>
                <Link to="/mission-vision" className="hover:text-sense-lightCyan transition">Vision</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Opportunities (Col 2 on mobile row 2, side-by-side with Explore) */}
          <div className="col-span-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 sm:mb-4 border-b border-slate-800 pb-1.5 sm:pb-2">
              Opportunities
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link to="/membership" className="text-sense-lightCyan font-semibold hover:underline">
                  Members
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-sense-lightCyan transition">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/collaboration" className="hover:text-sense-lightCyan transition">
                  Collaboration
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-sense-lightCyan transition">
                  DevSprint Hackathon
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-sense-accent flex items-center gap-1 transition text-xs mt-2 text-slate-500">
                  <Lock className="w-3 h-3" /> Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Location (Distributed row-wise on mobile) */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 sm:mb-4 border-b border-slate-800 pb-1.5 sm:pb-2">
              Location
            </h4>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-sense-blue shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  International Islamic University, Sector H-10, Islamabad, PK
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-1">
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-sense-blue shrink-0" />
                  <a href={`mailto:${contact.email}`} className="text-xs hover:text-white truncate">
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-sense-blue shrink-0" />
                  <span className="text-xs">{contact.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Clean Copyright */}
      <div className="bg-black/60 border-t border-slate-800 text-xs text-slate-500 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} SENSE IIUI. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
