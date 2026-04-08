import { useState } from 'react';
import { analyzeProject } from './api/cohere';
import InputForm from './components/InputForm';
import ResultsView from './components/ResultsView';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const particles = Array.from({ length: 12 }, (_, i) => i);

  const handleCopy = async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Ignore clipboard failures in unsupported environments.
    }
  };

  const handleAnalyze = async (projectData) => {
    setLoading(true);
    setError(null);
    
    // THE DEMO BYPASS: If you type "DEMO" as the project name, it skips the API.
    if (projectData.name.toUpperCase() === "DEMO") {
      setTimeout(() => {
        setResult({
          "tagline": "Stop building side projects that collect dust.",
          "monetization_paths": [
            { "name": "SaaS Subscription", "description": "Charge a monthly fee for premium features.", "effort": "Medium", "timeline": "2-4 weeks" },
            { "name": "B2B Licensing", "description": "Sell the core engine to universities.", "effort": "High", "timeline": "2 months" },
            { "name": "One-Time Purchase", "description": "Lifetime access for a flat fee.", "effort": "Low", "timeline": "1 week" }
          ],
          "target_users": [
            { "persona": "Student Developers", "pain_point": "Can't monetize projects", "willingness_to_pay": "Low" },
            { "persona": "Bootcamp Grads", "pain_point": "Need portfolio pieces that generate revenue", "willingness_to_pay": "Medium" },
            { "persona": "Hackathon Organizers", "pain_point": "Need tools to evaluate commercial viability", "willingness_to_pay": "High" }
          ],
          "pricing_suggestion": { "model": "Freemium", "free_tier": "1 Analysis per month", "paid_tier": "Unlimited + Export", "suggested_price": "$5/month" },
          "cold_pitch": "Hey! I built an AI tool that turns student projects into revenue streams. Let me know if you want a quick demo."
        });
        setLoading(false);
      }, 800); // Fake loading delay
      return;
    }

    try {
      const data = await analyzeProject(projectData);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Analysis failed. Check your API key and connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white selection:bg-[#e53e3e] selection:text-white">
      <div className="pointer-events-none absolute inset-0 -z-0 bg-dynamic-grid opacity-50" />
      <div className="pointer-events-none absolute inset-0 -z-0 bg-aurora" />
      <div className="pointer-events-none absolute inset-0 -z-0 bg-vignette" />
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        {particles.map((particle) => (
          <span
            key={particle}
            className="floating-particle"
            style={{
              left: `${6 + particle * 8}%`,
              animationDelay: `${(particle % 6) * 0.9}s`,
              animationDuration: `${10 + (particle % 5) * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-900 border border-red-500 text-white px-6 py-4 shadow-xl max-w-md">
          <div className="font-bold mb-1">System Error</div>
          <p className="text-sm opacity-90">{error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-3 text-xs uppercase tracking-wider font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {result ? (
        <ResultsView
          result={result}
          onCopySection={handleCopy}
          onCopyAll={handleCopy}
          onReset={handleReset}
        />
      ) : (
        <InputForm onSubmit={handleAnalyze} isLoading={loading} />
      )}
      </div>
    </div>
  );
}