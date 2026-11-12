import React, { useState } from 'react';
import {
  Users, Award, CheckCircle2, Shield, Code,
  Laptop, ExternalLink, ArrowRight, Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Membership = () => {
  const { submitForm, currentSession, teamCategories } = useApp();

  // Hiring open/close status from active cohort (defaults to true if not set)
  const isHiringOpen = currentSession ? currentSession.isHiringOpen !== false : true;

  // Available teams from cohort or dynamic team categories
  const availableTeams = currentSession?.teamsList && currentSession.teamsList.length > 0
    ? currentSession.teamsList
    : teamCategories.map(c => c.label);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    semester: 'Semester 3',
    domainInterest: 'Executive Council Team',
    preferredRole: '',
    linkedin: '',
    instagram: '',
    links: '',
    message: '',
    consent: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isHiringOpen) {
      alert("Applications are currently closed for this cohort.");
      return;
    }
    if (!formData.consent) {
      alert("Please agree to the SENSE IIUI Code of Conduct and Society Regulations.");
      return;
    }

    setLoading(true);

    submitForm('MEMBERSHIP', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      studentId: formData.studentId,
      semester: formData.semester,
      domainInterest: formData.domainInterest,
      preferredRole: formData.preferredRole || 'Team Member',
      linkedin: formData.linkedin,
      instagram: formData.instagram,
      message: formData.message,
      links: formData.linkedin || formData.links || 'N/A',
      status: 'PENDING'
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="flex-1 font-sans bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-sense-darkest via-sense-navy to-slate-900 text-white py-16 border-b-4 border-sense-cyan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase">
              SENSE MEMBERS
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Elevate your university journey. Join the Department of Software Engineering's premier society to access technical bootcamps, hackathon squads, and industry connections.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Member Privileges */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Why Become an Official SENSE Member?
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  SENSE IIUI is built to accelerate your engineering career before graduation. Official members enjoy exclusive rights and priority allocations.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white rounded-none border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 rounded-none bg-blue-50 text-sense-blue flex items-center justify-center shrink-0">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Free Hands-On Bootcamps</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Complimentary entry to intensive technical workshops covering MERN, Agentic AI, Cloud Docker, and VAPT.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-none border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 rounded-none bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">DevSprint Hackathon Priority</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Guaranteed team registration access, mentor coaching, and discount codes for nationwide competitions.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-none border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 rounded-none bg-cyan-50 text-sense-cyan flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Official Member Certificate</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Endorsed by the Department of Software Engineering and Faculty Advisor, verified on LinkedIn.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-none border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 rounded-none bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Direct Career & Alumni Network</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Private Discord channels with graduating seniors and alumni at top Islamabad software companies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-4 border text-xs leading-relaxed ${
                isHiringOpen
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <strong>Cohort Hiring Status: </strong>
                {isHiringOpen ? (
                  <span>Applications are currently <strong>OPEN</strong>. Choose your target team and submit your credentials below.</span>
                ) : (
                  <span>Applications are currently <strong>CLOSED</strong>. Recruitment is locked for the active cycle.</span>
                )}
              </div>
            </div>

            {/* Right Column: Application Form with Lock / Blur Overlay */}
            <div className="lg:col-span-7">
              <div className="relative bg-white rounded-none border border-slate-200 shadow-sm p-6 sm:p-10 overflow-hidden">
                
                {/* BLURRED / LOCKED OVERLAY WHEN HIRING IS CLOSED */}
                {!isHiringOpen && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/70 backdrop-blur-xs text-white text-center">
                    <div className="w-16 h-16 rounded-none bg-red-950/90 border-2 border-red-500 text-red-400 flex items-center justify-center mb-4 shadow-xl">
                      <Lock className="w-8 h-8" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 bg-red-950/90 px-3 py-1 border border-red-800/50 mb-2">
                      Recruitment Inactive
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                      JOINING CLOSED
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                      Applications for SENSE IIUI members are currently closed for this cohort cycle.
                      Please check back during our next recruitment drive or follow our official social channels for announcements.
                    </p>
                  </div>
                )}

                {/* Form or Confirmation Message */}
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-none bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      Application Submitted Successfully!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Welcome to SENSE IIUI, <strong className="text-slate-900">{formData.name}</strong>! Your application has been logged into the Society portal under the <strong>{formData.domainInterest} Team</strong>. Our leads will review your credentials and reach out for interview scheduling.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          studentId: '',
                          semester: 'Semester 3',
                          domainInterest: 'Executive Council Team',
                          preferredRole: '',
                          linkedin: '',
                          instagram: '',
                          links: '',
                          message: '',
                          consent: false
                        });
                      }}
                      className="px-6 py-2.5 rounded-none bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition"
                    >
                      Submit Another Application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={`space-y-6 ${!isHiringOpen ? 'filter blur-[2px] opacity-40 select-none pointer-events-none' : ''}`}>
                    <div className="space-y-1 border-b border-slate-100 pb-4">
                      <h3 className="text-xl font-bold text-slate-900">
                        SENSE MEMBERS APPLICATION
                      </h3>
                      <p className="text-xs text-slate-500">
                        Open for Software Engineering and Computing students at IIUI.
                      </p>
                    </div>

                    {/* Team Selection Dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">
                        Select Target Team to Apply For *
                      </label>
                      <select
                        required
                        disabled={!isHiringOpen}
                        value={formData.domainInterest}
                        onChange={(e) => setFormData({ ...formData, domainInterest: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sense-blue cursor-pointer"
                      >
                        <option value="Executive Council Team">Executive Council Team</option>
                        <option value="Web Development Team">Web Development Team</option>
                        <option value="AI & Research Team">AI & Research Team</option>
                        <option value="Operations Team">Operations Team</option>
                        <option value="Media & Decor Team">Media & Decor Team</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Full Name *</label>
                        <input
                          type="text"
                          required
                          disabled={!isHiringOpen}
                          placeholder="e.g. Usama Khan"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                        />
                      </div>

                      {/* Student ID / Reg No */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Student Reg No (Roll No) *</label>
                        <input
                          type="text"
                          required
                          disabled={!isHiringOpen}
                          placeholder="e.g. 521-FBAS/BSSE/F23"
                          value={formData.studentId}
                          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                        />
                      </div>

                      {/* University Email */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Student / Official Email *</label>
                        <input
                          type="email"
                          required
                          disabled={!isHiringOpen}
                          placeholder="usama.se.f23@iiui.edu.pk"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                        />
                      </div>

                      {/* WhatsApp Phone */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">WhatsApp Contact *</label>
                        <input
                          type="tel"
                          required
                          disabled={!isHiringOpen}
                          placeholder="+92 300 1234567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Current Semester */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Current Semester *</label>
                        <select
                          value={formData.semester}
                          disabled={!isHiringOpen}
                          onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue cursor-pointer"
                        >
                          <option value="Semester 1">Semester 1 (Freshman)</option>
                          <option value="Semester 2">Semester 2</option>
                          <option value="Semester 3">Semester 3 (Sophomore)</option>
                          <option value="Semester 4">Semester 4</option>
                          <option value="Semester 5">Semester 5 (Junior)</option>
                          <option value="Semester 6">Semester 6</option>
                          <option value="Semester 7">Semester 7 (Senior)</option>
                          <option value="Semester 8">Semester 8 (Graduating)</option>
                        </select>
                      </div>

                      {/* Specific Post / Preferred Role */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Specific Post / Desired Role</label>
                        <input
                          type="text"
                          disabled={!isHiringOpen}
                          placeholder="e.g. Frontend Developer, Stage Lead, Researcher"
                          value={formData.preferredRole}
                          onChange={(e) => setFormData({ ...formData, preferredRole: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                        />
                      </div>
                    </div>

                    {/* Social Info: LinkedIn & Instagram */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">LinkedIn Profile URL</label>
                        <input
                          type="url"
                          disabled={!isHiringOpen}
                          placeholder="https://linkedin.com/in/username"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Instagram Handle</label>
                        <input
                          type="text"
                          disabled={!isHiringOpen}
                          placeholder="@username"
                          value={formData.instagram}
                          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                        />
                      </div>
                    </div>

                    {/* GitHub / Portfolio */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">GitHub / Project Portfolio URL</label>
                      <input
                        type="url"
                        disabled={!isHiringOpen}
                        placeholder="https://github.com/username or personal portfolio site"
                        value={formData.links}
                        onChange={(e) => setFormData({ ...formData, links: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                      />
                    </div>

                    {/* Motivation / Experience */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Why do you want to join SENSE IIUI? *</label>
                      <textarea
                        rows="3"
                        required
                        disabled={!isHiringOpen}
                        placeholder="Describe your technical skills, relevant experience, or what you hope to accomplish as a SENSE member..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                      ></textarea>
                    </div>

                    {/* Agreement Checkbox */}
                    <div className="flex items-start gap-2.5 pt-2">
                      <input
                        type="checkbox"
                        id="consent"
                        required
                        disabled={!isHiringOpen}
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5 rounded-none text-sense-blue focus:ring-sense-blue"
                      />
                      <label htmlFor="consent" className="text-xs text-slate-600 leading-snug">
                        I pledge to observe university regulations and actively participate in society bootcamps and team responsibilities.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !isHiringOpen}
                      className="w-full py-3.5 rounded-none bg-sense-accent hover:bg-sense-accentHover text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Processing Application...</span>
                      ) : (
                        <span>Submit SENSE Members Application</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
