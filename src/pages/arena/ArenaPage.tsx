import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Search, ArrowRight, HelpCircle, X, ShieldAlert, Award, Grid, Wrench } from 'lucide-react';
import type { Level, MissClick, Hotspot } from '../../types';
import { InteractiveImage } from '../../components/InteractiveImage';
import arenaBg from '../../assets/arena_bg.jpg';

interface ArenaPageProps {
  currentLevelIndex: number;
  activeLevel: Level;
  totalLevels: number;
  showFeedback: boolean;
  score: number;
  attempts: number;
  foundHotspot: boolean;
  foundHotspotIndices: number[];
  selectedSegmentIndex: number | null;
  missClicks: MissClick[];
  onImageClick: (x: number, y: number) => void;
  onSegmentClick: (index: number) => void;
  onAdvance: () => void;
  onBack: () => void;
}

export function ArenaPage({
  currentLevelIndex,
  activeLevel,
  totalLevels,
  showFeedback,
  score,
  attempts,
  foundHotspotIndices = [],
  selectedSegmentIndex,
  missClicks,
  onImageClick,
  onSegmentClick,
  onAdvance,
  onBack
}: ArenaPageProps) {
  
  const [isClueOpen, setIsClueOpen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [devShowHotspot, setDevShowHotspot] = useState(false);

  // Hidden DEV mode toggle via secret click counter
  const [devUnlocked, setDevUnlocked] = useState(false);
  const [secretClickCount, setSecretClickCount] = useState(0);

  // Dedicated reactive state for DEV hotspot adjustments
  const [activeHotspotIndex, setActiveHotspotIndex] = useState(0);
  const [devHotspot, setDevHotspot] = useState(activeLevel.hotspot);

  // Normalize hotspots list
  const currentHotspots = activeLevel.hotspots || (activeLevel.hotspot ? [activeLevel.hotspot] : []);
  const currentTargetHotspot = currentHotspots[activeHotspotIndex] || currentHotspots[0];

  const handleSecretScoreClick = () => {
    const nextCount = secretClickCount + 1;
    setSecretClickCount(nextCount);
    if (nextCount >= 3) {
      setDevUnlocked(true);
      setDevShowHotspot(true);
    }
  };

  const updateHotspot = (key: keyof Hotspot, val: number) => {
    if (!currentTargetHotspot) return;
    currentTargetHotspot[key] = val as never;

    // Synchronize both hotspot and hotspots array
    if (activeLevel.hotspots) {
      activeLevel.hotspots[activeHotspotIndex] = { ...currentTargetHotspot, [key]: val };
      activeLevel.hotspot = activeLevel.hotspots[0];
    } else if (activeLevel.hotspot) {
      activeLevel.hotspot[key] = val as never;
    }

    setDevHotspot({ ...currentTargetHotspot, [key]: val });
  };

  const addHotspot = () => {
    const newHs: Hotspot = {
      x: 50,
      y: 50,
      radius: 10,
      radiusX: 10,
      radiusY: 10,
      borderRadius: 50,
      rotation: 0,
      label: `Anomali ${currentHotspots.length + 1}`
    };

    if (!activeLevel.hotspots) {
      activeLevel.hotspots = activeLevel.hotspot ? [activeLevel.hotspot, newHs] : [newHs];
    } else {
      activeLevel.hotspots.push(newHs);
    }
    setActiveHotspotIndex(activeLevel.hotspots.length - 1);
    setDevHotspot(newHs);
  };

  const removeHotspot = (index: number) => {
    if (!activeLevel.hotspots || activeLevel.hotspots.length <= 1) return;
    activeLevel.hotspots.splice(index, 1);
    const newIdx = Math.max(0, index - 1);
    setActiveHotspotIndex(newIdx);
    setDevHotspot(activeLevel.hotspots[newIdx]);
  };

  return (
    <div className="h-screen w-screen bg-[#020502] text-emerald-100 flex items-center justify-center overflow-hidden relative select-none font-mono">
      
      {/* Background Image with Dark Cyberpunk Atmosphere Overlay */}
      <img
        src={arenaBg}
        alt="Latar Belakang Ruang Investigasi"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-75 filter brightness-90 contrast-110 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/70 z-1 pointer-events-none"></div>

      {/* Immersive Game UI stretching to landscape screen bounds */}
      <div className="relative w-full h-full z-10 flex flex-col">
        
        {/* HUD: Top-Left Exit Icon Button */}
        <button
          type="button"
          onClick={onBack}
          className="absolute top-4 left-4 z-30 w-10 h-10 bg-black/60 backdrop-blur-md border-2 border-emerald-900/60 rounded-full flex items-center justify-center text-emerald-500 hover:text-emerald-300 hover:border-emerald-500 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
          title="Keluar"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* HUD: Top-Right Score Badge & DEV Mode Button */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          {devUnlocked && activeLevel.type === 'image' && (
            <button
              type="button"
              onClick={() => setDevShowHotspot(!devShowHotspot)}
              className={`px-3 py-1.5 backdrop-blur-md border-2 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-md ${
                devShowHotspot
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-black/60 border-emerald-900/60 text-emerald-500 hover:text-emerald-300'
              }`}
              title="DEV: Tampilkan Titik Hotspot Anomali"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>DEV: {devShowHotspot ? 'HOTSPOT ON' : 'HOTSPOT OFF'}</span>
            </button>
          )}

          <div 
            onClick={handleSecretScoreClick}
            className="px-3.5 py-2 bg-black/60 backdrop-blur-md border-2 border-emerald-900/60 rounded-2xl flex items-center gap-2 text-xs font-bold text-emerald-300 shadow-md cursor-pointer hover:border-emerald-500/80 transition-colors"
            title="Skor Investigasi (Klik 3x untuk Opsi Pengembang)"
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Skor: {score}</span>
          </div>
        </div>

        {/* HUD: Bottom-Left Clues Help Icon Button */}
        <button
          type="button"
          onClick={() => setIsClueOpen(true)}
          className="absolute bottom-4 left-4 z-30 w-12 h-12 bg-emerald-950/75 hover:bg-emerald-900/80 backdrop-blur-md border-2 border-emerald-600 rounded-full flex items-center justify-center text-emerald-300 hover:text-white transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 animate-pulse"
          title="Petunjuk Penyelidikan"
        >
          <Search className="w-5 h-5 text-emerald-400" />
        </button>

        {/* HUD: Bottom-Left Grid Toggle Icon Button (only in image mode) */}
        {activeLevel.type === 'image' && !showFeedback && (
          <button
            type="button"
            onClick={() => setShowGrid(!showGrid)}
            className={`absolute bottom-4 left-20 z-30 w-12 h-12 backdrop-blur-md border-2 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 ${
              showGrid
                ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-emerald-950/75 hover:bg-emerald-900/80 border-emerald-600 text-emerald-300 hover:text-white'
            }`}
            title="Toggle Grid Koordinat"
          >
            <Grid className="w-5 h-5" />
          </button>
        )}

        {/* HUD: Bottom-Right Level Title Info Badge */}
        <div className="absolute bottom-4 right-4 z-30 px-3.5 py-1.5 bg-black/60 backdrop-blur-md border-2 border-emerald-900/60 rounded-xl text-[10px] sm:text-xs text-emerald-400 font-bold shadow-md flex items-center gap-2">
          <span>Kasus {currentLevelIndex + 1} dari {totalLevels}: {activeLevel.title}</span>
          {activeLevel.type === 'image' && (
            <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[9px] rounded-full font-mono">
              🎯 {(foundHotspotIndices || []).length} / {currentHotspots.length} Anomali
            </span>
          )}
        </div>

        {/* HUD: DEV HOTSPOT CONTROL PANEL TOOLBAR */}
        {devShowHotspot && activeLevel.type === 'image' && currentTargetHotspot && (
          <div 
            className="absolute bottom-16 right-4 z-50 bg-black/95 backdrop-blur-md border-2 border-amber-500 rounded-xl p-3 shadow-2xl text-[10px] text-amber-300 w-72 space-y-2 select-none max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-1.5 font-bold text-amber-400">
              <span className="flex items-center gap-1 uppercase tracking-wider">
                <Wrench className="w-3 h-3 text-amber-400" />
                Dev Hotspot Adjuster
              </span>
              <button
                type="button"
                onClick={addHotspot}
                className="px-2 py-0.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-[9px] rounded transition-colors cursor-pointer"
              >
                + Tambah Hotspot
              </button>
            </div>

            {/* Hotspot Selector Tabs */}
            {currentHotspots.length > 0 && (
              <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-amber-500/20 scrollbar-none">
                {currentHotspots.map((_, idx) => (
                  <div key={`tab-hs-${idx}`} className="flex items-center shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveHotspotIndex(idx)}
                      className={`px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer transition-colors ${
                        activeHotspotIndex === idx
                          ? 'bg-amber-400 text-black'
                          : 'bg-amber-950/80 text-amber-300 hover:bg-amber-900'
                      }`}
                    >
                      #{idx + 1}
                    </button>
                    {currentHotspots.length > 1 && activeHotspotIndex === idx && (
                      <button
                        type="button"
                        onClick={() => removeHotspot(idx)}
                        className="ml-0.5 px-1 py-0.5 bg-rose-950 hover:bg-rose-800 text-rose-300 text-[8px] rounded cursor-pointer"
                        title="Hapus hotspot ini"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Slider X */}
            <div className="space-y-0.5">
              <div className="flex justify-between font-mono text-[9px] items-center">
                <span>Posisi X:</span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => updateHotspot('x', Math.max(0, currentTargetHotspot.x - 1))} className="px-1 bg-amber-950 hover:bg-amber-900 border border-amber-500/40 rounded text-[8px] font-bold cursor-pointer">-1</button>
                  <span className="font-bold text-amber-200 min-w-[28px] text-right">{currentTargetHotspot.x}%</span>
                  <button type="button" onClick={() => updateHotspot('x', Math.min(100, currentTargetHotspot.x + 1))} className="px-1 bg-amber-950 hover:bg-amber-900 border border-amber-500/40 rounded text-[8px] font-bold cursor-pointer">+1</button>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={currentTargetHotspot.x}
                onChange={(e) => updateHotspot('x', Number(e.target.value))}
                onInput={(e) => updateHotspot('x', Number((e.target as HTMLInputElement).value))}
                className="w-full h-1.5 bg-amber-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Slider Y */}
            <div className="space-y-0.5">
              <div className="flex justify-between font-mono text-[9px] items-center">
                <span>Posisi Y:</span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => updateHotspot('y', Math.max(0, currentTargetHotspot.y - 1))} className="px-1 bg-amber-950 hover:bg-amber-900 border border-amber-500/40 rounded text-[8px] font-bold cursor-pointer">-1</button>
                  <span className="font-bold text-amber-200 min-w-[28px] text-right">{currentTargetHotspot.y}%</span>
                  <button type="button" onClick={() => updateHotspot('y', Math.min(100, currentTargetHotspot.y + 1))} className="px-1 bg-amber-950 hover:bg-amber-900 border border-amber-500/40 rounded text-[8px] font-bold cursor-pointer">+1</button>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={currentTargetHotspot.y}
                onChange={(e) => updateHotspot('y', Number(e.target.value))}
                onInput={(e) => updateHotspot('y', Number((e.target as HTMLInputElement).value))}
                className="w-full h-1.5 bg-amber-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Slider Radius X (Horizontal Size) */}
            <div className="space-y-0.5">
              <div className="flex justify-between font-mono text-[9px] items-center">
                <span>Radius X (Lebar):</span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => updateHotspot('radiusX', Math.max(2, (currentTargetHotspot.radiusX !== undefined ? currentTargetHotspot.radiusX : currentTargetHotspot.radius) - 1))} className="px-1 bg-amber-950 hover:bg-amber-900 border border-amber-500/40 rounded text-[8px] font-bold cursor-pointer">-1</button>
                  <span className="font-bold text-amber-200 min-w-[28px] text-right">{currentTargetHotspot.radiusX !== undefined ? currentTargetHotspot.radiusX : currentTargetHotspot.radius}%</span>
                  <button type="button" onClick={() => updateHotspot('radiusX', Math.min(45, (currentTargetHotspot.radiusX !== undefined ? currentTargetHotspot.radiusX : currentTargetHotspot.radius) + 1))} className="px-1 bg-amber-950 hover:bg-amber-900 border border-amber-500/40 rounded text-[8px] font-bold cursor-pointer">+1</button>
                </div>
              </div>
              <input
                type="range"
                min="2"
                max="45"
                value={currentTargetHotspot.radiusX !== undefined ? currentTargetHotspot.radiusX : currentTargetHotspot.radius}
                onChange={(e) => updateHotspot('radiusX', Number(e.target.value))}
                onInput={(e) => updateHotspot('radiusX', Number((e.target as HTMLInputElement).value))}
                className="w-full h-1.5 bg-amber-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Slider Radius Y (Vertical Size) */}
            <div className="space-y-0.5">
              <div className="flex justify-between font-mono text-[9px] items-center">
                <span>Radius Y (Tinggi):</span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => updateHotspot('radiusY', Math.max(2, (currentTargetHotspot.radiusY !== undefined ? currentTargetHotspot.radiusY : currentTargetHotspot.radius) - 1))} className="px-1 bg-amber-950 hover:bg-amber-900 border border-amber-500/40 rounded text-[8px] font-bold cursor-pointer">-1</button>
                  <span className="font-bold text-amber-200 min-w-[28px] text-right">{currentTargetHotspot.radiusY !== undefined ? currentTargetHotspot.radiusY : currentTargetHotspot.radius}%</span>
                  <button type="button" onClick={() => updateHotspot('radiusY', Math.min(45, (currentTargetHotspot.radiusY !== undefined ? currentTargetHotspot.radiusY : currentTargetHotspot.radius) + 1))} className="px-1 bg-amber-950 hover:bg-amber-900 border border-amber-500/40 rounded text-[8px] font-bold cursor-pointer">+1</button>
                </div>
              </div>
              <input
                type="range"
                min="2"
                max="45"
                value={currentTargetHotspot.radiusY !== undefined ? currentTargetHotspot.radiusY : currentTargetHotspot.radius}
                onChange={(e) => updateHotspot('radiusY', Number(e.target.value))}
                onInput={(e) => updateHotspot('radiusY', Number((e.target as HTMLInputElement).value))}
                className="w-full h-1.5 bg-amber-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Slider Rounded Corner (Border Radius %) */}
            <div className="space-y-0.5">
              <div className="flex justify-between font-mono text-[9px] items-center">
                <span>Kelengkungan (Rounded):</span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => updateHotspot('borderRadius', Math.max(0, (currentTargetHotspot.borderRadius !== undefined ? currentTargetHotspot.borderRadius : 50) - 5))} className="px-1 bg-amber-950 hover:bg-amber-900 border border-amber-500/40 rounded text-[8px] font-bold cursor-pointer">-5</button>
                  <span className="font-bold text-amber-200 min-w-[28px] text-right">{currentTargetHotspot.borderRadius !== undefined ? currentTargetHotspot.borderRadius : 50}%</span>
                  <button type="button" onClick={() => updateHotspot('borderRadius', Math.min(50, (currentTargetHotspot.borderRadius !== undefined ? currentTargetHotspot.borderRadius : 50) + 5))} className="px-1 bg-amber-950 hover:bg-amber-900 border border-amber-500/40 rounded text-[8px] font-bold cursor-pointer">+5</button>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={currentTargetHotspot.borderRadius !== undefined ? currentTargetHotspot.borderRadius : 50}
                onChange={(e) => updateHotspot('borderRadius', Number(e.target.value))}
                onInput={(e) => updateHotspot('borderRadius', Number((e.target as HTMLInputElement).value))}
                className="w-full h-1.5 bg-amber-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Slider Rotation */}
            <div className="space-y-0.5">
              <div className="flex justify-between font-mono text-[9px] items-center">
                <span>Rotasi:</span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => updateHotspot('rotation', ( (currentTargetHotspot.rotation || 0) - 5 + 360 ) % 360)} className="px-1 bg-amber-950 hover:bg-amber-900 border border-amber-500/40 rounded text-[8px] font-bold cursor-pointer">-5°</button>
                  <span className="font-bold text-amber-200 min-w-[28px] text-right">{currentTargetHotspot.rotation || 0}°</span>
                  <button type="button" onClick={() => updateHotspot('rotation', ( (currentTargetHotspot.rotation || 0) + 5 ) % 360)} className="px-1 bg-amber-950 hover:bg-amber-900 border border-amber-500/40 rounded text-[8px] font-bold cursor-pointer">+5°</button>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={currentTargetHotspot.rotation || 0}
                onChange={(e) => updateHotspot('rotation', Number(e.target.value))}
                onInput={(e) => updateHotspot('rotation', Number((e.target as HTMLInputElement).value))}
                className="w-full h-1.5 bg-amber-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            <div className="pt-1.5 border-t border-amber-500/20 flex flex-col gap-1">
              <button
                type="button"
                onClick={() => {
                  const dataToCopy = activeLevel.hotspots
                    ? JSON.stringify(activeLevel.hotspots, null, 2)
                    : JSON.stringify(activeLevel.hotspot, null, 2);
                  navigator.clipboard.writeText(dataToCopy);
                  alert(`Konfigurasi Hotspot (${activeLevel.hotspots ? 'Array Multi-Hotspot' : 'Hotspot Tunggal'}) berhasil disalin ke Clipboard!`);
                }}
                className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-[9px] rounded flex items-center justify-center gap-1 cursor-pointer transition-colors shadow"
              >
                📋 Salin Konfigurasi Hotspot
              </button>
              <div className="text-[8px] text-amber-400/70 text-center font-mono">
                Tempelkan langsung ke <code className="text-amber-200">questions.ts</code>
              </div>
            </div>
          </div>
        )}

        {/* Gameplay Area */}
        <div className="flex-1 flex items-center justify-center p-6 min-h-0 relative select-none">
          {activeLevel.type === 'image' && activeLevel.imageUrl ? (
            /* SPOT THE ANOMALY PICTURE MODE */
            <div className="w-full h-full flex items-center justify-center p-2 sm:p-4">
              <InteractiveImage
                src={activeLevel.imageUrl}
                alt={activeLevel.title}
                hotspot={activeLevel.hotspot}
                hotspots={activeLevel.hotspots}
                foundHotspotIndices={foundHotspotIndices}
                found={showFeedback}
                missClicks={missClicks}
                onClick={onImageClick}
                disabled={showFeedback}
                showGrid={showGrid}
                devShowHotspot={devShowHotspot}
                activeHotspotIndex={activeHotspotIndex}
              />
            </div>
          ) : (
            /* SPOT THE HALLUCINATION TEXT MODE */
            <div className="w-full max-w-xl bg-black/80 border-2 border-emerald-900/65 rounded-2xl p-4 sm:p-6 text-xs sm:text-sm leading-relaxed shadow-2xl relative flex flex-col justify-between max-h-[75vh] sm:max-h-[85vh] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20"></div>
              
              <div className="text-[9px] text-emerald-600 border-b border-emerald-950 pb-2 mb-3 uppercase tracking-wider flex items-center justify-between shrink-0">
                <span>Bukti Dokumen #DOC-{activeLevel.id}</span>
                <span>Status: Rahasia</span>
              </div>

              {/* Scrollable text container */}
              <div className="flex-1 overflow-y-auto my-2 pr-1 scrollbar-thin">
                <p className="text-emerald-250 text-justify text-xs sm:text-sm leading-7 sm:leading-8 font-sans">
                  {activeLevel.textSegments?.map((seg, idx) => {
                    const isSelected = selectedSegmentIndex === idx;
                    const isCorrectSeg = idx === activeLevel.correctSegmentIndex;

                    let bgClass = "border-emerald-950 text-emerald-350 hover:border-emerald-450 hover:text-emerald-300";
                    
                    if (showFeedback && isCorrectSeg) {
                      bgClass = "bg-emerald-950/40 border-emerald-400 text-emerald-400 font-bold border-solid glow-emerald";
                    } else if (isSelected) {
                      if (isCorrectSeg) {
                        bgClass = "bg-emerald-950/40 border-emerald-400 text-emerald-400 font-bold border-solid glow-emerald";
                      } else {
                        bgClass = "bg-rose-950/40 border-rose-500 text-rose-400 font-bold border-solid animate-pulse glow-rose";
                      }
                    }

                    return (
                      <button
                        type="button"
                        key={seg}
                        onClick={() => !showFeedback && onSegmentClick(idx)}
                        className={`inline cursor-pointer border-b border-dashed px-1 py-0.5 rounded transition-all duration-200 text-left ${bgClass}`}
                        style={{ pointerEvents: showFeedback ? 'none' : 'auto' }}
                        disabled={showFeedback}
                      >
                        {seg}
                      </button>
                    );
                  })}
                </p>
              </div>
              
              <div className="text-[8px] text-emerald-600 border-t border-emerald-950 pt-2 mt-2 text-right uppercase shrink-0">
                <span>Pilih kalimat yang memuat anomali teks</span>
              </div>
            </div>
          )}
        </div>

        {/* MODAL 1: DETECTIVE CLUES BOARD */}
        {isClueOpen && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm z-40 flex items-center justify-center p-4 animate-fadeIn">
            <div className="w-full max-w-md bg-[#020502]/95 border-2 border-emerald-800 rounded-2xl p-4 sm:p-5 shadow-2xl relative max-h-[90vh] overflow-y-auto flex flex-col">
              <button
                type="button"
                onClick={() => setIsClueOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-emerald-500 hover:text-white transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="flex items-center gap-2 border-b border-emerald-950 pb-1.5 sm:pb-2 mb-3 sm:mb-4 shrink-0">
                <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <h4 className="text-[10px] sm:text-xs font-bold text-emerald-100 uppercase tracking-wider">
                  Petunjuk Penyelidikan
                </h4>
              </div>

              <div className="mb-3 sm:mb-4 overflow-y-auto pr-1">
                <div className="mb-3">
                  <span className="text-[8px] sm:text-[9px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30">
                    {activeLevel.category}
                  </span>
                  <p className="text-[11px] sm:text-xs text-emerald-250 mt-2 sm:mt-3 leading-relaxed text-justify">
                    {activeLevel.description}
                  </p>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-2.5 sm:p-3.5">
                  <span className="text-[8px] sm:text-[9px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    Clue / Informasi Kunci:
                  </span>
                  <p className="text-[11px] sm:text-xs text-emerald-350 leading-relaxed font-sans font-medium">
                    {activeLevel.clue}
                  </p>
                </div>
              </div>

              {attempts > 0 && (
                <div className="flex items-center gap-2 text-rose-500 text-[10px] sm:text-xs mb-3 sm:mb-4 shrink-0">
                  <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Percobaan Gagal: <strong className="font-mono">{attempts} kali</strong></span>
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsClueOpen(false)}
                className="w-full py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700 text-emerald-100 rounded-lg text-[10px] sm:text-xs font-bold transition-colors cursor-pointer text-center shrink-0"
              >
                Kembali ke Arena
              </button>
            </div>
          </div>
        )}

        {/* MODAL 2: FEEDBACK / REVEAL OVERLAY */}
        {showFeedback && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md z-45 flex items-center justify-center p-4 animate-fadeIn">
            <div className="w-full max-w-md bg-[#020502]/95 border-2 border-emerald-500 rounded-2xl p-4 sm:p-5 shadow-2xl relative text-center max-h-[90vh] overflow-y-auto flex flex-col justify-center">
              
              {/* Correctness Header */}
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-emerald-950/60 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0">
                <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-400 animate-pulse" />
              </div>

              <h3 className="text-xs sm:text-sm font-black text-emerald-400 uppercase tracking-widest mb-0.5 sm:mb-1 shrink-0">
                ANOMALI TERKUNCI!
              </h3>
              <p className="text-[8px] sm:text-[9px] font-mono text-emerald-500 uppercase tracking-wider mb-2.5 sm:mb-4 shrink-0">
                Analisis Kebenaran Faktual
              </p>

              {/* Reveal details */}
              <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-3 sm:p-4 mb-3 sm:mb-5 text-left max-h-[100px] sm:max-h-[160px] overflow-y-auto shrink-0">
                <p className="text-[11px] sm:text-xs text-emerald-250 leading-relaxed font-sans font-medium text-justify">
                  {activeLevel.explanation}
                </p>
              </div>

              <button
                type="button"
                onClick={onAdvance}
                className="w-full py-2.5 sm:py-3 bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 text-black rounded-xl text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:scale-[1.02] active:scale-98 shrink-0"
              >
                <span>{currentLevelIndex === totalLevels - 1 ? 'Lihat Hasil Akhir' : 'Lanjut ke Kasus Berikutnya'}</span>
                <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5px]" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
