import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ArgonCopilot } from './components/ArgonCopilot';
import { AgendaSection } from './components/AgendaSection';
import { SpeakersSection } from './components/SpeakersSection';
import { TechExpoSection } from './components/TechExpoSection';
import { RegistrationSection } from './components/RegistrationSection';
import { AboutChapterSection } from './components/AboutChapterSection';
import { Footer } from './components/Footer';
import { BadgePassModal } from './components/BadgePassModal';
import { AttendeeBadge, Speaker, ShowcaseProject, CopilotMode } from './types';

export default function App() {
  const [userBadge, setUserBadge] = useState<AttendeeBadge | null>(null);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [savedSessionIds, setSavedSessionIds] = useState<string[]>([]);

  // Copilot preloaded states
  const [copilotPrompt, setCopilotPrompt] = useState<string>('');
  const [copilotMode, setCopilotMode] = useState<CopilotMode>('general_query');

  // Load saved badge and schedule bookmarks from localStorage on startup
  useEffect(() => {
    try {
      const storedBadge = localStorage.getItem('techtalk2026_badge');
      if (storedBadge) {
        setUserBadge(JSON.parse(storedBadge));
      } else {
        // Provide a default sample badge for an authentic instant experience
        const defaultSampleBadge: AttendeeBadge = {
          id: 'TT26-884210',
          fullName: 'Engr. Jayson Morales, CpE',
          email: 'jayson.morales@techtalk2026.org',
          organization: 'Nama Water / ICPeP Oman Fellow',
          jobTitle: 'Senior Systems & SCADA Architect',
          category: 'ICPeP Oman Member',
          icpepId: 'PRC-CPE-004921',
          qrCodeValue: 'TT26-PASS-884210-JAYSON-MORALES',
          registeredDate: 'Nov 1, 2026',
          cpdUnitsAccumulated: 4.5,
          checkedIn: true,
        };
        setUserBadge(defaultSampleBadge);
        localStorage.setItem('techtalk2026_badge', JSON.stringify(defaultSampleBadge));
      }

      const storedBookmarks = localStorage.getItem('techtalk2026_bookmarks');
      if (storedBookmarks) {
        setSavedSessionIds(JSON.parse(storedBookmarks));
      } else {
        // Pre-save key sessions
        const initial = ['ses-101', 'ses-102', 'ses-203'];
        setSavedSessionIds(initial);
        localStorage.setItem('techtalk2026_bookmarks', JSON.stringify(initial));
      }
    } catch (e) {
      console.error('LocalStorage load error', e);
    }
  }, []);

  const handleToggleSaveSession = (sessionId: string) => {
    setSavedSessionIds((prev) => {
      const updated = prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId];
      localStorage.setItem('techtalk2026_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  const handleBadgeCreated = (badge: AttendeeBadge) => {
    setUserBadge(badge);
    localStorage.setItem('techtalk2026_badge', JSON.stringify(badge));
    setIsBadgeModalOpen(true);
  };

  const handleUpdateBadge = (badge: AttendeeBadge) => {
    setUserBadge(badge);
    localStorage.setItem('techtalk2026_badge', JSON.stringify(badge));
  };

  const scrollToCopilot = (prompt?: string, mode?: CopilotMode) => {
    if (prompt) setCopilotPrompt(prompt);
    if (mode) setCopilotMode(mode);

    const el = document.getElementById('ai-copilot');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConsultFromSession = (prompt: string, mode?: CopilotMode) => {
    scrollToCopilot(prompt, mode || 'general_query');
  };

  const handleAskAboutSpeaker = (speaker: Speaker) => {
    const prompt = `Formulate a comprehensive deep technical inquiry for ${speaker.name} (${speaker.title} at ${speaker.organization}).
Specialties: ${speaker.specialty.join(', ')}.
Context: They are speaking at TechTalk2026 Muscat on computer engineering and cyber-physical systems.
Draft:
1. Two high-reasoning questions regarding real-world hardware/software constraints and trade-offs.
2. An inquiry into how their work aligns with Oman Vision 2040 and GCC technology localization.
3. Recommended pre-reading research topics for engineers in their audience.`;

    scrollToCopilot(prompt, 'general_query');
  };

  const handleEvaluateProject = (project: ShowcaseProject) => {
    const prompt = `Perform an exhaustive peer-review and technical evaluation of the TechTalk2026 capstone project:
Title: "${project.title}"
Lead: ${project.leadEngineer} (${project.institution})
Category: ${project.category}
Tech Stack: ${project.techStack.join(', ')}
Summary: ${project.summary}
Abstract Snippet: ${project.abstractSnippet}

As the Argon Chief Engineering Reviewer:
1. Conduct an architectural breakdown of the hardware/software stack.
2. Identify potential thermal, bandwidth, latency, and power failure modes (especially under Muscat / GCC 50°C+ climate).
3. Benchmark against international IEEE/ACM standards.
4. Provide concrete algorithmic or schematic recommendations to prepare this project for commercial spin-off or patenting in Oman.`;

    scrollToCopilot(prompt, 'research_evaluator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Navigation */}
      <Navbar
        onOpenBadgeModal={() => setIsBadgeModalOpen(true)}
        onNavigateToCopilot={(prompt) => scrollToCopilot(prompt)}
        badgeCount={userBadge ? 1 : 0}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Banner with Live Countdown */}
        <Hero
          onRegisterClick={() => {
            const el = document.getElementById('registration');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreAgenda={() => {
            const el = document.getElementById('agenda');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onLaunchCopilot={(prompt) => scrollToCopilot(prompt)}
        />

        {/* Flagship Feature: Argon Copilot (gemini-4-argon with ThinkingLevel.HIGH) */}
        <ArgonCopilot
          initialPrompt={copilotPrompt}
          initialMode={copilotMode}
          onClearInitial={() => setCopilotPrompt('')}
        />

        {/* Agenda & Tracks */}
        <AgendaSection
          onConsultCopilot={handleConsultFromSession}
          savedSessionIds={savedSessionIds}
          onToggleSaveSession={handleToggleSaveSession}
        />

        {/* Speakers Section */}
        <SpeakersSection onAskAboutSpeaker={handleAskAboutSpeaker} />

        {/* Tech Expo & Innovation Projects */}
        <TechExpoSection onEvaluateWithCopilot={handleEvaluateProject} />

        {/* Delegate Registration & Badge Generator */}
        <RegistrationSection
          onBadgeCreated={handleBadgeCreated}
          existingBadge={userBadge}
          onOpenBadge={() => setIsBadgeModalOpen(true)}
        />

        {/* ICPeP Oman Chapter Leadership & CPD Guidance */}
        <AboutChapterSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Holographic Digital Pass Modal */}
      {isBadgeModalOpen && (
        <BadgePassModal
          badge={userBadge}
          onClose={() => setIsBadgeModalOpen(false)}
          onUpdateBadge={handleUpdateBadge}
        />
      )}
    </div>
  );
}
