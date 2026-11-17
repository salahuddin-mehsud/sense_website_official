import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Users, Image, FileText,
  Mail, Settings, LogOut, Plus, Edit2, Trash2, CheckCircle2,
  AlertCircle, ExternalLink, Shield, Layers, FolderGit2,
  Eye, RefreshCw, X, Menu, GraduationCap, ClipboardList,
  UserPlus, Check, ChevronRight, Lock, Unlock, Phone,
  Linkedin, Instagram, Globe, Award, Sparkles, Filter,
  Download, ArrowLeft, Ticket
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Dashboard = () => {
  const {
    currentUser,
    logout,
    sessions,
    cohorts,
    selectedSessionId,
    setSelectedSessionId,
    currentSession,
    currentCohort,
    addSession,
    setAsCurrentSession,
    toggleArchiveSession,
    deleteSession,
    toggleCohortHiring,
    updateCohort,

    cabinet,
    teams,
    teamCategories,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addTeamCategory,
    deleteTeamCategory,
    promoteApplicantToTeam,

    events,
    addEvent,
    updateEvent,
    deleteEvent,

    eventRegistrations,
    updateEventRegistrationStatus,
    deleteEventRegistration,

    gallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,

    siteContent,
    updateSiteContent,

    submissions,
    applications,
    updateApplicationStatus,
    deleteApplication,

    resetToFactoryDefaults
  } = useApp();

  const navigate = useNavigate();

  // If not logged in, redirect to login page
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  // Active Sidebar Tab State
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Event Participants view state
  const [viewingEventParticipants, setViewingEventParticipants] = useState(null);
  const [participantStatusFilter, setParticipantStatusFilter] = useState('ALL');
  const [participantSearchQuery, setParticipantSearchQuery] = useState('');

  // Status message notification banner
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // -------------------------------------------------------------
  // UNIFIED ROSTER (Cabinet + Technical Teams)
  // -------------------------------------------------------------
  const allMembers = useMemo(() => {
    const cabinetWithCategory = cabinet.map(c => ({
      ...c,
      teamCategory: c.teamCategory || 'Executive Council'
    }));
    return [...cabinetWithCategory, ...teams];
  }, [cabinet, teams]);

  // Active Cohort's members
  const cohortMembers = useMemo(() => {
    return allMembers.filter(m => m.sessionId === selectedSessionId);
  }, [allMembers, selectedSessionId]);

  // -------------------------------------------------------------
  // MODAL STATES
  // -------------------------------------------------------------

  // 1. Event Modal State
  const [editingEvent, setEditingEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    category: 'Hackathon',
    status: 'UPCOMING',
    date: '',
    time: '',
    venue: '',
    summary: '',
    description: '',
    registerUrl: '',
    driveUrl: '',
    bannerImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    tags: 'Hackathon, Tech',
    registrationDeadline: ''
  });

  // 2. Team Member Modal State
  const [editingMember, setEditingMember] = useState(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [memberFormData, setMemberFormData] = useState({
    name: '',
    position: '',
    teamCategory: 'Web Development',
    headline: '',
    bio: '',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    linkedIn: '',
    email: '',
    skills: 'React, Node.js'
  });

  // 3. New Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryData, setNewCategoryData] = useState({
    label: '',
    description: ''
  });

  // 4. Cohort Modal State
  const [isCohortModalOpen, setIsCohortModalOpen] = useState(false);
  const [editingCohort, setEditingCohort] = useState(null);
  const [cohortFormData, setCohortFormData] = useState({
    name: '',
    startYear: 2026,
    endYear: 2027,
    isHiringOpen: true,
    teamsInput: 'Executive Council, Web Development, AI & Research, Operations, Media & Decor',
    requireLinkedIn: true,
    requireInstagram: true,
    requirePortfolio: false,
    customQuestion: 'What technical project or initiative are you most proud of?',
    theme: '',
    description: ''
  });

  // 5. Gallery Modal State
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryFormData, setGalleryFormData] = useState({
    title: '',
    category: 'Workshops',
    caption: '',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    driveFolderUrl: ''
  });

  // 6. Application Details View Modal
  const [viewingApplication, setViewingApplication] = useState(null);

  // 7. Teams Tab Filter
  const [teamCategoryFilter, setTeamCategoryFilter] = useState('ALL');

  // 8. Applications Tab Pipeline Filter
  const [applicationStatusFilter, setApplicationStatusFilter] = useState('ALL');

  // 9. Site Content Form Edit State
  const [contentEditState, setContentEditState] = useState({
    overview: siteContent.about.overview,
    motto: siteContent.about.motto,
    missionSummary: siteContent.mission.summary,
    visionSummary: siteContent.vision.summary,
    email: siteContent.contact.email,
    phone: siteContent.contact.phone
  });
  const [contentSavedMsg, setContentSavedMsg] = useState(false);

  // -------------------------------------------------------------
  // HANDLERS
  // -------------------------------------------------------------

  // Save Event
  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (editingEvent) {
      updateEvent(editingEvent.id, {
        ...eventFormData,
        sessionId: selectedSessionId
      });
      showToast(`Event "${eventFormData.title}" updated successfully!`);
    } else {
      addEvent({
        ...eventFormData,
        sessionId: selectedSessionId
      });
      showToast(`Event "${eventFormData.title}" created successfully!`);
    }
    setIsEventModalOpen(false);
  };

  // Save Team Member
  const handleSaveMember = (e) => {
    e.preventDefault();
    if (editingMember) {
      updateTeamMember(editingMember.id, {
        ...memberFormData,
        sessionId: selectedSessionId
      });
      showToast(`Member "${memberFormData.name}" updated!`);
    } else {
      addTeamMember({
        ...memberFormData,
        sessionId: selectedSessionId
      });
      showToast(`Member "${memberFormData.name}" added to ${memberFormData.teamCategory}!`);
    }
    setIsMemberModalOpen(false);
  };

  // Save New Team Category
  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!newCategoryData.label.trim()) return;
    addTeamCategory({
      label: newCategoryData.label.trim(),
      key: newCategoryData.label.trim(),
      description: newCategoryData.description.trim()
    });
    showToast(`Team category "${newCategoryData.label}" created! You can now add members to it.`);
    setNewCategoryData({ label: '', description: '' });
    setIsCategoryModalOpen(false);
  };

  // Save Cohort Session
  const handleSaveCohort = (e) => {
    e.preventDefault();
    if (!cohortFormData.name.trim()) return;

    const teamsList = cohortFormData.teamsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const cohortData = {
      name: cohortFormData.name.trim(),
      startYear: parseInt(cohortFormData.startYear, 10) || 2026,
      endYear: parseInt(cohortFormData.endYear, 10) || 2027,
      isHiringOpen: cohortFormData.isHiringOpen,
      teamsList,
      hiringFormConfig: {
        requireLinkedIn: cohortFormData.requireLinkedIn,
        requireInstagram: cohortFormData.requireInstagram,
        requirePortfolio: cohortFormData.requirePortfolio,
        customQuestion: cohortFormData.customQuestion
      },
      theme: cohortFormData.theme,
      description: cohortFormData.description
    };

    if (editingCohort) {
      updateCohort(editingCohort.id, cohortData);
      showToast(`Cohort "${cohortFormData.name}" updated!`);
    } else {
      addSession({
        ...cohortData,
        isCurrent: true
      });
      showToast(`New Cohort "${cohortFormData.name}" created and set active!`);
    }

    setIsCohortModalOpen(false);
  };

  // Save Gallery Item
  const handleSaveGallery = (e) => {
    e.preventDefault();
    addGalleryItem({
      ...galleryFormData,
      sessionId: selectedSessionId
    });
    showToast(`Photo "${galleryFormData.title}" added to gallery!`);
    setIsGalleryModalOpen(false);
  };

  // Save Content
  const handleSaveContent = (e) => {
    e.preventDefault();
    updateSiteContent('about', {
      overview: contentEditState.overview,
      motto: contentEditState.motto
    });
    updateSiteContent('mission', {
      summary: contentEditState.missionSummary
    });
    updateSiteContent('vision', {
      summary: contentEditState.visionSummary
    });
    updateSiteContent('contact', {
      email: contentEditState.email,
      phone: contentEditState.phone
    });
    setContentSavedMsg(true);
    showToast("Site master content saved successfully!");
    setTimeout(() => setContentSavedMsg(false), 4000);
  };

  // Promote Applicant directly to Team
  const handlePromoteApplicant = (applicant) => {
    const res = promoteApplicantToTeam(applicant.id);
    if (res.success) {
      showToast(`Applicant ${applicant.name} has been enrolled into the ${applicant.domainInterest || 'Operations'} Team!`);
      if (viewingApplication && viewingApplication.id === applicant.id) {
        setViewingApplication(null);
      }
    } else {
      alert(res.message || "Could not enroll applicant");
    }
  };

  // Filtered Applications for pipeline
  const filteredApplications = useMemo(() => {
    return (applications || submissions || []).filter(app => {
      if (applicationStatusFilter === 'ALL') return true;
      return app.status === applicationStatusFilter;
    });
  }, [applications, submissions, applicationStatusFilter]);

  // Counts by status
  const appCounts = useMemo(() => {
    const list = applications || submissions || [];
    return {
      all: list.length,
      pending: list.filter(a => a.status === 'PENDING').length,
      under_review: list.filter(a => a.status === 'UNDER_REVIEW').length,
      interviewed: list.filter(a => a.status === 'INTERVIEWED').length,
      in_progress: list.filter(a => a.status === 'IN_PROGRESS').length,
      accepted: list.filter(a => a.status === 'ACCEPTED').length,
      rejected: list.filter(a => a.status === 'REJECTED').length,
    };
  }, [applications, submissions]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row font-sans">
      
      {/* ------------------------------------------------------------- */}
      {/* MOBILE TOP BAR WITH HAMBURGER (Visible on small screens) */}
      {/* ------------------------------------------------------------- */}
      <div className="lg:hidden bg-white text-slate-900 p-4 flex items-center justify-between border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <img src="/sense-logo.jpg" alt="Logo" className="w-8 h-8 rounded-full border border-slate-200 shrink-0" style={{ width: '32px', height: '32px' }} />
          <div>
            <span className="font-extrabold text-sm tracking-wide block text-slate-950">SENSE Portal</span>
            <span className="text-[10px] text-sense-blue font-bold">Admin</span>
          </div>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 bg-slate-100 rounded-none border border-slate-300 text-slate-700 hover:bg-slate-200 transition"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SIDEBAR NAVIGATION (Desktop Fixed / Mobile Drawer) */}
      {/* ------------------------------------------------------------- */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white text-slate-700 border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-sm transition-transform duration-200 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Logo & Portal Branding */}
          <div className="flex items-center space-x-3 pb-5 border-b border-slate-200">
            <img
              src="/sense-logo.jpg"
              alt="SENSE Logo"
              className="w-10 h-10 object-contain rounded-full border border-slate-200 shadow-sm shrink-0"
              style={{ width: '40px', height: '40px' }}
            />
            <div>
              <h2 className="font-extrabold text-sm text-slate-950 tracking-wide uppercase">
                SENSE Portal
              </h2>
              <span className="text-[11px] text-sense-blue font-bold tracking-wide">
                Admin
              </span>
            </div>
          </div>

          {/* Primary Navigation Links */}
          <nav className="space-y-1 pt-1">
            <button
              onClick={() => { setActiveTab('overview'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center px-3.5 py-2.5 rounded-none text-xs font-bold transition uppercase tracking-wider text-left ${
                activeTab === 'overview'
                  ? 'bg-sense-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('cohorts'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center px-3.5 py-2.5 rounded-none text-xs font-bold transition uppercase tracking-wider text-left ${
                activeTab === 'cohorts'
                  ? 'bg-sense-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4" />
                <span>Cohort Sessions</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('teams'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center px-3.5 py-2.5 rounded-none text-xs font-bold transition uppercase tracking-wider text-left ${
                activeTab === 'teams'
                  ? 'bg-sense-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>TEAMS</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('applications'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center px-3.5 py-2.5 rounded-none text-xs font-bold transition uppercase tracking-wider text-left ${
                activeTab === 'applications'
                  ? 'bg-sense-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ClipboardList className="w-4 h-4" />
                <span>Applications</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('events'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center px-3.5 py-2.5 rounded-none text-xs font-bold transition uppercase tracking-wider text-left ${
                activeTab === 'events'
                  ? 'bg-sense-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('gallery'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center px-3.5 py-2.5 rounded-none text-xs font-bold transition uppercase tracking-wider text-left ${
                activeTab === 'gallery'
                  ? 'bg-sense-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Image className="w-4 h-4" />
                <span>Photo Gallery</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('content'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center px-3.5 py-2.5 rounded-none text-xs font-bold transition uppercase tracking-wider text-left ${
                activeTab === 'content'
                  ? 'bg-sense-navy text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>Site Content</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-slate-200 space-y-2 bg-slate-50">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-950 text-xs font-semibold rounded-none border border-slate-300 transition shadow-xs"
          >
            <Eye className="w-3.5 h-3.5 text-sense-blue" />
            <span>View Live Website</span>
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 text-xs font-semibold rounded-none border border-red-200 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 lg:hidden"
        ></div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTENT AREA */}
      {/* ------------------------------------------------------------- */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        
        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="mb-6 p-4 bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center justify-between animate-fadeIn shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-emerald-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ============================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight">
                  Portal Overview
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time status for <strong>{currentSession?.name}</strong> • Software Engineering Society for Excellence
                </p>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="bg-white p-5 border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Members</span>
                <p className="text-3xl font-extrabold text-slate-900">{cohortMembers.length}</p>
                <span className="text-xs text-sense-blue font-medium">{teamCategories.length} Active Categories</span>
              </div>

              <div className="bg-white p-5 border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applications</span>
                <p className="text-3xl font-extrabold text-slate-900">{appCounts.all}</p>
                <span className="text-xs text-amber-700 font-medium">{appCounts.pending} Pending Review</span>
              </div>

              <div className="bg-white p-5 border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Events</span>
                <p className="text-3xl font-extrabold text-slate-900">
                  {events.filter(e => e.sessionId === selectedSessionId).length}
                </p>
                <span className="text-xs text-emerald-700 font-medium">
                  {events.filter(e => e.sessionId === selectedSessionId && e.status === 'UPCOMING').length} Upcoming
                </span>
              </div>

              <div className="bg-white p-5 border border-slate-200 shadow-sm space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Photo Gallery</span>
                <p className="text-3xl font-extrabold text-slate-900">
                  {gallery.filter(g => g.sessionId === selectedSessionId).length}
                </p>
                <span className="text-xs text-slate-500 font-medium">Archived Media Items</span>
              </div>
            </div>

            {/* Quick Actions Strip */}
            <div className="bg-white p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Quick Administrative Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  onClick={() => {
                    setEditingMember(null);
                    setMemberFormData({
                      name: '',
                      position: '',
                      teamCategory: teamCategories[0]?.label || 'Web Development',
                      headline: '',
                      bio: '',
                      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
                      linkedIn: '',
                      email: '',
                      skills: 'React, Node.js'
                    });
                    setIsMemberModalOpen(true);
                  }}
                  className="p-3 bg-sense-navy hover:bg-sense-dark text-white text-xs font-bold flex items-center justify-between transition"
                >
                  <span>Add Team Member</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setNewCategoryData({ label: '', description: '' });
                    setIsCategoryModalOpen(true);
                  }}
                  className="p-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-between transition"
                >
                  <span>Add Team Category</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setEditingEvent(null);
                    setEventFormData({
                      title: '',
                      category: 'Hackathon',
                      status: 'UPCOMING',
                      date: '',
                      time: '',
                      venue: '',
                      summary: '',
                      description: '',
                      registerUrl: '',
                      driveUrl: '',
                      bannerImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
                      tags: 'Hackathon, Tech',
                      registrationDeadline: ''
                    });
                    setIsEventModalOpen(true);
                  }}
                  className="p-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-between transition"
                >
                  <span>Create Event</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    toggleCohortHiring(selectedSessionId);
                    showToast(`Hiring status toggled for ${currentSession?.name}!`);
                  }}
                  className={`p-3 text-xs font-bold flex items-center justify-between transition text-white ${
                    currentSession?.isHiringOpen !== false
                      ? 'bg-amber-700 hover:bg-amber-800'
                      : 'bg-emerald-700 hover:bg-emerald-800'
                  }`}
                >
                  <span>{currentSession?.isHiringOpen !== false ? 'Lock / Close Hiring' : 'Open Hiring for Cohort'}</span>
                  {currentSession?.isHiringOpen !== false ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Recent Pending Applications Preview */}
            <div className="bg-white border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Latest Student Applications
                  </h3>
                  <p className="text-xs text-slate-500">Students applying for society wings and teams</p>
                </div>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="text-xs font-bold text-sense-blue hover:underline"
                >
                  View All Applications ({appCounts.all}) →
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {(applications || []).slice(0, 4).map(app => (
                  <div key={app.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{app.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-sense-blue border border-blue-200 uppercase">
                          {app.domainInterest} Team
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 uppercase ${
                          app.status === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{app.email} • {app.studentId || 'N/A'} • {app.semester}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {app.status === 'ACCEPTED' && (
                        <button
                          onClick={() => handlePromoteApplicant(app)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Add to Team</span>
                        </button>
                      )}
                      <button
                        onClick={() => setViewingApplication(app)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                      >
                        Inspect Application
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 2: COHORT SESSION SYSTEM */}
        {/* ============================================================= */}
        {activeTab === 'cohorts' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight">
                  COHORT SESSION SYSTEM
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage academic tenures, multiple cohort teams, recruitment forms, and hiring status
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingCohort(null);
                  setCohortFormData({
                    name: 'Cohort 2026–2027',
                    startYear: 2026,
                    endYear: 2027,
                    isHiringOpen: true,
                    teamsInput: 'Executive Council, Web Development, AI & Research, Operations, Media & Decor',
                    requireLinkedIn: true,
                    requireInstagram: true,
                    requirePortfolio: false,
                    customQuestion: 'What technical project or initiative are you most proud of?',
                    theme: 'Scaling Frontiers & Real-World Impact',
                    description: 'Current tenure focusing on Agentic AI, full-stack systems, industry hackathons, and research publications.'
                  });
                  setIsCohortModalOpen(true);
                }}
                className="px-4 py-2.5 bg-sense-blue hover:bg-sense-navy text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Cohort</span>
              </button>
            </div>

            {/* Cohorts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sessions.map(cohort => {
                const isSelected = cohort.id === selectedSessionId;
                const isHiringOpen = cohort.isHiringOpen !== false;
                const teamsList = cohort.teamsList && cohort.teamsList.length > 0
                  ? cohort.teamsList
                  : ['Executive Council', 'Web Development', 'AI & Research', 'Operations', 'Media & Decor'];

                return (
                  <div
                    key={cohort.id}
                    className={`bg-white p-6 border transition shadow-sm space-y-6 ${
                      isSelected ? 'border-sense-blue ring-2 ring-sense-blue/20' : 'border-slate-200'
                    }`}
                  >
                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-lg text-slate-900">{cohort.name}</h3>
                          {cohort.isCurrent && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-sense-navy text-white uppercase">
                              Active Current
                            </span>
                          )}
                          {cohort.isArchived && (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-700 uppercase">
                              Archived
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          Tenure Years: {cohort.startYear} – {cohort.endYear}
                        </p>
                      </div>

                      {/* Select / Switch */}
                      {!isSelected ? (
                        <button
                          onClick={() => setSelectedSessionId(cohort.id)}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                        >
                          Select Cohort
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-sense-blue flex items-center gap-1">
                          <Check className="w-4 h-4" /> Selected
                        </span>
                      )}
                    </div>

                    {/* Hiring Status Switch Bar */}
                    <div className="p-4 bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                          Recruitment & Hiring Status
                        </span>
                        <p className="text-xs text-slate-500">
                          {isHiringOpen
                            ? 'Public joining form is ACTIVE. Students can submit applications.'
                            : 'Public joining form is BLURRED & LOCKED ("Joining Closed").'}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          toggleCohortHiring(cohort.id);
                          showToast(`Hiring status updated for ${cohort.name}!`);
                        }}
                        className={`px-3 py-1.5 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition text-white ${
                          isHiringOpen
                            ? 'bg-emerald-600 hover:bg-emerald-700'
                            : 'bg-red-700 hover:bg-red-800'
                        }`}
                      >
                        {isHiringOpen ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                        <span>{isHiringOpen ? 'Hiring is OPEN' : 'Hiring is CLOSED'}</span>
                      </button>
                    </div>

                    {/* Multiple Teams Configured for this Cohort */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                        Teams Configured for this Cohort:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {teamsList.map(t => (
                          <span
                            key={t}
                            className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Custom Hiring Form Configuration */}
                    <div className="space-y-2 text-xs text-slate-600 bg-slate-50/70 p-3 border border-slate-200">
                      <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
                        Custom Hiring Form Settings:
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <span>✓ LinkedIn Profile: <strong>Required</strong></span>
                        <span>✓ Instagram Handle: <strong>Enabled</strong></span>
                        <span>✓ Target Team: <strong>Radio Choice</strong></span>
                        <span>✓ Custom Question: <strong>Configured</strong></span>
                      </div>
                      {cohort.hiringFormConfig?.customQuestion && (
                        <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200">
                          "{cohort.hiringFormConfig.customQuestion}"
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cohort.description || 'Tenure and records for SENSE IIUI.'}
                    </p>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {!cohort.isCurrent && (
                          <button
                            onClick={() => setAsCurrentSession(cohort.id)}
                            className="text-xs text-sense-blue hover:underline font-bold"
                          >
                            Make Current Tenure
                          </button>
                        )}
                        <button
                          onClick={() => toggleArchiveSession(cohort.id)}
                          className="text-xs text-slate-500 hover:text-slate-800"
                        >
                          {cohort.isArchived ? 'Unarchive' : 'Archive'}
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingCohort(cohort);
                            setCohortFormData({
                              name: cohort.name,
                              startYear: cohort.startYear,
                              endYear: cohort.endYear,
                              isHiringOpen: cohort.isHiringOpen !== false,
                              teamsInput: teamsList.join(', '),
                              requireLinkedIn: cohort.hiringFormConfig?.requireLinkedIn !== false,
                              requireInstagram: cohort.hiringFormConfig?.requireInstagram !== false,
                              requirePortfolio: cohort.hiringFormConfig?.requirePortfolio || false,
                              customQuestion: cohort.hiringFormConfig?.customQuestion || '',
                              theme: cohort.theme || '',
                              description: cohort.description || ''
                            });
                            setIsCohortModalOpen(true);
                          }}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                          title="Edit Cohort"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${cohort.name}?`)) deleteSession(cohort.id);
                          }}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold"
                          title="Delete Cohort"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 3: TEAMS (Unified Teams Management) */}
        {/* ============================================================= */}
        {activeTab === 'teams' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight">
                  TEAMS MANAGEMENT
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Create custom categories and manage rosters across all society divisions for <strong>{currentSession?.name}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setNewCategoryData({ label: '', description: '' });
                    setIsCategoryModalOpen(true);
                  }}
                  className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Category</span>
                </button>

                <button
                  onClick={() => {
                    setEditingMember(null);
                    setMemberFormData({
                      name: '',
                      position: '',
                      teamCategory: teamCategories[0]?.label || 'Web Development',
                      headline: '',
                      bio: '',
                      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
                      linkedIn: '',
                      email: '',
                      skills: 'React, Node.js'
                    });
                    setIsMemberModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-sense-blue hover:bg-sense-navy text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Team Member</span>
                </button>
              </div>
            </div>

            {/* Team Categories Manager Bar */}
            <div className="bg-white p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Active Team Categories ({teamCategories.length})
                </span>
                <span className="text-xs text-slate-400">Admin can create custom divisions at any time</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {teamCategories.map(cat => (
                  <div
                    key={cat.id || cat.key}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
                  >
                    <span>{cat.label}</span>
                    {/* Allow deleting custom category if not core */}
                    {cat.id?.startsWith('cat-') && cat.key !== 'Executive Council' && (
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete category "${cat.label}"?`)) deleteTeamCategory(cat.key);
                        }}
                        className="text-slate-400 hover:text-red-600"
                        title="Delete Category"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setTeamCategoryFilter('ALL')}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                  teamCategoryFilter === 'ALL'
                    ? 'bg-sense-navy text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                All Teams ({cohortMembers.length})
              </button>
              {teamCategories.map(cat => {
                const count = cohortMembers.filter(m => {
                  const mCat = (m.teamCategory || '').toLowerCase();
                  const cKey = cat.label.toLowerCase();
                  return mCat.includes(cKey) || cKey.includes(mCat);
                }).length;

                return (
                  <button
                    key={cat.key || cat.label}
                    onClick={() => setTeamCategoryFilter(cat.label)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                      teamCategoryFilter === cat.label
                        ? 'bg-sense-navy text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label} ({count})
                  </button>
                );
              })}
            </div>

            {/* Member Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cohortMembers
                .filter(m => {
                  if (teamCategoryFilter === 'ALL') return true;
                  const mCat = (m.teamCategory || '').toLowerCase();
                  const fCat = teamCategoryFilter.toLowerCase();
                  return mCat.includes(fCat) || fCat.includes(mCat);
                })
                .map(member => (
                  <div
                    key={member.id}
                    className="bg-white border border-slate-200 shadow-sm p-5 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={member.photoUrl}
                          alt={member.name}
                          className="w-16 h-16 object-cover border border-slate-200 shrink-0"
                        />
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-base text-slate-900">{member.name}</h4>
                          <p className="text-xs font-semibold text-sense-blue">{member.position}</p>
                          <span className="inline-block text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 uppercase">
                            {member.teamCategory}
                          </span>
                        </div>
                      </div>

                      {member.headline && (
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {member.headline}
                        </p>
                      )}

                      {member.skills && member.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {member.skills.slice(0, 4).map((s, idx) => (
                            <span key={idx} className="text-[10px] bg-slate-50 border border-slate-200 px-1.5 py-0.2 font-mono text-slate-600">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      {member.linkedIn ? (
                        <a
                          href={member.linkedIn}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-sense-blue font-bold flex items-center gap-1 hover:underline"
                        >
                          <Linkedin className="w-3.5 h-3.5" /> Profile
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">No profile link</span>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingMember(member);
                            setMemberFormData({
                              name: member.name,
                              position: member.position,
                              teamCategory: member.teamCategory || 'Web Development',
                              headline: member.headline || '',
                              bio: member.bio || '',
                              photoUrl: member.photoUrl,
                              linkedIn: member.linkedIn || '',
                              email: member.email || '',
                              skills: Array.isArray(member.skills) ? member.skills.join(', ') : member.skills || ''
                            });
                            setIsMemberModalOpen(true);
                          }}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700"
                          title="Edit Member"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${member.name}?`)) deleteTeamMember(member.id);
                          }}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600"
                          title="Delete Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 4: APPLICATIONS PIPELINE (Renamed from Submissions) */}
        {/* ============================================================= */}
        {activeTab === 'applications' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight">
                  APPLICATIONS PIPELINE
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review applicant credentials, manage interview progress, and enroll accepted candidates directly into society teams
                </p>
              </div>

              {/* Quick Status Count Summary */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                  {appCounts.pending} Pending
                </span>
                <span className="px-2.5 py-1 bg-purple-50 text-purple-800 border border-purple-200 font-bold">
                  {appCounts.interviewed} Interviewed
                </span>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                  {appCounts.accepted} Accepted
                </span>
              </div>
            </div>

            {/* Pipeline Stage Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { key: 'ALL', label: 'All Applications', count: appCounts.all },
                { key: 'PENDING', label: 'Pending', count: appCounts.pending },
                { key: 'UNDER_REVIEW', label: 'Under Review', count: appCounts.under_review },
                { key: 'INTERVIEWED', label: 'Interviewed', count: appCounts.interviewed },
                { key: 'IN_PROGRESS', label: 'In Progress', count: appCounts.in_progress },
                { key: 'ACCEPTED', label: 'Accepted', count: appCounts.accepted },
                { key: 'REJECTED', label: 'Rejected', count: appCounts.rejected }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setApplicationStatusFilter(tab.key)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                    applicationStatusFilter === tab.key
                      ? 'bg-sense-navy text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Applications List */}
            {filteredApplications.length === 0 ? (
              <div className="bg-white p-12 text-center border border-slate-200 space-y-2">
                <p className="text-sm font-bold text-slate-700">No applications in this pipeline stage</p>
                <p className="text-xs text-slate-400">Select "All Applications" or check back as students apply</p>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 shadow-sm divide-y divide-slate-200">
                {filteredApplications.map(app => {
                  const isAccepted = app.status === 'ACCEPTED';

                  return (
                    <div
                      key={app.id}
                      className="p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:bg-slate-50/50 transition"
                    >
                      {/* Left: Applicant Information */}
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-extrabold text-base text-slate-900">{app.name}</h3>
                          
                          {/* Target Team Badge */}
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-sense-paleCyan text-sense-navy border border-sense-cyan/30 uppercase">
                            Target: {app.domainInterest} Team
                          </span>

                          {/* Specific Post */}
                          {app.preferredRole && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200">
                              Post: {app.preferredRole}
                            </span>
                          )}

                          {/* Submission Date */}
                          <span className="text-xs text-slate-400 font-mono">
                            {new Date(app.submittedAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Contact details */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                          <span><strong>Email:</strong> {app.email}</span>
                          <span><strong>WhatsApp:</strong> {app.phone}</span>
                          {app.studentId && <span><strong>Reg No:</strong> {app.studentId}</span>}
                          {app.semester && <span><strong>Semester:</strong> {app.semester}</span>}
                        </div>

                        {/* Social profiles */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 pt-0.5">
                          {app.linkedin && (
                            <a href={app.linkedin} target="_blank" rel="noreferrer" className="text-sense-blue hover:underline flex items-center gap-1 font-semibold">
                              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                            </a>
                          )}
                          {app.instagram && (
                            <span className="flex items-center gap-1 text-pink-600 font-semibold">
                              <Instagram className="w-3.5 h-3.5" /> {app.instagram}
                            </span>
                          )}
                          {app.links && app.links !== 'N/A' && !app.links.includes('linkedin') && (
                            <a href={app.links} target="_blank" rel="noreferrer" className="text-slate-700 hover:underline flex items-center gap-1 font-semibold">
                              <ExternalLink className="w-3.5 h-3.5" /> Portfolio / GitHub
                            </a>
                          )}
                        </div>

                        {/* Statement / Reason */}
                        <p className="text-xs text-slate-600 line-clamp-2 italic pt-1">
                          "{app.message}"
                        </p>

                        {/* Notes if enrolled */}
                        {app.notes && (
                          <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-200 inline-block">
                            ✓ {app.notes}
                          </div>
                        )}
                      </div>

                      {/* Right: Pipeline Status Selector & Direct "Add to Team" Action */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                        {/* Status Dropdown */}
                        <div className="flex flex-col space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Status
                          </label>
                          <select
                            value={app.status}
                            onChange={(e) => {
                              updateApplicationStatus(app.id, e.target.value);
                              showToast(`Status updated to ${e.target.value} for ${app.name}`);
                            }}
                            className={`text-xs font-bold px-3 py-1.5 border focus:outline-none cursor-pointer ${
                              app.status === 'ACCEPTED' ? 'bg-emerald-50 border-emerald-400 text-emerald-800' :
                              app.status === 'PENDING' ? 'bg-amber-50 border-amber-400 text-amber-800' :
                              app.status === 'INTERVIEWED' ? 'bg-purple-50 border-purple-400 text-purple-800' :
                              app.status === 'UNDER_REVIEW' ? 'bg-blue-50 border-blue-400 text-blue-800' :
                              app.status === 'REJECTED' ? 'bg-red-50 border-red-400 text-red-800' :
                              'bg-slate-100 border-slate-300 text-slate-700'
                            }`}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="UNDER_REVIEW">Under Review</option>
                            <option value="INTERVIEWED">Interviewed</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="ACCEPTED">Accepted</option>
                            <option value="REJECTED">Rejected</option>
                          </select>
                        </div>

                        {/* 1-CLICK ADD TO TEAM BUTTON (Visible on Accepted or when admin wants to enroll) */}
                        <div className="flex flex-col space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Action
                          </label>
                          {isAccepted ? (
                            <button
                              onClick={() => handlePromoteApplicant(app)}
                              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm"
                            >
                              <UserPlus className="w-3.5 h-3.5" />
                              <span>Add to Team</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                updateApplicationStatus(app.id, 'ACCEPTED');
                                handlePromoteApplicant({ ...app, status: 'ACCEPTED' });
                              }}
                              className="px-3 py-1.5 bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition"
                              title="Accept & Add to Team Roster"
                            >
                              <UserPlus className="w-3.5 h-3.5" />
                              <span>Accept & Add</span>
                            </button>
                          )}
                        </div>

                        {/* Details View and Delete */}
                        <div className="flex items-center gap-1.5 self-end sm:self-auto pt-4 sm:pt-0">
                          <button
                            onClick={() => setViewingApplication(app)}
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700"
                            title="View Full Application"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete application from ${app.name}?`)) deleteApplication(app.id);
                            }}
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600"
                            title="Delete Application"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 5: EVENTS MANAGER */}
        {/* ============================================================= */}
        {activeTab === 'events' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight">
                  EVENTS & HACKATHONS MANAGER
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage Upcoming & Completed events for <strong>{currentSession?.name}</strong>
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingEvent(null);
                  setEventFormData({
                    title: '',
                    category: 'Hackathon',
                    status: 'UPCOMING',
                    date: '',
                    time: '',
                    venue: '',
                    summary: '',
                    description: '',
                    registerUrl: '',
                    driveUrl: '',
                    bannerImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
                    tags: 'Hackathon, Tech',
                    registrationDeadline: ''
                  });
                  setIsEventModalOpen(true);
                }}
                className="px-4 py-2.5 bg-sense-blue hover:bg-sense-navy text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Event</span>
              </button>
            </div>

            {/* EVENT PARTICIPANTS SCREEN (When an event is selected for viewing) */}
            {viewingEventParticipants ? (
              <div className="space-y-6 animate-fadeIn">
                {/* Header with Back Button & Export */}
                <div className="bg-white p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <button
                        onClick={() => setViewingEventParticipants(null)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-sense-blue hover:text-sense-navy transition mb-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>← Back to All Events</span>
                      </button>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 uppercase">
                          {viewingEventParticipants.title}
                        </h2>
                        <span className={`text-[10px] font-bold px-2 py-0.5 uppercase ${
                          viewingEventParticipants.status === 'UPCOMING' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-slate-900 text-white'
                        }`}>
                          {viewingEventParticipants.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-mono">
                        📅 {viewingEventParticipants.date} {viewingEventParticipants.time && `• ⏰ ${viewingEventParticipants.time}`} • 📍 {viewingEventParticipants.venue}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const eventRegs = eventRegistrations.filter(r => r.eventId === viewingEventParticipants.id);
                        if (eventRegs.length === 0) {
                          alert("No participants registered yet to export.");
                          return;
                        }
                        const headers = "Name,Student ID,Email,Phone,Semester,Department,Team Name,Status,Registered At\n";
                        const rows = eventRegs.map(r =>
                          `"${r.name}","${r.studentId}","${r.email}","${r.phone}","${r.semester}","${r.department}","${r.teamName || ''}","${r.status}","${r.registeredAt}"`
                        ).join("\n");
                        const blob = new Blob([headers + rows], { type: 'text/csv' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${viewingEventParticipants.slug || 'event'}-participants.csv`;
                        a.click();
                      }}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Participants CSV</span>
                    </button>
                  </div>
                </div>

                {/* Sub-view of Participants */}
                {(() => {
                  const allForThisEvent = eventRegistrations.filter(r => r.eventId === viewingEventParticipants.id);
                  const confirmedCount = allForThisEvent.filter(r => r.status === 'CONFIRMED').length;
                  const attendedCount = allForThisEvent.filter(r => r.status === 'ATTENDED').length;
                  const cancelledCount = allForThisEvent.filter(r => r.status === 'CANCELLED').length;

                  const filteredList = allForThisEvent.filter(r => {
                    if (participantStatusFilter !== 'ALL' && r.status !== participantStatusFilter) return false;
                    if (participantSearchQuery.trim()) {
                      const q = participantSearchQuery.toLowerCase().trim();
                      return (
                        r.name.toLowerCase().includes(q) ||
                        r.studentId.toLowerCase().includes(q) ||
                        r.email.toLowerCase().includes(q) ||
                        (r.teamName && r.teamName.toLowerCase().includes(q))
                      );
                    }
                    return true;
                  });

                  return (
                    <div className="space-y-6">
                      {/* Metric Stat Boxes */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-white p-4 border border-slate-200 space-y-1 shadow-xs">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Registrations</span>
                          <p className="text-2xl font-extrabold text-slate-900">{allForThisEvent.length}</p>
                        </div>
                        <div className="bg-white p-4 border border-slate-200 space-y-1 shadow-xs">
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Confirmed</span>
                          <p className="text-2xl font-extrabold text-emerald-700">{confirmedCount}</p>
                        </div>
                        <div className="bg-white p-4 border border-slate-200 space-y-1 shadow-xs">
                          <span className="text-[10px] font-bold text-sense-blue uppercase tracking-wider">Attended</span>
                          <p className="text-2xl font-extrabold text-sense-navy">{attendedCount}</p>
                        </div>
                        <div className="bg-white p-4 border border-slate-200 space-y-1 shadow-xs">
                          <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Cancelled</span>
                          <p className="text-2xl font-extrabold text-red-700">{cancelledCount}</p>
                        </div>
                      </div>

                      {/* Filter Bar & Search */}
                      <div className="bg-white p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                          {['ALL', 'CONFIRMED', 'ATTENDED', 'CANCELLED'].map(st => (
                            <button
                              key={st}
                              onClick={() => setParticipantStatusFilter(st)}
                              className={`px-3 py-1.5 text-xs font-bold transition uppercase tracking-wider ${
                                participantStatusFilter === st
                                  ? 'bg-sense-navy text-white shadow-sm'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {st === 'ALL' ? 'All' : st}
                            </button>
                          ))}
                        </div>

                        <div className="relative w-full sm:w-72">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Search name, roll no, email..."
                            value={participantSearchQuery}
                            onChange={(e) => setParticipantSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue rounded-none"
                          />
                        </div>
                      </div>

                      {/* Participants Table */}
                      {filteredList.length === 0 ? (
                        <div className="bg-white p-12 text-center border border-slate-200 space-y-3 shadow-xs">
                          <Users className="w-10 h-10 text-slate-300 mx-auto" />
                          <h4 className="font-bold text-slate-800 text-base">No Registered Participants Found</h4>
                          <p className="text-xs text-slate-500 max-w-sm mx-auto">
                            No participants match this filter query. New registrations submitted via the website appear here automatically.
                          </p>
                        </div>
                      ) : (
                        <div className="bg-white border border-slate-200 shadow-sm overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider font-mono">
                                <th className="p-3.5">#</th>
                                <th className="p-3.5">Participant</th>
                                <th className="p-3.5">Roll No (ID)</th>
                                <th className="p-3.5">Contact Details</th>
                                <th className="p-3.5">Dept / Semester</th>
                                <th className="p-3.5">Team</th>
                                <th className="p-3.5">Status</th>
                                <th className="p-3.5 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {filteredList.map((p, idx) => (
                                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                                  <td className="p-3.5 font-mono text-slate-400">{idx + 1}</td>
                                  <td className="p-3.5 font-bold text-slate-900">
                                    {p.name}
                                    {p.motivation && (
                                      <span className="block text-[11px] font-normal text-slate-500 italic mt-0.5 line-clamp-1">
                                        "{p.motivation}"
                                      </span>
                                    )}
                                  </td>
                                  <td className="p-3.5 font-mono text-sense-blue font-semibold">{p.studentId}</td>
                                  <td className="p-3.5 space-y-0.5">
                                    <a href={`mailto:${p.email}`} className="text-slate-700 hover:text-sense-blue block hover:underline">
                                      {p.email}
                                    </a>
                                    <a href={`tel:${p.phone}`} className="text-slate-500 block hover:underline font-mono text-[11px]">
                                      {p.phone}
                                    </a>
                                  </td>
                                  <td className="p-3.5 text-slate-600">
                                    <span className="font-medium text-slate-800">{p.department}</span>
                                    <span className="block text-slate-500">{p.semester}</span>
                                  </td>
                                  <td className="p-3.5">
                                    {p.teamName ? (
                                      <span className="font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-none font-mono">
                                        {p.teamName}
                                      </span>
                                    ) : (
                                      <span className="text-slate-400 italic">Solo</span>
                                    )}
                                  </td>
                                  <td className="p-3.5">
                                    <select
                                      value={p.status}
                                      onChange={(e) => {
                                        updateEventRegistrationStatus(p.id, e.target.value);
                                        showToast(`Status updated to ${e.target.value} for ${p.name}`);
                                      }}
                                      className={`font-bold text-[11px] px-2.5 py-1 border focus:outline-none cursor-pointer rounded-none ${
                                        p.status === 'ATTENDED' ? 'bg-blue-50 border-blue-400 text-sense-navy' :
                                        p.status === 'CONFIRMED' ? 'bg-emerald-50 border-emerald-400 text-emerald-800' :
                                        'bg-red-50 border-red-300 text-red-800'
                                      }`}
                                    >
                                      <option value="CONFIRMED">Confirmed</option>
                                      <option value="ATTENDED">Attended</option>
                                      <option value="CANCELLED">Cancelled</option>
                                    </select>
                                  </td>
                                  <td className="p-3.5 text-right">
                                    <button
                                      onClick={() => {
                                        if (window.confirm(`Remove registration for ${p.name}?`)) {
                                          deleteEventRegistration(p.id);
                                          showToast(`Registration for ${p.name} removed.`);
                                        }
                                      }}
                                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50"
                                      title="Delete Registration"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : (
              /* All Events Cards Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events
                  .filter(e => e.sessionId === selectedSessionId)
                  .map(evt => {
                    const participantCount = eventRegistrations.filter(r => r.eventId === evt.id).length;

                    return (
                      <div key={evt.id} className="bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="relative h-44 bg-slate-950 overflow-hidden">
                            <img src={evt.bannerImage} alt={evt.title} className="w-full h-full object-cover" />
                            <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 uppercase ${
                              evt.status === 'UPCOMING' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-slate-900 text-white'
                            }`}>
                              {evt.status}
                            </span>
                            <span className="absolute top-2.5 right-2.5 text-[10px] font-semibold px-2 py-0.5 bg-white/90 text-slate-800">
                              {evt.category}
                            </span>
                          </div>
                          <div className="p-5 space-y-2">
                            <span className="text-xs font-mono text-slate-400 block">{evt.date} • {evt.venue}</span>
                            <h4 className="font-bold text-base text-slate-900 line-clamp-2">{evt.title}</h4>
                            <p className="text-xs text-slate-600 line-clamp-2">{evt.summary}</p>
                          </div>
                        </div>
                        <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => {
                              setViewingEventParticipants(evt);
                              setParticipantStatusFilter('ALL');
                              setParticipantSearchQuery('');
                            }}
                            className="px-3 py-1.5 bg-sense-navy hover:bg-sense-dark text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition shadow-xs"
                          >
                            <Users className="w-3.5 h-3.5" />
                            <span>View ({participantCount})</span>
                          </button>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingEvent(evt);
                                setEventFormData({
                                  title: evt.title,
                                  category: evt.category,
                                  status: evt.status,
                                  date: evt.date,
                                  time: evt.time || '',
                                  venue: evt.venue,
                                  summary: evt.summary,
                                  description: evt.description || '',
                                  registerUrl: evt.registerUrl || '',
                                  driveUrl: evt.driveUrl || '',
                                  bannerImage: evt.bannerImage,
                                  tags: Array.isArray(evt.tags) ? evt.tags.join(', ') : evt.tags || '',
                                  registrationDeadline: evt.registrationDeadline || ''
                                });
                                setIsEventModalOpen(true);
                              }}
                              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700"
                              title="Edit Event"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete event "${evt.title}"?`)) deleteEvent(evt.id);
                              }}
                              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600"
                              title="Delete Event"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 6: PHOTO GALLERY */}
        {/* ============================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight">
                  PHOTO GALLERY MANAGER
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Organize and curate visual albums for <strong>{currentSession?.name}</strong>
                </p>
              </div>

              <button
                onClick={() => setIsGalleryModalOpen(true)}
                className="px-4 py-2.5 bg-sense-blue hover:bg-sense-navy text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Photo to Gallery</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery
                .filter(g => g.sessionId === selectedSessionId)
                .map(item => (
                  <div key={item.id} className="bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="relative h-48 bg-slate-950 overflow-hidden">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 bg-slate-950/80 text-sense-lightCyan uppercase">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2">{item.caption}</p>
                      </div>
                    </div>
                    <div className="p-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-mono">{item.date}</span>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete photo "${item.title}"?`)) deleteGalleryItem(item.id);
                        }}
                        className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 7: SITE CONTENT */}
        {/* ============================================================= */}
        {activeTab === 'content' && (
          <div className="bg-white p-8 border border-slate-200 shadow-sm space-y-6 animate-fadeIn max-w-4xl">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight">
                SITE MASTER CONTENT
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Update About narrative, Mission, Vision and contact footer details
              </p>
            </div>

            {contentSavedMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Content modifications successfully saved!</span>
              </div>
            )}

            <form onSubmit={handleSaveContent} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">About Overview Narrative</label>
                <textarea
                  rows="4"
                  value={contentEditState.overview}
                  onChange={(e) => setContentEditState({ ...contentEditState, overview: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Society Motto / Tagline</label>
                <input
                  type="text"
                  value={contentEditState.motto}
                  onChange={(e) => setContentEditState({ ...contentEditState, motto: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Mission Statement</label>
                <textarea
                  rows="3"
                  value={contentEditState.missionSummary}
                  onChange={(e) => setContentEditState({ ...contentEditState, missionSummary: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Vision Statement</label>
                <textarea
                  rows="3"
                  value={contentEditState.visionSummary}
                  onChange={(e) => setContentEditState({ ...contentEditState, visionSummary: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Contact Email</label>
                  <input
                    type="email"
                    value={contentEditState.email}
                    onChange={(e) => setContentEditState({ ...contentEditState, email: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Contact Phone</label>
                  <input
                    type="text"
                    value={contentEditState.phone}
                    onChange={(e) => setContentEditState({ ...contentEditState, phone: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 text-xs focus:outline-none focus:border-sense-blue"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-sense-blue hover:bg-sense-navy text-white font-bold text-xs uppercase tracking-wider transition"
              >
                Save Site Content
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ============================================================= */}
      {/* MODAL 1: ADD / EDIT TEAM MEMBER */}
      {/* ============================================================= */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white border border-slate-300 max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-base text-slate-900 uppercase">
                {editingMember ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              <button onClick={() => setIsMemberModalOpen(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={memberFormData.name}
                    onChange={(e) => setMemberFormData({ ...memberFormData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Position / Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead Full-Stack Architect"
                    value={memberFormData.position}
                    onChange={(e) => setMemberFormData({ ...memberFormData, position: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                  />
                </div>
              </div>

              {/* Dynamic Category Selection */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Team Category *</label>
                <select
                  value={memberFormData.teamCategory}
                  onChange={(e) => setMemberFormData({ ...memberFormData, teamCategory: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs cursor-pointer"
                >
                  {teamCategories.map(cat => (
                    <option key={cat.key || cat.label} value={cat.label}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Full-Stack MERN Developer | AI & Security Enthusiast"
                  value={memberFormData.headline}
                  onChange={(e) => setMemberFormData({ ...memberFormData, headline: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Photo URL</label>
                <input
                  type="url"
                  required
                  value={memberFormData.photoUrl}
                  onChange={(e) => setMemberFormData({ ...memberFormData, photoUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={memberFormData.linkedIn}
                    onChange={(e) => setMemberFormData({ ...memberFormData, linkedIn: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="member@senseiiui.org"
                    value={memberFormData.email}
                    onChange={(e) => setMemberFormData({ ...memberFormData, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Skills & Tech Stack (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Node.js, Docker, VAPT, LangChain"
                  value={memberFormData.skills}
                  onChange={(e) => setMemberFormData({ ...memberFormData, skills: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Short Bio</label>
                <textarea
                  rows="2"
                  value={memberFormData.bio}
                  onChange={(e) => setMemberFormData({ ...memberFormData, bio: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sense-blue hover:bg-sense-navy text-white text-xs font-bold uppercase tracking-wider"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL 2: ADD NEW TEAM CATEGORY */}
      {/* ============================================================= */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white border border-slate-300 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-base text-slate-900 uppercase">
                Add New Team Category
              </h3>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cybersecurity Wing, Competitive Programming, PR"
                  value={newCategoryData.label}
                  onChange={(e) => setNewCategoryData({ ...newCategoryData, label: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Division Description</label>
                <textarea
                  rows="3"
                  placeholder="Describe the mandate and objectives of this specialized society division..."
                  value={newCategoryData.description}
                  onChange={(e) => setNewCategoryData({ ...newCategoryData, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sense-blue hover:bg-sense-navy text-white text-xs font-bold uppercase tracking-wider"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL 3: CREATE / EDIT COHORT SESSION */}
      {/* ============================================================= */}
      {isCohortModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white border border-slate-300 max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-base text-slate-900 uppercase">
                {editingCohort ? 'Edit Cohort Session' : 'Create New Cohort Session'}
              </h3>
              <button onClick={() => setIsCohortModalOpen(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCohort} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Cohort Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cohort 2026–2027"
                  value={cohortFormData.name}
                  onChange={(e) => setCohortFormData({ ...cohortFormData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Start Year</label>
                  <input
                    type="number"
                    value={cohortFormData.startYear}
                    onChange={(e) => setCohortFormData({ ...cohortFormData, startYear: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">End Year</label>
                  <input
                    type="number"
                    value={cohortFormData.endYear}
                    onChange={(e) => setCohortFormData({ ...cohortFormData, endYear: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                  />
                </div>
              </div>

              {/* Hiring Status Toggle */}
              <div className="p-3 bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Hiring Status</span>
                  <span className="text-[11px] text-slate-500">Allow public candidates to submit joining applications</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCohortFormData({ ...cohortFormData, isHiringOpen: !cohortFormData.isHiringOpen })}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white ${
                    cohortFormData.isHiringOpen ? 'bg-emerald-600' : 'bg-red-700'
                  }`}
                >
                  {cohortFormData.isHiringOpen ? '🟢 OPEN' : '🔴 CLOSED'}
                </button>
              </div>

              {/* Teams Configured */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Cohort Teams List (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Executive Council, Web Development, Operations, Media & Decor, AI & Research"
                  value={cohortFormData.teamsInput}
                  onChange={(e) => setCohortFormData({ ...cohortFormData, teamsInput: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                />
                <p className="text-[11px] text-slate-400">These will appear as radio selection options on the public membership form.</p>
              </div>

              {/* Custom Hiring Form Settings */}
              <div className="p-3 bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 block uppercase">
                  Custom Hiring Form Questions & Requirements
                </span>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">Custom Question Prompt</label>
                  <input
                    type="text"
                    placeholder="e.g. What technical project or initiative are you most proud of?"
                    value={cohortFormData.customQuestion}
                    onChange={(e) => setCohortFormData({ ...cohortFormData, customQuestion: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Description</label>
                <textarea
                  rows="2"
                  value={cohortFormData.description}
                  onChange={(e) => setCohortFormData({ ...cohortFormData, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsCohortModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sense-blue hover:bg-sense-navy text-white text-xs font-bold uppercase tracking-wider"
                >
                  Save Cohort Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL 4: EVENT CREATE / EDIT */}
      {/* ============================================================= */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white border border-slate-300 max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-base text-slate-900 uppercase">
                {editingEvent ? 'Edit Event' : 'Create Event'}
              </h3>
              <button onClick={() => setIsEventModalOpen(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Event Title *</label>
                <input
                  type="text"
                  required
                  value={eventFormData.title}
                  onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <select
                    value={eventFormData.category}
                    onChange={(e) => setEventFormData({ ...eventFormData, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs cursor-pointer"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Technical Workshop</option>
                    <option value="Speaker Session">Speaker Session</option>
                    <option value="Bootcamp">Bootcamp</option>
                    <option value="Competition">Competition</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Status</label>
                  <select
                    value={eventFormData.status}
                    onChange={(e) => setEventFormData({ ...eventFormData, status: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs cursor-pointer"
                  >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dec 15, 2026"
                    value={eventFormData.date}
                    onChange={(e) => setEventFormData({ ...eventFormData, date: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 10:00 AM - 4:00 PM"
                    value={eventFormData.time}
                    onChange={(e) => setEventFormData({ ...eventFormData, time: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Venue *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Auditorium, FBAS IIUI"
                    value={eventFormData.venue}
                    onChange={(e) => setEventFormData({ ...eventFormData, venue: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Registration Deadline (e.g. 2026-11-26 11:59 PM PKT)</label>
                <input
                  type="text"
                  placeholder="e.g. 2026-11-26 11:59 PM PKT"
                  value={eventFormData.registrationDeadline}
                  onChange={(e) => setEventFormData({ ...eventFormData, registrationDeadline: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Banner Image URL</label>
                <input
                  type="url"
                  required
                  value={eventFormData.bannerImage}
                  onChange={(e) => setEventFormData({ ...eventFormData, bannerImage: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Summary</label>
                <textarea
                  rows="2"
                  value={eventFormData.summary}
                  onChange={(e) => setEventFormData({ ...eventFormData, summary: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Registration URL (for upcoming)</label>
                  <input
                    type="url"
                    placeholder="https://portal.senseiiui.org/register"
                    value={eventFormData.registerUrl}
                    onChange={(e) => setEventFormData({ ...eventFormData, registerUrl: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Google Drive Recap URL (for completed)</label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={eventFormData.driveUrl}
                    onChange={(e) => setEventFormData({ ...eventFormData, driveUrl: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sense-blue hover:bg-sense-navy text-white text-xs font-bold uppercase tracking-wider"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL 5: PHOTO GALLERY ADD */}
      {/* ============================================================= */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white border border-slate-300 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-base text-slate-900 uppercase">
                Add Photo to Gallery
              </h3>
              <button onClick={() => setIsGalleryModalOpen(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGallery} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Photo Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DevSprint Hackathon Finals"
                  value={galleryFormData.title}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Category</label>
                <select
                  value={galleryFormData.category}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs cursor-pointer"
                >
                  <option value="Workshops">Workshops</option>
                  <option value="Hackathons">Hackathons</option>
                  <option value="Keynotes">Keynotes</option>
                  <option value="Inauguration">Inauguration</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Image URL *</label>
                <input
                  type="url"
                  required
                  value={galleryFormData.imageUrl}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, imageUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Caption</label>
                <textarea
                  rows="2"
                  value={galleryFormData.caption}
                  onChange={(e) => setGalleryFormData({ ...galleryFormData, caption: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 text-xs"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sense-blue hover:bg-sense-navy text-white text-xs font-bold uppercase tracking-wider"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL 6: APPLICATION FULL DETAILS & INSPECT */}
      {/* ============================================================= */}
      {viewingApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white border border-slate-300 max-w-xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 uppercase">
                  Candidate Application
                </h3>
                <span className="text-xs text-slate-400 font-mono">ID: {viewingApplication.id}</span>
              </div>
              <button onClick={() => setViewingApplication(null)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-4 bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-base text-slate-900">{viewingApplication.name}</span>
                  <span className="text-xs font-bold px-2 py-0.5 bg-sense-blue text-white uppercase">
                    {viewingApplication.domainInterest} Team
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <span><strong>Reg No:</strong> {viewingApplication.studentId}</span>
                  <span><strong>Semester:</strong> {viewingApplication.semester}</span>
                  <span><strong>Email:</strong> {viewingApplication.email}</span>
                  <span><strong>WhatsApp:</strong> {viewingApplication.phone}</span>
                </div>
              </div>

              {/* Social URLs */}
              <div className="p-3 bg-white border border-slate-200 space-y-1.5">
                <span className="font-bold uppercase text-[11px] text-slate-500 block">Candidate Profiles</span>
                {viewingApplication.linkedin && (
                  <p><strong>LinkedIn:</strong> <a href={viewingApplication.linkedin} target="_blank" rel="noreferrer" className="text-sense-blue hover:underline">{viewingApplication.linkedin}</a></p>
                )}
                {viewingApplication.instagram && (
                  <p><strong>Instagram:</strong> <span className="text-pink-600 font-semibold">{viewingApplication.instagram}</span></p>
                )}
                {viewingApplication.links && viewingApplication.links !== 'N/A' && (
                  <p><strong>Portfolio / GitHub:</strong> <a href={viewingApplication.links} target="_blank" rel="noreferrer" className="text-sense-blue hover:underline">{viewingApplication.links}</a></p>
                )}
              </div>

              {/* Motivation */}
              <div className="space-y-1">
                <span className="font-bold uppercase text-[11px] text-slate-500 block">Motivation & Experience:</span>
                <p className="p-3 bg-slate-50 border border-slate-200 text-slate-800 whitespace-pre-line leading-relaxed">
                  {viewingApplication.message}
                </p>
              </div>

              {/* Pipeline Status update */}
              <div className="p-3 bg-slate-100 border border-slate-200 flex items-center justify-between">
                <span className="font-bold">Current Pipeline Status:</span>
                <select
                  value={viewingApplication.status}
                  onChange={(e) => {
                    updateApplicationStatus(viewingApplication.id, e.target.value);
                    setViewingApplication({ ...viewingApplication, status: e.target.value });
                    showToast(`Status updated to ${e.target.value}`);
                  }}
                  className="font-bold text-xs p-1.5 border border-slate-300 bg-white"
                >
                  <option value="PENDING">Pending</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="INTERVIEWED">Interviewed</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="ACCEPTED">Accepted</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => handlePromoteApplicant(viewingApplication)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Directly to {viewingApplication.domainInterest} Team</span>
              </button>

              <button
                onClick={() => setViewingApplication(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
