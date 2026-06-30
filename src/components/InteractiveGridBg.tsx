import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
}

export function InteractiveGridBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const rippleRef = useRef({ x: 0, y: 0, radius: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Initialize 130 glowing dust particles
      const arr: Particle[] = [];
      const colors = [
        'rgba(168, 85, 247, 0.45)', // Purple
        'rgba(236, 72, 153, 0.45)', // Fuchsia
        'rgba(99, 102, 241, 0.45)',  // Indigo
        'rgba(244, 63, 94, 0.45)'    // Rose pink
      ];
      
      for (let i = 0; i < 130; i++) {
        arr.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          size: 1.5 + Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: Math.random() * Math.PI * 2,
          speed: 0.1 + Math.random() * 0.4
        });
      }
      particlesRef.current = arr;
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
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) return;

      // Activate shockwave ripple push
      rippleRef.current = {
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        active: true
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('click', handleClick);

    const draw = () => {
      // Semi-transparent trailing background for a fluid motion blur effect!
      ctx.fillStyle = 'rgba(7, 5, 20, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      if (mouse.x === -1000) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      }

      // Update shockwave
      const rip = rippleRef.current;
      if (rip.active) {
        rip.radius += 10;
        if (rip.radius > 320) {
          rip.active = false;
        }
      }

      const particles = particlesRef.current;
      for (const p of particles) {
        // Apply organic drift swirl
        p.angle += p.speed * 0.05;
        p.vx += Math.cos(p.angle) * p.speed * 0.06;
        p.vy += Math.sin(p.angle) * p.speed * 0.06;

        // Gravitational pull toward cursor (swirling vortex effect!)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 320) {
          const force = (320 - dist) / 320;
          // Pull vector
          p.vx += (dx / dist) * force * 0.28;
          p.vy += (dy / dist) * force * 0.28;
          
          // Tangent vector to make them spin/orbit around the cursor!
          p.vx += (-dy / dist) * force * 0.35;
          p.vy += (dx / dist) * force * 0.35;
        }

        // Push outwards if click ripple shockwave passes
        if (rip.active) {
          const rdx = p.x - rip.x;
          const rdy = p.y - rip.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          const diff = Math.abs(rdist - rip.radius);

          if (diff < 30) {
            const waveForce = (30 - diff) / 30;
            p.vx += (rdx / (rdist || 1)) * waveForce * 8;
            p.vy += (rdy / (rdist || 1)) * waveForce * 8;
          }
        }

        // Apply friction to prevent infinite acceleration
        p.vx *= 0.94;
        p.vy *= 0.94;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle glow
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw halo connection line to mouse if close
        if (dist < 120) {
          const lineAlpha = (1 - dist / 120) * 0.12;
          ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Draw faint connections between particles near each other (nebula constellation)
      ctx.lineWidth = 0.4;
      for (let i = 0; i < particles.length; i += 4) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j += 6) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < 70) {
            const lineOpacity = (1 - d / 70) * 0.08;
            ctx.strokeStyle = `rgba(129, 140, 248, ${lineOpacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
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
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0" style={{ pointerEvents: 'none' }} />;
}
