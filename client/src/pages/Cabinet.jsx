import React from 'react';
import { Link } from 'react-router-dom';
import {
  Award, Shield, Code2, Users, ArrowRight, ExternalLink,
  Linkedin, Github, Mail
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Cabinet = () => {
  const {
    sessions,
    selectedSessionId,
    setSelectedSessionId,
    currentSession,
    sessionCabinet
  } = useApp();

  return (
    <div className="flex-1 font-sans bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-sense-darkest via-sense-navy to-slate-900 text-white py-16 border-b-4 border-sense-cyan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Executive Cabinet
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              The executive leadership entrusted with steering SENSE IIUI, fostering technical innovation, and upholding integrity across all department initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Main Cabinet Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Active Session Headline */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Elected Officers & Executive Council
              </h2>
            </div>

            <Link
              to="/team"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sense-blue hover:text-sense-navy bg-white border border-slate-300 px-4 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 transition"
            >
              <span>Explore All 5 Technical Teams</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cabinet Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sessionCabinet.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col group"
              >
                {/* Photo & Role Banner */}
                <div className="relative h-64 bg-slate-950 overflow-hidden rounded-none">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-95 group-hover:opacity-100 rounded-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  
                  {/* Position Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-none bg-sense-accent text-slate-950 shadow-md uppercase tracking-wider">
                      {member.position}
                    </span>
                  </div>

                  {member.roleTag && (
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-none bg-black/60 text-sense-lightCyan border border-slate-700 backdrop-blur-sm">
                        {member.roleTag}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold tracking-tight">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Headline */}
                    {member.headline && (
                      <p className="text-xs font-semibold text-sense-blue leading-snug line-clamp-2">
                        {member.headline}
                      </p>
                    )}

                    {/* Bio */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>

                    {/* Skills */}
                    {member.skills && member.skills.length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                          Domain Competencies
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {member.skills.map((skill, idx) => (
                            <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-mono">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Social / Connect Bar */}
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
                      <span className="text-xs text-slate-400">Executive Officer</span>
                    )}

                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="text-slate-400 hover:text-slate-700 transition"
                        title={member.email}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout */}
          <div className="bg-white rounded-none p-8 border border-slate-200 text-center max-w-2xl mx-auto space-y-3">
            <h3 className="text-lg font-bold text-slate-900">
              Want to join the SENSE Leadership Council?
            </h3>
            <p className="text-xs text-slate-600">
              Recruitment for the Executive Cabinet and Deputy Leads opens annually at the start of each academic year. Students can also apply for volunteer roles and technical team positions throughout the semester.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Link
                to="/membership"
                className="px-5 py-2.5 rounded-none bg-sense-accent hover:bg-sense-accentHover text-slate-950 font-bold text-xs uppercase tracking-wider transition"
              >
                Apply for Membership
              </Link>
              <Link
                to="/volunteer"
                className="px-5 py-2.5 rounded-none bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition"
              >
                Volunteer with SENSE
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cabinet;

