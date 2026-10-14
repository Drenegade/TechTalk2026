import React, { useState } from 'react';
import { 
  Ticket, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  UserCheck, 
  Sparkles,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AttendeeBadge } from '../types';

interface RegistrationSectionProps {
  onBadgeCreated: (badge: AttendeeBadge) => void;
  existingBadge: AttendeeBadge | null;
  onOpenBadge: () => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  onBadgeCreated,
  existingBadge,
  onOpenBadge,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [category, setCategory] = useState<AttendeeBadge['category']>('Professional CpE');
  const [icpepId, setIcpepId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    setIsSubmitting(true);

    const newBadge: AttendeeBadge = {
      id: `TT26-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName: fullName.trim(),
      email: email.trim(),
      organization: organization.trim() || 'Independent Computer Engineer',
      jobTitle: jobTitle.trim() || 'Systems Engineer',
      category,
      icpepId: icpepId.trim() || undefined,
      qrCodeValue: `TT26-PASS-${Date.now()}-${fullName.replace(/\s+/g, '')}`,
      registeredDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      cpdUnitsAccumulated: 0,
      checkedIn: false,
    };

    setTimeout(() => {
      onBadgeCreated(newBadge);
      setIsSubmitting(false);

      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#3b82f6', '#f59e0b', '#10b981'],
      });
    }, 600);
  };

  return (
    <section id="registration" className="py-16 bg-slate-900/80 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Event Registration Value */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Ticket className="w-3.5 h-3.5" />
              <span>Official Delegate Registration</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Secure Your Delegate Pass for TechTalk2026 Muscat
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed">
              Join fellow computer engineers, researchers, and technology leaders at the Sultanate’s premier technical summit. Registration includes full access to all 4 tracks, hands-on workshops, CPD unit certificates, and the AI Argon Research Copilot.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-white">PRC CPD Units Accreditation</p>
                  <p className="text-slate-400">Up to 16 certified CPD units for CpE / ECE PRC license renewal and ASEAN Engineering register.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-white">Digital Holographic NFC Pass</p>
                  <p className="text-slate-400">Instant barcode, QR check-in, and personalized symposium itinerary access.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-white">Full Access to Tech Expo & Hackathon</p>
                  <p className="text-slate-400">Network with leading technology vendors, startup founders, and engineering mentors.</p>
                </div>
              </div>
            </div>

            {existingBadge && (
              <div className="p-4 rounded-2xl bg-cyan-950/60 border border-cyan-600/50 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <QrCode className="w-8 h-8 text-cyan-400" />
                    <div>
                      <p className="text-xs font-bold text-white">You are Registered!</p>
                      <p className="text-[11px] text-cyan-300">Badge ID: {existingBadge.id}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenBadge}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold shadow hover:bg-cyan-400 transition-colors"
                  >
                    View Pass
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Registration Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl p-6 sm:p-8 relative">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Delegate Registration Form
                  </h3>
                  <p className="text-xs text-slate-400">
                    November 14-15, 2026 • OCEC Muscat, Sultanate of Oman
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Open Registration
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name (as in PRC ID / Passport) *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Engr. Juan Dela Cruz, CpE"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Corporate / Official Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="juan.delacruz@company.com"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Organization / Company / University
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g., Nama Water / PDO / SQU / Tech LLC"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Job Title / Specialization
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g., Senior Systems Architect"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Delegate Category
                    </label>
                    <select
                      value={category}
                      onChange={(e: any) => setCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Professional CpE">Professional CpE (PRC Licensed)</option>
                      <option value="ICPeP Oman Member">ICPeP Oman Member (Discounted)</option>
                      <option value="Student / Researcher">Student / Academic Researcher</option>
                      <option value="Speaker / VIP">Speaker / VIP Delegate</option>
                      <option value="Sponsor Delegate">Sponsor & Corporate Delegate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      ICPeP / PRC License No. (Optional)
                    </label>
                    <input
                      type="text"
                      value={icpepId}
                      onChange={(e) => setIcpepId(e.target.value)}
                      placeholder="e.g., PRC-CPE-0012345"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Generating Digital Badge...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Confirm Registration & Generate Digital Badge</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
