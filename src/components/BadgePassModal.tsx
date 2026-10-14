import React, { useState } from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  QrCode, 
  Radio, 
  Printer, 
  Sparkles, 
  Download, 
  MapPin, 
  Calendar,
  ShieldCheck,
  User
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AttendeeBadge } from '../types';

interface BadgePassModalProps {
  badge: AttendeeBadge | null;
  onClose: () => void;
  onUpdateBadge: (badge: AttendeeBadge) => void;
}

export const BadgePassModal: React.FC<BadgePassModalProps> = ({ 
  badge, 
  onClose,
  onUpdateBadge 
}) => {
  const [nfcSimulating, setNfcSimulating] = useState(false);

  if (!badge) return null;

  const handleSimulateCheckIn = () => {
    setNfcSimulating(true);
    setTimeout(() => {
      const updated = {
        ...badge,
        checkedIn: true,
        cpdUnitsAccumulated: Math.min(16, (badge.cpdUnitsAccumulated || 0) + 4.5),
      };
      onUpdateBadge(updated);
      setNfcSimulating(false);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#06b6d4', '#10b981', '#3b82f6'],
      });
    }, 800);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lanyard Cutout Illusion */}
        <div className="w-16 h-3 bg-slate-950 rounded-full mx-auto mb-4 border border-slate-700/60" />

        {/* Holographic Badge Card */}
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/40 p-5 shadow-2xl overflow-hidden">
          {/* Subtle light sweep */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Organization Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xs">
                TT26
              </div>
              <div>
                <p className="text-[11px] font-bold text-white tracking-tight">ICPeP Oman Chapter</p>
                <p className="text-[9px] text-cyan-400 font-medium">Muscat, Sultanate of Oman</p>
              </div>
            </div>

            <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              {badge.category}
            </span>
          </div>

          {/* Attendee Details */}
          <div className="py-5 text-center relative z-10">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 border-2 border-cyan-400/80 p-1 mb-3 shadow-lg flex items-center justify-center">
              <User className="w-10 h-10 text-cyan-300" />
            </div>

            <h3 className="text-xl font-extrabold text-white tracking-tight">
              {badge.fullName}
            </h3>

            <p className="text-xs font-semibold text-cyan-400 mt-0.5">
              {badge.jobTitle}
            </p>

            <p className="text-xs text-slate-400">
              {badge.organization}
            </p>

            {badge.icpepId && (
              <p className="text-[10px] font-mono text-slate-500 mt-1">
                ID: {badge.icpepId}
              </p>
            )}
          </div>

          {/* CPD Accumulator Tracker */}
          <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 mb-4 text-xs relative z-10">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                PRC CPD Units Earned:
              </span>
              <strong className="text-white font-mono text-sm">
                {badge.cpdUnitsAccumulated} / 16.0
              </strong>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-500"
                style={{ width: `${(badge.cpdUnitsAccumulated / 16) * 100}%` }}
              />
            </div>
          </div>

          {/* Simulated QR & Barcode Section */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 relative z-10">
            <div className="w-16 h-16 bg-white p-1 rounded-lg flex items-center justify-center flex-shrink-0 shadow">
              {/* Simulated QR matrix icon */}
              <QrCode className="w-14 h-14 text-slate-950" />
            </div>

            <div className="flex-1 text-left">
              <p className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                PASS: {badge.id}
              </p>
              <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>OCEC Muscat Grand Ballroom</span>
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                {badge.checkedIn ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Checked-In at OCEC</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500">
                    Awaiting Venue Check-in
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-5 space-y-2">
          <button
            type="button"
            disabled={nfcSimulating}
            onClick={handleSimulateCheckIn}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg transition-all disabled:opacity-50"
          >
            <Radio className={`w-4 h-4 ${nfcSimulating ? 'animate-spin' : ''}`} />
            <span>
              {nfcSimulating 
                ? 'Simulating NFC Turnstile Tap...' 
                : badge.checkedIn 
                ? 'Simulate Session Attendance (+4.5 CPD)' 
                : 'Simulate NFC Tap Check-In (Muscat OCEC)'}
            </span>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Badge</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
