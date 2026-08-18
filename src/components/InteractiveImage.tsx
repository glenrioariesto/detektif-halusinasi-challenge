import React, { useState, useRef } from 'react';
import { ZoomIn, Target } from 'lucide-react';
import { Hotspot, MissClick } from '../types';

interface InteractiveImageProps {
  src: string;
  alt: string;
  hotspot?: Hotspot;
  hotspots?: Hotspot[];
  foundHotspotIndices?: number[];
  found: boolean;
  missClicks: MissClick[];
  onClick: (x: number, y: number) => void;
  disabled: boolean;
  showGrid?: boolean;
  devShowHotspot?: boolean;
  activeHotspotIndex?: number;
}

export function InteractiveImage({
  src,
  alt,
  hotspot,
  hotspots,
  foundHotspotIndices = [],
  found,
  missClicks,
  onClick,
  disabled,
  showGrid = false,
  devShowHotspot,
  activeHotspotIndex = 0
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

  // Normalize hotspots list
  const allHotspots = hotspots || (hotspot ? [hotspot] : []);

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
      id="interactive-image-container"
      ref={containerRef}
      type="button"
      className="relative inline-block w-auto max-w-[85vw] sm:max-w-md md:max-w-xl max-h-[65vh] sm:max-h-[75vh] bg-[#021324]/90 border border-[#1f568d]/60 rounded-2xl overflow-hidden cursor-crosshair mx-auto select-none text-left shadow-2xl shrink-0 p-0"
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
        <div id="interactive-image-scan-indicator" className="absolute top-4 right-4 z-10 bg-[#041a32]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#1f568d]/60 text-[#8fabc6] text-[10px] font-mono flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
          <ZoomIn className="w-3.5 h-3.5 text-[#388ce0]" />
          <span>Arahkan untuk Scan</span>
        </div>
      )}

      {/* Main image */}
      <img
        id="interactive-image-target"
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-auto h-auto max-w-[85vw] sm:max-w-md md:max-w-xl max-h-[65vh] sm:max-h-[75vh] block object-cover transition-all duration-300 rounded-2xl"
        onLoad={() => setImgLoaded(true)}
        style={{ opacity: imgLoaded ? 1 : 0 }}
      />

      {/* Loading indicator */}
      {!imgLoaded && (
        <div id="interactive-image-loading" className="absolute inset-0 flex flex-col items-center justify-center text-[#8fabc6] font-mono gap-2 text-xs bg-[#021324]">
          <div className="w-8 h-8 border-4 border-[#1f568d]/30 border-t-[#388ce0] rounded-full animate-spin"></div>
          Memuat Gambar Bukti...
        </div>
      )}

      {/* Grid Overlay */}
      {showGrid && imgLoaded && !found && !disabled && (
        <div id="interactive-image-grid-overlay" className="absolute inset-0 z-20 pointer-events-none select-none">
          {/* Vertical lines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 border-l border-[#1f568d]/30"
              style={{ left: `${(i + 1) * 10}%` }}
            />
          ))}
          {/* Horizontal lines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 border-t border-[#1f568d]/30"
              style={{ top: `${(i + 1) * 10}%` }}
            />
          ))}
          
          {/* Grid Labels (X-Axis: A-J) */}
          <div className="absolute top-1 left-0 right-0 flex justify-between px-2 text-[8px] font-mono text-[#8fabc6]/60">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((label, idx) => (
              <span
                key={`lbl-x-${idx}`}
                className="absolute text-center"
                style={{ left: `${idx * 10 + 5}%`, transform: 'translateX(-50%)' }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Grid Labels (Y-Axis: 1-10) */}
          <div className="absolute top-0 bottom-0 left-1 flex flex-col justify-between py-2 text-[8px] font-mono text-[#8fabc6]/60">
            {Array.from({ length: 10 }).map((_, idx) => (
              <span
                key={`lbl-y-${idx}`}
                className="absolute text-left"
                style={{ top: `${idx * 10 + 5}%`, transform: 'translateY(-50%)' }}
              >
                {idx + 1}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* DEV MODE HOTSPOT INDICATORS FOR ALL HOTSPOTS */}
      {devShowHotspot && allHotspots.length > 0 && imgLoaded && !found && (
        <>
          {allHotspots.map((hs, index) => {
            const isActive = index === activeHotspotIndex;
            return (
              <div
                key={`dev-hs-${index}`}
                className={`absolute border-2 transition-colors pointer-events-none z-35 ${
                  isActive 
                    ? 'border-amber-400 bg-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.6)]' 
                    : 'border-amber-600/60 bg-amber-900/15'
                }`}
                style={{
                  left: `${hs.x}%`,
                  top: `${hs.y}%`,
                  width: `${(hs.radiusX !== undefined ? hs.radiusX : hs.radius) * 2}%`,
                  height: `${(hs.radiusY !== undefined ? hs.radiusY : hs.radius) * 2}%`,
                  borderRadius: `${hs.borderRadius !== undefined ? hs.borderRadius : 50}%`,
                  transform: `translate(-50%, -50%) rotate(${hs.rotation || 0}deg)`,
                }}
              >
                {/* Center pointer dot */}
                <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-amber-300 shadow-[0_0_8px_#f59e0b]' : 'bg-amber-600'}`}></div>
                {/* Rotation Direction Arrow Indicator */}
                <div className="absolute top-0 w-0.5 h-1/2 bg-amber-400/80 origin-bottom"></div>
                
                {/* Small label badge */}
                <div className={`border text-[9px] px-1.5 py-0.5 rounded absolute bottom-full mb-1 whitespace-nowrap font-bold shadow-md ${
                  isActive ? 'bg-amber-950/95 border-amber-400 text-amber-300' : 'bg-black/80 border-amber-800 text-amber-500'
                }`}>
                  #{index + 1}: {hs.label}
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* RENDER HOTSPOTS AS THEY ARE DISCOVERED */}
      {allHotspots.length > 0 && imgLoaded && (
        <>
          {allHotspots.map((hs, index) => {
            const isFound = found || foundHotspotIndices.includes(index);
            if (!isFound) return null;

            return (
              <div
                key={`reveal-hs-${index}`}
                className="absolute border-2 border-[#f0c400] bg-[#f0c400]/20 shadow-[0_0_20px_rgba(240,196,0,0.6)] flex items-center justify-center animate-pulse"
                style={{
                  left: `${hs.x}%`,
                  top: `${hs.y}%`,
                  width: `${(hs.radiusX !== undefined ? hs.radiusX : hs.radius) * 2}%`,
                  height: `${(hs.radiusY !== undefined ? hs.radiusY : hs.radius) * 2}%`,
                  borderRadius: `${hs.borderRadius !== undefined ? hs.borderRadius : 50}%`,
                  transform: `translate(-50%, -50%) rotate(${hs.rotation || 0}deg)`,
                  pointerEvents: 'none',
                  zIndex: 30,
                }}
              >
                {/* Target Scanner Crosshair */}
                <div className="absolute w-full h-0.5 bg-[#f0c400]/60"></div>
                <div className="absolute h-full w-0.5 bg-[#f0c400]/60"></div>
                
                {/* Small badge */}
                <div className="bg-[#041a32]/95 border border-[#f0c400] text-[#f0c400] font-mono text-[9px] px-2 py-0.5 rounded-md shadow-[0_0_10px_rgba(240,196,0,0.3)] absolute top-full mt-2 whitespace-nowrap font-bold">
                  {hs.label}
                </div>
              </div>
            );
          })}
        </>
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
          id="interactive-image-magnifier-lens"
          className="absolute pointer-events-none rounded-full border-2 border-[#388ce0] shadow-[0_0_20px_rgba(56,140,224,0.6)] w-[140px] h-[140px] bg-no-repeat z-40"
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
