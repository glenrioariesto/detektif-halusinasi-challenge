import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Search, ArrowRight, HelpCircle, X, ShieldAlert, Award } from 'lucide-react';
import type { Level, MissClick } from '../../types';
import { InteractiveImage } from '../../components/InteractiveImage';

interface ArenaPageProps {
  currentLevelIndex: number;
  activeLevel: Level;
  totalLevels: number;
  showFeedback: boolean;
  score: number;
  attempts: number;
  foundHotspot: boolean;
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
  selectedSegmentIndex,
  missClicks,
  onImageClick,
  onSegmentClick,
  onAdvance,
  onBack
}: ArenaPageProps) {
  
  const [isClueOpen, setIsClueOpen] = useState(false);

  return (
    <div className="h-screen w-screen bg-[#070514] text-emerald-100 flex items-center justify-center overflow-hidden relative select-none font-mono">
      
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

        {/* HUD: Top-Right Score Badge */}
        <div className="absolute top-4 right-4 z-30 px-3.5 py-2 bg-black/60 backdrop-blur-md border-2 border-emerald-900/60 rounded-2xl flex items-center gap-2 text-xs font-bold text-emerald-300 shadow-md">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Skor: {score}</span>
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

        {/* HUD: Bottom-Right Level Title Info Badge */}
        <div className="absolute bottom-4 right-4 z-30 px-3.5 py-1.5 bg-black/60 backdrop-blur-md border-2 border-emerald-900/60 rounded-xl text-[10px] sm:text-xs text-emerald-400 font-bold shadow-md">
          Kasus {currentLevelIndex + 1} dari {totalLevels}: {activeLevel.title}
        </div>

        {/* Gameplay Area */}
        <div className="flex-1 flex items-center justify-center p-6 min-h-0 relative select-none">
          {activeLevel.type === 'image' && activeLevel.imageUrl ? (
            /* SPOT THE ANOMALY PICTURE MODE */
            <div className="w-full h-full flex items-center justify-center">
              <InteractiveImage
                src={activeLevel.imageUrl}
                alt={activeLevel.title}
                hotspot={activeLevel.hotspot}
                found={showFeedback}
                missClicks={missClicks}
                onClick={onImageClick}
                disabled={showFeedback}
              />
            </div>
          ) : (
            /* SPOT THE HALLUCINATION TEXT MODE */
            <div className="w-full max-w-xl bg-black/80 border-2 border-emerald-900/65 rounded-2xl p-5 sm:p-7 text-xs sm:text-sm leading-relaxed shadow-2xl relative flex flex-col justify-center min-h-[220px]">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20"></div>
              
              <div className="text-[9px] text-emerald-600 border-b border-emerald-950 pb-2 mb-4 uppercase tracking-wider flex items-center justify-between">
                <span>Bukti Dokumen #DOC-{activeLevel.id}</span>
                <span>Status: Rahasia</span>
              </div>

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
              
              <div className="text-[8px] text-emerald-600 border-t border-emerald-950 pt-2 mt-4 text-right uppercase">
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
