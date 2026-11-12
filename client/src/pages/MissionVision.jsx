import React from 'react';
import { Link } from 'react-router-dom';
import {
  Target, Eye, Shield, Award, CheckCircle2,
  Code2, Heart, ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const MissionVision = () => {
  const { siteContent } = useApp();
  const { mission, vision, about } = siteContent;

  return (
    <div className="flex-1 font-sans bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-sense-darkest via-sense-navy to-slate-900 text-white py-16 border-b-4 border-sense-cyan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Vision & Mission
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Defining the strategic blueprint and moral charter of the Software Engineering Society for Excellence at International Islamic University Islamabad.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Mission and Vision Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Mission Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-sense-blue flex items-center justify-center">
                  <Target className="w-7 h-7" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {mission.title}
                </h2>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {mission.summary}
                </p>
              </div>

              {/* Pillars list */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sense-navy">
                  Strategic Mission Pillars:
                </h4>
                <div className="space-y-3">
                  {mission.pillars && mission.pillars.map((pillar, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-sense-blue shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs text-slate-900 block">{pillar.title}</strong>
                        <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-gradient-to-br from-sense-darkest to-sense-navy text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6 flex flex-col justify-between border border-slate-800">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-sense-blue/30 text-sense-lightCyan flex items-center justify-center border border-sense-lightCyan/30">
                  <Eye className="w-7 h-7" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {vision.title}
                </h2>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {vision.summary}
                </p>
              </div>

              {/* Objectives list */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sense-accent">
                  Key Strategic Milestones (2025–2030):
                </h4>
                <div className="space-y-2.5">
                  {vision.objectives && vision.objectives.map((obj, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="font-mono text-sense-accent font-bold shrink-0">0{idx + 1}.</span>
                      <p className="leading-relaxed">{obj}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Code of Ethics Section */}
          <div id="ethics" className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-900">
                The SENSE IIUI Code of Software Ethics
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Adapted from IEEE-CS and ACM Software Engineering Codes of Ethics, customized for IIUI computing scholars.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Shield className="w-4 h-4 text-sense-blue" />
                  <span>1. Public Interest & Moral Responsibility</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Software engineers shall act consistently with public welfare, data privacy, and ethical benefit. Code must never be developed to deceive, harm, or compromise innocent end-users.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Code2 className="w-4 h-4 text-sense-blue" />
                  <span>2. Integrity in Technical Delivery</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Ensure products meet high quality, rigorous testing standards, and proper documentation. Plagiarism, academic cheating, and uncredited code scraping are strictly forbidden.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Award className="w-4 h-4 text-sense-blue" />
                  <span>3. Professional Judgement & Honesty</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Maintain independence in professional evaluation. Openly state technical limitations, security vulnerabilities, and software risks before deploying to production.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Heart className="w-4 h-4 text-sense-blue" />
                  <span>4. Collegiate Support & Mentorship</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Senior students shall actively mentor juniors without condescension, cultivating a welcoming environment across all genders, backgrounds, and technical skill tiers.
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <Link
                to="/membership"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-sense-blue hover:bg-sense-navy text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
              >
                <span>Pledge Commitment & Join SENSE as Member</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MissionVision;

