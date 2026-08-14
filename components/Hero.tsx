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

    const initParticles = (w: number, h: number) => {
      particles = [];
      const densityCount = Math.floor((w * h) / 18000);
      const count = Math.min(Math.max(densityCount, 25), 80);

      for (let i = 0; i < count; i++) {
        const baseOpacity = 0.15 + Math.random() * 0.45;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: 0.6 + Math.random() * 1.6,
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: -(0.15 + Math.random() * 0.35),
          opacity: baseOpacity,
          baseOpacity: baseOpacity,
          fadeSpeed: (Math.random() - 0.5) * 0.008
        });
      }
    };

    let debounceTimer: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
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

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.opacity += p.fadeSpeed;
        if (p.opacity > p.baseOpacity * 1.3 || p.opacity < p.baseOpacity * 0.4) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        p.x += p.speedX;
        p.y += p.speedY;

        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 0.8;
            p.y += Math.sin(angle) * force * 0.8;
          }
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0, p.opacity)})`;
        ctx.shadowBlur = p.size > 1.2 ? 4 : 0;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(draw);
    };

    const initialRect = container.getBoundingClientRect();
    canvas.width = initialRect.width;
    canvas.height = initialRect.height;
    width = initialRect.width;
    height = initialRect.height;
    initParticles(width, height);
    draw();

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
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  // Item Fade-Up Variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }
    }
  };

  // Entrance variants for right-side interactive cards
  const teacherCardVariants = {
    hidden: { opacity: 0, x: -30, rotate: -8 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: -4,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: 0.4
      }
    }
  };

  const statsCardVariants = {
    hidden: { opacity: 0, x: 30, rotate: 12 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 8,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: 0.55
      }
    }
  };

  return (
    <section 
      id="beranda" 
      ref={containerRef}
      className="relative h-[100dvh] min-h-[568px] md:h-screen md:min-h-[700px] bg-dark-maroon md:bg-[var(--bg-color)] graph-paper overflow-hidden flex flex-col md:flex-row"
    >
      
      {/* Canvas Particle Overlay */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
      />

      {/* Background Shapes: Beautiful organic overlap with safe mobile bounds */}
      <div className="absolute inset-0 z-0 flex flex-col md:flex-row pointer-events-none overflow-hidden">
        <div 
          className="w-full md:w-[58%] h-full bg-dark-maroon [clip-path:none] md:[clip-path:polygon(0_0,100%_0,92%_100%,0%_100%)] transition-all duration-500"
          id="hero-bg-slant"
        ></div>
        
        {/* Handcrafted artistic accent strip linking left and right */}
        <div className="absolute top-0 bottom-0 left-[58%] w-[1.5px] bg-gradient-to-b from-transparent via-gold/40 to-transparent hidden md:block z-10 -translate-x-12 transform -skew-x-[4.5deg]"></div>
      </div>

      {/* Decorative Dots - Left Edge (Only Desktop) */}
      <div className="absolute top-24 bottom-32 left-10 flex-col justify-between z-10 hidden lg:flex pointer-events-none">
        <div className="flex flex-col gap-3">
          <div className="w-[1.5px] h-8 bg-gradient-to-b from-gold/50 to-transparent"></div>
          <div className="w-1.5 h-1.5 bg-gold rounded-full shadow-sm"></div>
          <div className="w-1.5 h-[5px] bg-gold/40 rounded-full"></div>
        </div>
        
        {/* Fine vertical line with cross details */}
        <div className="relative h-40 w-[1px] bg-gradient-to-b from-gold/30 via-gold/10 to-transparent self-center">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-3 h-[1px] bg-gold/20"></div>
          <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-1.5 h-[1.5px] bg-gold/40"></div>
        </div>
      </div>

      {/* Vertical Text - Left Edge */}
      <div className="absolute left-6 md:left-8 bottom-24 origin-bottom-left -rotate-90 hidden sm:block pointer-events-none z-10">
        <span className="font-syne-mono text-[8px] tracking-[0.5em] text-gold/25 uppercase font-bold">
          • EPSILONSCIENCE • MEMOIRS OF 2026
        </span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-40 pointer-events-none">
        <span className="font-syne-mono text-[8px] text-gold tracking-[0.35em] uppercase opacity-70">scroll down</span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-gold/80 to-transparent animate-[pulse_2.2s_infinite]"></div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col md:flex-row relative z-10">
        
        {/* Left Content Zone with Framer Motion Staggered Entry */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full md:w-[56%] h-full flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 pt-20 md:pt-16 pb-16 md:pb-0 relative text-left"
        >
          
          {/* Subtle Ambient Radial Glow & Architectural Details behind text */}
          <div className="absolute top-[15%] left-[5%] w-[90%] h-[70%] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_60%)] pointer-events-none z-0 blur-3xl"></div>
          
          {/* Elegant geometric blueprint marks */}
          <div className="absolute top-[30%] left-[3%] w-24 h-24 border border-dashed border-gold/10 rounded-full pointer-events-none z-0"></div>
          <div className="absolute top-[48%] left-[7%] w-12 h-12 border border-gold/5 rounded-sm pointer-events-none z-0 rotate-[15deg]"></div>
          
          {/* Top Stamp Tag */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-3 border border-gold/30 bg-gold/5 backdrop-blur-md px-3.5 py-1.5 mb-6 md:mb-8 w-fit rounded-[1px] z-10 shadow-[0_2px_15px_rgba(255,215,0,0.02)]"
          >
            <span className="font-syne font-black text-gold text-xs leading-none">ε</span>
            <div className="w-[1px] h-3 bg-gold/20"></div>
            <span className="font-syne-mono text-[9px] text-cream/80 tracking-[0.3em] uppercase font-bold">
              EPSILONSCIENCE — ARCHIVE
            </span>
          </motion.div>

          {/* Premium Typographic Title - Beautiful Editorial Hierarchy */}
          <motion.h1 
            id="hero-title"
            variants={itemVariants}
            className="flex flex-col m-0 p-0 leading-[0.95] mb-5 md:mb-8 z-10 select-none"
          >
            <span className="font-syne-mono text-[9px] md:text-[10px] text-gold/80 tracking-[0.45em] uppercase mb-3 block font-bold">
              the chroniclers of
            </span>
            <div className="flex flex-row items-baseline gap-x-0 flex-wrap">
              <span className="font-syne font-black text-[clamp(2.6rem,10vw,5.5rem)] text-white tracking-tighter lowercase leading-[0.95]">
                epsilon
              </span>
              <span className="font-instrument italic font-light text-[clamp(2.5rem,10vw,5.2rem)] text-gold/90 lowercase leading-[0.95]">
                science.
              </span>
            </div>
            <span className="font-instrument italic font-light text-[clamp(1.3rem,4.5vw,2.8rem)] text-cream/45 tracking-[0.05em] mt-2 block pl-0.5">
              Class of xii.a5
            </span>
          </motion.h1>

          {/* Custom asymmetrical separator line with visual anchor */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 mb-6 md:mb-8 z-10"
          >
            <div className="h-[1.5px] bg-gradient-to-r from-gold via-gold/30 to-transparent w-28"></div>
            <div className="w-1.5 h-1.5 rounded-full border border-gold/50 bg-dark-maroon"></div>
          </motion.div>

          {/* Evocative Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="font-syne font-medium italic text-[11px] sm:text-xs md:text-sm text-cream/60 max-w-sm leading-relaxed mb-8 md:mb-10 z-10"
          >
            Mengabadikan kisah, merayakan ilmu, dan memahat kenangan abadi perjalanan keluarga besar kelas XII.A5 SMAN 1 Cileungsi.
          </motion.p>

          {/* Action Call-to-Actions (CTAs) */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-row flex-wrap items-center gap-3 md:gap-4 z-10 w-full sm:w-auto"
          >
            <a 
              href="#galeri" 
              onClick={(e) => handleScroll(e, 'galeri')}
              className="group inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold/95 text-dark-maroon font-syne font-bold text-[10px] sm:text-xs uppercase tracking-widest px-5 py-3.5 sm:px-7 sm:py-4.5 rounded-[1px] transition-all duration-300 shadow-lg shadow-gold/5 hover:shadow-gold/15 hover:-translate-y-0.5 flex-1 sm:flex-initial"
              id="cta-gallery"
            >
              Jelajahi Galeri
              <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a 
              href="#siswa" 
              onClick={(e) => handleScroll(e, 'siswa')}
              className="group inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/35 bg-white/5 hover:bg-white/10 text-white font-syne font-bold text-[10px] sm:text-xs uppercase tracking-widest px-5 py-3.5 sm:px-7 sm:py-4.5 rounded-[1px] transition-all duration-300 hover:-translate-y-0.5 flex-1 sm:flex-initial"
              id="cta-members"
            >
              Lihat Anggota
              <Users size={12} className="text-gold transition-transform duration-300 group-hover:scale-110" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Content Zone (Editorial/Exhibition Collage Layout) */}
        <div className="w-full md:w-[44%] hidden md:flex flex-col justify-center px-6 md:px-8 py-20 relative overflow-hidden z-0">
          
          {/* Subtle Handcrafted Watermark Pattern */}
          <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 opacity-[0.03] text-gold pointer-events-none z-0">
            <Sparkles size={400} strokeWidth={0.5} />
          </div>

          <div className="relative w-full h-[440px] flex items-center justify-center">
            
            {/* Handcrafted Card 1: Homeroom Teacher (Wali Kelas) styled as an authentic polaroid */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={teacherCardVariants}
              className="absolute top-4 left-6 w-[230px] bg-white border border-gold/15 p-4.5 shadow-[8px_14px_30px_rgba(0,0,0,0.3)] -rotate-4 hover:rotate-[-1deg] hover:scale-105 transition-all duration-500 z-20 group"
              id="teacher-card"
            >
              {/* Paper Clip Decorative detail to make it look handcrafted */}
              <div className="absolute top-[-14px] left-12 w-6 h-10 bg-gold/25 backdrop-blur-sm rounded-[2px] border border-gold/10 transform rotate-12 -z-10 shadow-sm"></div>

              <div className="h-44 bg-dark-maroon relative flex items-center justify-center overflow-hidden rounded-[1px]">
                {/* Vintage camera lines pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.12]" 
                  style={{ backgroundImage: 'repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 1.5px, transparent 1.5px, transparent 14px)' }}
                ></div>
                
                {/* Floating focus marks */}
                <div className="absolute inset-4 border border-white/5 pointer-events-none">
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-gold/40"></div>
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-gold/40"></div>
                  <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-gold/40"></div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-gold/40"></div>
                </div>

                <GraduationCap size={46} className="text-gold/80 relative z-10 transition-transform duration-500 group-hover:scale-110" />
              </div>
              
              <div className="pt-4 text-center border-t border-gold/10 mt-3.5">
                <h3 className="font-syne font-black text-xs text-dark-maroon uppercase tracking-widest mb-1.5">
                  Franti Surya
                </h3>
                <p className="font-syne-mono text-[7px] text-gold/90 uppercase font-bold tracking-[0.2em]">
                  HOMEROOM TEACHER • 2026
                </p>
              </div>
              
              {/* Artistic dots */}
              <div className="absolute top-7 left-7 flex gap-1">
                <div className="w-1.5 h-1.5 bg-gold rounded-full shadow-sm"></div>
                <div className="w-1.5 h-1.5 bg-gold/40 rounded-full"></div>
              </div>
            </motion.div>

            {/* Handcrafted Card 2: Class Stats Card slightly lower and offset */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={statsCardVariants}
              className="absolute bottom-6 right-6 w-52 bg-dark-maroon border border-gold/25 p-5 shadow-[12px_16px_35px_rgba(0,0,0,0.45)] rotate-[8deg] hover:rotate-[3deg] hover:scale-105 transition-all duration-500 z-10 group"
              id="stats-card"
            >
              {/* Visual Grid detail line */}
              <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-gold/10 group-hover:bg-gold/20 transition-colors"></div>

              <div className="flex justify-between items-start mb-4 pl-4">
                <span className="font-syne-mono text-[7px] text-gold/60 tracking-[0.25em] uppercase font-bold">
                  LEDGER STATS
                </span>
                <BookOpen size={11} className="text-gold/50" />
              </div>
              
              <div className="mb-4 pl-4">
                <span className="font-syne font-black text-4xl text-white block tracking-tighter leading-none select-none">
                  36
                </span>
                <span className="font-syne text-[9px] text-cream/50 uppercase tracking-[0.18em] font-bold block mt-1">
                  Siswa & Siswi
                </span>
              </div>
              
              <div className="border-t border-gold/15 pt-3 flex flex-col gap-1 pl-4 mt-1">
                <span className="font-syne font-extrabold text-[9px] text-gold uppercase tracking-[0.15em]">
                  SMAN 1 CILEUNGSI
                </span>
                <span className="font-syne-mono text-[7px] text-cream/35 uppercase tracking-wider">
                  Science Dept • XII.A5
                </span>
              </div>
            </motion.div>
            
          </div>
        </div>
      </div>
      
    </section>
  );
}
