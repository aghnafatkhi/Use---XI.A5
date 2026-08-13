'use client';

import { useRef, useEffect } from 'react';
import { ArrowRight, GraduationCap, Users, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
  baseOpacity: number;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Particles animation logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    // Create particles based on size
    const initParticles = (w: number, h: number) => {
      particles = [];
      const densityCount = Math.floor((w * h) / 18000); // Proportional density
      const count = Math.min(Math.max(densityCount, 25), 80); // Clamp count between 25 and 80

      for (let i = 0; i < count; i++) {
        const baseOpacity = 0.15 + Math.random() * 0.45;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: 0.6 + Math.random() * 1.6,
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: -(0.15 + Math.random() * 0.35), // Rising upward
          opacity: baseOpacity,
          baseOpacity: baseOpacity,
          fadeSpeed: (Math.random() - 0.5) * 0.008
        });
      }
    };

    // Responsive Canvas Resizing via ResizeObserver
    let debounceTimer: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Debounce resize updates to ensure high performance
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          const { width: newWidth, height: newHeight } = entry.contentRect;
          
          canvas.width = newWidth;
          canvas.height = newHeight;
          width = newWidth;
          height = newHeight;
          
          initParticles(newWidth, newHeight);
        }, 150);
      }
    });

    resizeObserver.observe(container);

    // Mouse Interaction Handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Gentle oscillation of opacity for shining sparkle effect
        p.opacity += p.fadeSpeed;
        if (p.opacity > p.baseOpacity * 1.3 || p.opacity < p.baseOpacity * 0.4) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Apply slow drift motion
        p.x += p.speedX;
        p.y += p.speedY;

        // Interaction with mouse: push away gently
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120; // Radius of influence

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            const angle = Math.atan2(dy, dx);
            // Move particles slightly in direction of force
            p.x += Math.cos(angle) * force * 0.8;
            p.y += Math.sin(angle) * force * 0.8;
          }
        }

        // Wrap around borders gracefully
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw particle (Soft gold star glow)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0, p.opacity)})`;
        ctx.shadowBlur = p.size > 1.2 ? 4 : 0;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
        ctx.fill();
      });

      // Clear shadow setting for performance
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    // Initial trigger
    const initialRect = container.getBoundingClientRect();
    canvas.width = initialRect.width;
    canvas.height = initialRect.height;
    width = initialRect.width;
    height = initialRect.height;
    initParticles(width, height);
    draw();

    // Cleanup listeners and animations on unmount
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(debounceTimer);
    };
  }, []);

  // Staggered Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      }
    }
  };

  // Item Fade-Up Variants
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom cubic-bezier (EaseOutExpo)
      }
    }
  };

  // Entrance variants for right-side interactive cards
  const teacherCardVariants = {
    hidden: { opacity: 0, x: -24, rotate: -6 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: -3,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: 0.45
      }
    }
  };

  const statsCardVariants = {
    hidden: { opacity: 0, x: 24, rotate: 10 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 6,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: 0.6
      }
    }
  };

  return (
    <section 
      id="beranda" 
      ref={containerRef}
      className="relative h-screen min-h-[650px] bg-[var(--bg-color)] graph-paper overflow-hidden flex flex-col md:flex-row"
    >
      
      {/* Canvas Particle Overlay (Zero Impact on Clicking) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none opacity-70"
      />

      {/* Background Shapes: Slanted split layout */}
      <div className="absolute inset-0 z-0 flex flex-col md:flex-row pointer-events-none">
        <div 
          className="w-full md:w-[62%] h-full bg-dark-maroon [clip-path:none] md:[clip-path:polygon(0_0,100%_0,88%_100%,0%_100%)]"
          id="hero-bg-slant"
        ></div>
      </div>

      {/* Decorative Dots - Left Edge (Only Desktop) */}
      <div className="absolute top-24 bottom-32 left-12 flex-col justify-between z-10 hidden lg:flex pointer-events-none">
        <div className="flex gap-2.5">
          <div className="w-1.5 h-1.5 bg-gold rounded-full shadow-sm"></div>
          <div className="w-1.5 h-1.5 bg-gold/40 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gold/20 rounded-full"></div>
        </div>
        
        {/* Fine vertical line */}
        <div className="h-40 w-[1px] bg-gradient-to-b from-gold/30 to-transparent self-center"></div>
      </div>

      {/* Vertical Text - Left Edge */}
      <div className="absolute left-6 md:left-10 bottom-24 origin-bottom-left -rotate-90 hidden sm:block pointer-events-none z-10">
        <span className="font-syne-mono text-[9px] tracking-[0.4em] text-gold/30 uppercase font-bold">
          Epsilonscience • 2026
        </span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-40 pointer-events-none">
        <span className="font-syne-mono text-[8px] text-gold tracking-[0.35em] uppercase opacity-75">Scroll</span>
        <div className="h-10 w-[1px] bg-gradient-to-b from-gold to-transparent animate-[pulse_2s_infinite]"></div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col md:flex-row relative z-10">
        
        {/* Left Content Zone with Framer Motion Staggered Entry */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full md:w-[55%] h-full flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 pt-28 md:pt-16 pb-12 md:pb-0 relative text-left"
        >
          
          {/* Subtle Ambient Radial Glow & Architectural Details behind text */}
          <div className="absolute top-[20%] left-[10%] w-[80%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_65%)] pointer-events-none z-0 blur-3xl"></div>
          <div className="absolute top-[35%] left-[5%] w-32 h-32 border border-gold/10 rounded-full pointer-events-none z-0"></div>
          <div className="absolute top-[45%] left-[8%] w-16 h-16 border border-dashed border-gold/5 rounded-full pointer-events-none z-0 animate-[spin_40s_linear_infinite]"></div>
          
          {/* Top Stamp Tag */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-3 border border-gold/35 bg-gold/5 backdrop-blur-md px-3.5 py-1.5 mb-6 md:mb-8 w-fit rounded-sm z-10 shadow-[0_2px_12px_rgba(255,215,0,0.03)]"
          >
            <span className="font-syne font-black text-gold text-xs leading-none">ε</span>
            <div className="w-[1px] h-3 bg-gold/30"></div>
            <span className="font-syne-mono text-[9px] text-cream/90 tracking-[0.25em] uppercase font-bold">
              Epsilonscience — XII.A5
            </span>
          </motion.div>

          {/* Premium Typographic Title */}
          <motion.h1 
            variants={itemVariants}
            className="flex flex-col m-0 p-0 leading-tight mb-5 md:mb-6 z-10"
          >
            <span className="font-syne font-black text-[clamp(2.5rem,5.5vw,4.2rem)] text-white tracking-tight uppercase leading-none">
              Epsilonscience
            </span>
            <span className="font-instrument italic text-[clamp(3rem,7vw,5rem)] text-gold leading-tight m-0 mt-1">
              XII.A5
            </span>
          </motion.h1>

          {/* Elegant Gradient Divider */}
          <motion.div 
            variants={itemVariants}
            className="h-[2px] bg-gradient-to-r from-gold via-gold/50 to-transparent w-24 mb-6 md:mb-8 z-10"
          ></motion.div>

          {/* Evocative Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="font-syne font-medium italic text-sm md:text-base text-cream/70 max-w-md leading-relaxed mb-8 md:mb-10 z-10"
          >
            Mengabadikan kisah, merayakan ilmu, dan memahat kenangan abadi perjalanan keluarga besar kelas XII.A5 SMAN 1 Cileungsi.
          </motion.p>

          {/* Action Call-to-Actions (CTAs) */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 z-10 w-full sm:w-auto"
          >
            <a 
              href="#galeri" 
              onClick={(e) => handleScroll(e, 'galeri')}
              className="group inline-flex items-center justify-center gap-2.5 bg-gold hover:bg-gold/95 text-dark-maroon font-syne font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-sm transition-all duration-300 shadow-lg shadow-gold/10 hover:shadow-gold/20 hover:-translate-y-0.5"
              id="cta-gallery"
            >
              Jelajahi Galeri
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a 
              href="#siswa" 
              onClick={(e) => handleScroll(e, 'siswa')}
              className="group inline-flex items-center justify-center gap-2.5 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-syne font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-sm transition-all duration-300 hover:-translate-y-0.5"
              id="cta-members"
            >
              Lihat Anggota
              <Users size={14} className="text-gold transition-transform duration-300 group-hover:scale-110" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Content Zone (Editorial/Exhibition Layout) */}
        <div className="w-full md:w-[45%] hidden md:flex flex-col justify-center px-6 md:px-12 py-20 relative overflow-hidden z-0">
          
          {/* Subtle Graphic Watermark */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-[0.05] text-gold pointer-events-none z-0">
            <Sparkles size={360} strokeWidth={0.5} />
          </div>

          <div className="relative w-full h-[400px] flex items-center justify-center">
            
            {/* Card 1: Homeroom Teacher (Wali Kelas) */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={teacherCardVariants}
              className="absolute top-8 left-12 w-56 bg-white border border-gold/20 p-4 shadow-xl -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 z-20 group"
              id="teacher-card"
            >
              <div className="h-40 bg-dark-maroon relative flex items-center justify-center overflow-hidden rounded-sm">
                <div 
                  className="absolute inset-0 opacity-20" 
                  style={{ backgroundImage: 'repeating-linear-gradient(45deg, #EEF2FF 0px, #EEF2FF 1px, transparent 1px, transparent 12px)' }}
                ></div>
                <GraduationCap size={44} className="text-gold/80 relative z-10 transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="pt-4 text-center">
                <h3 className="font-syne font-black text-xs text-dark-maroon uppercase tracking-wider mb-1">
                  Franti Surya
                </h3>
                <p className="font-syne-mono text-[8px] text-gold uppercase font-bold tracking-wider">
                  Wali Kelas • SMAN 1 Cileungsi
                </p>
              </div>
              
              {/* Artistic dots */}
              <div className="absolute top-6 left-6 flex gap-1">
                <div className="w-1.5 h-1.5 bg-gold rounded-full shadow-sm"></div>
                <div className="w-1.5 h-1.5 bg-gold/40 rounded-full"></div>
              </div>
            </motion.div>

            {/* Card 2: Class Stats / Concept */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={statsCardVariants}
              className="absolute bottom-10 right-8 w-52 bg-dark-maroon border border-gold/30 p-5 shadow-lg rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 z-10"
              id="stats-card"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-syne-mono text-[8px] text-gold/70 tracking-widest uppercase font-bold">
                  Class Profile
                </span>
                <BookOpen size={12} className="text-gold/60" />
              </div>
              
              <div className="mb-4">
                <span className="font-syne font-black text-4xl text-white block tracking-tight leading-none">
                  36
                </span>
                <span className="font-syne text-[10px] text-cream/60 uppercase tracking-widest font-bold">
                  Siswa & Siswi
                </span>
              </div>
              
              <div className="border-t border-gold/15 pt-3 flex flex-col gap-1">
                <span className="font-syne font-extrabold text-[9px] text-gold uppercase tracking-wider">
                  SMAN 1 Cileungsi
                </span>
                <span className="font-syne-mono text-[7px] text-cream/40 uppercase">
                  Science Program • 2026
                </span>
              </div>
            </motion.div>
            
          </div>
        </div>
      </div>
      
    </section>
  );
}
