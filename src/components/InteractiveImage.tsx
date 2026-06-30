import React, { useState, useRef } from 'react';
import { ZoomIn, Target } from 'lucide-react';
import { Hotspot, MissClick } from '../types';

interface InteractiveImageProps {
  src: string;
  alt: string;
  hotspot?: Hotspot;
  found: boolean;
  missClicks: MissClick[];
  onClick: (x: number, y: number) => void;
  disabled: boolean;
}

export function InteractiveImage({
  src,
  alt,
  hotspot,
  found,
  missClicks,
  onClick,
  disabled
}: InteractiveImageProps) {
  const [lensState, setLensState] = useState({
    show: false,
    x: 0,
    y: 0,
    bgPos: '0px 0px',
    bgSize: '0px 0px',
  });
  const containerRef = useRef<HTMLButtonElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    if (!containerRef.current || !imgRef.current || !imgLoaded || disabled || found) return;

    const buttonRect = containerRef.current.getBoundingClientRect();
    const imageRect = imgRef.current.getBoundingClientRect();
    
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const xButton = clientX - buttonRect.left;
    const yButton = clientY - buttonRect.top;

    const xImage = clientX - imageRect.left;
    const yImage = clientY - imageRect.top;

    // Bounds checking for the visible image
    if (
      xImage < 0 ||
      yImage < 0 ||
      xImage > imageRect.width ||
      yImage > imageRect.height
    ) {
      setLensState(prev => ({ ...prev, show: false }));
      return;
    }

    const zoom = 2.5;
    const lensRadius = 70; // 140px / 2

    const bgWidth = imageRect.width * zoom;
    const bgHeight = imageRect.height * zoom;

    const bgX = -(xImage * zoom - lensRadius);
    const bgY = -(yImage * zoom - lensRadius);

    setLensState({
      show: true,
      x: xButton,
      y: yButton,
      bgSize: `${bgWidth}px ${bgHeight}px`,
      bgPos: `${bgX}px ${bgY}px`,
    });
  };

  const handleMouseEnter = () => {
    if (!disabled && !found) {
      setLensState(prev => ({ ...prev, show: true }));
    }
  };

  const handleMouseLeave = () => {
    setLensState(prev => ({ ...prev, show: false }));
  };

  const handleImageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!imgRef.current || !imgLoaded || disabled || found) return;

    const imageRect = imgRef.current.getBoundingClientRect();
    
    // Calculate click coordinates in percentages of the image bounds
    const xPct = ((e.clientX - imageRect.left) / imageRect.width) * 100;
    const yPct = ((e.clientY - imageRect.top) / imageRect.height) * 100;

    onClick(xPct, yPct);
  };

  return (
    <button
      ref={containerRef}
      type="button"
      className="relative w-full max-w-2xl h-[360px] md:h-[450px] bg-[#020502]/80 border border-emerald-900 rounded-2xl overflow-hidden flex items-center justify-center cursor-crosshair mx-auto select-none text-left shadow-2xl"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleMouseMove}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      onClick={handleImageClick}
      aria-label={`Analisis gambar ${alt} untuk mencari anomali`}
    >
      {/* Zoom indicator tag */}
      {!found && !disabled && (
        <div className="absolute top-4 right-4 z-10 bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700/60 text-slate-400 text-[10px] font-mono flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
          <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
          <span>Arahkan untuk Scan</span>
        </div>
      )}

      {/* Main image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain transition-all duration-300"
        onLoad={() => setImgLoaded(true)}
        style={{ opacity: imgLoaded ? 1 : 0 }}
      />

      {/* Loading indicator */}
      {!imgLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-500 font-mono gap-2 text-xs bg-[#020502]">
          <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-450 rounded-full animate-spin"></div>
          Memuat Gambar Bukti...
        </div>
      )}

      {/* RENDER HOTSPOT ONCE FOUND */}
      {found && hotspot && imgLoaded && (
        <div
          className="absolute rounded-full border-2 border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(52,211,153,0.5)] flex items-center justify-center animate-pulse"
          style={{
            left: `${hotspot.x}%`,
            top: `${hotspot.y}%`,
            width: `${hotspot.radius * 2}%`,
            height: `${hotspot.radius * 2}%`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 30,
          }}
        >
          {/* Target Scanner Crosshair */}
          <div className="absolute w-full h-0.5 bg-emerald-400/40"></div>
          <div className="absolute h-full w-0.5 bg-emerald-400/40"></div>
          
          {/* Small badge */}
          <div className="bg-slate-900/90 border border-emerald-400 text-emerald-400 font-mono text-[9px] px-1.5 py-0.5 rounded shadow absolute top-full mt-2 whitespace-nowrap">
            {hotspot.label}
          </div>
        </div>
      )}

      {/* RENDER MISS CLICKS */}
      {imgLoaded && missClicks.map(miss => (
        <div
          key={miss.id}
          className="absolute rounded-full border border-rose-500 bg-rose-500/20 flex items-center justify-center"
          style={{
            left: `${miss.x}%`,
            top: `${miss.y}%`,
            width: '40px',
            height: '40px',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 30,
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
          <Target className="w-6 h-6 text-rose-500 absolute animate-ping" />
        </div>
      ))}

      {/* MAGNIFIER LENS */}
      {lensState.show && imgLoaded && !disabled && !found && (
        <div
          className="absolute pointer-events-none rounded-full border-2 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)] w-[140px] h-[140px] bg-no-repeat z-40"
          style={{
            left: `${lensState.x - 70}px`,
            top: `${lensState.y - 70}px`,
            backgroundImage: `url(${src})`,
            backgroundSize: lensState.bgSize,
            backgroundPosition: lensState.bgPos,
          }}
        />
      )}
    </button>
  );
}
