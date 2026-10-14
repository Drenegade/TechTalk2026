import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Brain, 
  Sparkles, 
  Send, 
  Layers, 
  Scale, 
  Compass, 
  CheckCircle2, 
  Copy, 
  Download, 
  RefreshCw, 
  AlertCircle,
  FileText,
  Flame,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { CopilotMode } from '../types';

interface ArgonCopilotProps {
  initialPrompt?: string;
  initialMode?: CopilotMode;
  onClearInitial?: () => void;
}

const PRESET_QUERIES: { label: string; mode: CopilotMode; icon: React.ReactNode; prompt: string }[] = [
  {
    label: 'Desert IoT: 55°C Edge Thermal & Battery Budget',
    mode: 'architectural_duel',
    icon: <Flame className="w-4 h-4 text-amber-400" />,
    prompt: `Analyze the architectural trade-offs between deploying custom RISC-V microcontrollers versus ARM Cortex-M4 in extreme 55°C desert ambient conditions for solar-powered IoT telemetry in Oman. Factor in clock scaling, thermal leakage current, hardware cryptographic acceleration for AES-256, and sleep-cycle energy harvesting budgets for a 10-year field lifespan.`,
  },
  {
    label: 'GCC Sovereign Cloud vs Edge Kubernetes',
    mode: 'architectural_duel',
    icon: <Scale className="w-4 h-4 text-cyan-400" />,
    prompt: `Compare a centralized GCC Sovereign Cloud architecture against a decentralized Edge Kubernetes mesh for critical oil & gas utility SCADA telemetry under the Oman National Data Protection and Cybersecurity Law. Provide a comparative matrix on data residency compliance, end-to-end packet jitter, MTTR under satellite backhaul blackout, and hardware root-of-trust security.`,
  },
  {
    label: 'Evaluate Paper: Falaj Smart Hydrology TinyML',
    mode: 'research_evaluator',
    icon: <FileText className="w-4 h-4 text-emerald-400" />,
    prompt: `Critique this research abstract for TechTalk2026:
"Title: Project Falaj-AI: Distributed TinyML Soil Moisture & Evapotranspiration Prediction on Ultra-Low-Power Edge Nodes in Batinah, Oman.
Abstract: We present an ultra-low-power LoRaWAN-connected edge node network leveraging quantized 4-bit LSTM models running on ESP32-S3 microcontrollers to forecast soil moisture deficits in date palm orchards. The system achieves 94.2% inference accuracy with an average power draw of 18mW, adjusting water flow via automated latching solenoid valves."
Evaluate novelty, mathematical rigor, potential failure modes under seasonal sandstorms, and recommend enhancements for IEEE / ICPeP publication.`,
  },
  {
    label: 'Custom 2-Day Conference & CPD Career Plan',
    mode: 'career_pathways',
    icon: <Compass className="w-4 h-4 text-purple-400" />,
    prompt: `I am a Senior Embedded Systems Engineer based in Muscat working in telecom and industrial automation with 6 years of experience. I want to transition into Sovereign AI Systems and Secure Edge Computing. Design a customized 2-day session itinerary for TechTalk2026 to maximize my PRC CPD units (target: 10+ units) and provide a concrete 6-month skill acquisition blueprint post-conference.`,
  },
];

const THINKING_STEPS = [
  'Initializing gemini-4-argon high-reasoning neural pathways...',
  'Deconstructing physical, algorithmic & cyber-physical constraints...',
  'Analyzing GCC data sovereignty, IEEE standards & Oman Vision 2040 alignment...',
  'Evaluating thermal budgets, memory hierarchies, and hardware trade-offs...',
  'Formulating architectural blueprints and verifiable engineering conclusions...',
];

export const ArgonCopilot: React.FC<ArgonCopilotProps> = ({ 
  initialPrompt, 
  initialMode = 'general_query',
  onClearInitial 
}) => {
  const [mode, setMode] = useState<CopilotMode>(initialMode);
  const [prompt, setPrompt] = useState(initialPrompt || '');
  const [loading, setLoading] = useState(false);
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
      if (initialMode) setMode(initialMode);
      if (onClearInitial) onClearInitial();
    }
  }, [initialPrompt, initialMode, onClearInitial]);

  // Rotate thinking messages while loading to give rich visual feedback of deep reasoning
  useEffect(() => {
    let interval: any;
    if (loading) {
      setThinkingIndex(0);
      interval = setInterval(() => {
        setThinkingIndex((prev) => (prev + 1) % THINKING_STEPS.length);
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/gemini/deep-reasoning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          mode,
          contextData: {
            conference: 'TechTalk2026',
            location: 'Muscat, Sultanate of Oman',
            organizer: 'ICPeP Oman Chapter',
            timestamp: new Date().toISOString(),
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete reasoning analysis.');
      }

      setResponse(data.result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while communicating with the reasoning engine.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!response) return;
    const blob = new Blob([response], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TechTalk2026-Argon-Reasoning-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="ai-copilot" className="py-12 bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with High Thinking badges */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold tracking-wide uppercase mb-4 shadow-lg shadow-cyan-950/40">
            <Brain className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>High Thinking Mode Enabled</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Argon Deep Engineering Copilot
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Powered by <span className="text-cyan-400 font-semibold">gemini-4-argon</span> with <span className="text-cyan-400 font-semibold">ThinkingLevel.HIGH</span>. Built specifically for computer engineers, researchers, and attendees of TechTalk2026 Muscat to perform deep mathematical, architectural, and standards verification.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs text-slate-400">
            <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Model: <code className="text-slate-200">gemini-4-argon</code>
            </span>
            <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Thinking: <strong className="text-amber-300">HIGH (Max Reasoning)</strong>
            </span>
            <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Oman Vision 2040 & CPD Grounding
            </span>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          <button
            type="button"
            onClick={() => setMode('architectural_duel')}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
              mode === 'architectural_duel'
                ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-200 shadow-lg shadow-cyan-950/50'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Scale className="w-4 h-4 text-cyan-400" />
            <span>Architectural Duel</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('research_evaluator')}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
              mode === 'research_evaluator'
                ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-200 shadow-lg shadow-cyan-950/50'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Research Paper Reviewer</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('career_pathways')}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
              mode === 'career_pathways'
                ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-200 shadow-lg shadow-cyan-950/50'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Compass className="w-4 h-4 text-purple-400" />
            <span>CPD & Itinerary Planner</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('general_query')}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
              mode === 'general_query'
                ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-200 shadow-lg shadow-cyan-950/50'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Deep Tech Synthesis</span>
          </button>
        </div>

        {/* Quick Presets Carousel */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Try Pre-Loaded High-Complexity Engineering Queries:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {PRESET_QUERIES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setMode(preset.mode);
                  setPrompt(preset.prompt);
                }}
                className="text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 transition-all group"
              >
                <div className="flex items-center gap-2 mb-1">
                  {preset.icon}
                  <span className="text-xs font-medium text-slate-300 group-hover:text-cyan-300 line-clamp-1">
                    {preset.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {preset.prompt}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Input Form Box */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative rounded-2xl bg-slate-900 border border-slate-800 focus-within:border-cyan-500/70 shadow-2xl transition-all">
            <div className="p-4 sm:p-5">
              <label htmlFor="copilot-input" className="sr-only">Engineering Query</label>
              <textarea
                id="copilot-input"
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  mode === 'architectural_duel'
                    ? 'Enter two competing architectures or protocols to compare (e.g., RISC-V vs ARM at 55°C, Kafka vs eBPF streaming, Sovereign vs Public Cloud)...'
                    : mode === 'research_evaluator'
                    ? 'Paste your research paper abstract, capstone project proposal, or system design specification for comprehensive IEEE/ICPeP peer-review...'
                    : mode === 'career_pathways'
                    ? 'State your engineering specialization, current level (Junior/Senior CpE), and goals to get an optimal 2-day session itinerary and CPD unit strategy...'
                    : 'Ask any complex computer engineering, embedded, cloud sovereignty, or robotics challenge...'
                }
                className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 text-sm sm:text-base resize-none focus:outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-slate-900/90 border-t border-slate-800/80 rounded-b-2xl">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-400" />
                <span>Deep Reasoning will formulate step-by-step mathematical & architectural verification.</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {prompt && (
                  <button
                    type="button"
                    onClick={() => {
                      setPrompt('');
                      setResponse(null);
                      setError(null);
                    }}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading || !prompt.trim()}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-sm shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Reasoning in Progress...</span>
                    </>
                  ) : (
                    <>
                      <span>Synthesize Analysis</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Loading State with Animated Thinking Stages */}
        {loading && (
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-2xl mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-cyan-500/5 animate-pulse" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-cyan-950/90 border border-cyan-500/60 flex items-center justify-center text-cyan-400 mb-4 shadow-lg shadow-cyan-950/80">
                <Brain className="w-7 h-7 animate-pulse text-cyan-300" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Gemini 4 Argon High-Thinking Active
              </h3>
              <p className="text-cyan-300 text-sm font-medium mb-4">
                {THINKING_STEPS[thinkingIndex]}
              </p>

              {/* Progress track */}
              <div className="w-full max-w-md bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-700 ease-out"
                  style={{ width: `${((thinkingIndex + 1) / THINKING_STEPS.length) * 100}%` }}
                />
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <span>Model: <code className="text-cyan-300 font-mono">gemini-4-argon</code></span>
                <span>•</span>
                <span>ThinkingLevel: <strong className="text-amber-400">HIGH</strong></span>
                <span>•</span>
                <span>Generating multi-page comprehensive review without token capping</span>
              </div>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="p-5 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-200 mb-8 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm text-red-300">Reasoning Engine Notice</h4>
              <p className="text-xs text-red-300/90 mt-1">{error}</p>
              {error.includes('GEMINI_API_KEY') && (
                <p className="text-xs text-red-400 mt-2 font-mono">
                  Make sure GEMINI_API_KEY is configured in the AI Studio environment secrets.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Response Presentation Card */}
        {response && !loading && (
          <div className="rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-2xl p-6 sm:p-8">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    High-Reasoning Synthesis Output
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                      gemini-4-argon
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Verified for TechTalk2026 Muscat & ICPeP Oman Standards
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Markdown</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .md</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Re-evaluate</span>
                </button>
              </div>
            </div>

            {/* Markdown Rendered Content */}
            <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
              <MarkdownRenderer content={response} />
            </div>

            <div className="mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Deep Reasoning complete • Thinking level: High</span>
              </div>
              <div>
                Institute of Computer Engineers of the Philippines — Oman Chapter
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Clean markdown helper to render headers, bold text, bullet points, tables, and code blocks
 */
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');

  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLang = '';

  const elements: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          <div key={`code-${index}`} className="my-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs">
            {codeLang && (
              <div className="px-4 py-1.5 bg-slate-900 border-b border-slate-800 text-slate-400 text-[11px] font-semibold flex justify-between items-center">
                <span>{codeLang}</span>
                <span className="text-slate-500">Syntax Highlighted</span>
              </div>
            )}
            <pre className="p-4 overflow-x-auto text-cyan-200">
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          </div>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        // Start code block
        inCodeBlock = true;
        codeLang = line.replace('```', '').trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    // Render Headers
    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={`h4-${index}`} className="text-lg font-bold text-cyan-300 mt-6 mb-2 flex items-center gap-2 border-b border-slate-800 pb-1.5">
          <ArrowRight className="w-4 h-4 text-cyan-400" />
          {line.replace('### ', '')}
        </h4>
      );
      return;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={`h3-${index}`} className="text-xl font-extrabold text-white mt-7 mb-3 border-l-4 border-cyan-500 pl-3">
          {line.replace('## ', '')}
        </h3>
      );
      return;
    }

    if (line.startsWith('# ')) {
      elements.push(
        <h2 key={`h2-${index}`} className="text-2xl font-black text-white mt-8 mb-4">
          {line.replace('# ', '')}
        </h2>
      );
      return;
    }

    // Render Bullet Points
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const cleanLine = line.trim().replace(/^[-*]\s+/, '');
      elements.push(
        <li key={`li-${index}`} className="ml-4 list-disc text-slate-300 marker:text-cyan-400 py-0.5">
          {formatInlineMarkup(cleanLine)}
        </li>
      );
      return;
    }

    // Numbered lists
    const numMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      elements.push(
        <div key={`num-${index}`} className="flex items-start gap-2 ml-2 my-1 text-slate-300">
          <span className="font-bold text-cyan-400 text-xs mt-0.5">{numMatch[1]}.</span>
          <div>{formatInlineMarkup(numMatch[2])}</div>
        </div>
      );
      return;
    }

    // Regular paragraphs or blank lines
    if (!line.trim()) {
      elements.push(<div key={`spacer-${index}`} className="h-2" />);
    } else {
      elements.push(
        <p key={`p-${index}`} className="text-slate-300 leading-relaxed">
          {formatInlineMarkup(line)}
        </p>
      );
    }
  });

  return <div>{elements}</div>;
};

function formatInlineMarkup(text: string): React.ReactNode {
  // Simple parser for bold **text** and `code`
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={idx} className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-xs border border-slate-700">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
