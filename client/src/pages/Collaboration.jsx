import React, { useState } from 'react';
import {
  HeartHandshake, Building, Mail, Phone, Globe, CheckCircle2,
  Award, Users, ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Collaboration = () => {
  const { submitForm, siteContent } = useApp();
  const contact = siteContent.contact;

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    collaborationType: 'Hackathon Title Sponsorship',
    budgetRange: 'PKR 100k - 300k',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Save submission to context
    submitForm('COLLABORATION', {
      name: `${formData.companyName} (${formData.contactPerson})`,
      email: formData.email,
      phone: formData.phone,
      studentId: 'Corporate Partner',
      semester: formData.companyName,
      domainInterest: formData.collaborationType,
      message: `${formData.message} | Budget/Scope: ${formData.budgetRange}`,
      links: formData.website || 'N/A'
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Partner With SENSE IIUI
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Connect with 500+ passionate software engineering undergraduates. Sponsor hackathons, conduct campus recruitment drives, host technical masterclasses, or mentor student innovators.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Why Partner Overview */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Why Collaborate With SENSE?
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  As the official society of the Department of Software Engineering at International Islamic University Islamabad, we bridge the gap between academic brilliance and industrial recruitment.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-none border border-slate-200 shadow-sm">
                  <div className="w-9 h-9 rounded-none bg-blue-50 text-sense-blue flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Direct Talent Pipeline</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                      Fast-track your internship and graduate hiring by connecting with top programmers trained in modern stacks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-none border border-slate-200 shadow-sm">
                  <div className="w-9 h-9 rounded-none bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Brand Visibility</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                      Promote your brand across campus banners, DevSprint Hackathon merchandise, social media channels, and press releases.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-none border border-slate-200 shadow-sm">
                  <div className="w-9 h-9 rounded-none bg-cyan-50 text-sense-cyan flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Industry Challenges & R&D</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                      Pose real enterprise software engineering problem statements for hackathon teams to prototype in 24 hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact direct card */}
              <div className="bg-slate-900 text-white p-6 rounded-none space-y-3">
                <h4 className="font-bold text-sm text-sense-lightCyan">Direct Partnership Desk</h4>
                <p className="text-xs text-slate-300">
                  Prefer a direct discussion? Our Executive Cabinet is ready to arrange a formal meeting on campus or over Google Meet.
                </p>
                <div className="text-xs text-slate-400 space-y-1 font-mono pt-1">
                  <p>📧 {contact.email}</p>
                  <p>📞 {contact.phone}</p>
                  <p>📍 Sector H-10, Islamabad, Pakistan</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Proposal Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-none border border-slate-200 p-8 sm:p-10 shadow-sm">
                {submitted ? (
                  <div className="text-center py-12 space-y-4 animate-fadeIn">
                    <div className="w-16 h-16 rounded-none bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      Collaboration Proposal Received!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you for your interest in partnering with SENSE IIUI. Our Corporate Liaison & Operations Lead will review your submission and contact you within 24–48 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          companyName: '',
                          contactPerson: '',
                          email: '',
                          phone: '',
                          website: '',
                          collaborationType: 'Hackathon Title Sponsorship',
                          budgetRange: 'PKR 100k - 300k',
                          message: ''
                        });
                      }}
                      className="px-6 py-2.5 rounded-none bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition"
                    >
                      Submit Another Proposal
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1 border-b border-slate-100 pb-4">
                      <h3 className="text-xl font-bold text-slate-900">
                        Collaboration Proposal Form
                      </h3>
                      <p className="text-xs text-slate-500">
                        Please provide your organization's details and proposal scope.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Organization Name */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Company / Organization Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. TechLogix Systems"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                        />
                      </div>

                      {/* Contact Person */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Representative Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Asad Mehmood (Head of HR)"
                          value={formData.contactPerson}
                          onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                        />
                      </div>

                      {/* Official Email */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Official Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="partnerships@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+92 300 0000000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                        />
                      </div>
                    </div>

                    {/* Collaboration Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Collaboration Type *</label>
                        <select
                          value={formData.collaborationType}
                          onChange={(e) => setFormData({ ...formData, collaborationType: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue cursor-pointer"
                        >
                          <option value="Hackathon Title Sponsorship">Hackathon Title Sponsorship (DevSprint)</option>
                          <option value="Technical Workshop / Speaker Session">Technical Workshop / Speaker Session</option>
                          <option value="Campus Recruitment / Internship Drive">Campus Recruitment / Internship Drive</option>
                          <option value="Society Mentorship & R&D Projects">Society Mentorship & R&D Projects</option>
                          <option value="Inter-Society Co-Hosting">Inter-Society Co-Hosting</option>
                          <option value="Other Partnership">Other Partnership</option>
                        </select>
                      </div>

                      {/* Website */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Website or LinkedIn URL</label>
                        <input
                          type="url"
                          placeholder="https://company.com"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                        />
                      </div>
                    </div>

                    {/* Message / Scope */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Proposal Details & Objectives *</label>
                      <textarea
                        rows="4"
                        required
                        placeholder="Tell us about the scope of collaboration, desired deliverables, target dates, or specific tracks you would like to support..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-none bg-sense-blue hover:bg-sense-navy text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Submitting Proposal...</span>
                      ) : (
                        <>
                          <HeartHandshake className="w-4 h-4" />
                          <span>Submit Official Collaboration Proposal</span>
                        </>
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

export default Collaboration;

