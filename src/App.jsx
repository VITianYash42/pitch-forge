import { useState } from 'react';
import { analyzeProject } from './api/gemini';
import InputForm from './components/InputForm';
import ResultsView from './components/ResultsView';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

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
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#e53e3e] selection:text-white">
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
  );
}