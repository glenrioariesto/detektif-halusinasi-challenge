import { useState } from 'react';
import { GameState, UserLevelAnswer, MissClick } from '../types';
import { CAMPAIGN_LEVELS } from '../data/questions';
import { playSynthesizerNote } from '../utils/audio';

const getRank = (score: number) => {
  if (score === 5) return { title: "Mata Dewa (Detektif Legendaris)", desc: "Sempurna! Anda berhasil mengungkap semua anomali visual tanpa luput satu pun.", color: "text-emerald-300 border-2 border-emerald-500 bg-emerald-950/30 glow-emerald" };
  if (score >= 4) return { title: "Detektif Halusinasi Senior", desc: "Sangat jeli melihat keganjilan piksel dan sanggup mendeteksi rekayasa citra KA dengan baik.", color: "text-green-300 border-2 border-green-600 bg-green-950/30" };
  if (score >= 2) return { title: "Penyelidik Siber Magang", desc: "Kejelian Anda cukup baik, namun masih sering terkecoh oleh detail kecil rekayasa KA.", color: "text-teal-300 border-2 border-teal-600 bg-teal-950/30" };
  return { title: "Piksel Kabur (Detektif Amatir)", desc: "Anda masih perlu melatih kejelian mata dan lebih kritis dalam mengamati detail citra digital.", color: "text-rose-400 border-2 border-rose-800 bg-rose-950/30 glow-rose" };
};

export const useGameState = () => {
  const [state, setState] = useState<GameState>({
    pageView: 'splash',
    currentLevelIndex: 0,
    score: 0,
    answers: [],
    showFeedback: false,
    attempts: 0,
    foundHotspot: false,
    selectedSegmentIndex: null,
    missClicks: [],
  });

  const activeLevel = CAMPAIGN_LEVELS[state.currentLevelIndex];

  const startInvestigation = () => {
    playSynthesizerNote('success');
    setState({
      pageView: 'game',
      currentLevelIndex: 0,
      score: 0,
      answers: [],
      showFeedback: false,
      attempts: 0,
      foundHotspot: false,
      selectedSegmentIndex: null,
      missClicks: [],
    });
  };

  const handleImageClick = (x: number, y: number) => {
    if (state.showFeedback || activeLevel.type !== 'image' || !activeLevel.hotspot) return;

    const hs = activeLevel.hotspot;
    // Calculate Euclidean distance in percentage coordinate system
    const distance = Math.sqrt(Math.pow(x - hs.x, 2) + Math.pow(y - hs.y, 2));

    if (distance <= hs.radius) {
      // Correct click (hit!)
      playSynthesizerNote('success');
      const newAnswer: UserLevelAnswer = {
        levelId: activeLevel.id,
        isCorrect: true,
        clickedPoint: { x, y },
        attemptsCount: state.attempts + 1
      };
      
      setState(prev => ({
        ...prev,
        answers: [...prev.answers, newAnswer],
        score: prev.score + 1,
        showFeedback: true,
        foundHotspot: true
      }));
    } else {
      // Incorrect click (miss!)
      playSynthesizerNote('fail');
      const newMiss: MissClick = {
        x,
        y,
        id: Date.now()
      };
      
      setState(prev => ({
        ...prev,
        attempts: prev.attempts + 1,
        missClicks: [...prev.missClicks, newMiss]
      }));

      // Auto-fade miss clicks after a delay
      setTimeout(() => {
        setState(prev => ({
          ...prev,
          missClicks: prev.missClicks.filter(m => m.id !== newMiss.id)
        }));
      }, 1500);
    }
  };

  const handleSegmentClick = (index: number) => {
    if (state.showFeedback || activeLevel.type !== 'text' || activeLevel.correctSegmentIndex === undefined) return;

    setState(prev => ({ ...prev, selectedSegmentIndex: index }));

    if (index === activeLevel.correctSegmentIndex) {
      // Correct segment selection
      playSynthesizerNote('success');
      const newAnswer: UserLevelAnswer = {
        levelId: activeLevel.id,
        isCorrect: true,
        selectedSegmentIndex: index,
        attemptsCount: state.attempts + 1
      };

      setState(prev => ({
        ...prev,
        answers: [...prev.answers, newAnswer],
        score: prev.score + 1,
        showFeedback: true
      }));
    } else {
      // Incorrect segment selection
      playSynthesizerNote('fail');
      setState(prev => ({
        ...prev,
        attempts: prev.attempts + 1
      }));

      // Reset selection highlight after a delay so they can try again
      setTimeout(() => {
        setState(prev => {
          if (prev.showFeedback) return prev; // Keep selection if they found the correct one in the meantime
          return { ...prev, selectedSegmentIndex: null };
        });
      }, 1000);
    }
  };

  const advanceLevel = () => {
    playSynthesizerNote('btn');
    const isLastLevel = state.currentLevelIndex === CAMPAIGN_LEVELS.length - 1;

    if (isLastLevel) {
      playSynthesizerNote('unlock');
      setState(prev => ({
        ...prev,
        pageView: 'result',
        showFeedback: false,
        attempts: 0,
        foundHotspot: false,
        selectedSegmentIndex: null,
        missClicks: []
      }));
    } else {
      setState(prev => ({
        ...prev,
        currentLevelIndex: prev.currentLevelIndex + 1,
        showFeedback: false,
        attempts: 0,
        foundHotspot: false,
        selectedSegmentIndex: null,
        missClicks: []
      }));
    }
  };

  const restartGame = () => {
    playSynthesizerNote('success');
    setState({
      pageView: 'splash',
      currentLevelIndex: 0,
      score: 0,
      answers: [],
      showFeedback: false,
      attempts: 0,
      foundHotspot: false,
      selectedSegmentIndex: null,
      missClicks: [],
    });
  };

  return {
    pageView: state.pageView,
    currentLevelIndex: state.currentLevelIndex,
    activeLevel,
    totalLevels: CAMPAIGN_LEVELS.length,
    score: state.score,
    answers: state.answers,
    showFeedback: state.showFeedback,
    attempts: state.attempts,
    foundHotspot: state.foundHotspot,
    selectedSegmentIndex: state.selectedSegmentIndex,
    missClicks: state.missClicks,
    startInvestigation,
    handleImageClick,
    handleSegmentClick,
    advanceLevel,
    restartGame,
    getRank
  };
};
