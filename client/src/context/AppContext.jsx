import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialSessions,
  initialCabinet,
  initialTeamMembers,
  initialTeamCategories,
  initialEvents,
  initialGallery,
  initialSiteContent,
  initialSubmissions,
  initialAdminUsers,
  initialEventRegistrations
} from '../data/initialData';

const AppContext = createContext();

const STORAGE_KEYS = {
  SESSIONS: 'sense_sessions_v1',
  CABINET: 'sense_cabinet_v1',
  TEAMS: 'sense_teams_v1',
  TEAM_CATEGORIES: 'sense_team_categories_v1',
  EVENTS: 'sense_events_v1',
  EVENT_REGISTRATIONS: 'sense_event_registrations_v1',
  GALLERY: 'sense_gallery_v1',
  CONTENT: 'sense_content_v1',
  SUBMISSIONS: 'sense_submissions_v1',
  ACTIVE_SESSION: 'sense_active_session_v1',
  AUTH: 'sense_admin_auth_v1'
};

export const AppProvider = ({ children }) => {
  // 1. Sessions State
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return saved ? JSON.parse(saved) : initialSessions;
  });

  // 2. Active Selected Session
  const [selectedSessionId, setSelectedSessionId] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
    if (saved) return saved;
    const current = initialSessions.find(s => s.isCurrent);
    return current ? current.id : initialSessions[0].id;
  });

  // 3. Cabinet State
  const [cabinet, setCabinet] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CABINET);
    return saved ? JSON.parse(saved) : initialCabinet;
  });

  // 4. Team Members State
  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TEAMS);
    return saved ? JSON.parse(saved) : initialTeamMembers;
  });

  // 4b. Team Categories State (Dynamic categories)
  const [teamCategories, setTeamCategories] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TEAM_CATEGORIES);
    return saved ? JSON.parse(saved) : initialTeamCategories;
  });

  // 5. Events State
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (!saved) return initialEvents;
    try {
      const parsed = JSON.parse(saved);
      return parsed.map(evt => {
        const init = initialEvents.find(ie => ie.id === evt.id);
        if (init && init.registrationDeadline && !evt.registrationDeadline) {
          return { ...evt, registrationDeadline: init.registrationDeadline };
        }
        return evt;
      });
    } catch (e) {
      return initialEvents;
    }
  });

  // 6. Gallery State
  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
    return saved ? JSON.parse(saved) : initialGallery;
  });

  // 7. Site Content State
  const [siteContent, setSiteContent] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONTENT);
    return saved ? JSON.parse(saved) : initialSiteContent;
  });

  // 8. Form Submissions State
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    return saved ? JSON.parse(saved) : initialSubmissions;
  });

  // 8b. Event Registrations State
  const [eventRegistrations, setEventRegistrations] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EVENT_REGISTRATIONS);
    return saved ? JSON.parse(saved) : initialEventRegistrations;
  });

  // 9. Admin Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved);
      if (parsed) {
        parsed.role = 'Admin';
      }
      return parsed;
    } catch {
      return null;
    }
  });

  // 10. Global Search / Modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, selectedSessionId);
  }, [selectedSessionId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CABINET, JSON.stringify(cabinet));
  }, [cabinet]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEAM_CATEGORIES, JSON.stringify(teamCategories));
  }, [teamCategories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENT_REGISTRATIONS, JSON.stringify(eventRegistrations));
  }, [eventRegistrations]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  }, [currentUser]);

  // Derived current session object
  const currentSession = sessions.find(s => s.id === selectedSessionId) || sessions[0];

  // Helper filters for current session
  const sessionEvents = events.filter(e => e.sessionId === selectedSessionId);
  const sessionCabinet = cabinet.filter(c => c.sessionId === selectedSessionId);
  const sessionTeams = teams.filter(t => t.sessionId === selectedSessionId);
  const sessionGallery = gallery.filter(g => g.sessionId === selectedSessionId);

  // Authentication Handlers
  const login = (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedEmail === 'admin@senseiiui.org' && password === 'admin123') {
      const user = initialAdminUsers[0]; // Admin
      setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials. Please verify your admin credentials.' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Sessions CRUD
  const addSession = (sessionData) => {
    const id = `sess-${Date.now()}`;
    const newSession = {
      ...sessionData,
      id,
      slug: sessionData.slug || sessionData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      isCurrent: sessionData.isCurrent || false,
      isArchived: sessionData.isArchived || false
    };

    let updatedSessions = [...sessions];
    if (newSession.isCurrent) {
      updatedSessions = updatedSessions.map(s => ({ ...s, isCurrent: false }));
    }
    updatedSessions.push(newSession);
    setSessions(updatedSessions);
    if (newSession.isCurrent) {
      setSelectedSessionId(newSession.id);
    }
    return newSession;
  };

  const setAsCurrentSession = (id) => {
    setSessions(prev =>
      prev.map(s => ({
        ...s,
        isCurrent: s.id === id,
        isArchived: s.id === id ? false : s.isArchived
      }))
    );
    setSelectedSessionId(id);
  };

  const toggleArchiveSession = (id) => {
    setSessions(prev =>
      prev.map(s => {
        if (s.id === id) {
          return { ...s, isArchived: !s.isArchived };
        }
        return s;
      })
    );
  };

  const deleteSession = (id) => {
    if (sessions.length <= 1) {
      alert("At least one cohort must remain in the system.");
      return;
    }
    setSessions(prev => prev.filter(s => s.id !== id));
    if (selectedSessionId === id) {
      const remaining = sessions.filter(s => s.id !== id);
      setSelectedSessionId(remaining[0].id);
    }
  };

  const toggleCohortHiring = (id) => {
    setSessions(prev =>
      prev.map(s => {
        if (s.id === id) {
          const newStatus = !(s.isHiringOpen !== undefined ? s.isHiringOpen : true);
          return { ...s, isHiringOpen: newStatus };
        }
        return s;
      })
    );
  };

  const updateCohort = (id, cohortData) => {
    setSessions(prev =>
      prev.map(s => {
        if (s.id === id) {
          return { ...s, ...cohortData };
        }
        return s;
      })
    );
  };

  // Events CRUD
  const addEvent = (eventData) => {
    const id = `evt-${Date.now()}`;
    const newEvent = {
      ...eventData,
      id,
      sessionId: eventData.sessionId || selectedSessionId,
      slug: eventData.slug || eventData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      isPublished: eventData.isPublished !== undefined ? eventData.isPublished : true,
      tags: Array.isArray(eventData.tags) ? eventData.tags : (eventData.tags || '').split(',').map(t => t.trim()).filter(Boolean)
    };
    setEvents(prev => [newEvent, ...prev]);
    return newEvent;
  };

  const updateEvent = (id, eventData) => {
    setEvents(prev =>
      prev.map(e => {
        if (e.id === id) {
          const tags = Array.isArray(eventData.tags)
            ? eventData.tags
            : (eventData.tags || '').split(',').map(t => t.trim()).filter(Boolean);
          return { ...e, ...eventData, tags };
        }
        return e;
      })
    );
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Event Registrations CRUD
  const registerForEvent = (eventId, registrationData) => {
    const targetEvent = events.find(e => e.id === eventId);
    if (targetEvent && targetEvent.registrationDeadline) {
      const parsedDate = new Date(targetEvent.registrationDeadline.replace(/\s*PKT\s*/i, ''));
      if (!isNaN(parsedDate.getTime()) && new Date() > parsedDate) {
        throw new Error('Registration deadline has passed for this event.');
      }
    }
    const newReg = {
      id: `ereg-${Date.now()}`,
      eventId,
      eventTitle: targetEvent ? targetEvent.title : 'SENSE Event',
      ...registrationData,
      status: 'CONFIRMED',
      registeredAt: new Date().toISOString()
    };
    setEventRegistrations(prev => [newReg, ...prev]);

    // Also decrement seatsRemaining in event if available
    if (targetEvent && targetEvent.seatsRemaining > 0) {
      updateEvent(eventId, { seatsRemaining: targetEvent.seatsRemaining - 1 });
    }

    return { success: true, registration: newReg };
  };

  const updateEventRegistrationStatus = (id, status) => {
    setEventRegistrations(prev =>
      prev.map(r => (r.id === id ? { ...r, status } : r))
    );
  };

  const deleteEventRegistration = (id) => {
    setEventRegistrations(prev => prev.filter(r => r.id !== id));
  };

  // Cabinet CRUD
  const addCabinetMember = (memberData) => {
    const id = `cab-${Date.now()}`;
    const newMember = {
      ...memberData,
      id,
      sessionId: memberData.sessionId || selectedSessionId,
      skills: Array.isArray(memberData.skills)
        ? memberData.skills
        : (memberData.skills || '').split(',').map(s => s.trim()).filter(Boolean),
      displayOrder: memberData.displayOrder || cabinet.length + 1
    };
    setCabinet(prev => [...prev, newMember]);
    return newMember;
  };

  const updateCabinetMember = (id, memberData) => {
    setCabinet(prev =>
      prev.map(c => {
        if (c.id === id) {
          const skills = Array.isArray(memberData.skills)
            ? memberData.skills
            : (memberData.skills || '').split(',').map(s => s.trim()).filter(Boolean);
          return { ...c, ...memberData, skills };
        }
        return c;
      })
    );
  };

  const deleteCabinetMember = (id) => {
    setCabinet(prev => prev.filter(c => c.id !== id));
  };

  // Teams CRUD
  const addTeamMember = (memberData) => {
    const id = `tm-${Date.now()}`;
    const newMember = {
      ...memberData,
      id,
      sessionId: memberData.sessionId || selectedSessionId,
      skills: Array.isArray(memberData.skills)
        ? memberData.skills
        : (memberData.skills || '').split(',').map(s => s.trim()).filter(Boolean),
      displayOrder: memberData.displayOrder || teams.length + 1
    };
    setTeams(prev => [...prev, newMember]);
    return newMember;
  };

  const updateTeamMember = (id, memberData) => {
    setTeams(prev =>
      prev.map(t => {
        if (t.id === id) {
          const skills = Array.isArray(memberData.skills)
            ? memberData.skills
            : (memberData.skills || '').split(',').map(s => s.trim()).filter(Boolean);
          return { ...t, ...memberData, skills };
        }
        return t;
      })
    );
  };

  const deleteTeamMember = (id) => {
    setTeams(prev => prev.filter(t => t.id !== id));
  };

  // Team Categories CRUD
  const addTeamCategory = (catData) => {
    const id = `cat-${Date.now()}`;
    const newCat = {
      id,
      key: catData.key || catData.label,
      label: catData.label,
      description: catData.description || 'Specialized division of SENSE IIUI'
    };
    setTeamCategories(prev => {
      const exists = prev.some(c => c.key === newCat.key || c.label === newCat.label);
      if (exists) return prev;
      return [...prev, newCat];
    });
    return newCat;
  };

  const deleteTeamCategory = (idOrKey) => {
    setTeamCategories(prev => prev.filter(c => c.id !== idOrKey && c.key !== idOrKey));
  };

  // Promote Applicant to Team Member
  const promoteApplicantToTeam = (applicantId, targetCategory = null, targetPosition = null) => {
    const applicant = submissions.find(s => s.id === applicantId);
    if (!applicant) return { success: false, message: 'Applicant not found' };

    const assignedCategory = targetCategory || applicant.domainInterest || applicant.preferredTeam || 'Operations';
    const assignedPosition = targetPosition || applicant.preferredRole || 'Team Member';

    const newMember = {
      id: `tm-${Date.now()}`,
      sessionId: selectedSessionId,
      name: applicant.name,
      position: assignedPosition,
      teamCategory: assignedCategory,
      headline: `Software Engineering Student | ${assignedCategory} Team at SENSE IIUI`,
      bio: applicant.message || 'Passionate software engineering undergraduate contributing to SENSE IIUI departmental initiatives.',
      photoUrl: applicant.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      linkedIn: applicant.linkedin || applicant.links || '',
      email: applicant.email,
      skills: ['Software Engineering', assignedCategory],
      displayOrder: teams.length + 1
    };

    setTeams(prev => [...prev, newMember]);

    // Also update applicant status to ACCEPTED with a timestamped note
    const noteText = `Promoted and added to ${assignedCategory} team on ${new Date().toLocaleDateString()}`;
    setSubmissions(prev =>
      prev.map(s => (s.id === applicantId ? { ...s, status: 'ACCEPTED', notes: noteText } : s))
    );

    return { success: true, member: newMember };
  };

  // Gallery CRUD
  const addGalleryItem = (itemData) => {
    const id = `gal-${Date.now()}`;
    const newItem = {
      ...itemData,
      id,
      sessionId: itemData.sessionId || selectedSessionId,
      displayOrder: itemData.displayOrder || gallery.length + 1
    };
    setGallery(prev => [newItem, ...prev]);
    return newItem;
  };

  const updateGalleryItem = (id, itemData) => {
    setGallery(prev =>
      prev.map(g => (g.id === id ? { ...g, ...itemData } : g))
    );
  };

  const deleteGalleryItem = (id) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  // Content update
  const updateSiteContent = (section, data) => {
    setSiteContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };

  // Form Submission
  const submitForm = (type, data) => {
    const newSubmission = {
      id: `sub-${Date.now()}`,
      type,
      ...data,
      status: 'NEW',
      submittedAt: new Date().toISOString()
    };
    setSubmissions(prev => [newSubmission, ...prev]);
    return newSubmission;
  };

  const updateSubmissionStatus = (id, status, notes = '') => {
    setSubmissions(prev =>
      prev.map(s => (s.id === id ? { ...s, status, notes } : s))
    );
  };

  const deleteSubmission = (id) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };

  // Reset to Factory Default
  const resetToFactoryDefaults = () => {
    if (window.confirm("Are you sure you want to reset all data back to SENSE IIUI factory initial seed? Any custom modifications will be reinitialized.")) {
      setSessions(initialSessions);
      setSelectedSessionId(initialSessions[0].id);
      setCabinet(initialCabinet);
      setTeams(initialTeamMembers);
      setEvents(initialEvents);
      setGallery(initialGallery);
      setSiteContent(initialSiteContent);
      setSubmissions(initialSubmissions);
      localStorage.clear();
      alert("SENSE IIUI database reinitialized to original state!");
    }
  };

  return (
    <AppContext.Provider
      value={{
        sessions,
        cohorts: sessions,
        selectedSessionId,
        setSelectedSessionId,
        currentSession,
        currentCohort: currentSession,
        addSession,
        setAsCurrentSession,
        toggleArchiveSession,
        deleteSession,
        toggleCohortHiring,
        updateCohort,

        cabinet,
        sessionCabinet,
        addCabinetMember,
        updateCabinetMember,
        deleteCabinetMember,

        teams,
        sessionTeams,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,

        teamCategories,
        addTeamCategory,
        deleteTeamCategory,
        promoteApplicantToTeam,

        events,
        sessionEvents,
        addEvent,
        updateEvent,
        deleteEvent,

        eventRegistrations,
        registerForEvent,
        updateEventRegistrationStatus,
        deleteEventRegistration,

        gallery,
        sessionGallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,

        siteContent,
        updateSiteContent,

        submissions,
        applications: submissions,
        submitForm,
        updateSubmissionStatus,
        updateApplicationStatus: updateSubmissionStatus,
        deleteSubmission,
        deleteApplication: deleteSubmission,

        currentUser,
        login,
        logout,

        isSearchOpen,
        setIsSearchOpen,

        resetToFactoryDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

