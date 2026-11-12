import React, { useState } from 'react';
import {
  X, Calendar, MapPin, CheckCircle2, Ticket, Users, AlertCircle, Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const EventRegistrationModal = ({ event, onClose }) => {
  const { registerForEvent } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    semester: 'Semester 3',
    department: 'Software Engineering',
    teamName: '',
    motivation: ''
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState('');

  if (!event) return null;

  const isExpired = event.registrationDeadline && (() => {
    const d = new Date(event.registrationDeadline.replace(/\s*PKT\s*/i, ''));
    return !isNaN(d.getTime()) && new Date() > d;
  })();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isExpired) {
      setError('Registration for this event has closed.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      // 1. Context registration (immediate LocalStorage & reactive state)
      const res = registerForEvent(event.id, formData);

      // 2. Also attempt server API registration if backend is reachable
      try {
        await fetch(`/api/v1/events/${event.id}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } catch (err) {
        // Backend offline or local mock mode: context handles persistence
      }

      setLoading(false);
      setSuccessData(res.registration);
    } catch (err) {
      setLoading(false);
      setError('Registration failed. Please check your information and try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 shadow-2xl rounded-none overflow-hidden my-8 animate-fadeIn">
        
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-5 flex items-start justify-between border-b border-slate-800">
          <div className="space-y-1.5 pr-6">
            <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              {event.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300 pt-0.5">
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{event.venue}</span>
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="flex items-center gap-1 font-mono text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-sense-cyan shrink-0" />
                <span>Date: <strong>{event.date}</strong></span>
              </span>
              {event.registrationDeadline && (
                <>
                  <span className="text-slate-600 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1 font-mono text-amber-300">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Register till: <strong>{event.registrationDeadline.split(' ')[0]}</strong></span>
                  </span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-none transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {successData ? (
            /* Registration Success Confirmation Screen */
            <div className="text-center py-6 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto rounded-none border border-emerald-300 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-extrabold text-slate-900">
                  Registration Confirmed!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                  Thank you, <strong className="text-slate-900">{successData.name}</strong>. Your seat has been reserved for <strong>{event.title}</strong>.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="bg-slate-50 border border-slate-300 p-4 text-left font-mono text-xs max-w-md mx-auto space-y-2">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-500 uppercase">Registration ID</span>
                  <span className="font-bold text-sense-navy">{successData.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Student Roll No:</span>
                  <span className="font-semibold text-slate-800">{successData.studentId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Student Email:</span>
                  <span className="text-slate-800 truncate max-w-[200px]">{successData.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Department / Term:</span>
                  <span className="text-slate-800">{successData.department} • {successData.semester}</span>
                </div>
                {successData.teamName && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Team Name:</span>
                    <span className="font-bold text-sense-blue">{successData.teamName}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-[10px] text-slate-400">
                  <span>Status: <strong className="text-emerald-700">CONFIRMED</strong></span>
                  <span>Registered: {new Date(successData.registeredAt).toLocaleDateString()}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500">
                Please present this registration ID or your University Card at the event reception desk upon arrival.
              </p>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-sense-navy hover:bg-sense-dark text-white font-bold text-xs uppercase tracking-wider rounded-none transition"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {isExpired && (
                <div className="p-3 bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>The registration deadline for this event has passed. Registrations are now closed.</span>
                </div>
              )}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Mehmood"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs rounded-none focus:outline-none focus:border-sense-blue"
                  />
                </div>

                {/* Roll Number / Student ID */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Student Roll No *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 642-FBAS/BSSE/F24"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs rounded-none focus:outline-none focus:border-sense-blue"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Student Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. asad.se@iiui.edu.pk"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs rounded-none focus:outline-none focus:border-sense-blue"
                  />
                </div>

                {/* WhatsApp Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs rounded-none focus:outline-none focus:border-sense-blue"
                  />
                </div>

                {/* Department */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs rounded-none focus:outline-none focus:border-sense-blue cursor-pointer"
                  >
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="AI & Data Science">AI & Data Science</option>
                    <option value="Other Faculty">Other Faculty / Visitor</option>
                  </select>
                </div>

                {/* Semester */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Current Semester *
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs rounded-none focus:outline-none focus:border-sense-blue cursor-pointer"
                  >
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 4">Semester 4</option>
                    <option value="Semester 5">Semester 5</option>
                    <option value="Semester 6">Semester 6</option>
                    <option value="Semester 7">Semester 7</option>
                    <option value="Semester 8">Semester 8</option>
                    <option value="Graduated / Alumni">Graduated / Alumni</option>
                  </select>
                </div>
              </div>

              {/* Team Name (Optional for Hackathons) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Team Name (Leave blank if participating individually)
                </label>
                <input
                  type="text"
                  placeholder="e.g. AlgoWarriors / ByteCraft"
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs rounded-none focus:outline-none focus:border-sense-blue"
                />
              </div>

              {/* Motivation / Remarks */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Questions or Technical Topics of Interest
                </label>
                <textarea
                  rows="2"
                  placeholder="What are you hoping to learn or build during this event?"
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 text-xs rounded-none focus:outline-none focus:border-sense-blue"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-none transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || isExpired}
                  className={`px-6 py-2.5 font-bold text-xs uppercase tracking-wider rounded-none transition shadow-sm flex items-center gap-1.5 ${
                    isExpired
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-sense-accent hover:bg-sense-accentHover text-slate-950'
                  }`}
                >
                  <Ticket className="w-4 h-4" />
                  <span>{loading ? 'Submitting Registration...' : isExpired ? 'Registration Closed' : 'Confirm Registration'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationModal;

