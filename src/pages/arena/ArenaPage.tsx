import React from 'react';
import { ArrowLeft, CheckCircle2, Search, ArrowRight, FileText, Image as ImageIcon } from 'lucide-react';
import { Level, MissClick } from '../../types';
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
  foundHotspot,
  selectedSegmentIndex,
  missClicks,
  onImageClick,
  onSegmentClick,
  onAdvance,
  onBack
}: ArenaPageProps) {
  const progressPercentage = (currentLevelIndex / totalLevels) * 100;

  return (
    <div className="min-h-screen w-screen bg-transparent text-emerald-100 flex flex-col font-mono scanlines">
      {/* Navigation & Status Header */}
      <header className="border-b border-emerald-950 bg-[#020502]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between z-10 shrink-0 select-none">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-500 hover:text-emerald-350 transition-colors uppercase cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-500" />
          <span>Keluar</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            {activeLevel.type === 'image' ? (
              <ImageIcon className="w-3.5 h-3.5 text-emerald-450" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-emerald-450" />
            )}
            Kasus {currentLevelIndex + 1} dari {totalLevels}
          </span>
          <h3 className="text-sm font-bold font-display text-emerald-100 mt-0.5">
            {activeLevel.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-500">Terpecahkan:</span>
          <span className="font-mono text-sm font-black text-emerald-400 bg-emerald-950/40 border border-emerald-800 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.15)]">
            {score}
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-[#0a120a] relative z-10 shrink-0">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Main split-screen container */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden p-6 gap-6 relative max-h-[calc(100vh-68px)]">
        {/* Left/Main column: Interactive gameplay space */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
          {/* Level Header / Challenge prompt */}
          <div className="bg-[#060c06]/85 border border-emerald-955 rounded-xl p-4 shrink-0 shadow-lg">
            <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30">
              {activeLevel.category}
            </span>
            <p className="text-xs text-emerald-250 mt-2.5 leading-relaxed">
              {activeLevel.description}
            </p>
          </div>

          {/* GAMEPLAY ELEMENT SELECTOR */}
          <div className="flex-1 flex items-center justify-center py-2 min-h-0">
            {activeLevel.type === 'image' && activeLevel.imageUrl ? (
              /* SPOT THE ANOMALY PICTURE MODE */
              <InteractiveImage
                src={activeLevel.imageUrl}
                alt={activeLevel.title}
                hotspot={activeLevel.hotspot}
                found={foundHotspot}
                missClicks={missClicks}
                onClick={onImageClick}
                disabled={showFeedback}
              />
            ) : (
              /* SPOT THE HALLUCINATION TEXT MODE */
              <div className="w-full max-w-2xl bg-[#030603]/90 border border-emerald-900 rounded-2xl p-6 md:p-8 font-mono text-sm leading-relaxed shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[300px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20"></div>
                
                {/* Dossier paper styling header */}
                <div className="text-[10px] text-emerald-600 border-b border-emerald-950 pb-3 mb-6 uppercase tracking-wider flex items-center justify-between">
                  <span>Dokumen Bukti Teknis #DOC-{activeLevel.id}</span>
                  <span>Status: Rahasia</span>
                </div>

                {/* Split text segments loop */}
                <p className="text-emerald-200 text-justify text-sm leading-8 font-sans">
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
                        bgClass = "bg-rose-950/40 border-rose-500 text-rose-450 font-bold border-solid animate-pulse glow-rose";
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
                
                <div className="text-[9px] text-emerald-600 border-t border-emerald-950 pt-3 mt-6 text-right uppercase">
                  <span>Pilih bagian teks yang memuat kebohongan AI</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Clue & Reveal explanation drawer */}
        <div className="w-full lg:w-[320px] flex flex-col gap-4 overflow-y-auto shrink-0 select-none">
          {/* Detective Clues Board */}
          <div className="bg-[#060c06]/85 border border-emerald-900/40 rounded-xl p-4 flex flex-col gap-3 shadow-lg">
            <div className="flex items-center gap-2 border-b border-emerald-950 pb-2">
              <Search className="w-4 h-4 text-emerald-450" />
              <h4 className="font-mono text-xs font-bold text-emerald-100 uppercase tracking-wider">
                Petunjuk Penyelidikan
              </h4>
            </div>
            
            <p className="text-xs text-emerald-300 leading-relaxed font-sans font-medium">
              {activeLevel.clue}
            </p>

            {attempts > 0 && !showFeedback && (
              <div className="border-t border-emerald-950/60 pt-2 flex items-center justify-between text-[10px] font-mono text-rose-500">
                <span>Percobaan Gagal:</span>
                <span className="font-bold">{attempts} kali</span>
              </div>
            )}
          </div>

          {/* Feedback Section (Visible after successfully matching the Anomaly) */}
          {showFeedback && (
            <div className="border border-emerald-600 bg-emerald-950/20 glow-emerald rounded-xl p-4 flex flex-col gap-3 transition-all duration-300 animate-fadeIn">
              {/* Correctness Header */}
              <div className="flex items-center gap-2 border-b pb-2 border-emerald-900/30">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-pulse" />
                <span className="font-mono text-xs font-bold text-emerald-450 uppercase tracking-widest">
                  ANOMALI TERKUNCI!
                </span>
              </div>

              {/* Reveal details */}
              <div className="text-xs">
                <p className="font-mono text-emerald-105 mb-2 font-bold uppercase tracking-wider">
                  Analisis Kebenaran Faktual:
                </p>
                <p className="text-emerald-250 leading-relaxed font-sans mb-3 text-justify font-medium">
                  {activeLevel.explanation}
                </p>
                <button
                  type="button"
                  onClick={onAdvance}
                  className="w-full py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700 text-emerald-100 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                  <span>{currentLevelIndex === totalLevels - 1 ? 'Lihat Hasil Akhir' : 'Lanjut ke Kasus Berikutnya'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
