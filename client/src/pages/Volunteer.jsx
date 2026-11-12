import React, { useState } from 'react';
import {
  Compass, CheckCircle2, Shield, Users, Award,
  Camera, Laptop, Calendar, ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Volunteer = () => {
  const { submitForm } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    semester: 'Semester 2',
    preferredTeam: 'Operations & Event Logistics',
    experience: '',
    availability: '10-15 hours/week',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    submitForm('VOLUNTEER', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      studentId: formData.studentId,
      semester: formData.semester,
      domainInterest: formData.preferredTeam,
      message: `${formData.message} | Prior Experience: ${formData.experience} | Availability: ${formData.availability}`,
      links: 'Volunteer Application'
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
              Volunteer for SENSE IIUI
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Be the frontline power behind national hackathons, technical conferences, and departmental ceremonies. Gain leadership credentials, certificates, and direct exposure to industry guests.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Volunteer Roles & Benefits */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Choose Where You Want to Contribute
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Volunteering at SENSE is the fastest route to joining the permanent Executive Cabinet and Core Technical Teams.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white rounded-none border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 rounded-none bg-blue-50 text-sense-blue flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Operations & Logistics</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Managing auditorium sound systems, guest reception, team registrations, and scheduling.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-none border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 rounded-none bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Media & Stage Decor</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Event photography, video highlights reel editing, live streaming, and stage branding.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-none border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 rounded-none bg-cyan-50 text-sense-cyan flex items-center justify-center shrink-0">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Tech & Hackathon Proctoring</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Assisting hackathon teams with lab machine configurations, GitHub repos, and test runs.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-none border border-slate-200 shadow-sm flex items-start gap-3">
                  <div className="w-9 h-9 rounded-none bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Recognition of Service</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Official Volunteer Shield and Certificate of Appreciation awarded at the Annual Gala.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Application Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-none border border-slate-200 p-8 sm:p-10 shadow-sm">
                {submitted ? (
                  <div className="text-center py-12 space-y-4 animate-fadeIn">
                    <div className="w-16 h-16 rounded-none bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      Volunteer Application Submitted!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you for offering your energy to SENSE IIUI, <strong className="text-slate-900">{formData.name}</strong>. Our Operations Lead (Ali Haidar) will review your availability and assign you to the volunteer squad for upcoming events.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          studentId: '',
                          semester: 'Semester 2',
                          preferredTeam: 'Operations & Event Logistics',
                          experience: '',
                          availability: '10-15 hours/week',
                          message: ''
                        });
                      }}
                      className="px-6 py-2.5 rounded-none bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition"
                    >
                      Submit Another Volunteer Application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1 border-b border-slate-100 pb-4">
                      <h3 className="text-xl font-bold text-slate-900">
                        Volunteer Recruitment Form
                      </h3>
                      <p className="text-xs text-slate-500">
                        Join the event management and logistics taskforce for SENSE IIUI.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Bilal Ahmed"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                        />
                      </div>

                      {/* Student ID */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Student Reg No (Roll No) *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 642-FBAS/BSSE/F24"
                          value={formData.studentId}
                          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Student Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="bilal.se@iiui.edu.pk"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">WhatsApp Number *</label>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Preferred Team */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Preferred Volunteer Team *</label>
                        <select
                          value={formData.preferredTeam}
                          onChange={(e) => setFormData({ ...formData, preferredTeam: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue cursor-pointer"
                        >
                          <option value="Operations & Event Logistics">Operations & Event Logistics</option>
                          <option value="Media, Photography & Video">Media, Photography & Video</option>
                          <option value="Technical Lab Proctoring">Technical Lab Proctoring</option>
                          <option value="Guest Protocol & Registration">Guest Protocol & Registration</option>
                          <option value="Decor & Stage Management">Decor & Stage Management</option>
                          <option value="Graphics & Digital Marketing">Graphics & Digital Marketing</option>
                        </select>
                      </div>

                      {/* Availability */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Availability *</label>
                        <select
                          value={formData.availability}
                          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue cursor-pointer"
                        >
                          <option value="5-8 hours/week">5-8 hours/week</option>
                          <option value="10-15 hours/week">10-15 hours/week</option>
                          <option value="Full Weekend Event Only">Full Weekend Event Only</option>
                          <option value="Flexible On-Call">Flexible On-Call</option>
                        </select>
                      </div>
                    </div>

                    {/* Past Experience */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Prior Experience (if any)</label>
                      <input
                        type="text"
                        placeholder="e.g. Organized high school science fair, managed stage audio, or DSLR photography"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-none bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                      />
                    </div>

                    {/* Message / Motivation */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Why do you want to volunteer? *</label>
                      <textarea
                        rows="3"
                        required
                        placeholder="Tell us what excites you about volunteering for SENSE IIUI..."
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
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <Compass className="w-4 h-4" />
                          <span>Submit Volunteer Application</span>
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

export default Volunteer;

