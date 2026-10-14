import React from 'react';
import { 
  Award, 
  MapPin, 
  ShieldCheck, 
  Users, 
  FileCheck2, 
  Globe2, 
  Plane, 
  Building2,
  ExternalLink
} from 'lucide-react';
import { CHAPTER_BOARD, CONFERENCE_INFO } from '../data/conferenceData';

export const AboutChapterSection: React.FC = () => {
  return (
    <section id="chapter" className="py-16 bg-slate-900/50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-800/80 text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Professional Engineering Accreditation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            ICPeP Oman Chapter & CPD Governance
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Elevating Filipino computer engineers and technology professionals across the Sultanate of Oman and the wider Gulf region.
          </p>
        </div>

        {/* 2-Column Info: About ICPeP Oman & PRC CPD Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          {/* Chapter Overview */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-600/40 flex items-center justify-center text-cyan-400 font-bold">
                CpE
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  About ICPeP Oman Foreign Chapter
                </h3>
                <p className="text-xs text-slate-400">
                  Institute of Computer Engineers of the Philippines
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The <strong>Institute of Computer Engineers of the Philippines – Oman Chapter</strong> is the premier professional organization uniting Filipino Computer Engineers, Systems Architects, and Software Innovators practicing in the Sultanate of Oman.
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Operating in collaboration with ICPeP National and the Philippine Professional Regulation Commission (PRC), the chapter provides high-impact technical programs, continuing professional development (CPD) certification, and a bridge toward the ASEAN Chartered Professional Engineer (ACPE) register.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-850">
                <p className="font-bold text-cyan-400 text-base">500+</p>
                <p className="text-slate-400">Regional Member Engineers</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-850">
                <p className="font-bold text-blue-400 text-base">16.0</p>
                <p className="text-slate-400">PRC CPD Units per Summit</p>
              </div>
            </div>
          </div>

          {/* CPD Guidance */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-600/40 flex items-center justify-center text-blue-400">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  PRC-CPD Accreditation & License Renewal
                </h3>
                <p className="text-xs text-slate-400">
                  Guidelines for PRC Registered Engineers & ACPE Applicants
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Certificate Issuance:</strong> All registered participants who attend sessions and verify NFC badges receive an official QR-verifiable Certificate of Attendance.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>CPDAS Online Filing:</strong> Certificates include the PRC-approved Program Accreditation Number for direct upload to the PRC CPDAS online portal.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>ASEAN Mobility Pathway:</strong> Attendance counts toward the mandatory continuing professional development hours required for ASEAN Chartered Professional Engineer (ACPE) endorsement.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/60 text-xs text-blue-200">
              💡 <em>Tip: Use the Argon Copilot in the app to analyze your engineering experience and map it directly to required CPD competency clusters!</em>
            </div>
          </div>
        </div>

        {/* 2026 Chapter Executive Board */}
        <div className="mb-14">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            2026 ICPeP Oman Chapter Executive Officers
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHAPTER_BOARD.map((officer, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {officer.name}
                  </h4>
                  <p className="text-xs text-cyan-400 font-medium">
                    {officer.role}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {officer.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Venue & Travel to Muscat Guide */}
        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Venue & Travel Information
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Oman Convention & Exhibition Centre (OCEC)
              </h3>
              <p className="text-xs text-slate-400">
                Madinat Al Irfan, Muscat, Sultanate of Oman
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium bg-slate-900 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>10 mins from Muscat Intl. Airport (MCT)</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-850">
              <div className="flex items-center gap-2 font-bold text-white mb-2">
                <Plane className="w-4 h-4 text-cyan-400" />
                <span>Air Travel & E-Visa</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Direct flights into Muscat International Airport (MCT). GCC residents and Philippine passport holders with GCC residence can obtain e-visas online via the Royal Oman Police portal.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-850">
              <div className="flex items-center gap-2 font-bold text-white mb-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>Partner Accommodations</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Preferred rates available for TechTalk2026 delegates at JW Marriott Muscat and Crowne Plaza OCEC, both connected directly to the convention complex.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-850">
              <div className="flex items-center gap-2 font-bold text-white mb-2">
                <Globe2 className="w-4 h-4 text-emerald-400" />
                <span>Attire & Local Etiquette</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Official symposium dress code is Business Casual / Professional Engineering attire. Oman is renowned for warm hospitality and safety across all governorates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
