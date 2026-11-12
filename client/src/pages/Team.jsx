import React, { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Users, Laptop, Terminal, Camera, Shield, Palette,
  Search, ExternalLink, Mail, Award, ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Team = () => {
  const {
    currentSession,
    sessionTeams,
    sessionCabinet,
    teamCategories
  } = useApp();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCat = searchParams.get('category') || 'ALL';

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState('');

  // Merge Executive Council (Cabinet) and all Teams into unified roster
  const allSocietyMembers = useMemo(() => {
    const cabinetWithCategory = sessionCabinet.map(c => ({
      ...c,
      teamCategory: c.teamCategory || 'Executive Council'
    }));
    return [...cabinetWithCategory, ...sessionTeams];
  }, [sessionCabinet, sessionTeams]);

  // Dynamic Categories from Admin configuration
  const categoryTabs = useMemo(() => {
    const tabs = [{ key: 'ALL', label: 'All Teams' }];
    teamCategories.forEach(cat => {
      tabs.push({ key: cat.key || cat.label, label: cat.label });
    });
    return tabs;
  }, [teamCategories]);

  // Filtered members
  const filteredTeams = useMemo(() => {
    return allSocietyMembers.filter(member => {
      // Category filter
      if (activeCategory !== 'ALL') {
        const memCat = (member.teamCategory || '').toLowerCase();
        const activeCat = activeCategory.toLowerCase();
        if (!memCat.includes(activeCat) && !activeCat.includes(memCat)) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = member.name.toLowerCase().includes(q);
        const matchesPosition = member.position.toLowerCase().includes(q);
        const matchesHeadline = member.headline && member.headline.toLowerCase().includes(q);
        const matchesSkills = member.skills && member.skills.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesPosition && !matchesHeadline && !matchesSkills) {
          return false;
        }
      }
      return true;
    });
  }, [allSocietyMembers, activeCategory, searchQuery]);

  return (
    <div className="flex-1 font-sans bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-sense-darkest via-sense-navy to-slate-900 text-white py-16 border-b-4 border-sense-cyan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase">
              SENSE TEAMS & LEADERSHIP
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Meet the executive directors, architects, and technical leads across all departments: Executive Council, Web Development, AI & Research, Operations, Media & Decor, and specialized project wings.
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs and Search */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Dynamic Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            {categoryTabs.map(cat => {
              const count = cat.key === 'ALL'
                ? allSocietyMembers.length
                : allSocietyMembers.filter(m => {
                    const mCat = (m.teamCategory || '').toLowerCase();
                    const cKey = cat.key.toLowerCase();
                    return mCat.includes(cKey) || cKey.includes(mCat);
                  }).length;

              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-none text-xs font-bold transition uppercase tracking-wider ${
                    activeCategory === cat.key
                      ? 'bg-sense-navy text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-none ${activeCategory === cat.key ? 'bg-sense-blue text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, role, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
            />
          </div>
        </div>
      </div>

      {/* Team Cards Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTeams.length === 0 ? (
            <div className="bg-white rounded-none p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 rounded-none bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Members Found</h3>
              <p className="text-xs text-slate-500">
                No members found matching your search. Try selecting "All Teams" or resetting your query.
              </p>
              <button
                onClick={() => { setActiveCategory('ALL'); setSearchQuery(''); }}
                className="text-xs text-sense-blue font-bold hover:underline"
              >
                Reset Filter & Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTeams.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col group"
                >
                  {/* Top Photo Header */}
                  <div className="p-6 pb-0 flex items-start justify-between gap-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm group-hover:border-sense-blue transition shrink-0">
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300 rounded-full"
                      />
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-none bg-sense-paleCyan text-sense-navy uppercase tracking-wider">
                        {member.teamCategory}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-sense-blue transition">
                          {member.name}
                        </h3>
                        <p className="text-xs font-semibold text-sense-blue">
                          {member.position}
                        </p>
                      </div>

                      {member.headline && (
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {member.headline}
                        </p>
                      )}

                      {member.bio && (
                        <p className="text-xs text-slate-500 line-clamp-2 italic">
                          "{member.bio}"
                        </p>
                      )}

                      {/* Technical Skills */}
                      {member.skills && member.skills.length > 0 && (
                        <div className="pt-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                            Skills & Stacks
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {member.skills.map((skill, idx) => (
                              <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-none font-mono">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* LinkedIn Footer Link */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      {member.linkedIn ? (
                        <a
                          href={member.linkedIn}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-sense-blue hover:text-sense-navy transition"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.84 6.2a1.62 1.62 0 1 0 1.62 1.62A1.62 1.62 0 0 0 7.84 6.2Z"/></svg>
                          <span>LinkedIn Profile</span>
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">Department Associate</span>
                      )}

                      <span className="text-[10px] font-mono text-slate-400">
                        SENSE IIUI
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Join a Team Callout */}
          <div className="mt-16 bg-gradient-to-r from-sense-navy to-slate-900 text-white rounded-none p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold">
              Want to join one of our Technical Teams?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Whether you are passionate about full-stack engineering, cybersecurity, AI agent research, photography, or organizing flagship campus hackathons, SENSE has a home for you.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                to="/membership"
                className="px-6 py-3 bg-sense-accent hover:bg-sense-accentHover text-slate-950 font-bold text-xs uppercase tracking-wider rounded-none transition"
              >
                Join SENSE as Member
              </Link>
              <Link
                to="/volunteer"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-none border border-slate-700 transition"
              >
                Apply as Event Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
