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
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const rippleRef = useRef({ x: 0, y: 0, radius: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Detect if user is on mobile/tablet/iPad touch screen or small device
      const isTouchOrMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024;

      // On initial load for mobile/iPad, place 1 active target point shifted further right (85% width)
      if (isTouchOrMobile && !mouseRef.current.active) {
        const pointX = rect.width * 0.85;
        const pointY = rect.height * 0.5;
        mouseRef.current.targetX = pointX;
        mouseRef.current.targetY = pointY;
        mouseRef.current.x = pointX;
        mouseRef.current.y = pointY;
        mouseRef.current.active = true;
      }

      // Initialize 80 glowing dust particles inside the card
      const arr: Particle[] = [];
      const colors = [
        'rgba(16, 185, 129, 0.45)', // Emerald
        'rgba(52, 211, 153, 0.45)', // Mint/Emerald
        'rgba(34, 197, 94, 0.45)',  // Lime green
        'rgba(5, 150, 105, 0.45)'   // Dark Emerald
      ];
      
      for (let i = 0; i < 80; i++) {
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
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if mouse is strictly inside the card boundaries
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current.targetX = x;
        mouseRef.current.targetY = y;
        mouseRef.current.active = true;
      } else {
        mouseRef.current.active = false;
        mouseRef.current.targetX = -1000;
        mouseRef.current.targetY = -1000;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = parent.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          mouseRef.current.targetX = x;
          mouseRef.current.targetY = y;
          mouseRef.current.active = true;
        } else {
          mouseRef.current.active = false;
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('a')) return;

        // Activate shockwave ripple push relative to card coordinates
        rippleRef.current = {
          x,
          y,
          radius: 10,
          active: true
        };
      }
    };

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);
    parent.addEventListener('touchmove', handleTouchMove);
    parent.addEventListener('click', handleClick);

    const draw = () => {
      // Clear canvas every frame with 100% full transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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

        // Draw halo connection line to mouse if close (Emerald glow)
        if (dist < 120) {
          const lineAlpha = (1 - dist / 120) * 0.12;
          ctx.strokeStyle = `rgba(52, 211, 153, ${lineAlpha})`;
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
            ctx.strokeStyle = `rgba(52, 211, 153, ${lineOpacity})`;
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
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      parent.removeEventListener('touchmove', handleTouchMove);
      parent.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0" style={{ pointerEvents: 'none' }} />;
}
