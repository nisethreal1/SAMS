
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SLIDES } from './constants.tsx';
import SlideRenderer from './components/SlideRenderer';
import { generateSpeakerNotes } from './services/gemini';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [notes, setNotes] = useState<string | null>(null);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  const currentSlide = SLIDES[currentSlideIndex];

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
    setNotes(null); // Reset notes on slide change
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
    setNotes(null); // Reset notes on slide change
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const handleGenerateNotes = async () => {
    setIsLoadingNotes(true);
    const result = await generateSpeakerNotes(currentSlide);
    setNotes(result);
    setIsLoadingNotes(false);
    setShowNotes(true);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 select-none">
      {/* Header / Progress Bar */}
      <div className="h-1 bg-slate-200 w-full relative">
        <div 
          className="h-full bg-indigo-600 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(79,70,229,0.5)]"
          style={{ width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%` }}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center p-4 lg:p-12">
        <div 
          ref={slideRef}
          className="w-full h-full max-w-[1920px] max-h-[1080px] bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 transition-all duration-500 ease-in-out transform hover:scale-[1.005]"
        >
          <SlideRenderer slide={currentSlide} />
        </div>

        {/* AI Side Panel / Modal */}
        {showNotes && (
          <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-2xl border-l border-slate-200 p-8 transform transition-transform duration-300 ease-in-out z-20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900 uppercase tracking-widest text-sm">Speaker Notes</h3>
              <button 
                onClick={() => setShowNotes(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                ✕
              </button>
            </div>
            {isLoadingNotes ? (
              <div className="flex flex-col items-center justify-center h-40 space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <p className="text-slate-400 text-sm italic">Gemini is writing...</p>
              </div>
            ) : (
              <div className="prose prose-sm text-slate-600 overflow-y-auto max-h-[calc(100%-80px)]">
                {notes ? (
                  <p className="leading-relaxed whitespace-pre-wrap">{notes}</p>
                ) : (
                  <p className="text-slate-400 italic">No notes generated for this slide.</p>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Navigation Footer */}
      <footer className="h-24 bg-white border-t border-slate-200 px-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Project SAMS</span>
            <span className="text-slate-900 font-semibold">{currentSlide.title}</span>
          </div>
          <div className="h-8 w-px bg-slate-200 mx-2" />
          <div className="text-slate-400 font-medium">
            Slide <span className="text-slate-900 font-bold">{currentSlideIndex + 1}</span> / {SLIDES.length}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleGenerateNotes}
            disabled={isLoadingNotes}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-50 text-indigo-700 rounded-full font-bold hover:bg-indigo-100 transition-all disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L14.85 8.65L22 9.25L16.5 13.85L18.25 21L12 17.25L5.75 21L7.5 13.85L2 9.25L9.15 8.65L12 2Z" />
            </svg>
            AI Notes
          </button>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous Slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={currentSlideIndex === SLIDES.length - 1}
              className="p-3 rounded-full bg-slate-900 text-white hover:bg-black transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              aria-label="Next Slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </footer>

      {/* Presentation Styles */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
