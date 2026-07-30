import React from 'react';
import { Play, ShieldAlert, Sparkles } from 'lucide-react';
import logoPusbuk from '../../assets/logo-pusbuk.webp';
import detectiveBg from '../../assets/detective_bg.jpg';
import { InteractiveGridBg } from '../../components/InteractiveGridBg';

interface SplashPageProps {
  onStart: () => void;
}

export function SplashPage({ onStart }: SplashPageProps) {
  return (
    <div className="h-screen w-screen bg-[#020502] relative flex items-center justify-end p-2 sm:p-5 md:p-8 text-emerald-250 scanlines select-none overflow-hidden animate-fadeIn">
      
      {/* AI Generated Cinematic Background Image - Shifted slightly right for balanced character framing */}
      <img
        src={detectiveBg}
        alt="Latar Belakang Detektif Cyberpunk"
        className="absolute inset-0 w-full h-full object-cover object-left z-0 opacity-75 sm:opacity-80 filter brightness-90 contrast-110 scale-x-[-1] -translate-x-[15%]"
      />

      {/* Subtle Gradient Overlay for visual polish */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/35 to-black/70   z-1 pointer-events-none"></div>

      {/* Pusbuk Logo on Absolute Top Left - Responsive Size */}
      <div className="absolute top-2.5 left-2.5 sm:top-5 sm:left-6 z-30 shrink-0 animate-fadeIn">
        <img 
          src={logoPusbuk} 
          alt="Logo Pusbuk" 
          className="h-6 sm:h-12 md:h-16 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]"
        />
      </div>

      {/* Right-side Glassmorphism Panel Container - Ultra Transparent background & subtle border */}
      <div className="relative z-20 w-[42vw] max-w-[280px] md:max-w-md lg:max-w-xl max-h-[85vh] backdrop-blur-sm border border-emerald-500/20 rounded-xl sm:rounded-3xl p-6 lg:p-12 shadow-[0_0_30px_rgba(16,185,129,0.1)] overflow-y-auto overflow-x-hidden flex flex-col justify-center my-auto mr-1 sm:mr-0 shrink">
        
        {/* Interactive Grid Canvas as Overlay Layer inside the Right Panel */}
        <InteractiveGridBg />

        <div className="relative z-10 flex flex-col items-start text-left space-y-2 sm:space-y-6 md:space-y-8 my-auto w-full">
          
          {/* Title (h1) & Subtitle (h2) Container */}
          <div className="space-y-1.5 sm:space-y-3 md:space-y-4 w-full">
            {/* Title (h1) */}
            <h1 className="text-[clamp(12px,3.2vw,48px)] font-extrabold tracking-tight font-display uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-teal-400 drop-shadow-sm leading-tight break-words">
              DETEKTIF<br />HALUSINASI
            </h1>
            
            {/* Subtitle (h2) */}
            <h2 className="text-[clamp(7px,1.8vw,14px)] font-mono text-emerald-400 uppercase tracking-wider font-bold border-l border-emerald-500 sm:border-l-2 pl-1.5 sm:pl-3 py-0.5 sm:py-1 leading-tight break-words">
              Kecerdasan Artifisial:<br /> Anomali & Hoaks
            </h2>
          </div>

          {/* Start Button */}
          <div className="pt-1 sm:pt-2 w-full">
            <button
              type="button"
              onClick={onStart}
              className="group relative w-full py-2 sm:py-4 md:py-4.5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-lg sm:rounded-2xl font-bold text-[clamp(8px,2vw,14px)] tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              {/* Inner button layer */}
              <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2 text-black font-mono font-black tracking-wider whitespace-nowrap">
                <Play className="w-2.5 h-2.5 sm:w-4 sm:h-4 fill-black stroke-none shrink-0" />
                <span>Mulai</span>
              </span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
