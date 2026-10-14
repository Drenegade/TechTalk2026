import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Award, 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  Brain, 
  Filter, 
  Sparkles,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { SESSIONS, SPEAKERS } from '../data/conferenceData';
import { Session, TrackType } from '../types';

interface AgendaSectionProps {
  onConsultCopilot: (prompt: string, mode?: any) => void;
  savedSessionIds: string[];
  onToggleSaveSession: (sessionId: string) => void;
}

export const AgendaSection: React.FC<AgendaSectionProps> = ({
  onConsultCopilot,
  savedSessionIds,
  onToggleSaveSession,
}) => {
  const [selectedDay, setSelectedDay] = useState<1 | 2>(1);
  const [selectedTrack, setSelectedTrack] = useState<TrackType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySaved, setOnlySaved] = useState(false);

  const getSpeaker = (id: string) => SPEAKERS.find((s) => s.id === id);

  const filteredSessions = SESSIONS.filter((session) => {
    // Filter by day
    if (session.day !== selectedDay) return false;

    // Filter by saved if toggled
    if (onlySaved && !savedSessionIds.includes(session.id)) return false;

    // Filter by track
    if (selectedTrack !== 'all' && session.track !== selectedTrack) return false;

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = session.title.toLowerCase().includes(q);
      const matchAbstract = session.abstract.toLowerCase().includes(q);
      const matchTags = session.tags.some((t) => t.toLowerCase().includes(q));
      const matchSpeaker = session.speakerIds.some((id) => {
        const spk = getSpeaker(id);
        return spk && spk.name.toLowerCase().includes(q);
      });
      if (!matchTitle && !matchAbstract && !matchTags && !matchSpeaker) return false;
    }

    return true;
  });

  const getTrackBadge = (track: Session['track']) => {
    switch (track) {
      case 'ai-robotics':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">AI & Autonomous</span>;
      case 'cloud-sovereign':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800">Sovereign Cloud & Cyber</span>;
      case 'embedded-iot':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-800">Embedded Silicon & IoT</span>;
      case 'cpe-mastery':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-950 text-purple-300 border border-purple-800">CpE Mastery & CPD</span>;
    }
  };

  const handleAskCopilotForSession = (session: Session) => {
    const prompt = `I am attending the TechTalk2026 session: "${session.title}" (Room: ${session.room}, Track: ${session.track}).
Abstract: ${session.abstract}
As an engineer, I want to prepare thoroughly before the session starts:
1. What are the 3 most critical architectural and mathematical foundations I should review?
2. Formulate 3 cutting-edge, high-reasoning technical questions I can ask the speakers during the Q&A panel to challenge standard assumptions.
3. How does this session's technology relate directly to Oman Vision 2040 and GCC enterprise systems?`;

    onConsultCopilot(prompt, 'general_query');
  };

  return (
    <section id="agenda" className="py-16 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Technical Symposium Agenda</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Sessions, Workshops & Keynotes
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
              2 days of intense technical exchange at the Oman Convention & Exhibition Centre (OCEC) Muscat. PRC CPD Accredited for up to 16 Units.
            </p>
          </div>

          {/* Day 1 / Day 2 Selector */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setSelectedDay(1)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedDay === 1
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Day 1: Nov 14 (Foundations & Keynotes)
            </button>
            <button
              type="button"
              onClick={() => setSelectedDay(2)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedDay === 2
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Day 2: Nov 15 (Workshops & Grand Finals)
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Track Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => setSelectedTrack('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedTrack === 'all'
                    ? 'bg-slate-800 border-slate-600 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                All Tracks
              </button>
              <button
                type="button"
                onClick={() => setSelectedTrack('ai-robotics')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedTrack === 'ai-robotics'
                    ? 'bg-cyan-950 border-cyan-600 text-cyan-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-cyan-400'
                }`}
              >
                AI & Autonomous
              </button>
              <button
                type="button"
                onClick={() => setSelectedTrack('cloud-sovereign')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedTrack === 'cloud-sovereign'
                    ? 'bg-blue-950 border-blue-600 text-blue-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-blue-400'
                }`}
              >
                Sovereign Cloud & Cyber
              </button>
              <button
                type="button"
                onClick={() => setSelectedTrack('embedded-iot')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedTrack === 'embedded-iot'
                    ? 'bg-amber-950 border-amber-600 text-amber-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-400'
                }`}
              >
                Embedded Silicon & IoT
              </button>
              <button
                type="button"
                onClick={() => setSelectedTrack('cpe-mastery')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedTrack === 'cpe-mastery'
                    ? 'bg-purple-950 border-purple-600 text-purple-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-purple-400'
                }`}
              >
                CpE Mastery & CPD
              </button>
            </div>

            {/* Search Input & Saved Toggle */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search session or speaker..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/70"
                />
              </div>

              <button
                type="button"
                onClick={() => setOnlySaved(!onlySaved)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  onlySaved
                    ? 'bg-amber-950/80 border-amber-600 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>My Bookmarks ({savedSessionIds.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        {filteredSessions.length === 0 ? (
          <div className="text-center py-16 bg-slate-950 rounded-2xl border border-slate-800">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-300">No sessions match your filter</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search query, selecting another track, or toggling off the bookmark filter.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSessions.map((session) => {
              const isSaved = savedSessionIds.includes(session.id);
              const speakers = session.speakerIds
                .map((id) => getSpeaker(id))
                .filter(Boolean);

              return (
                <div
                  key={session.id}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-cyan-500/40 transition-all shadow-xl group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Meta header */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {getTrackBadge(session.track)}

                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                          {session.type.toUpperCase()}
                        </span>

                        <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-950/60 text-blue-300 border border-blue-900">
                          <Award className="w-3 h-3 text-blue-400" />
                          <span>{session.cpdUnits} PRC CPD Units</span>
                        </span>

                        <span className="text-xs text-slate-500 ml-auto sm:ml-0">
                          Level: <strong className="text-slate-300">{session.level}</strong>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {session.title}
                      </h3>

                      {/* Abstract */}
                      <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                        {session.abstract}
                      </p>

                      {/* Prerequisites if any */}
                      {session.prerequisites && session.prerequisites.length > 0 && (
                        <div className="mt-2 text-[11px] text-amber-300/90 flex items-center gap-1.5">
                          <span className="font-semibold text-amber-400">Prerequisites:</span>
                          <span>{session.prerequisites.join(', ')}</span>
                        </div>
                      )}

                      {/* Speakers and Tags */}
                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                          {speakers.map((spk: any) => (
                            <div key={spk.id} className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800">
                              <img
                                src={spk.avatar}
                                alt={spk.name}
                                className="w-5 h-5 rounded-full object-cover"
                              />
                              <span className="text-xs font-medium text-slate-200">{spk.name}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          {session.tags.map((tag, idx) => (
                            <span key={idx} className="text-[10px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-850">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Info & Actions Column */}
                    <div className="lg:w-64 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-850 pt-4 lg:pt-0 lg:pl-6 gap-3">
                      <div className="space-y-1.5 text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-cyan-400" />
                          <span className="font-semibold text-slate-200">{session.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-amber-400" />
                          <span>{session.room}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 pt-2">
                        {/* Bookmark button */}
                        <button
                          type="button"
                          onClick={() => onToggleSaveSession(session.id)}
                          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                            isSaved
                              ? 'bg-amber-950/60 border-amber-600 text-amber-300'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                          }`}
                        >
                          {isSaved ? (
                            <>
                              <BookmarkCheck className="w-4 h-4 text-amber-400" />
                              <span>Bookmarked in Schedule</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="w-4 h-4" />
                              <span>Add to My Schedule</span>
                            </>
                          )}
                        </button>

                        {/* Ask Argon Copilot button */}
                        <button
                          type="button"
                          onClick={() => handleAskCopilotForSession(session)}
                          className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-800/80 text-xs font-semibold shadow transition-all group/btn"
                        >
                          <Brain className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:animate-pulse" />
                          <span>Consult Argon Copilot</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
