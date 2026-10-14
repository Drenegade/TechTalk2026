import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Brain, 
  Ticket, 
  Calendar, 
  Users, 
  Lightbulb, 
  Info, 
  Award,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { CONFERENCE_INFO } from '../data/conferenceData';

interface NavbarProps {
  onOpenBadgeModal: () => void;
  onNavigateToCopilot: (prompt?: string) => void;
  badgeCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenBadgeModal, 
  onNavigateToCopilot,
  badgeCount = 0 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-lg tracking-tighter">
                  TT26
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  TechTalk2026
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                  Muscat
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 tracking-wide">
                ICPeP Oman Chapter • CpE Annual Summit
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button 
              onClick={() => scrollToSection('hero')}
              className="hover:text-cyan-400 transition-colors"
            >
              Overview
            </button>
            <button 
              onClick={() => scrollToSection('agenda')}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Agenda & Tracks</span>
            </button>
            <button 
              onClick={() => scrollToSection('speakers')}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Users className="w-4 h-4 text-slate-400" />
              <span>Speakers</span>
            </button>
            <button 
              onClick={() => {
                scrollToSection('ai-copilot');
                onNavigateToCopilot();
              }}
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 font-semibold"
            >
              <Brain className="w-4 h-4 animate-pulse text-cyan-400" />
              <span>Argon AI Copilot</span>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.2 rounded font-mono">
                HIGH
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('expo')}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Lightbulb className="w-4 h-4 text-slate-400" />
              <span>Tech Expo</span>
            </button>
            <button 
              onClick={() => scrollToSection('chapter')}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-slate-400" />
              <span>CPD & Chapter</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenBadgeModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 text-xs font-semibold shadow transition-all"
            >
              <Ticket className="w-4 h-4 text-amber-400" />
              <span>{badgeCount > 0 ? 'View Digital Pass' : 'Get Pass / Badge'}</span>
              {badgeCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              )}
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('registration')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
            >
              <span>Register Delegate</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={onOpenBadgeModal}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-400"
              title="Digital Pass"
            >
              <Ticket className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-cyan-400"
            >
              Overview
            </button>
            <button 
              onClick={() => scrollToSection('agenda')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-cyan-400 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Agenda & Tracks</span>
            </button>
            <button 
              onClick={() => scrollToSection('speakers')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-cyan-400 flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Speakers</span>
            </button>
            <button 
              onClick={() => {
                scrollToSection('ai-copilot');
                onNavigateToCopilot();
              }}
              className="text-left px-3 py-2 rounded-lg bg-cyan-950/50 text-cyan-300 border border-cyan-800/50 flex items-center justify-between"
            >
              <span className="flex items-center gap-2 font-semibold">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span>Argon AI Copilot</span>
              </span>
              <span className="text-[10px] bg-cyan-900 text-cyan-200 px-1.5 py-0.5 rounded font-mono">
                Thinking HIGH
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('expo')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-cyan-400 flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              <span>Tech Expo & Projects</span>
            </button>
            <button 
              onClick={() => scrollToSection('chapter')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-cyan-400 flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-cyan-400" />
              <span>CPD & Chapter Leadership</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBadgeModal();
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4 text-amber-400" />
              <span>{badgeCount > 0 ? 'Open Digital Pass' : 'My Pass / Badge'}</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('registration')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-bold shadow-lg"
            >
              Register for TechTalk2026
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
