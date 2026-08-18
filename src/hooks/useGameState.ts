import { useState } from 'react';
import { GameState, UserLevelAnswer, MissClick } from '../types';
import { CAMPAIGN_LEVELS } from '../data/questions';
import { playSynthesizerNote } from '../utils/audio';

export const getRank = (accuracy: number) => {
  if (accuracy === 100) {
    return {
      title: "Mata Dewa (Detektif Legendaris)",
      desc: "Sempurna! Anda berhasil mengungkap semua anomali citra dan teks dengan presisi 100% tanpa satu pun salah klik.",
      color: "text-amber-300 border-2 border-amber-400 bg-amber-950/40 glow-gold"
    };
  }
  if (accuracy >= 90) {
    return {
      title: "Detektif Halusinasi Senior",
      desc: "Sangat tajam! Anda sanggup membedakan rekayasa KA dengan akurasi tinggi dan minim kesalahan.",
      color: "text-sky-300 border-2 border-sky-500 bg-[#0c3258]/60 glow-ocean"
    };
  }
  if (accuracy >= 80) {
    return {
      title: "Penyelidik Siber Madya",
      desc: "Cukup jeli! Anda mampu memecahkan kasus meski sempat terkecoh beberapa kali oleh detail palsu.",
      color: "text-blue-300 border-2 border-blue-500 bg-[#0a2f54]/60"
    };
  }
  if (accuracy >= 70) {
    return {
      title: "Penyelidik Siber Magang",
      desc: "Kejelian Anda cukup baik, namun masih sering terkecoh oleh detail kecil rekayasa KA dan butuh banyak percobaan.",
      color: "text-indigo-300 border-2 border-indigo-500 bg-[#072442]/60"
    };
  }
  return {
    title: "Piksel Kabur (Detektif Amatir)",
    desc: "Anda masih perlu melatih kejelian mata dan lebih kritis dalam mengamati detail citra dan teks digital sebelum memutuskan.",
    color: "text-rose-400 border-2 border-rose-600 bg-rose-950/40 glow-rose"
  };
};

export const useGameState = () => {
  const [state, setState] = useState<GameState>({
    pageView: 'splash',
    gameMode: null,
    currentLevelIndex: 0,
    score: 0,
    totalMisses: 0,
    levelMisses: 0,
    answers: [],
    showFeedback: false,
    attempts: 0,
    foundHotspot: false,
    foundHotspotIndices: [],
    selectedSegmentIndex: null,
    missClicks: [],
  });

  const activeLevel = CAMPAIGN_LEVELS[state.currentLevelIndex];

  const startInvestigation = () => {
    playSynthesizerNote('success');
    setState({
      pageView: 'game',
      gameMode: null,
      currentLevelIndex: 0,
      score: 0,
      totalMisses: 0,
      levelMisses: 0,
      answers: [],
      showFeedback: false,
      attempts: 0,
      foundHotspot: false,
      foundHotspotIndices: [],
      selectedSegmentIndex: null,
      missClicks: [],
    });
  };

  const handleImageClick = (x: number, y: number) => {
    if (state.showFeedback || activeLevel.type !== 'image') return;

    // Collect all hotspots for current level
    const targetHotspots = activeLevel.hotspots || (activeLevel.hotspot ? [activeLevel.hotspot] : []);
    if (targetHotspots.length === 0) return;

    // Find which hotspot index is hit
    const foundIndices = state.foundHotspotIndices || [];
    const hitIndex = targetHotspots.findIndex((hs, idx) => {
      if (foundIndices.includes(idx)) return false; // Already found

      const rx = hs.radiusX !== undefined ? hs.radiusX : hs.radius;
      const ry = hs.radiusY !== undefined ? hs.radiusY : hs.radius;
      const rotRad = ((hs.rotation || 0) * Math.PI) / 180;

      const dx = x - hs.x;
      const dy = y - hs.y;

      const rotatedX = dx * Math.cos(-rotRad) - dy * Math.sin(-rotRad);
      const rotatedY = dx * Math.sin(-rotRad) + dy * Math.cos(-rotRad);

      const hitValue = Math.pow(rotatedX / rx, 2) + Math.pow(rotatedY / ry, 2);
      return hitValue <= 1;
    });

    if (hitIndex !== -1) {
      // Correct click (hit new hotspot!)
      playSynthesizerNote('success');
      const updatedFoundIndices = [...foundIndices, hitIndex];
      const isAllHotspotsFound = updatedFoundIndices.length >= targetHotspots.length;

      const newAnswer: UserLevelAnswer = {
        levelId: activeLevel.id,
        isCorrect: true,
        clickedPoint: { x, y },
        attemptsCount: state.attempts + 1,
        missCount: state.levelMisses
      };
      
      setState(prev => ({
        ...prev,
        attempts: prev.attempts + 1,
        foundHotspotIndices: updatedFoundIndices,
        answers: isAllHotspotsFound ? [...prev.answers, newAnswer] : prev.answers,
        score: isAllHotspotsFound ? prev.score + 1 : prev.score,
        showFeedback: isAllHotspotsFound,
        foundHotspot: isAllHotspotsFound
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
        levelMisses: prev.levelMisses + 1,
        totalMisses: prev.totalMisses + 1,
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
        attemptsCount: state.attempts + 1,
        missCount: state.levelMisses
      };

      setState(prev => ({
        ...prev,
        attempts: prev.attempts + 1,
        answers: [...prev.answers, newAnswer],
        score: prev.score + 1,
        showFeedback: true
      }));
    } else {
      // Incorrect segment selection
      playSynthesizerNote('fail');
      setState(prev => ({
        ...prev,
        attempts: prev.attempts + 1,
        levelMisses: prev.levelMisses + 1,
        totalMisses: prev.totalMisses + 1
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
        levelMisses: 0,
        foundHotspot: false,
        foundHotspotIndices: [],
        selectedSegmentIndex: null,
        missClicks: []
      }));
    } else {
      setState(prev => ({
        ...prev,
        currentLevelIndex: prev.currentLevelIndex + 1,
        showFeedback: false,
        attempts: 0,
        levelMisses: 0,
        foundHotspot: false,
        foundHotspotIndices: [],
        selectedSegmentIndex: null,
        missClicks: []
      }));
    }
  };

  const restartGame = () => {
    playSynthesizerNote('success');
    setState({
      pageView: 'splash',
      gameMode: null,
      currentLevelIndex: 0,
      score: 0,
      totalMisses: 0,
      levelMisses: 0,
      answers: [],
      showFeedback: false,
      attempts: 0,
      foundHotspot: false,
      foundHotspotIndices: [],
      selectedSegmentIndex: null,
      missClicks: [],
    });
  };

  return {
    pageView: state.pageView,
    gameMode: state.gameMode,
    currentLevelIndex: state.currentLevelIndex,
    activeLevel,
    totalLevels: CAMPAIGN_LEVELS.length,
    levelsForMode: CAMPAIGN_LEVELS,
    score: state.score,
    totalMisses: state.totalMisses,
    answers: state.answers,
    showFeedback: state.showFeedback,
    attempts: state.attempts,
    foundHotspot: state.foundHotspot,
    foundHotspotIndices: state.foundHotspotIndices,
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
