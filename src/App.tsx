import React from 'react';
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
    score,
    answers,
    showFeedback,
    attempts,
    foundHotspot,
    selectedSegmentIndex,
    missClicks,
    startInvestigation,
    handleImageClick,
    handleSegmentClick,
    advanceLevel,
    restartGame,
    getRank
  } = useGameState();

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#040804] bg-grid-matrix flex flex-col antialiased text-emerald-100 relative">
      {/* Landscape phone warning banner */}
      <PortraitWarning />

      {/* Pages Router */}
      {pageView === 'splash' && (
        <SplashPage onStart={startInvestigation} />
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
        />
      )}
    </div>
  );
}
