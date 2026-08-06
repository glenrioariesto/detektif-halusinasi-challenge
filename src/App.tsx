import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { SplashPage } from './pages/splash/SplashPage';
import { ArenaPage } from './pages/arena/ArenaPage';
import { ResultPage } from './pages/result/ResultPage';
import { PortraitWarning } from './components/PortraitWarning';

export default function App() {
  const {
    pageView,
    currentLevelIndex,
    activeLevel,
    totalLevels,
    levelsForMode,
    score,
    answers,
    showFeedback,
    attempts,
    foundHotspot,
    foundHotspotIndices,
    selectedSegmentIndex,
    missClicks,
    startInvestigation,
    handleImageClick,
    handleSegmentClick,
    advanceLevel,
    restartGame,
    getRank
  } = useGameState();

  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false);

  const handleStartGame = () => {
    const isFullscreenSupported = typeof document !== 'undefined' && !!document.documentElement.requestFullscreen;
    const isCurrentlyFullscreen = typeof document !== 'undefined' && !!document.fullscreenElement;
    if (isFullscreenSupported && !isCurrentlyFullscreen) {
      setShowFullscreenPrompt(true);
    } else {
      startInvestigation();
    }
  };

  const enterFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen permission denied or not supported by browser", err);
    }
    setShowFullscreenPrompt(false);
    startInvestigation();
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#040804] bg-grid-matrix flex flex-col antialiased text-emerald-100 relative">
      {/* Landscape phone warning banner */}
      <PortraitWarning />

      {/* Mode Layar Penuh Modal */}
      {showFullscreenPrompt && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-emerald-950/80 backdrop-blur-md p-4 select-none animate-fadeIn">
          <div className="relative max-w-sm w-full mx-auto bg-[#040804] border border-emerald-500/30 shadow-2xl shadow-emerald-950/50 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute w-20 h-20 bg-emerald-500/20 rounded-full animate-ping opacity-75" />
              <div className="w-16 h-16 bg-emerald-950/50 border border-emerald-500/40 rounded-2xl flex items-center justify-center text-3xl shadow-sm z-10">
                📺
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-emerald-300 tracking-tight mb-2 uppercase font-mono">
              Mode Layar Penuh
            </h3>
            
            <p className="text-xs sm:text-sm text-emerald-400/70 font-medium leading-relaxed mb-6">
              Apakah Anda ingin masuk ke mode layar penuh?
            </p>

            <div className="flex items-center gap-3 w-full font-mono">
              <button
                type="button"
                onClick={enterFullscreen}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-extrabold py-2.5 rounded-xl transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer border-none"
              >
                Yes
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setShowFullscreenPrompt(false);
                  startInvestigation();
                }}
                className="flex-1 bg-slate-900 hover:bg-slate-800 border border-emerald-900/50 text-emerald-300 font-extrabold py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pages Router */}
      {pageView === 'splash' && (
        <SplashPage onStart={handleStartGame} />
      )}

      {pageView === 'game' && (
        <ArenaPage
          currentLevelIndex={currentLevelIndex}
          activeLevel={activeLevel}
          totalLevels={totalLevels}
          showFeedback={showFeedback}
          score={score}
          attempts={attempts}
          foundHotspot={foundHotspot}
          foundHotspotIndices={foundHotspotIndices}
          selectedSegmentIndex={selectedSegmentIndex}
          missClicks={missClicks}
          onImageClick={handleImageClick}
          onSegmentClick={handleSegmentClick}
          onAdvance={advanceLevel}
          onBack={restartGame}
        />
      )}

      {pageView === 'result' && (
        <ResultPage
          score={score}
          answers={answers}
          onRestart={restartGame}
          getRank={getRank}
          levels={levelsForMode}
        />
      )}
    </div>
  );
}
