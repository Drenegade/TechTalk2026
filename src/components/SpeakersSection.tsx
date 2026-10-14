import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Brain, 
  Sparkles, 
  ExternalLink, 
  X, 
  Award,
  BookOpen
} from 'lucide-react';
import { SPEAKERS, SESSIONS } from '../data/conferenceData';
import { Speaker } from '../types';

interface SpeakersSectionProps {
  onAskAboutSpeaker: (speaker: Speaker) => void;
}

export const SpeakersSection: React.FC<SpeakersSectionProps> = ({ onAskAboutSpeaker }) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const getSpeakerSessions = (speakerId: string) => {
    return SESSIONS.filter((s) => s.speakerIds.includes(speakerId));
  };

  return (
    <section id="speakers" className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Distinguished Faculty & Keynotes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Speakers & Industry Leaders
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Pioneering computer engineers, sovereign cloud architects, Sultan Qaboos University researchers, and ICPeP National advisors leading TechTalk2026.
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPEAKERS.map((speaker) => (
            <div
              key={speaker.id}
              className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-6 flex flex-col justify-between transition-all shadow-xl group"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={speaker.avatar}
                      alt={speaker.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700 group-hover:border-cyan-400 transition-colors shadow-md"
                    />
                    {speaker.featured && (
                      <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-cyan-500 text-slate-950 shadow">
                        <Sparkles className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {speaker.name}
                    </h3>
                    <p className="text-xs text-cyan-400/90 font-medium line-clamp-1">
                      {speaker.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {speaker.organization}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{speaker.country}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {speaker.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {speaker.specialty.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium bg-slate-950 text-slate-300 px-2 py-0.5 rounded-md border border-slate-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSpeaker(speaker)}
                  className="text-xs text-slate-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>View Bio & Sessions</span>
                </button>

                <button
                  type="button"
                  onClick={() => onAskAboutSpeaker(speaker)}
                  className="px-2.5 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/80 text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Brain className="w-3 h-3 text-cyan-400" />
                  <span>Argon Q&A</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Speaker Details Modal */}
      {selectedSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              type="button"
              onClick={() => setSelectedSpeaker(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
              <img
                src={selectedSpeaker.avatar}
                alt={selectedSpeaker.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-cyan-500 shadow-xl"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedSpeaker.name}
                </h3>
                <p className="text-sm font-semibold text-cyan-400 mt-1">
                  {selectedSpeaker.title}
                </p>
                <p className="text-xs text-slate-300 mt-0.5">
                  {selectedSpeaker.organization}
                </p>
                <p className="text-xs text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedSpeaker.country}</span>
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Biography & Credentials</h4>
                <p>{selectedSpeaker.bio}</p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-2">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSpeaker.specialty.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-300 text-xs font-medium border border-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm mb-2">TechTalk2026 Sessions</h4>
                <div className="space-y-2">
                  {getSpeakerSessions(selectedSpeaker.id).map((session) => (
                    <div
                      key={session.id}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{session.title}</p>
                        <p className="text-[11px] text-slate-400">
                          Day {session.day} • {session.time} • {session.room}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-900 whitespace-nowrap">
                        {session.cpdUnits} CPD
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  const spk = selectedSpeaker;
                  setSelectedSpeaker(null);
                  onAskAboutSpeaker(spk);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg"
              >
                <Brain className="w-4 h-4" />
                <span>Formulate Technical Questions with Argon Copilot</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
