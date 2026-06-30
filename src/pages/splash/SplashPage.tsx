import React from 'react';
import { Eye, ShieldAlert, Sparkles, FileText } from 'lucide-react';

interface SplashPageProps {
  onStart: () => void;
}

export function SplashPage({ onStart }: SplashPageProps) {
  return (
    <div className="min-h-screen w-screen bg-transparent relative flex flex-col items-center justify-center p-6 text-emerald-200 scanlines">
      {/* Ambient glowing radial backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="z-10 max-w-2xl w-full flex flex-col items-center text-center animate-fadeIn">
        {/* Badge header */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[#091509] border border-emerald-800 text-emerald-400 rounded-full text-xs font-mono mb-6 uppercase tracking-widest glow-emerald">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Simulasi Misi #HAL-102</span>
        </div>

        {/* Big title */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display mb-2 select-none uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-500">
            DETEKTIF HALUSINASI
          </span>
        </h1>
        
        {/* Subtitle */}
        <h2 className="text-sm md:text-base font-mono text-emerald-500 mb-8 uppercase tracking-widest font-bold">
          Kecerdasan Artifisial: Anomali & Hoaks
        </h2>

        {/* Dossier Card */}
        <div className="w-full bg-[#081208]/90 border border-emerald-900 backdrop-blur-md rounded-2xl p-6 md:p-8 text-left mb-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent pointer-events-none"></div>
          
          <div className="flex items-center gap-3 border-b border-emerald-900 pb-4 mb-4">
            <ShieldAlert className="w-6 h-6 text-emerald-400" />
            <h3 className="font-mono text-sm font-bold text-emerald-100 uppercase tracking-wider">
              BERKAS MISI: #HAL-102
            </h3>
          </div>

          <p className="text-emerald-100 text-sm leading-relaxed mb-4">
            Kecerdasan Artifisial (KA) rentan terhadap <strong>halusinasi</strong>—kondisi di mana sistem dengan penuh keyakinan menghasilkan output gambar yang cacat secara fisik, atau tulisan yang salah secara logika dan sejarah.
          </p>
          <p className="text-emerald-200 text-sm leading-relaxed mb-6 font-semibold">
            Pecahkan <strong>10 tingkat penyelidikan</strong> yang menggabungkan analisis citra visual dan validasi informasi tekstual:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3 bg-[#020502]/80 p-3 rounded-lg border border-emerald-950">
              <Eye className="w-5 h-5 text-emerald-450 shrink-0" />
              <div>
                <h4 className="text-xs font-bold font-mono text-white mb-1 uppercase">Investigasi Citra</h4>
                <p className="text-[11px] text-emerald-400 leading-normal">Gunakan lensa scan digital untuk mencari anomali visual fisik, lalu klik langsung pada titik halusinasi di dalam gambar.</p>
              </div>
            </div>
            <div className="flex gap-3 bg-[#020502]/80 p-3 rounded-lg border border-emerald-950">
              <FileText className="w-5 h-5 text-emerald-450 shrink-0" />
              <div>
                <h4 className="text-xs font-bold font-mono text-white mb-1 uppercase">Investigasi Faktual</h4>
                <p className="text-[11px] text-emerald-400 leading-normal">Baca paragraf berita sains atau peristiwa sejarah, lalu klik kalimat mana yang memuat kebohongan/halusinasi logika.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          type="button"
          onClick={onStart}
          className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.03] active:scale-[0.98]"
        >
          {/* Inner Glow Border */}
          <span className="absolute inset-px bg-[#040804] rounded-[10px] group-hover:bg-transparent transition-colors duration-300"></span>
          
          {/* Label */}
          <span className="relative z-10 flex items-center gap-2 group-hover:text-black text-emerald-400 font-mono transition-colors">
            Mulai Investigasi
            <span className="transition-transform group-hover:translate-x-1 font-sans">→</span>
          </span>
        </button>
      </div>
    </div>
  );
}
