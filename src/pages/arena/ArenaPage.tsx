import { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, X, BookOpen, Target, ImageIcon, FileText, Award, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import type { Level, MissClick, UserLevelAnswer } from '../../types';
import { CAMPAIGN_LEVELS } from '../../data/questions';
import { InteractiveImage } from '../../components/InteractiveImage';
import arenaBg from '../../assets/background-gameplay.webp';
import logoJenama from '../../assets/logo-jenama.webp?v2';
import judulLevel from '../../assets/judul level@2x.webp';

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
  answers: UserLevelAnswer[];
  onImageClick: (x: number, y: number) => void;
  onSegmentClick: (index: number) => void;
  onAdvance: () => void;
  onJumpToLevel: (levelIndex: number) => void;
  onOpenObjectives?: () => void;
}

export function ArenaPage({
  currentLevelIndex,
  activeLevel,
  totalLevels,
  showFeedback,
  foundHotspotIndices = [],
  selectedSegmentIndex,
  missClicks,
  answers = [],
  onImageClick,
  onSegmentClick,
  onAdvance,
  onJumpToLevel,
  onOpenObjectives
}: ArenaPageProps) {
  
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [guideSlide, setGuideSlide] = useState(0);
  const [dismissedFeedbackLevelId, setDismissedFeedbackLevelId] = useState<number | null>(null);

  // Normalize hotspots list for current level
  const currentHotspots = activeLevel.hotspots || (activeLevel.hotspot ? [activeLevel.hotspot] : []);

  // Answer status for current level and entire campaign
  const isCurrentAnswered = answers.some(a => a.levelId === activeLevel.id && a.isCorrect);
  const allCompleted = totalLevels > 0 && answers.filter(a => a.isCorrect).length >= totalLevels;

  // Feedback visibility: show automatically when solved, or can be reopened/dismissed
  const isFeedbackVisible = (showFeedback || isCurrentAnswered) && dismissedFeedbackLevelId !== activeLevel.id;

  // Keyboard navigation for Left & Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGuideOpen || isFeedbackVisible) return;
      if (e.key === 'ArrowLeft' && currentLevelIndex > 0) {
        setDismissedFeedbackLevelId(null);
        onJumpToLevel(currentLevelIndex - 1);
      } else if (e.key === 'ArrowRight' && currentLevelIndex < totalLevels - 1) {
        setDismissedFeedbackLevelId(null);
        onJumpToLevel(currentLevelIndex + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentLevelIndex, totalLevels, isGuideOpen, isFeedbackVisible, onJumpToLevel]);

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

      {/* HUD: Top-Left Pusbuk Logo (matching detektif-digital-challenge) */}
      <div id="arena-logo-container" className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-5 md:left-5 z-30 shrink-0 pointer-events-none select-none animate-fadeIn">
        <img
          id="arena-logo-pusbuk"
          src={logoJenama}
          alt="Logo Pusbuk"
          className="h-6 sm:h-9 md:h-14 lg:h-18 2xl:h-28 w-auto object-contain drop-shadow-[0_6px_12px_rgba(56,69,91,0.45)]"
        />
      </div>

      {/* Immersive Game UI stretching to landscape screen bounds */}
      <div id="arena-ui-container" className="relative w-full h-full z-10 flex flex-col">
        
        {/* HUD: Top-Center Level / Kasus Badge (matching detektif-digital-challenge) */}
        <div
          id="arena-case-tag"
          className="absolute top-3 sm:top-4 md:top-6 lg:top-7 2xl:top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none animate-fadeIn"
        >
          <div className="relative shrink-0 w-[min(28vw,9rem)] sm:w-[min(24vw,11rem)] md:w-[min(28vw,13rem)] xl:w-[min(34vw,18rem)] 2xl:w-[22rem]">
            <img
              id="badge-level-judul-img"
              src={judulLevel}
              alt={`Kasus ${currentLevelIndex + 1}`}
              className="w-full h-auto object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.7)]"
            />
            <span
              id="badge-level-judul-text"
              className="absolute inset-0 flex items-center justify-center font-title text-[#f0c400] text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-2xl 2xl:text-3xl tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pb-0.5 px-3"
            >
              Kasus {currentLevelIndex + 1}
            </span>
          </div>
        </div>

        {/* HUD: Bottom-Left Controls: Gameplay Guide & Review Button */}
        <div id="arena-hud-bottom-left" className="absolute bottom-4 left-4 z-30 flex items-center gap-2 select-none">
          <button
            id="btn-open-guide"
            type="button"
            onClick={() => {
              setIsGuideOpen(true);
              setGuideSlide(0);
            }}
            className="px-3.5 py-1.5 bg-[#041a32]/90 hover:bg-[#062444] backdrop-blur-md border-2 border-[#f0c400]/70 rounded-xl flex items-center gap-1.5 text-xs sm:text-sm text-[#f0c400] hover:text-white font-title tracking-wider transition-all cursor-pointer shadow-none hover:scale-105 active:scale-95"
            title="Buka Panduan Cara Bermain"
          >
            <BookOpen className="w-4 h-4 text-[#f0c400]" />
            <span>Panduan</span>
          </button>

          {onOpenObjectives && (
            <button
              id="btn-open-objectives"
              type="button"
              onClick={onOpenObjectives}
              className="px-3.5 py-1.5 bg-[#041a32]/90 hover:bg-[#062444] backdrop-blur-md border-2 border-[#1f568d]/80 rounded-xl flex items-center gap-1.5 text-xs sm:text-sm text-[#388ce0] hover:text-[#f0c400] hover:border-[#388ce0] font-title tracking-wider transition-all cursor-pointer shadow-none hover:scale-105 active:scale-95"
              title="Buka Tujuan Pembelajaran"
            >
              <Target className="w-4 h-4 text-[#388ce0]" />
              <span>Tujuan</span>
            </button>
          )}

          {isCurrentAnswered && (
            <button
              id="btn-reopen-feedback"
              type="button"
              onClick={() => setDismissedFeedbackLevelId(null)}
              className="px-3.5 py-1.5 bg-[#041a32]/90 hover:bg-[#062444] backdrop-blur-md border-2 border-emerald-400/80 rounded-xl flex items-center gap-1.5 text-xs sm:text-sm text-emerald-300 hover:text-white font-title tracking-wider transition-all cursor-pointer shadow-none hover:scale-105 active:scale-95"
              title="Buka Ulasan & Penjelasan Kasus Ini"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Ulasan Kasus</span>
            </button>
          )}
        </div>

        {/* HUD: Bottom-Right Anomaly Info (Image Mode only) */}
        {activeLevel.type === 'image' && (
          <div id="arena-hud-bottom-right" className="absolute bottom-4 right-4 z-30 flex items-center gap-2.5 select-none">
            <div 
              id="badge-anomaly-count"
              className="px-3 py-1.5 bg-[#041a32]/90 backdrop-blur-md border-2 border-[#1f568d]/60 rounded-xl text-xs sm:text-sm text-[#f0c400] font-title tracking-wider shadow-none flex items-center"
            >
              <span>{(foundHotspotIndices || []).length} / {currentHotspots.length} Anomali</span>
            </div>
          </div>
        )}

        {/* Right Side: Level Selector in Cyber Oceanic Detective Theme (Level 1 - 10) - Compact for mobile */}
        <div
          id="arena-level-selector"
          className="absolute right-1 sm:right-2.5 md:right-3.5 xl:right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-0.5 sm:gap-1 md:gap-1.5 bg-gradient-to-b from-[#041a32]/95 via-[#062444]/95 to-[#021324]/95 backdrop-blur-md border sm:border-2 border-[#1f568d]/80 shadow-none rounded-xl sm:rounded-2xl md:rounded-3xl p-0.5 sm:p-1 md:p-1.5 select-none pointer-events-auto"
        >
          {Array.from({ length: totalLevels }, (_, i) => {
            const levelNum = i + 1;
            const isCurrent = i === currentLevelIndex;
            const level = CAMPAIGN_LEVELS[i];
            const answer = answers.find(a => a.levelId === level?.id);
            const isAnswered = !!answer;
            const isCorrect = answer?.isCorrect;

            return (
              <button
                key={levelNum}
                id={`arena-level-btn-${levelNum}`}
                type="button"
                onClick={() => {
                  setDismissedFeedbackLevelId(null);
                  onJumpToLevel(i);
                }}
                className={`relative w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-[4px] sm:rounded-lg md:rounded-xl font-title text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold flex items-center justify-center transition-all duration-200 cursor-pointer shadow-none ${
                  isCurrent
                    ? 'bg-[#f0c400] text-[#021324] ring-1.5 sm:ring-2 md:ring-3 ring-[#f0c400]/60 scale-110 font-black z-10 shadow-none'
                    : isAnswered
                    ? isCorrect
                      ? 'bg-emerald-600/95 text-white hover:bg-emerald-500 hover:scale-105 border border-emerald-400/80 shadow-none'
                      : 'bg-[#0c3258]/80 text-[#8fabc6] hover:bg-[#124270] hover:text-[#f0c400] hover:scale-105 border border-[#1f568d]/50 shadow-none'
                    : 'bg-[#0c3258]/50 text-[#8fabc6] hover:bg-[#124270] hover:text-white hover:border-[#388ce0]/80 hover:scale-105 border border-[#1f568d]/40 shadow-none'
                }`}
                title={`Kasus ${levelNum} (${level?.type === 'image' ? 'Citra' : 'Teks'}): ${level?.title || ''}${
                  isAnswered ? (isCorrect ? ' (Terpecahkan)' : ' (Selesai)') : ' (Klik untuk pindah kasus)'
                }`}
              >
                <span>{levelNum}</span>
                {/* Status Indicator Badge */}
                {isAnswered && (
                  <span
                    className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-[#041a32] ${
                      isCorrect ? 'bg-emerald-400' : 'bg-rose-500'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Gameplay Area */}
        <div id="arena-gameplay-area" className="flex-1 flex items-center justify-center px-1 sm:px-4 md:px-8 lg:px-12 pt-12 pb-12 sm:pt-14 sm:pb-14 md:pt-18 md:pb-16 min-h-0 relative select-none">
          <div className="flex justify-center items-center gap-1.5 sm:gap-2.5 md:gap-3.5 h-full min-h-0 max-w-full">
            {/* Tombol Sebelumnya di Samping Kiri Gambar/Teks */}
            <button
              id="arena-prev-button"
              type="button"
              disabled={currentLevelIndex === 0}
              onClick={() => {
                setDismissedFeedbackLevelId(null);
                onJumpToLevel(currentLevelIndex - 1);
              }}
              className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full border sm:border-2 border-[#1f568d] hover:border-[#f0c400] bg-[#041a32]/90 hover:bg-[#062444] text-[#8fabc6] hover:text-[#f0c400] flex items-center justify-center transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:border-[#1f568d] disabled:hover:text-[#8fabc6] disabled:hover:bg-[#041a32]/90 active:scale-95 shadow-none z-20"
              title="Kasus Sebelumnya"
              aria-label="Kasus Sebelumnya"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[2.5]" />
            </button>

            {activeLevel.type === 'image' && activeLevel.imageUrl ? (
              /* SPOT THE ANOMALY PICTURE MODE */
              <div id="arena-image-mode-wrapper" className="relative flex items-center justify-center h-full min-h-0 shrink">
                <InteractiveImage
                  src={activeLevel.imageUrl}
                  alt={activeLevel.title}
                  hotspot={activeLevel.hotspot}
                  hotspots={activeLevel.hotspots}
                  foundHotspotIndices={foundHotspotIndices}
                  found={showFeedback || isCurrentAnswered}
                  missClicks={missClicks}
                  onClick={onImageClick}
                  disabled={showFeedback || isCurrentAnswered}
                />
              </div>
            ) : (
              /* SPOT THE HALLUCINATION TEXT MODE */
              <div id="arena-text-case-card" className="w-full max-w-2xl lg:max-w-3xl 2xl:max-w-4xl bg-[#041a32]/95 border-2 border-[#1f568d]/60 rounded-2xl p-4 sm:p-6 md:p-7 text-xs sm:text-sm md:text-base leading-relaxed shadow-none relative flex flex-col justify-between max-h-[72vh] sm:max-h-[78vh] 2xl:max-h-[80vh] overflow-hidden min-w-0">
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

                      let highlightClass = "text-[#e2eaf4] hover:bg-[#f0c400]/25 hover:text-[#f7d000] transition-colors duration-150 rounded decoration-dotted underline underline-offset-4 decoration-[#1f568d]/70 hover:decoration-[#388ce0]";
                      
                      if ((showFeedback || isCurrentAnswered) && isCorrectSeg) {
                        highlightClass = "bg-[#f0c400]/25 text-[#f7d000] font-semibold underline decoration-[#f0c400] underline-offset-4 rounded px-0.5 shadow-none";
                      } else if (isSelected) {
                        if (isCorrectSeg) {
                          highlightClass = "bg-[#f0c400]/25 text-[#f7d000] font-semibold underline decoration-[#f0c400] underline-offset-4 rounded px-0.5 shadow-none";
                        } else {
                          highlightClass = "bg-rose-950/70 text-rose-300 font-semibold underline decoration-rose-500 underline-offset-4 animate-pulse rounded px-0.5 shadow-none";
                        }
                      }

                      return (
                        <span
                          key={`seg-${idx}`}
                          id={`text-segment-${idx}`}
                          role="button"
                          tabIndex={(showFeedback || isCurrentAnswered) ? -1 : 0}
                          onClick={() => !(showFeedback || isCurrentAnswered) && onSegmentClick(idx)}
                          onKeyDown={(e) => {
                            if (!(showFeedback || isCurrentAnswered) && (e.key === 'Enter' || e.key === ' ')) {
                              e.preventDefault();
                              onSegmentClick(idx);
                            }
                          }}
                          className={`inline cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#388ce0] ${highlightClass}`}
                          style={{ pointerEvents: (showFeedback || isCurrentAnswered) ? 'none' : 'auto' }}
                          title={isCurrentAnswered ? "Kasus ini telah terpecahkan" : "Klik untuk memilih kalimat ini"}
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

            {/* Tombol Berikutnya di Samping Kanan Gambar/Teks */}
            <button
              id="arena-next-button"
              type="button"
              disabled={currentLevelIndex === totalLevels - 1}
              onClick={() => {
                setDismissedFeedbackLevelId(null);
                onJumpToLevel(currentLevelIndex + 1);
              }}
              className="shrink-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full border sm:border-2 border-[#1f568d] hover:border-[#f0c400] bg-[#041a32]/90 hover:bg-[#062444] text-[#8fabc6] hover:text-[#f0c400] flex items-center justify-center transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:border-[#1f568d] disabled:hover:text-[#8fabc6] disabled:hover:bg-[#041a32]/90 active:scale-95 shadow-none z-20"
              title="Kasus Berikutnya"
              aria-label="Kasus Berikutnya"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* MODAL 1: GAMEPLAY GUIDE (PANDUAN CARA BERMAIN MULTI-SLIDE) */}
        {isGuideOpen && (
          <div id="modal-gameplay-guide" className="absolute inset-0 bg-black/85 backdrop-blur-md z-45 flex items-center justify-center p-4 animate-fadeIn">
            <div id="modal-guide-card" className="w-full max-w-lg bg-[#041a32] border-2 border-[#1f568d] rounded-2xl p-4 sm:p-5 shadow-none relative flex flex-col justify-between text-[#e2eaf4] select-none">
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
                    className="flex-1 py-2 bg-gradient-to-r from-[#1f568d] via-[#256eb4] to-[#022949] hover:from-[#2877c2] hover:to-[#043660] border border-[#388ce0]/60 text-white rounded-xl text-xs font-title tracking-wider uppercase flex items-center justify-center gap-1 transition-all cursor-pointer shadow-none hover:scale-[1.02] active:scale-95"
                  >
                    <span>Lanjut</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    id="btn-close-guide-back"
                    type="button"
                    onClick={() => setIsGuideOpen(false)}
                    className="flex-1 py-2 bg-gradient-to-r from-[#f0c400] via-[#e5b800] to-[#b38f00] hover:from-[#ffd21a] hover:to-[#c49d00] text-black font-title tracking-wider uppercase rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-none hover:scale-[1.02] active:scale-95"
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
        {isFeedbackVisible && (
          <div id="modal-feedback-reveal" className="absolute inset-0 bg-black/85 backdrop-blur-md z-45 flex items-center justify-center p-4 animate-fadeIn">
            <div id="modal-feedback-card" className="w-full max-w-md bg-[#041a32] border-2 border-[#f0c400] rounded-2xl p-4 sm:p-5 shadow-none relative text-center max-h-[90vh] overflow-y-auto flex flex-col justify-center text-[#e2eaf4]">
              {/* Dismiss X button */}
              <button
                id="btn-dismiss-feedback-x"
                type="button"
                onClick={() => setDismissedFeedbackLevelId(activeLevel.id)}
                className="absolute top-3 right-3 text-[#8fabc6] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Tutup Ulasan"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Correctness Header */}
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#062444] border-2 border-[#f0c400] flex items-center justify-center mx-auto mb-2 sm:mb-3 shrink-0">
                <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 text-[#f0c400] animate-pulse" />
              </div>

              <h3 className="text-sm sm:text-base font-normal text-[#f0c400] uppercase tracking-widest mb-0.5 sm:mb-1 shrink-0 font-title">
                ANOMALI TERKUNCI!
              </h3>
              <p className="text-[8px] sm:text-[9px] font-mono text-[#8fabc6] uppercase tracking-wider mb-2.5 sm:mb-4 shrink-0">
                Kasus {currentLevelIndex + 1}: {activeLevel.title}
              </p>

              {/* Reveal details */}
              <div className="bg-[#062444]/60 border border-[#1f568d]/50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-5 text-left max-h-[120px] sm:max-h-[160px] overflow-y-auto shrink-0">
                <p className="text-[11px] sm:text-xs text-[#e2eaf4] leading-relaxed font-sans font-medium text-justify">
                  {activeLevel.explanation}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full shrink-0">
                <button
                  id="btn-close-feedback"
                  type="button"
                  onClick={() => setDismissedFeedbackLevelId(activeLevel.id)}
                  className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#062444] hover:bg-[#0d3b6c] border border-[#1f568d] text-[#8fabc6] hover:text-white rounded-xl text-[10px] sm:text-xs font-bold transition-all cursor-pointer active:scale-98 shrink-0"
                >
                  Tutup
                </button>
                <button
                  id="btn-advance-level"
                  type="button"
                  onClick={onAdvance}
                  className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-[#1f568d] via-[#256eb4] to-[#022949] hover:from-[#2877c2] hover:to-[#043660] border border-[#388ce0]/60 text-white rounded-xl text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-none hover:scale-[1.02] active:scale-98"
                >
                  <span>
                    {allCompleted
                      ? 'Lihat Hasil Akhir'
                      : currentLevelIndex === totalLevels - 1
                      ? 'Lanjut ke Kasus Belum Selesai'
                      : 'Lanjut ke Kasus Berikutnya'}
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5px] text-white" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
