import React from 'react';
import bgSplash from '../../assets/background.webp';
import judulAtas from '../../assets/judul atas.webp';
import judulBawah from '../../assets/judul bawah.webp';
import tombolMulai from '../../assets/tombol mulai.webp';
import logoPusbuk from '../../assets/logo-pusbuk.webp';

interface SplashPageProps {
  onStart: () => void;
}

export function SplashPage({ onStart }: SplashPageProps) {
  return (
    <div id="splash-page" className="relative w-screen h-screen min-h-screen overflow-hidden flex items-center justify-end select-none bg-[#021324] animate-fadeIn p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 2xl:p-16">
      {/* Background Graphic Asset */}
      <img
        id="splash-bg-image"
        src={bgSplash}
        alt="Background Detektif Halusinasi"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0"
      />

      {/* Pusbuk Logo on Absolute Top Left */}
      <div id="splash-logo-container" className="absolute top-3 left-3 sm:top-5 sm:left-5 md:top-6 md:left-6 lg:top-8 lg:left-8 2xl:top-10 2xl:left-10 z-20 shrink-0 animate-fadeIn">
        <img
          id="splash-logo-pusbuk"
          src={logoPusbuk}
          alt="Logo Pusbuk"
          className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 2xl:h-20 w-auto object-contain drop-shadow-md"
        />
      </div>

      {/* Right Side Content Container */}
      <div id="splash-content-container" className="relative z-10 flex flex-col items-center text-center w-full max-w-[240px] xs:max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-3xl mr-2 sm:mr-3 md:mr-6 lg:mr-8 xl:mr-12 2xl:mr-18">
        {/* Judul Atas Asset */}
        <div id="splash-title-top-container" className="w-full max-w-[200px] xs:max-w-[240px] sm:max-w-[290px] md:max-w-[350px] lg:max-w-[420px] xl:max-w-[490px] 2xl:max-w-[700px] mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3 xl:mb-4 2xl:mb-5 transition-all duration-300">
          <img
            id="splash-title-top-img"
            src={judulAtas}
            alt="Detektif Halusinasi"
            className="w-full h-auto object-contain mx-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* Judul Bawah Asset (Proporsional lebih panjang & lebar daripada judul atas) */}
        <div id="splash-title-bottom-container" className="w-full max-w-[230px] xs:max-w-[280px] sm:max-w-[360px] md:max-w-[440px] lg:max-w-[530px] xl:max-w-[620px] 2xl:max-w-[880px] mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16 2xl:mb-36 transition-all duration-300">
          <img
            id="splash-title-bottom-img"
            src={judulBawah}
            alt="Kecerdasan Artifisial: Anomali & Hoaks"
            className="w-full h-auto object-contain mx-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* Start Button Asset */}
        <button
          id="btn-start-game"
          type="button"
          onClick={onStart}
          aria-label="Mulai Investigasi"
          className="group relative cursor-pointer focus:outline-none transition-all duration-300 hover:scale-105 active:scale-95 hover:drop-shadow-[0_0_28px_rgba(56,140,224,0.7)] drop-shadow-[0_0_14px_rgba(31,86,141,0.5)]"
        >
          <img
            id="splash-btn-start-img"
            src={tombolMulai}
            alt="Mulai"
            className="w-[140px] xs:w-[170px] sm:w-[200px] md:w-[230px] lg:w-[260px] xl:w-[290px] 2xl:w-[380px] h-auto object-contain select-none pointer-events-none"
          />
        </button>
      </div>
    </div>
  );
}
