import React, { useState } from 'react';
import { Search, X, Calendar, User, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, events, cabinet, teams } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredEvents = q
    ? events.filter(e => e.title.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)).slice(0, 4)
    : [];

  const filteredPeople = q
    ? [...cabinet, ...teams].filter(p => p.name.toLowerCase().includes(q) || p.position.toLowerCase().includes(q) || (p.skills && p.skills.some(s => s.toLowerCase().includes(q)))).slice(0, 4)
    : [];

  const handleSelect = (path) => {
    navigate(path);
    setIsSearchOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-slideDown"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-sense-cyan shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Search events, leadership, teams, hackathons, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 text-base"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600 rounded">
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="ml-3 px-2 py-1 text-xs font-mono font-medium bg-slate-200 hover:bg-slate-300 text-slate-700 rounded transition"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query ? (
            <div className="py-6 text-center text-slate-400">
              <p className="text-sm">Type keywords like <span className="font-semibold text-sense-blue">"Hackathon"</span>, <span className="font-semibold text-sense-blue">"President"</span>, <span className="font-semibold text-sense-blue">"MERN"</span>, or <span className="font-semibold text-sense-blue">"AI"</span>.</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <button onClick={() => setQuery('DevSprint')} className="text-xs bg-slate-100 hover:bg-sense-paleCyan px-2.5 py-1 rounded-none text-slate-600 transition">DevSprint Hackathon</button>
                <button onClick={() => setQuery('Agentic AI')} className="text-xs bg-slate-100 hover:bg-sense-paleCyan px-2.5 py-1 rounded-none text-slate-600 transition">Agentic AI</button>
                <button onClick={() => setQuery('Web Team')} className="text-xs bg-slate-100 hover:bg-sense-paleCyan px-2.5 py-1 rounded-none text-slate-600 transition">Web Team</button>
                <button onClick={() => setQuery('Members')} className="text-xs bg-slate-100 hover:bg-sense-paleCyan px-2.5 py-1 rounded-none text-slate-600 transition">Members</button>
              </div>
            </div>
          ) : (
            <>
              {/* Events Section */}
              {filteredEvents.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sense-cyan" /> Events ({filteredEvents.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredEvents.map(evt => (
                      <div
                        key={evt.id}
                        onClick={() => handleSelect('/events')}
                        className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer flex items-center justify-between group transition"
                      >
                        <div>
                          <div className="font-semibold text-sm text-slate-800 group-hover:text-sense-blue flex items-center gap-2">
                            {evt.title}
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${evt.status === 'UPCOMING' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                              {evt.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1">{evt.summary}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sense-blue group-hover:translate-x-1 transition" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* People Section */}
              {filteredPeople.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-sense-cyan" /> Leadership & Members ({filteredPeople.length})
                  </h4>
                  <div className="space-y-1.5">
                    {filteredPeople.map(person => (
                      <div
                        key={person.id}
                        onClick={() => handleSelect(person.teamCategory ? '/team' : '/cabinet')}
                        className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer flex items-center justify-between group transition"
                      >
                        <div className="flex items-center gap-3">
                          <img src={person.photoUrl} alt={person.name} className="w-8 h-8 rounded-none object-cover border border-slate-200" />
                          <div>
                            <div className="font-semibold text-sm text-slate-800 group-hover:text-sense-blue flex items-center gap-2">
                              {person.name}
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-sense-blue font-medium">
                                {person.position}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1">{person.headline || person.bio}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sense-blue group-hover:translate-x-1 transition" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Pages */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-sense-cyan" /> Quick Links
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleSelect('/about')} className="text-left p-2 rounded-lg bg-slate-50 hover:bg-sense-paleCyan text-xs font-medium text-slate-700 flex items-center justify-between">
                    About SENSE IIUI <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                  <button onClick={() => handleSelect('/membership')} className="text-left p-2 rounded-none bg-slate-50 hover:bg-sense-paleCyan text-xs font-medium text-slate-700 flex items-center justify-between">
                    Members Portal <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                  <button onClick={() => handleSelect('/gallery')} className="text-left p-2 rounded-lg bg-slate-50 hover:bg-sense-paleCyan text-xs font-medium text-slate-700 flex items-center justify-between">
                    Photo Gallery <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                  <button onClick={() => handleSelect('/collaboration')} className="text-left p-2 rounded-lg bg-slate-50 hover:bg-sense-paleCyan text-xs font-medium text-slate-700 flex items-center justify-between">
                    Partner With Us <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
              </div>

              {filteredEvents.length === 0 && filteredPeople.length === 0 && (
                <div className="py-6 text-center text-slate-400">
                  <p className="text-sm">No exact matches found for "{query}".</p>
                  <p className="text-xs text-slate-400 mt-1">Try browsing the navigation menu or changing the search phrase.</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Software Engineering Society for Excellence — IIUI</span>
          <span className="font-mono text-[11px] text-slate-400">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;

