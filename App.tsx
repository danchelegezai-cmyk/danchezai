import React, { useState } from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import InputSection from './components/InputSection';
import ResultSection from './components/ResultSection';
import { EventFormData, CopyStyle, GeneratedCopyResult } from './types';
import { generateEventCopy } from './services/geminiService';

const App: React.FC = () => {
  const [formData, setFormData] = useState<EventFormData>({
    theme: '',
    duration: '',
    prizes: [{ name: '', content: '' }],
    rules: '',
    participation: '',
    otherRequirements: '',
    style: CopyStyle.CASUAL,
    platform: ''
  });

  const [result, setResult] = useState<GeneratedCopyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!formData.theme) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await generateEventCopy(formData);
      setResult(data);
      setHasGenerated(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 p-1.5 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-indigo-700">
              Community Copywiz
            </h1>
          </div>
          <div className="text-sm text-slate-500 hidden sm:block">
            九元飞跑团 · 社群运营助手
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)] lg:h-[calc(100vh-9rem)]">
          
          {/* Input Column */}
          <div className="lg:col-span-5 h-full">
            <InputSection 
              formData={formData}
              setFormData={setFormData}
              onGenerate={handleGenerate}
              isLoading={loading}
            />
          </div>

          {/* Result Column */}
          <div className="lg:col-span-7 h-full flex flex-col">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
                <MessageCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            <div className="flex-grow overflow-hidden">
               <ResultSection result={result} hasGenerated={hasGenerated} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;