import { useState } from 'react';
import { CheckCircle2, Search, ArrowRight, HelpCircle, X, ShieldAlert, Wrench } from 'lucide-react';
import type { Level, MissClick, Hotspot } from '../../types';
import { InteractiveImage } from '../../components/InteractiveImage';
import arenaBg from '../../assets/background-gameplay.webp';

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
  onAdvance
}: ArenaPageProps) {
  
  const [isClueOpen, setIsClueOpen] = useState(false);
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
    <div id="arena-page" className="h-screen w-screen bg-[#021324] text-[#e2eaf4] flex items-center justify-center overflow-hidden relative select-none font-sans">
      
      {/* Background Image with Dark Oceanic Atmosphere Overlay */}
      <img
        id="arena-bg-image"
        src={arenaBg}
        alt="Latar Belakang Ruang Investigasi"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 filter brightness-85 contrast-115 pointer-events-none"
      />
      <div id="arena-bg-overlay" className="absolute inset-0 bg-gradient-to-t from-[#021324]/90 via-[#021324]/60 to-[#021324]/80 z-1 pointer-events-none"></div>

      {/* Immersive Game UI stretching to landscape screen bounds */}
      <div id="arena-ui-container" className="relative w-full h-full z-10 flex flex-col">
        
        {/* HUD: Top-Right DEV Mode Button (When Unlocked) */}
        {devUnlocked && activeLevel.type === 'image' && (
          <div id="arena-hud-top-right" className="absolute top-4 right-4 z-30 flex items-center gap-2">
            <button
              id="btn-dev-hotspot-toggle"
              type="button"
              onClick={() => setDevShowHotspot(!devShowHotspot)}
              className={`px-3 py-1.5 backdrop-blur-md border-2 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-md ${
                devShowHotspot
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-[#041a32]/85 border-[#1f568d]/60 text-[#8fabc6] hover:text-white'
              }`}
              title="DEV: Tampilkan Titik Hotspot Anomali"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>DEV: {devShowHotspot ? 'HOTSPOT ON' : 'HOTSPOT OFF'}</span>
            </button>
          </div>
        )}

        {/* HUD: Bottom-Left Clues Help Icon Button */}
        <button
          id="btn-open-clue"
          type="button"
          onClick={() => setIsClueOpen(true)}
          className="absolute bottom-4 left-4 z-30 w-12 h-12 bg-[#041a32]/90 hover:bg-[#062444] backdrop-blur-md border-2 border-[#f0c400]/70 rounded-full flex items-center justify-center text-[#f0c400] hover:text-white transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 animate-pulse glow-gold"
          title="Petunjuk Penyelidikan"
        >
          <Search className="w-5 h-5 text-[#f0c400]" />
        </button>

        {/* HUD: Bottom-Right Level Title Info Badge */}
        <div 
          id="badge-level-info" 
          onClick={handleSecretScoreClick}
          className="absolute bottom-4 right-4 z-30 px-3.5 py-1.5 bg-[#041a32]/85 backdrop-blur-md border-2 border-[#1f568d]/60 rounded-xl text-[10px] sm:text-xs text-[#8fabc6] font-bold shadow-md flex items-center gap-2 cursor-pointer hover:border-[#388ce0] transition-colors"
          title="Kasus Investigasi (Klik 3x untuk Opsi Pengembang)"
        >
          <span>Kasus {currentLevelIndex + 1} dari {totalLevels}: <span className="text-white font-title tracking-wide">{activeLevel.title}</span></span>
          {activeLevel.type === 'image' && (
            <span className="px-2 py-0.5 bg-[#062444] border border-[#1f568d]/60 text-[#f0c400] text-[9px] rounded-full font-mono font-bold">
              🎯 {(foundHotspotIndices || []).length} / {currentHotspots.length} Anomali
            </span>
          )}
        </div>

        {/* HUD: DEV HOTSPOT CONTROL PANEL TOOLBAR */}
        {devShowHotspot && activeLevel.type === 'image' && currentTargetHotspot && (
          <div 
            id="panel-dev-hotspot-adjuster"
            className="absolute bottom-16 right-4 z-50 bg-[#041a32]/95 backdrop-blur-md border-2 border-amber-500 rounded-xl p-3 shadow-2xl text-[10px] text-amber-300 w-72 space-y-2 select-none max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-1.5 font-bold text-amber-400">
              <span className="flex items-center gap-1 uppercase tracking-wider">
                <Wrench className="w-3 h-3 text-amber-400" />
                Dev Hotspot Adjuster
              </span>
              <button
                id="btn-dev-add-hotspot"
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
                id="btn-dev-copy-hotspots"
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
        <div id="arena-gameplay-area" className="flex-1 flex items-center justify-center p-6 min-h-0 relative select-none">
          {activeLevel.type === 'image' && activeLevel.imageUrl ? (
            /* SPOT THE ANOMALY PICTURE MODE */
            <div id="arena-image-mode-wrapper" className="w-full h-full flex items-center justify-center p-2 sm:p-4">
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
                devShowHotspot={devShowHotspot}
                activeHotspotIndex={activeHotspotIndex}
              />
            </div>
          ) : (
            /* SPOT THE HALLUCINATION TEXT MODE */
            <div id="arena-text-case-card" className="w-full max-w-2xl bg-[#041a32]/95 border-2 border-[#1f568d]/60 rounded-2xl p-5 sm:p-7 text-xs sm:text-sm leading-relaxed shadow-[0_12px_40px_rgba(0,0,0,0.65)] relative flex flex-col justify-between max-h-[75vh] sm:max-h-[85vh] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1f568d] via-[#388ce0] to-[#f0c400]"></div>
              
              <div className="text-[10px] sm:text-xs text-[#8fabc6] border-b border-[#0f3b66] pb-2.5 mb-3 uppercase tracking-wider flex items-center justify-between shrink-0 font-mono font-bold">
                <span>Bukti Dokumen #DOC-{activeLevel.id}</span>
                <span className="px-2.5 py-0.5 bg-[#0a2f54]/70 border border-[#1f568d]/50 text-[#8fabc6] rounded font-mono">
                  {activeLevel.category}
                </span>
              </div>

              {/* Scrollable text container as continuous paragraph */}
              <div id="arena-text-segments-container" className="flex-1 overflow-y-auto my-2 pr-2 scrollbar-thin">
                <p className="text-[#e2eaf4] text-justify text-xs sm:text-sm md:text-base leading-7 sm:leading-8 font-sans font-normal indent-6">
                  {activeLevel.textSegments?.map((seg, idx) => {
                    const isSelected = selectedSegmentIndex === idx;
                    const isCorrectSeg = idx === activeLevel.correctSegmentIndex;

                    let highlightClass = "text-[#e2eaf4] hover:bg-[#1f568d]/40 hover:text-white transition-colors duration-150 rounded decoration-dotted underline underline-offset-4 decoration-[#1f568d]/70 hover:decoration-[#388ce0]";
                    
                    if (showFeedback && isCorrectSeg) {
                      highlightClass = "bg-[#f0c400]/25 text-[#f7d000] font-semibold underline decoration-[#f0c400] underline-offset-4 glow-gold rounded px-0.5 shadow-sm";
                    } else if (isSelected) {
                      if (isCorrectSeg) {
                        highlightClass = "bg-[#f0c400]/25 text-[#f7d000] font-semibold underline decoration-[#f0c400] underline-offset-4 glow-gold rounded px-0.5 shadow-sm";
                      } else {
                        highlightClass = "bg-rose-950/70 text-rose-300 font-semibold underline decoration-rose-500 underline-offset-4 animate-pulse glow-rose rounded px-0.5";
                      }
                    }

                    return (
                      <span
                        key={`seg-${idx}`}
                        id={`text-segment-${idx}`}
                        role="button"
                        tabIndex={showFeedback ? -1 : 0}
                        onClick={() => !showFeedback && onSegmentClick(idx)}
                        onKeyDown={(e) => {
                          if (!showFeedback && (e.key === 'Enter' || e.key === ' ')) {
                            e.preventDefault();
                            onSegmentClick(idx);
                          }
                        }}
                        className={`inline cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#388ce0] ${highlightClass}`}
                        style={{ pointerEvents: showFeedback ? 'none' : 'auto' }}
                        title="Klik untuk memilih kalimat ini"
                      >
                        {seg}
                      </span>
                    );
                  })}
                </p>
              </div>
              
              <div className="text-[9px] sm:text-[10px] text-[#8fabc6] border-t border-[#0f3b66] pt-2.5 mt-2 text-right uppercase shrink-0 font-mono flex items-center justify-between">
                <span className="text-[#388ce0] font-bold">💡 Arahkan & klik kalimat yang memuat anomali</span>
                <span>Pemeriksaan Dokumen</span>
              </div>
            </div>
          )}
        </div>

        {/* MODAL 1: DETECTIVE CLUES BOARD */}
        {isClueOpen && (
          <div id="modal-clue-board" className="absolute inset-0 bg-black/85 backdrop-blur-sm z-40 flex items-center justify-center p-4 animate-fadeIn">
            <div id="modal-clue-card" className="w-full max-w-md bg-[#041a32] border-2 border-[#1f568d] rounded-2xl p-4 sm:p-5 shadow-[0_0_35px_rgba(31,86,141,0.4)] relative max-h-[90vh] overflow-y-auto flex flex-col text-[#e2eaf4]">
              <button
                id="btn-close-clue-x"
                type="button"
                onClick={() => setIsClueOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#8fabc6] hover:text-white transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="flex items-center gap-2 border-b border-[#0f3b66] pb-1.5 sm:pb-2 mb-3 sm:mb-4 shrink-0">
                <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f0c400]" />
                <h4 className="text-xs sm:text-sm font-normal text-[#f0c400] uppercase tracking-wider font-title">
                  Petunjuk Penyelidikan
                </h4>
              </div>

              <div className="mb-3 sm:mb-4 overflow-y-auto pr-1">
                <div className="mb-3">
                  <span className="text-[8px] sm:text-[9px] font-bold text-[#8fabc6] uppercase tracking-widest bg-[#062444] px-2 py-0.5 rounded border border-[#1f568d]/50">
                    {activeLevel.category}
                  </span>
                  <p className="text-[11px] sm:text-xs text-[#c8d5e3] mt-2 sm:mt-3 leading-relaxed text-justify font-sans">
                    {activeLevel.description}
                  </p>
                </div>

                <div className="bg-[#062444]/60 border border-[#1f568d]/50 rounded-xl p-2.5 sm:p-3.5">
                  <span className="text-[8px] sm:text-[9px] font-bold text-[#f0c400] uppercase tracking-wider block mb-1">
                    Clue / Informasi Kunci:
                  </span>
                  <p className="text-[11px] sm:text-xs text-[#e2eaf4] leading-relaxed font-sans font-medium">
                    {activeLevel.clue}
                  </p>
                </div>
              </div>

              {attempts > 0 && (
                <div className="flex items-center gap-2 text-rose-400 text-[10px] sm:text-xs mb-3 sm:mb-4 shrink-0 font-bold">
                  <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" />
                  <span>Percobaan Gagal: <strong className="font-mono">{attempts} kali</strong></span>
                </div>
              )}

              <button
                id="btn-close-clue-back"
                type="button"
                onClick={() => setIsClueOpen(false)}
                className="w-full py-2 bg-[#082a4d] hover:bg-[#13497f] border border-[#1f568d] text-[#e2eaf4] rounded-lg text-[10px] sm:text-xs font-bold transition-colors cursor-pointer text-center shrink-0"
              >
                Kembali ke Arena
              </button>
            </div>
          </div>
        )}

        {/* MODAL 2: FEEDBACK / REVEAL OVERLAY */}
        {showFeedback && (
          <div id="modal-feedback-reveal" className="absolute inset-0 bg-black/85 backdrop-blur-md z-45 flex items-center justify-center p-4 animate-fadeIn">
            <div id="modal-feedback-card" className="w-full max-w-md bg-[#041a32] border-2 border-[#f0c400] rounded-2xl p-4 sm:p-5 shadow-[0_0_35px_rgba(240,196,0,0.35)] relative text-center max-h-[90vh] overflow-y-auto flex flex-col justify-center text-[#e2eaf4]">
              
              {/* Correctness Header */}
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#062444] border-2 border-[#f0c400] flex items-center justify-center mx-auto mb-2 sm:mb-3 glow-gold shrink-0">
                <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 text-[#f0c400] animate-pulse" />
              </div>

              <h3 className="text-sm sm:text-base font-normal text-[#f0c400] uppercase tracking-widest mb-0.5 sm:mb-1 shrink-0 font-title">
                ANOMALI TERKUNCI!
              </h3>
              <p className="text-[8px] sm:text-[9px] font-mono text-[#8fabc6] uppercase tracking-wider mb-2.5 sm:mb-4 shrink-0">
                Analisis Kebenaran Faktual
              </p>

              {/* Reveal details */}
              <div className="bg-[#062444]/60 border border-[#1f568d]/50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-5 text-left max-h-[100px] sm:max-h-[160px] overflow-y-auto shrink-0">
                <p className="text-[11px] sm:text-xs text-[#e2eaf4] leading-relaxed font-sans font-medium text-justify">
                  {activeLevel.explanation}
                </p>
              </div>

              <button
                id="btn-advance-level"
                type="button"
                onClick={onAdvance}
                className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-[#1f568d] via-[#256eb4] to-[#022949] hover:from-[#2877c2] hover:to-[#043660] border border-[#388ce0]/60 text-white rounded-xl text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[0_0_20px_rgba(31,86,141,0.4)] hover:shadow-[0_0_25px_rgba(56,140,224,0.6)] hover:scale-[1.02] active:scale-98 shrink-0"
              >
                <span>{currentLevelIndex === totalLevels - 1 ? 'Lihat Hasil Akhir' : 'Lanjut ke Kasus Berikutnya'}</span>
                <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5px] text-white" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
