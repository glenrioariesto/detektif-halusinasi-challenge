import React from 'react';
import { Eye, ShieldAlert, Sparkles, FileText, Play } from 'lucide-react';
import logoPusbuk from '../../../assets/logo-pusbuk.webp';

interface SplashPageProps {
  onStart: () => void;
}

export function SplashPage({ onStart }: SplashPageProps) {
  return (
    <div className="min-h-screen w-screen bg-[#020502] bg-grid-matrix relative flex flex-col items-center justify-center p-4 md:p-6 text-emerald-250 scanlines select-none overflow-hidden animate-fadeIn">
      {/* Ambient glowing radial backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Pusbuk Logo on Top Left */}
      <div className="absolute top-4 left-4 z-50 flex items-center bg-[#050b05]/95 border border-emerald-950 px-3 py-2 rounded-2xl shadow-xl">
        <img 
          src={logoPusbuk} 
          alt="Logo Pusbuk" 
          className="h-8 md:h-11 w-auto object-contain"
        />
      </div>

      {/* Main Container */}
      <div className="z-10 max-w-2xl w-full flex flex-col items-center text-center mt-12 md:mt-0 animate-fadeIn">
        {/* Badge header */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[#091509] border border-emerald-900/60 text-emerald-400 rounded-full text-[10px] md:text-xs font-mono mb-6 uppercase tracking-widest glow-emerald">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Game Investigasi Faktual</span>
        </div>

        {/* Big title */}
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display mb-2 select-none uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-500">
          DETEKTIF HALUSINASI
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-xs md:text-sm font-mono text-emerald-500 mb-6 md:mb-8 uppercase tracking-widest font-black">
          Kecerdasan Artifisial: Anomali & Hoaks
        </h2>

        {/* Dossier Card */}
        <div className="w-full bg-[#050a05]/90 border border-emerald-900/60 backdrop-blur-md rounded-2xl p-5 md:p-8 text-left mb-8 md:mb-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent pointer-events-none"></div>
          
          <div className="flex items-center gap-3 border-b border-emerald-950 pb-4 mb-4">
            <ShieldAlert className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
            <h3 className="font-mono text-xs md:text-sm font-bold text-emerald-100 uppercase tracking-wider">
              BERKAS MISI: #HAL-102
            </h3>
          </div>

          <p className="text-emerald-200/80 text-xs md:text-sm leading-relaxed mb-4 font-medium">
            Kecerdasan Artifisial (KA) rentan terhadap halusinasi—kondisi di mana sistem dengan penuh keyakinan menghasilkan output gambar yang cacat secara fisik, atau tulisan yang salah secara logika dan sejarah.
          </p>
          <p className="text-emerald-200 text-xs md:text-sm leading-relaxed mb-6 font-bold">
            Pecahkan 10 tingkat penyelidikan yang menggabungkan analisis citra visual dan validasi informasi tekstual:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex gap-3 bg-[#010301]/85 p-3 rounded-xl border border-emerald-950/70">
              <Eye className="w-4.5 h-4.5 md:w-5 md:h-5 text-emerald-450 shrink-0" />
              <div>
                <h4 className="text-[10px] md:text-xs font-bold font-mono text-white mb-1 uppercase tracking-wider">Investigasi Citra</h4>
                <p className="text-[10px] md:text-xs text-emerald-450 leading-normal font-medium">Gunakan lensa scan digital untuk mencari anomali visual fisik, lalu klik langsung pada titik halusinasi di dalam gambar.</p>
              </div>
            </div>
            <div className="flex gap-3 bg-[#010301]/85 p-3 rounded-xl border border-emerald-950/70">
              <FileText className="w-4.5 h-4.5 md:w-5 md:h-5 text-emerald-450 shrink-0" />
              <div>
                <h4 className="text-[10px] md:text-xs font-bold font-mono text-white mb-1 uppercase tracking-wider">Investigasi Faktual</h4>
                <p className="text-[10px] md:text-xs text-emerald-450 leading-normal font-medium">Baca paragraf berita sains atau peristiwa sejarah, lalu klik kalimat mana yang memuat kebohongan/halusinasi logika.</p>
              </div>
            </div>
          </div>
        </div>

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

        <p className="text-[10px] md:text-xs text-emerald-600 font-mono mt-4">10 Tingkat Penyelidikan Tersedia</p>
      </div>
    </div>
  );
}
