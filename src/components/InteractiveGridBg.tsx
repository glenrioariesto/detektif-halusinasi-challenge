import React, { useEffect, useRef } from 'react';

interface Wave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  intensity: number;
}

export function InteractiveGridBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const wavesRef = useRef<Wave[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Don't spawn ripples if clicking on a button
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) return;

      wavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 280,
        speed: 6,
        intensity: 1.0,
      });
    };

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) return;

      if (e.touches.length > 0) {
        wavesRef.current.push({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          radius: 0,
          maxRadius: 240,
          speed: 5,
          intensity: 1.0,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouchStart);

    // Grid spacing parameters
    const spacing = 42;

    const draw = () => {
      // Render base background
      ctx.fillStyle = '#020502';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse coordinates interpolation
      const mouse = mouseRef.current;
      if (mouse.x === -1000) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      }

      // Update waves
      const waves = wavesRef.current;
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        w.radius += w.speed;
        w.intensity -= 0.02;
        if (w.radius > w.maxRadius || w.intensity <= 0) {
          waves.splice(i, 1);
        }
      }

      // Draw grid of boxes
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const originX = c * spacing;
          const originY = r * spacing;

          // Calculate displacement from mouse
          let drawX = originX;
          let drawY = originY;
          let brightness = 0;

          const dx = mouse.x - originX;
          const dy = mouse.y - originY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Mouse Attraction / Follow field
          const maxDist = 180;
          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            // Pull coordinates slightly towards the cursor
            drawX += dx * force * 0.16;
            drawY += dy * force * 0.16;
            brightness += force * 0.45;
          }

          // Wave ripples field
          for (const w of waves) {
            const wdx = w.x - originX;
            const wdy = w.y - originY;
            const wdist = Math.sqrt(wdx * wdx + wdy * wdy);
            const diff = Math.abs(wdist - w.radius);

            const waveWidth = 35;
            if (diff < waveWidth) {
              const waveForce = (waveWidth - diff) / waveWidth * w.intensity;
              // Push or pull coordinates along the ripple wave vector
              drawX += (wdx / (wdist || 1)) * waveForce * 12;
              drawY += (wdy / (wdist || 1)) * waveForce * 12;
              brightness += waveForce * 0.8;
            }
          }

          // Draw the box
          brightness = Math.min(1, brightness);
          const boxSize = 8 + brightness * 8; // expand on hover/ripple
          const opacity = 0.04 + brightness * 0.55;

          // Green matrix colors
          ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
          ctx.lineWidth = 1 + brightness;
          ctx.strokeRect(drawX - boxSize / 2, drawY - boxSize / 2, boxSize, boxSize);

          if (brightness > 0.3) {
            ctx.fillStyle = `rgba(52, 211, 153, ${brightness * 0.3})`;
            ctx.fillRect(drawX - 1.5, drawY - 1.5, 3, 3);
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouchStart);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0" style={{ pointerEvents: 'none' }} />;
}
