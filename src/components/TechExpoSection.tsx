import React, { useState } from 'react';
import { 
  Lightbulb, 
  ThumbsUp, 
  Brain, 
  Cpu, 
  Sparkles, 
  Code, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { SHOWCASE_PROJECTS } from '../data/conferenceData';
import { ShowcaseProject } from '../types';

interface TechExpoSectionProps {
  onEvaluateWithCopilot: (project: ShowcaseProject) => void;
}

export const TechExpoSection: React.FC<TechExpoSectionProps> = ({ onEvaluateWithCopilot }) => {
  const [projects, setProjects] = useState<ShowcaseProject[]>(SHOWCASE_PROJECTS);
  const [votedProjectIds, setVotedProjectIds] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const handleVote = (id: string) => {
    if (votedProjectIds.includes(id)) return;

    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, votes: p.votes + 1 } : p))
    );
    setVotedProjectIds((prev) => [...prev, id]);
  };

  const filtered = filterCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === filterCategory);

  return (
    <section id="expo" className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Innovation Showcase & Hackathon</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Tech Expo & Capstone Exhibits
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
              Breakthrough computer engineering prototypes developed by ICPeP Oman members, Sultan Qaboos University researchers, and industry fellows.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {['all', 'IoT & Smart Cities', 'Cloud & Cybersecurity', 'Robotics & Hardware', 'AI & Machine Vision'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  filterCategory === cat
                    ? 'bg-amber-950/80 border-amber-600 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => {
            const hasVoted = votedProjectIds.includes(project.id);

            return (
              <div
                key={project.id}
                className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 p-6 flex flex-col justify-between transition-all shadow-xl group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-950 text-amber-400 border border-slate-800">
                      {project.category}
                    </span>

                    {project.featured && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800">
                        <Sparkles className="w-3 h-3" />
                        <span>Award Finalist</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-0.5 font-medium">
                    Lead: {project.leadEngineer} • {project.institution}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-850 text-xs text-slate-400 italic">
                    "{project.abstractSnippet}"
                  </div>

                  {/* Tech stack pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono bg-slate-950 text-slate-300 px-2 py-0.5 rounded-md border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleVote(project.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                      hasVoted
                        ? 'bg-amber-950/70 border-amber-500 text-amber-300'
                        : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'text-amber-400 fill-amber-400' : ''}`} />
                    <span>{project.votes} Votes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onEvaluateWithCopilot(project)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 text-xs font-semibold transition-colors"
                  >
                    <Brain className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Evaluate with Argon Copilot</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
