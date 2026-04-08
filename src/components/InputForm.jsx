// src/components/InputForm.jsx
import { ArrowRight, Terminal } from 'lucide-react';

export default function InputForm({ onSubmit, isLoading }) {
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
    <div className="min-h-screen flex flex-col lg:flex-row w-full bg-[#0a0a0a]">
      {/* Left side - Branding (The "Vibe" factor) */}
      <div className="lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center relative border-r border-[#222]">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8 text-[#e53e3e] font-mono text-sm tracking-widest uppercase">
            <Terminal size={18} />
            <span>System Online // V1.0</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-6 leading-none text-white">
            PITCH<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e53e3e] to-red-800">FORGE.</span>
          </h1>
          <p className="text-gray-400 text-xl font-light max-w-md mb-12 border-l-2 border-[#e53e3e] pl-6">
            Stop building side projects that collect dust. Architect your monetization strategy in seconds.
          </p>
        </div>
      </div>

      {/* Right side - The Form */}
      <div className="lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center bg-[#0d0d0d]">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-white">Initialize Analysis</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Project Name</label>
              <input 
                required name="name"
                className="w-full bg-[#111] border border-[#333] focus:border-[#e53e3e] outline-none px-4 py-3 text-white transition-colors"
                placeholder="e.g. Attendance Tracker App"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Description</label>
              <textarea 
                required name="description" rows="4"
                className="w-full bg-[#111] border border-[#333] focus:border-[#e53e3e] outline-none px-4 py-3 text-white transition-colors resize-none"
                placeholder="What does it do? Who does it help?"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Tech Stack (Optional)</label>
              <input 
                name="tech"
                className="w-full bg-[#111] border border-[#333] focus:border-[#e53e3e] outline-none px-4 py-3 text-white transition-colors"
                placeholder="e.g. React, Flask, PostgreSQL"
              />
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-[#e53e3e] hover:bg-red-700 text-white font-semibold py-4 px-6 flex justify-center items-center gap-2 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(229,62,62,0.15)]"
            >
              {isLoading ? (
                <span className="animate-pulse tracking-widest font-mono text-sm">ANALYZING...</span>
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