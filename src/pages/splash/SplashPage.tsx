import React from 'react';
import { Play } from 'lucide-react';
import logoPusbuk from '../../../assets/logo-pusbuk.webp';
import { InteractiveGridBg } from '../../components/InteractiveGridBg';

interface SplashPageProps {
  onStart: () => void;
}

export function SplashPage({ onStart }: SplashPageProps) {
  return (
    <div className="min-h-screen w-screen bg-[#020502] relative flex flex-col items-center justify-center p-4 md:p-6 text-emerald-250 scanlines select-none overflow-hidden animate-fadeIn">
      {/* Interactive Background Grid Canvas */}
      <InteractiveGridBg />

      {/* Pusbuk Logo on Absolute Top Left - Responsive Size */}
      <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-50 shrink-0 animate-fadeIn">
        <img 
          src={logoPusbuk} 
          alt="Logo Pusbuk" 
          className="h-10 sm:h-14 md:h-16 w-auto object-contain"
        />
      </div>

      {/* Main Container */}
      <div className="z-10 max-w-xl w-full flex flex-col items-center text-center p-4">
        {/* Title (h1) */}
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display mb-3 select-none uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-500">
          DETEKTIF HALUSINASI
        </h1>
        
        {/* Subtitle (h2) */}
        <h2 className="text-xs md:text-sm font-mono text-emerald-555 mb-8 uppercase tracking-widest font-black">
          Kecerdasan Artifisial: Anomali & Hoaks
        </h2>

        {/* Start Button */}
        <button
          type="button"
          onClick={onStart}
          className="group relative px-10 py-4 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl font-bold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.03] active:scale-[0.98]"
        >
          {/* Inner Glow Border */}
          <span className="absolute inset-px bg-[#020502] rounded-[10px] group-hover:bg-transparent transition-colors duration-300"></span>
          
          {/* Label */}
          <span className="relative z-10 flex items-center gap-2 group-hover:text-black text-emerald-400 font-mono transition-colors">
            <Play className="w-4 h-4 text-emerald-450 group-hover:text-black fill-none" />
            <span>Mulai Investigasi</span>
          </span>
        </button>
      </div>
    </div>
  );
}
