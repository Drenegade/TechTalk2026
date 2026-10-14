import React from 'react';
import { 
  Award, 
  Brain, 
  MapPin, 
  Mail, 
  Globe, 
  ShieldCheck, 
  Heart 
} from 'lucide-react';
import { CONFERENCE_INFO } from '../data/conferenceData';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Theme */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xs">
                TT26
              </div>
              <span className="text-base font-extrabold text-white">
                TechTalk2026
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed text-[11px]">
              Flagship Technical Symposium organized by the Institute of Computer Engineers of the Philippines (ICPeP) – Oman Chapter.
            </p>

            <div className="flex items-center gap-1.5 text-cyan-400 text-[11px]">
              <Brain className="w-3.5 h-3.5" />
              <span>Gemini 4 Argon High-Thinking Enabled</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Symposium
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => scrollTo('agenda')} className="hover:text-cyan-400 transition-colors">
                  Keynote & Workshop Agenda
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('speakers')} className="hover:text-cyan-400 transition-colors">
                  Distinguished Speakers
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('ai-copilot')} className="hover:text-cyan-400 transition-colors">
                  Argon Deep Reasoning Copilot
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('expo')} className="hover:text-cyan-400 transition-colors">
                  Tech Expo & Project Voting
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('registration')} className="hover:text-cyan-400 transition-colors">
                  Digital Badge Pass Registration
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Chapter & Accreditation */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Accreditation
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li className="flex items-center gap-1.5 text-slate-300">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span>16 PRC CPD Units Program</span>
              </li>
              <li>Philippine Professional Regulation Commission (PRC)</li>
              <li>ASEAN Chartered Professional Engineer (ACPE)</li>
              <li>ICPeP National Advisory Council</li>
              <li>Oman Vision 2040 Digital Ecosystem</li>
            </ul>
          </div>

          {/* Col 4: Contact & Venue */}
          <div className="space-y-2 text-[11px]">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Secretariat & Venue
            </h4>
            <p className="flex items-start gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>Oman Convention & Exhibition Centre (OCEC), Muscat, Sultanate of Oman</span>
            </p>
            <p className="flex items-center gap-1.5 text-slate-400">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>techtalk2026@icpep-oman.org</span>
            </p>
            <p className="flex items-center gap-1.5 text-slate-400">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>www.icpep-oman.org</span>
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© 2026 Institute of Computer Engineers of the Philippines (ICPeP) – Oman Chapter. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Designed for Global Computer Engineers</span>
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>Muscat, Oman</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
