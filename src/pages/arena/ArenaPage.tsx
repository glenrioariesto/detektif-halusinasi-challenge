import { useState } from 'react';
import { CheckCircle2, ArrowRight, X, BookOpen, Target, ImageIcon, FileText, Award, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import type { Level, MissClick } from '../../types';
import { InteractiveImage } from '../../components/InteractiveImage';
import arenaBg from '../../assets/background-gameplay.webp';
import logoPusbuk from '../../assets/logo-pusbuk.webp';

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
  foundHotspotIndices = [],
  selectedSegmentIndex,
  missClicks,
  onImageClick,
  onSegmentClick,
  onAdvance
}: ArenaPageProps) {
  
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [guideSlide, setGuideSlide] = useState(0);

  // Normalize hotspots list for current level
  const currentHotspots = activeLevel.hotspots || (activeLevel.hotspot ? [activeLevel.hotspot] : []);

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

      {/* HUD: Top-Left Pusbuk Logo (matching Splash layout) */}
      <div id="arena-logo-container" className="absolute top-3 left-3 sm:top-5 sm:left-5 md:top-6 md:left-6 2xl:top-10 2xl:left-10 z-30 shrink-0 pointer-events-none select-none animate-fadeIn">
        <img
          id="arena-logo-pusbuk"
          src={logoPusbuk}
          alt="Logo Pusbuk"
          className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-20 w-auto object-contain drop-shadow-md"
        />
      </div>

      {/* Immersive Game UI stretching to landscape screen bounds */}
      <div id="arena-ui-container" className="relative w-full h-full z-10 flex flex-col">
        
        {/* HUD: Bottom-Left Gameplay Guide Button */}
        <button
          id="btn-open-guide"
          type="button"
          onClick={() => {
            setIsGuideOpen(true);
            setGuideSlide(0);
          }}
          className="absolute bottom-4 left-4 z-30 px-3.5 py-1.5 bg-[#041a32]/90 hover:bg-[#062444] backdrop-blur-md border-2 border-[#f0c400]/70 rounded-xl flex items-center gap-1.5 text-xs sm:text-sm text-[#f0c400] hover:text-white font-title tracking-wider transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95 glow-gold"
          title="Buka Panduan Cara Bermain"
        >
          <BookOpen className="w-4 h-4 text-[#f0c400]" />
          <span>Panduan</span>
        </button>

        {/* HUD: Bottom-Right Level & Anomaly Info Badges */}
        <div id="arena-hud-bottom-right" className="absolute bottom-4 right-4 z-30 flex items-center gap-2 select-none">
          {activeLevel.type === 'image' && (
            <div 
              id="badge-anomaly-count"
              className="px-3 py-1.5 bg-[#041a32]/90 backdrop-blur-md border-2 border-[#1f568d]/60 rounded-xl text-xs sm:text-sm text-[#f0c400] font-title tracking-wider shadow-lg flex items-center"
            >
              <span>{(foundHotspotIndices || []).length} / {currentHotspots.length} Anomali</span>
            </div>
          )}

          <div 
            id="badge-level-info" 
            className="px-3.5 py-1.5 bg-[#041a32]/90 backdrop-blur-md border-2 border-[#1f568d]/60 rounded-xl text-xs sm:text-sm text-[#8fabc6] font-title tracking-wider shadow-lg flex items-center"
          >
            <span>Kasus {currentLevelIndex + 1} dari {totalLevels}</span>
          </div>
        </div>

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
              />
            </div>
          ) : (
            /* SPOT THE HALLUCINATION TEXT MODE */
            <div id="arena-text-case-card" className="w-full max-w-2xl lg:max-w-3xl 2xl:max-w-4xl bg-[#041a32]/95 border-2 border-[#1f568d]/60 rounded-2xl p-5 sm:p-7 text-xs sm:text-sm md:text-base leading-relaxed shadow-[0_12px_40px_rgba(0,0,0,0.65)] relative flex flex-col justify-between max-h-[75vh] sm:max-h-[85vh] overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1f568d] via-[#388ce0] to-[#f0c400]"></div>
              
              <div className="text-[10px] sm:text-xs text-[#8fabc6] border-b border-[#0f3b66] pb-2.5 mb-3 uppercase tracking-wider flex items-center justify-between shrink-0 font-title">
                <span>Bukti Dokumen #DOC-{activeLevel.id}</span>
                <span className="px-2.5 py-0.5 bg-[#0a2f54]/70 border border-[#1f568d]/50 text-[#8fabc6] rounded font-title">
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
              
              <div className="text-[9px] sm:text-[10px] text-[#8fabc6] border-t border-[#0f3b66] pt-2.5 mt-2 text-right uppercase shrink-0 font-title tracking-wide flex items-center justify-between">
                <span className="text-[#388ce0]">💡 Arahkan & klik kalimat yang memuat anomali</span>
                <span>Pemeriksaan Dokumen</span>
              </div>
            </div>
          )}
        </div>

        {/* MODAL 1: GAMEPLAY GUIDE (PANDUAN CARA BERMAIN MULTI-SLIDE) */}
        {isGuideOpen && (
          <div id="modal-gameplay-guide" className="absolute inset-0 bg-black/85 backdrop-blur-md z-45 flex items-center justify-center p-4 animate-fadeIn">
            <div id="modal-guide-card" className="w-full max-w-lg bg-[#041a32] border-2 border-[#1f568d] rounded-2xl p-4 sm:p-5 shadow-[0_0_40px_rgba(31,86,141,0.5)] relative flex flex-col justify-between text-[#e2eaf4] select-none">
              <button
                id="btn-close-guide-x"
                type="button"
                onClick={() => setIsGuideOpen(false)}
                className="absolute top-3.5 right-3.5 text-[#8fabc6] hover:text-white transition-colors cursor-pointer z-10"
                title="Tutup Panduan"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#0f3b66] pb-2.5 mb-3 shrink-0 pr-8">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#f0c400]" />
                  <h3 className="text-xs sm:text-sm font-normal text-[#f0c400] uppercase tracking-wider font-title">
                    Panduan Cara Bermain
                  </h3>
                </div>
                <span className="text-[10px] sm:text-xs text-[#8fabc6] font-title tracking-wider">
                  Langkah {guideSlide + 1} dari 3
                </span>
              </div>

              {/* Slide Body Content (Compact, No Scrolling on mobile) */}
              <div className="min-h-[145px] sm:min-h-[155px] flex flex-col justify-center my-1">
                {guideSlide === 0 && (
                  <div className="bg-[#062444]/60 border border-[#1f568d]/50 rounded-xl p-3 sm:p-3.5 space-y-2 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#388ce0]" />
                      <span className="font-title text-[#388ce0] uppercase tracking-wide text-xs sm:text-sm">1. Misi Utama Penyelidik</span>
                    </div>
                    <p className="text-[#c8d5e3] text-xs sm:text-sm leading-relaxed">
                      Bongkar kejanggalan dan halusinasi buatan <strong>Kecerdasan Artifisial (KA)</strong> di 10 kasus digital (5 Kasus Gambar & 5 Kasus Dokumen Teks).
                    </p>
                    <div className="flex items-center gap-2 pt-1 border-t border-[#1f568d]/30 text-[#f0c400] text-[11px] sm:text-xs">
                      <Award className="w-4 h-4 shrink-0" />
                      <span>Raih akurasi 100% untuk gelar <strong>Mata Dewa (Detektif Legendaris)</strong>!</span>
                    </div>
                  </div>
                )}

                {guideSlide === 1 && (
                  <div className="bg-[#062444]/60 border border-[#1f568d]/50 rounded-xl p-3 sm:p-3.5 space-y-2 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#f0c400]" />
                      <span className="font-title text-[#f0c400] uppercase tracking-wide text-xs sm:text-sm">2. Investigasi Citra (Gambar)</span>
                    </div>
                    <ul className="text-[#c8d5e3] text-xs sm:text-sm space-y-1 list-disc list-inside">
                      <li>Arahkan kursor atau sentuh layar untuk menggunakan <strong>kaca pembesar</strong>.</li>
                      <li>Periksa jari ganda/melayang, huruf meleleh (<em>gibberish</em>), dan pantulan tidak sinkron.</li>
                      <li><strong>Klik langsung pada titik anomali</strong> untuk mengunci bukti.</li>
                    </ul>
                  </div>
                )}

                {guideSlide === 2 && (
                  <div className="bg-[#062444]/60 border border-[#1f568d]/50 rounded-xl p-3 sm:p-3.5 space-y-2 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#388ce0]" />
                      <span className="font-title text-[#388ce0] uppercase tracking-wide text-xs sm:text-sm">3. Investigasi Dokumen (Teks)</span>
                    </div>
                    <ul className="text-[#c8d5e3] text-xs sm:text-sm space-y-1 list-disc list-inside">
                      <li>Baca cermat seluruh paragraf cerita atau artikel ilmiah.</li>
                      <li>Temukan <strong>anakronisme era sejarah</strong>, hoaks sains, atau kesalahan logika.</li>
                      <li><strong>Sorot dan klik kalimat</strong> yang memuat halusinasi fakta tersebut.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Slide Dots Indicator */}
              <div className="flex items-center justify-center gap-1.5 my-2">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={`guide-dot-${idx}`}
                    type="button"
                    onClick={() => setGuideSlide(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      guideSlide === idx ? 'w-6 bg-[#f0c400]' : 'w-2 bg-[#1f568d]/60 hover:bg-[#388ce0]'
                    }`}
                    aria-label={`Ke langkah ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Actions Footer */}
              <div className="flex items-center gap-2.5 pt-2 border-t border-[#0f3b66] mt-1 shrink-0">
                <button
                  id="btn-guide-prev"
                  type="button"
                  onClick={() => setGuideSlide((s) => Math.max(0, s - 1))}
                  disabled={guideSlide === 0}
                  className={`px-3 py-2 rounded-xl text-xs font-title tracking-wider uppercase flex items-center gap-1 transition-all ${
                    guideSlide === 0
                      ? 'opacity-30 cursor-not-allowed bg-[#062444] text-[#8fabc6]'
                      : 'bg-[#062444] hover:bg-[#0d3b6c] border border-[#1f568d] text-[#8fabc6] hover:text-white cursor-pointer active:scale-95'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                {guideSlide < 2 ? (
                  <button
                    id="btn-guide-next"
                    type="button"
                    onClick={() => setGuideSlide((s) => Math.min(2, s + 1))}
                    className="flex-1 py-2 bg-gradient-to-r from-[#1f568d] via-[#256eb4] to-[#022949] hover:from-[#2877c2] hover:to-[#043660] border border-[#388ce0]/60 text-white rounded-xl text-xs font-title tracking-wider uppercase flex items-center justify-center gap-1 transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-95"
                  >
                    <span>Lanjut</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    id="btn-close-guide-back"
                    type="button"
                    onClick={() => setIsGuideOpen(false)}
                    className="flex-1 py-2 bg-gradient-to-r from-[#f0c400] via-[#e5b800] to-[#b38f00] hover:from-[#ffd21a] hover:to-[#c49d00] text-black font-title tracking-wider uppercase rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-[0_0_20px_rgba(240,196,0,0.4)] hover:scale-[1.02] active:scale-95"
                  >
                    <span>Mulai Investigasi</span>
                    <Check className="w-4 h-4 stroke-[3px]" />
                  </button>
                )}
              </div>
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
