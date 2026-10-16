import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Award, 
  Brain, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  Cpu, 
  Clock,
  Compass
} from 'lucide-react';
import { CONFERENCE_INFO } from '../data/conferenceData';

interface HeroProps {
  onRegisterClick: () => void;
  onExploreAgenda: () => void;
  onLaunchCopilot: (prompt?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onRegisterClick, 
  onExploreAgenda, 
  onLaunchCopilot 
}) => {
  // Target date: November 14, 2026 09:00:00 (Muscat Time UTC+4)
  const targetDate = new Date('2026-11-14T09:00:00+04:00').getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section id="hero" className="relative pt-12 pb-20 bg-slate-950 overflow-hidden border-b border-slate-800">
      {/* Decorative Grid and Ambient Lights */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-cyan-500/20 via-blue-600/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs text-slate-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>4th Annual Flagship Symposium</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-600/50 text-xs text-blue-300 font-medium">
            <Award className="w-3.5 h-3.5 text-blue-400" />
            <span>16 PRC CPD Units Accredited</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-600/50 text-xs text-cyan-300 font-medium">
            <Brain className="w-3.5 h-3.5 text-cyan-400" />
            <span>Gemini 4 Argon High Thinking Enabled</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 
            style={{ color: '#2810c3' }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none"
          >
            TechTalk<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">2026</span>
          </h1>

          <p className="mt-3 text-lg sm:text-2xl font-bold text-slate-200">
            Institute of Computer Engineers of the Philippines (ICPeP) – Oman Chapter
          </p>

          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            "Pioneering Intelligent Frontiers: Oman Vision 2040, Sustainable Computing & Next-Gen Cyber-Physical Systems"
          </p>

          {/* Date, Location, Venue Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 shadow-xl">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-white">{CONFERENCE_INFO.dates}</span>
            </div>
            <div className="hidden sm:block text-slate-700">|</div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Oman Convention & Exhibition Centre, Muscat</span>
            </div>
            <div className="hidden sm:block text-slate-700">|</div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>In-Person & Global Hybrid Stream</span>
            </div>
          </div>

          {/* Live Countdown Clock */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-400 tracking-wider uppercase mb-3">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Countdown to TechTalk2026 Muscat</span>
            </div>

            <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shadow-lg">
                <span className="block text-2xl sm:text-4xl font-extrabold text-cyan-300 font-mono">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">Days</span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shadow-lg">
                <span className="block text-2xl sm:text-4xl font-extrabold text-white font-mono">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">Hours</span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shadow-lg">
                <span className="block text-2xl sm:text-4xl font-extrabold text-white font-mono">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">Mins</span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shadow-lg">
                <span className="block text-2xl sm:text-4xl font-extrabold text-cyan-400 font-mono">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">Secs</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onRegisterClick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>Register & Generate Badge</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => onLaunchCopilot()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-cyan-300 border border-cyan-500/50 hover:border-cyan-400 font-semibold text-sm sm:text-base shadow-xl transition-all"
            >
              <Brain className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span>Launch Argon AI Copilot</span>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded font-mono border border-cyan-800">
                HIGH
              </span>
            </button>

            <button
              type="button"
              onClick={onExploreAgenda}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-850 text-slate-300 border border-slate-800 hover:text-white font-medium text-sm transition-all"
            >
              <span>Explore Agenda</span>
            </button>
          </div>
        </div>

        {/* 4 Feature Value Pillars */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Track 1: AI & Autonomous</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deep reasoning models, multi-modal agents, vision-language robotics, and Oman Vision 2040 smart industry.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Track 2: Sovereign Cloud</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              GCC data sovereignty, confidential enclaves, Zero Trust architectures, and OT/SCADA critical protection.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Track 3: Embedded & IoT</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Custom RISC-V silicon, 55°C desert thermal management, TinyML sensors, and solar-harvested telemetry.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Track 4: CpE Mastery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              16 PRC CPD Units, ASEAN Chartered Professional Engineer (ACPE) pathways, and Philippine-Oman bilateral engineering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
