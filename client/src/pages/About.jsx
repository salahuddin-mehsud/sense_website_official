import React from 'react';
import {
  GraduationCap, Building2, Calendar, Target, Eye, Shield,
  Award, Code2, Users, Compass, CheckCircle2, ArrowRight, Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const About = () => {
  const { siteContent } = useApp();
  const about = siteContent.about;

  return (
    <div className="flex-1 font-sans bg-slate-50">
      {/* Header Banner (Clean, no eyebrow badge) */}
      <section className="bg-gradient-to-r from-sense-darkest via-sense-navy to-slate-900 text-white py-16 border-b-4 border-sense-cyan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              About SENSE IIUI
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Software Engineering Society for Excellence at International Islamic University Islamabad.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* SECTION 1: SOCIETY FOUNDATION */}
        <section id="foundation" className="space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
              Society Foundation
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-2xl font-bold text-slate-800">
                Pioneering Software Engineering at IIUI
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {about.overview}
              </p>
              <p className="text-slate-600 leading-relaxed text-sm">
                Founded in <strong>2025</strong> at International Islamic University Islamabad, SENSE IIUI was created to bridge the critical gap between academic software engineering principles and the rapid demands of global tech industries. SENSE enables students to transition from textbook theory to building live production-grade systems, participating in national hackathons, and contributing to open-source software.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                <span className="bg-slate-200 text-slate-800 px-3 py-1.5 font-semibold">
                  IIUI Sector H-10, Islamabad
                </span>
                <span className="bg-slate-200 text-slate-800 px-3 py-1.5 font-semibold">
                  Est. 2025
                </span>
                <span className="bg-slate-200 text-slate-800 px-3 py-1.5 font-semibold">
                  Department of Software Engineering
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden shadow-xl border border-slate-200 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="SENSE IIUI Community"
                  className="w-full h-72 object-cover opacity-90"
                />
                <div className="p-6 bg-slate-900 text-white space-y-1">
                  <h4 className="text-base font-bold">100% Student-Driven Excellence</h4>
                  <p className="text-xs text-slate-300">
                    Engineered by students, for students, aligned with international IEEE and ACM computing standards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 bg-blue-100 text-sense-blue flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-base">Curriculum Enrichment</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Translating coursework in Software Architecture, Design Patterns, Algorithms, and Database Systems into real-world GitHub repositories.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-base">Industrial Bridge</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hosting guest tech talks, recruitment drives, and mock technical interview sessions with leading Islamabad software houses.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 bg-cyan-100 text-sense-cyan flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-base">Research & Hackathons</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supporting undergraduate student teams in publishing papers in recognized computing conferences and competing nationally.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: ETHICS & INTEGRITY */}
        <section id="ethics" className="space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
              Ethics & Integrity
            </h2>
          </div>

          <div className="bg-white p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
            <div className="max-w-3xl space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">
                The SENSE Developer Code of Ethics
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every line of code and every event organized under SENSE adheres to our moral and professional charter.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-6 bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Shield className="w-4 h-4 text-sense-blue" />
                  <span>1. Public Interest & Moral Responsibility</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Software engineers shall act consistently with public welfare, data privacy, and ethical benefit. Code must never be developed to deceive, harm, or compromise innocent end-users.
                </p>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Code2 className="w-4 h-4 text-sense-blue" />
                  <span>2. Integrity in Technical Delivery</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Ensure products meet high quality, rigorous testing standards, and proper documentation. Plagiarism, academic cheating, and uncredited code scraping are strictly forbidden.
                </p>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Award className="w-4 h-4 text-sense-blue" />
                  <span>3. Professional Judgement & Honesty</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Maintain independence in professional evaluation. Openly state technical limitations, security vulnerabilities, and software risks before deploying to production.
                </p>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Users className="w-4 h-4 text-sense-blue" />
                  <span>4. Collegiate Support & Mentorship</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Senior students shall actively mentor juniors without condescension, cultivating a welcoming environment across all semesters and technical skill tiers.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
