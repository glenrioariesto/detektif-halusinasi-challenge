import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useGameState } from './hooks/useGameState';
import { SplashPage } from './pages/splash/SplashPage';
import { ArenaPage } from './pages/arena/ArenaPage';
import { ResultPage } from './pages/result/ResultPage';
import { PortraitWarning } from './components/PortraitWarning';
import { toggleMute, getIsMuted, startBGM } from './utils/audio';

export default function App() {
  const {
    pageView,
    currentLevelIndex,
    activeLevel,
    totalLevels,
    levelsForMode,
    score,
    totalMisses,
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
  const [isMutedState, setIsMutedState] = useState(getIsMuted());

  const handleStartGame = () => {
    startBGM();
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

  const handleToggleSound = () => {
    const newMuted = toggleMute();
    setIsMutedState(newMuted);
    if (!newMuted) {
      startBGM();
    }
  };

  return (
    <div id="app-root" className="h-screen w-screen overflow-hidden bg-[#021324] bg-grid-matrix flex flex-col antialiased text-[#e2eaf4] relative">
      {/* Landscape phone warning banner */}
      <PortraitWarning />

      {/* Global Top-Right Audio Mute/Unmute Toggle (aligned with Top-Left Logo) */}
      <button
        id="btn-audio-toggle"
        type="button"
        onClick={handleToggleSound}
        className="absolute top-3 right-3 sm:top-5 sm:right-5 md:top-6 md:right-6 2xl:top-10 2xl:right-10 z-50 p-2 sm:p-2.5 2xl:p-4 bg-[#041a32]/90 hover:bg-[#062444] backdrop-blur-md border-2 border-[#1f568d]/60 hover:border-[#f0c400]/70 rounded-xl 2xl:rounded-2xl text-[#8fabc6] hover:text-[#f0c400] transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 glow-ocean flex items-center justify-center select-none"
        title={isMutedState ? "Nyalakan Suara (Unmute)" : "Matikan Suara (Mute)"}
        aria-label={isMutedState ? "Nyalakan Suara" : "Matikan Suara"}
      >
        {isMutedState ? (
          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-8 2xl:h-8 text-rose-400" />
        ) : (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-8 2xl:h-8 text-[#f0c400]" />
        )}
      </button>

      {/* Mode Layar Penuh Modal */}
      {showFullscreenPrompt && (
        <div id="modal-fullscreen-prompt" className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 select-none animate-fadeIn">
          <div id="card-fullscreen-prompt" className="relative max-w-sm w-full mx-auto bg-[#041a32] border-2 border-[#1f568d] shadow-[0_0_35px_rgba(31,86,141,0.4)] rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute w-20 h-20 bg-[#1f568d]/30 rounded-full animate-ping opacity-75" />
              <div className="w-16 h-16 bg-[#062444] border-2 border-[#f0c400] rounded-2xl flex items-center justify-center text-3xl shadow-sm z-10 glow-gold">
                📺
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-normal text-white tracking-wide mb-2 uppercase font-title">
              Mode Layar Penuh
            </h3>
            
            <p className="text-xs sm:text-sm text-[#c8d5e3] font-medium leading-relaxed mb-6">
              Apakah Anda ingin masuk ke mode layar penuh?
            </p>

            <div className="flex items-center gap-3 w-full font-mono">
              <button
                id="btn-fullscreen-yes"
                type="button"
                onClick={enterFullscreen}
                className="flex-1 bg-gradient-to-r from-[#1f568d] via-[#256eb4] to-[#022949] hover:from-[#2877c2] hover:to-[#043660] border border-[#388ce0]/60 text-white font-extrabold py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(31,86,141,0.4)] active:scale-95 cursor-pointer"
              >
                Yes
              </button>
              
              <button
                id="btn-fullscreen-no"
                type="button"
                onClick={() => {
                  setShowFullscreenPrompt(false);
                  startInvestigation();
                }}
                className="flex-1 bg-[#062444] hover:bg-[#0d3b6c] border border-[#1f568d]/70 text-[#8fabc6] hover:text-white font-extrabold py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer"
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
        />
      )}

      {pageView === 'result' && (
        <ResultPage
          score={score}
          totalMisses={totalMisses}
          answers={answers}
          onRestart={restartGame}
          getRank={getRank}
          levels={levelsForMode}
        />
      )}
    </div>
  );
}
