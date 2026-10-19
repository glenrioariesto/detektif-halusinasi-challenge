import React, { useState } from 'react';
import { Target, Fingerprint, ShieldCheck, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { playSynthesizerNote } from '../utils/audio';

interface ObjectivesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart?: () => void;
}

interface SlideItem {
  keyword: string;
  text: string;
}

interface Slide {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  items: SlideItem[];
}

const slides: Slide[] = [
  {
    icon: <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#f0c400]" />,
    title: 'Tujuan Pembelajaran',
    subtitle: 'Simulasi Forensik Detektif Halusinasi AI',
    items: [
      {
        keyword: 'Literasi Kecerdasan Artifisial & Berpikir Kritis',
        text: 'Melatih ketajaman investigasi dan pemikiran kritis siswa dalam mendeteksi "halusinasi" generatif Kecerdasan Artifisial (KA/AI) — mencakup anomali visual (anatomi jari, distorsi reklame, inkonsistensi cermin/refleksi) serta kesalahan fakta tekstual (anakronisme sejarah dan kekeliruan konsep sains).',
      },
    ],
  },
  {
    icon: <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-[#f0c400]" />,
    title: 'Setelah Misi Ini, Kamu Mampu:',
    subtitle: 'Pilar Berpikir Komputasional (Bagian 1)',
    items: [
      {
        keyword: 'Dekomposisi (Decomposition)',
        text: 'Membedah citra dan narasi teks menjadi bagian-bagian terkecil yang spesifik (menghitung sendi jari tangan, membaca detail aksara papan reklame, menganalisis arah pantulan optik, serta memeriksa garis waktu era peristiwa sejarah).',
      },
      {
        keyword: 'Pengenalan Pola (Pattern Recognition)',
        text: 'Mengidentifikasi pola cacat berulang pada model generatif KA, seperti pembentukan jari berlebih/kurang, huruf semu (gibberish) yang meleleh, inkonsistensi bayangan fisika, dan klausa teks yang bertentangan dengan hukum sains.',
      },
    ],
  },
  {
    icon: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#f0c400]" />,
    title: 'Setelah Misi Ini, Kamu Mampu:',
    subtitle: 'Pilar Berpikir Komputasional (Bagian 2)',
    items: [
      {
        keyword: 'Abstraksi (Abstraction)',
        text: 'Menyaring kesan visual atau narasi yang sekilas tampak meyakinkan dan estetik, agar fokus murni pada verifikasi fakta objektif, hukum sains nyata, serta validitas informasi.',
      },
      {
        keyword: 'Algoritma & Prosedur Investigasi',
        text: 'Menerapkan langkah penyelidikan sistematis: mengamati kejanggalan indikatif, memverifikasi dengan pengetahuan logika dunia nyata, dan menandai titik anomali bukti secara presisi.',
      },
    ],
  },
];

export function ObjectivesModal({ isOpen, onClose, onStart }: ObjectivesModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slide = slides[currentSlide];
  const total = slides.length;
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === total - 1;

  const handleNext = () => {
    playSynthesizerNote('btn');
    if (isLast) {
      if (onStart) onStart();
      onClose();
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      playSynthesizerNote('btn');
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleClose = () => {
    playSynthesizerNote('btn');
    onClose();
  };

  return (
    <div
      id="objectives-modal-backdrop"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none font-sans"
    >
      <div
        id="objectives-modal-card"
        className="relative max-w-lg w-full bg-[#041a32] rounded-3xl p-5 sm:p-7 shadow-none flex flex-col border-2 border-[#1f568d] overflow-hidden"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#8fabc6] hover:text-[#f0c400] transition-colors cursor-pointer z-10 p-1"
          title="Tutup"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-[#0f3b66]">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#062444] border-2 border-[#f0c400] flex items-center justify-center shrink-0">
            {slide.icon}
          </div>
          <div className="min-w-0 pr-6">
            <h3 className="text-sm sm:text-base md:text-lg font-title text-[#f0c400] uppercase tracking-wider truncate">
              {slide.title}
            </h3>
            <p className="text-[10px] sm:text-xs font-mono text-[#8fabc6] tracking-wide truncate">
              {slide.subtitle}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="py-4 sm:py-5 flex flex-col gap-3 min-h-[170px] sm:min-h-[190px] justify-center">
          {slide.items.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-3 sm:p-4 border border-[#1f568d]/60 bg-[#062444]/60 shadow-none flex flex-col gap-1 text-left"
            >
              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#388ce0] font-sans">
                <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#f0c400]" />
                <span>{item.keyword}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#c8d5e3] font-medium leading-relaxed text-justify font-sans">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="pt-3 border-t border-[#0f3b66] flex items-center justify-between gap-2">
          {/* Previous Button */}
          <button
            type="button"
            disabled={isFirst}
            onClick={handlePrev}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-title tracking-wider uppercase flex items-center gap-1 transition-all ${
              isFirst
                ? 'opacity-30 cursor-not-allowed bg-[#062444] text-[#8fabc6]'
                : 'bg-[#062444] hover:bg-[#0d3b6c] border border-[#1f568d] text-[#8fabc6] hover:text-white cursor-pointer active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  playSynthesizerNote('btn');
                  setCurrentSlide(i);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === currentSlide
                    ? 'w-6 h-2 bg-[#f0c400]'
                    : 'w-2 h-2 bg-[#1f568d]/40 hover:bg-[#1f568d]'
                }`}
                title={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Next / Start Button */}
          <button
            type="button"
            onClick={handleNext}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-title tracking-wider uppercase flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-none ${
              isLast
                ? 'bg-gradient-to-r from-[#f0c400] via-[#e5b800] to-[#b38f00] hover:from-[#ffd21a] hover:to-[#c49d00] text-black font-bold'
                : 'bg-gradient-to-r from-[#1f568d] via-[#256eb4] to-[#022949] hover:from-[#2877c2] hover:to-[#043660] border border-[#388ce0]/60 text-white'
            }`}
          >
            <span>{isLast ? 'Mulai Investigasi!' : 'Selanjutnya'}</span>
            {!isLast && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
