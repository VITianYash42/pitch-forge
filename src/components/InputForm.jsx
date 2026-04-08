// src/components/InputForm.jsx
import { useEffect, useState } from 'react';
import { ArrowRight, Loader2, Terminal } from 'lucide-react';

export default function InputForm({ onSubmit, isLoading }) {
  const heroText = 'PITCH FORGE.';
  const [typedIndex, setTypedIndex] = useState(0);
  const loadingSteps = [
    'Analyzing architecture...',
    'Mapping personas...',
    'Calculating pricing...',
    'Drafting pitch...',
  ];
  const [stepIndex, setStepIndex] = useState(0);

  const visibleHeroText = heroText.slice(0, typedIndex);
  const [pitchWord = '', forgeWord = ''] = visibleHeroText.split(' ');

  useEffect(() => {
    let timeout;

    if (typedIndex < heroText.length) {
      timeout = setTimeout(() => {
        setTypedIndex((prev) => prev + 1);
      }, 230);
    } else {
      timeout = setTimeout(() => {
        setTypedIndex(0);
      }, 2600);
    }

    return () => clearTimeout(timeout);
  }, [typedIndex, heroText.length]);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % loadingSteps.length);
    }, 800);

    return () => clearInterval(interval);
  }, [isLoading, loadingSteps.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit({
      name: formData.get('name'),
      description: formData.get('description'),
      tech: formData.get('tech')
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row w-full bg-[#0a0a0a] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="input-ambient-orb input-ambient-orb-1" />
        <div className="input-ambient-orb input-ambient-orb-2" />
        <div className="input-ambient-grid" />
        <div className="input-scanlines" />
      </div>

      {/* Left side - Branding (The "Vibe" factor) */}
      <div className="lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center relative border-r border-[#222] z-10">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8 text-[#e53e3e] font-mono text-sm tracking-widest uppercase ui-fade-up">
            <Terminal size={18} />
            <span>System Online // V1.0</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-6 leading-none text-white min-h-[10rem] lg:min-h-[13rem] ui-fade-up [animation-delay:140ms]">
            <span className="block">
              {pitchWord || <span className="opacity-0">PITCH</span>}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e53e3e] to-red-800 inline-flex items-center">
              {forgeWord || <span className="opacity-0">FORGE.</span>}
              <span className="forge-type-cursor" />
            </span>
          </h1>
          <p className="text-gray-400 text-xl font-light leading-relaxed max-w-md mb-12 border-l-2 border-[#e53e3e] pl-6 ui-fade-up [animation-delay:220ms]">
            Stop building side projects that collect dust. Architect your monetization strategy in seconds.
          </p>
        </div>
      </div>

      {/* Right side - The Form */}
      <div className="lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center bg-[#0d0d0d]/85 z-10">
        <div className="max-w-md w-full mx-auto ui-fade-up [animation-delay:280ms]">
          <h2 className="text-2xl font-semibold tracking-tighter mb-8 text-white">Initialize Analysis</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group space-y-2">
              <label className="text-xs font-mono text-gray-400 tracking-widest uppercase transition-colors group-focus-within:text-[#e53e3e]">Project Name</label>
              <input 
                required name="name"
                className="w-full bg-[#111] border border-[#333] focus:border-[#e53e3e] focus:ring-1 focus:ring-[#e53e3e] outline-none px-4 py-3 text-white transition-all"
                placeholder="e.g. Attendance Tracker App"
              />
            </div>

            <div className="group space-y-2">
              <label className="text-xs font-mono text-gray-400 tracking-widest uppercase transition-colors group-focus-within:text-[#e53e3e]">Description</label>
              <textarea 
                required name="description" rows="4"
                className="w-full bg-[#111] border border-[#333] focus:border-[#e53e3e] focus:ring-1 focus:ring-[#e53e3e] outline-none px-4 py-3 text-white transition-all resize-none"
                placeholder="What does it do? Who does it help?"
              />
            </div>

            <div className="group space-y-2">
              <label className="text-xs font-mono text-gray-400 tracking-widest uppercase transition-colors group-focus-within:text-[#e53e3e]">Tech Stack (Optional)</label>
              <input 
                name="tech"
                className="w-full bg-[#111] border border-[#333] focus:border-[#e53e3e] focus:ring-1 focus:ring-[#e53e3e] outline-none px-4 py-3 text-white transition-all"
                placeholder="e.g. React, Flask, PostgreSQL"
              />
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-[#e53e3e] hover:bg-red-700 text-white font-semibold py-4 px-6 flex justify-center items-center gap-2 transition-all disabled:opacity-80 disabled:cursor-wait shadow-[0_0_20px_rgba(229,62,62,0.15)]"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2 tracking-widest font-mono text-sm">
                  <Loader2 size={18} className="animate-spin" />
                  {loadingSteps[stepIndex]}
                </span>
              ) : (
                <>Generate Strategy <ArrowRight size={20} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}