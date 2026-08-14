'use client';

import { useRef, useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Sparkles } from 'lucide-react';

export default function Kenangan() {
  const [memories, setMemories] = useState<any[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'memories'), orderBy('order', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setMemories(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        // Fallback for first time or if empty
        setMemories([
          { id: '1', title: "Masa Orientasi", date: "Agustus 2025", desc: "Hari pertama berkumpul sebagai kesatuan XI.A5.", rotate: "-2deg", bg: "linear-gradient(135deg, #1A3FBF 0%, #3D6EFF 100%)" },
          { id: '2', title: "Persiapan Ujian", date: "Oktober 2025", desc: "Kegiatan belajar bersama menjelang Evaluasi Tengah Semester.", rotate: "1.5deg", bg: "linear-gradient(160deg, #0D1B4B 0%, #15329E 60%)" }
        ]);
      }
    });
    return () => unsub();
  }, []);

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
       const itemWidth = 320 + 32; // Width + gap approx
       scrollRef.current.scrollBy({ left: offset * itemWidth, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const index = Math.round(scrollRef.current.scrollLeft / 320);
        setActiveIndex(index);
      }
    };
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section 
      id="kenangan" 
      className="relative pt-12 pb-16 md:pt-16 md:pb-24 bg-dark-maroon overflow-hidden"
    >
      
      {/* Handcrafted coordinate text and lines on the margins */}
      <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-gold/5 hidden xl:block pointer-events-none"></div>

      {/* HEADER SECTION - Styled like an architectural layout block */}
      <div className="max-w-7xl mx-auto px-6 md:px-[8vw] mb-10 md:mb-14 relative z-10">
        
        {/* Horizontal reference line */}
        <div className="absolute top-[35%] -left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent pointer-events-none hidden xl:block"></div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-syne-mono text-[8px] text-gold tracking-[0.4em] uppercase font-bold">
                05 / THE JOURNAL BOARD
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-gold/50"></div>
            </div>
            
            <h2 className="font-syne font-black text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter uppercase leading-[0.95] m-0">
              KILAS BALIK <br />
              <span className="font-instrument italic font-light text-gold text-3xl md:text-4xl lg:text-5xl lowercase tracking-normal block mt-1">
                catatan perjalanan.
              </span>
            </h2>
          </div>
          
          <p className="font-syne text-xs text-cream/40 tracking-wider uppercase max-w-xs leading-relaxed md:text-right">
            Potongan memori harian, canda tawa, and coretan kisah klasik yang terpatri abadi di ingatan kita.
          </p>
        </div>
      </div>

      {/* CAROUSEL SCREEN */}
      <div className="relative w-full overflow-hidden sr-fade delay-3 z-10">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 md:px-[8vw] gap-10 pb-16 pt-8"
          style={{ scrollPadding: '0 8vw' }}
        >
           {memories.map((m, idx) => {
              // Create unique handmade rotation patterns based on index, active only on desktop
              const mdRotations = [
                'md:rotate-[-2deg] rotate-0',
                'md:rotate-[1.5deg] rotate-0',
                'md:rotate-[-0.5deg] rotate-0'
              ];
              const rotationClass = mdRotations[idx % mdRotations.length];

              return (
                <div 
                  key={m.id} 
                  className={`w-[300px] md:w-[325px] shrink-0 snap-center transition-all group cursor-pointer hover:-translate-y-3 duration-500 ${rotationClass}`}
                >
                  
                  {/* Polaroid body with high-taste artisan shadow details */}
                  <div className="bg-white p-4.5 pb-10 shadow-[8px_12px_28px_rgba(0,0,0,0.35)] relative rounded-[1px] border border-gold/10">
                    
                    {/* Washi Tape Accent - Crafted to look like a realistic textured matte tape strip holding the polaroid */}
                    <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-20 h-6 bg-gold/20 backdrop-blur-sm border border-gold/10 -rotate-3 z-20 shadow-[0_1px_4px_rgba(0,0,0,0.03)] pointer-events-none"></div>

                    {/* Image Area with visual camera grids */}
                    <div 
                      className="h-[250px] w-full relative flex items-center justify-center overflow-hidden rounded-[1px] bg-dark-maroon" 
                      style={{ background: m.bg?.startsWith('http') || m.bg?.startsWith('data:') ? `url(${m.bg}) center/cover no-repeat` : m.bg }}
                    >
                      <div className="absolute inset-0 bg-dark-maroon/20 group-hover:bg-dark-maroon/5 transition-colors duration-500 z-10"></div>
                      
                      {/* Grid focus lines */}
                      <div className="absolute inset-3 border border-white/5 pointer-events-none z-20"></div>

                      <div className="absolute bottom-3 left-3 bg-black/55 backdrop-blur-sm px-2.5 py-1 border border-white/10 z-20 rounded-[1px]">
                        <span className="font-syne-mono text-[7px] text-gold/90 uppercase tracking-widest font-bold">
                          PAGE {idx + 1}
                        </span>
                      </div>

                      <span className="font-syne font-black text-sm text-white uppercase tracking-widest z-10 px-6 text-center leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] pr-4">
                        {m.title}
                      </span>
                    </div>

                    {/* Caption area featuring handmade styling */}
                    <div className="mt-6 flex flex-col relative px-1">
                      <span className="font-syne-mono text-[8px] text-gold/80 absolute top-[-10px] right-1 tracking-[0.2em] font-extrabold uppercase bg-dark-maroon text-white px-2 py-0.5 rounded-[1px]">
                        {m.date}
                      </span>
                      
                      {/* Journal handwriting text */}
                      <p className="font-instrument italic text-base md:text-lg text-dark-maroon text-center mt-5 leading-snug font-medium line-clamp-3">
                        &ldquo;{m.desc}&rdquo;
                      </p>
                    </div>

                    {/* Subtle aesthetic details */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-40">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/50"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/25"></div>
                    </div>

                  </div>
                </div>
              );
           })}
           {/* Spacer element for scroll padding */}
           <div className="w-12 shrink-0"></div>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col items-center mt-12 md:mt-16 space-y-6 sr-up delay-4 z-10 relative">
         
         <div className="flex items-center space-x-16">
            <button 
              onClick={() => scrollBy(-1)}
              className="text-white/40 hover:text-gold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-gold p-3 rounded-full hover:bg-white/5 border border-white/10 hover:border-gold/30 hover:-translate-x-1"
              aria-label="Previous memory"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-3.5">
              {memories.map((_, i) => (
                 <button 
                   key={i} 
                   onClick={() => {
                     if (scrollRef.current) {
                       const itemWidth = 320 + 32;
                       scrollRef.current.scrollTo({ left: i * itemWidth, behavior: 'smooth' });
                     }
                   }}
                   className={`h-[6px] rounded-full transition-all duration-500 ${activeIndex === i ? 'w-8 bg-gold' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                   aria-label={`Go to slide ${i + 1}`}
                 ></button>
              ))}
            </div>

            <button 
              onClick={() => scrollBy(1)}
              className="text-white/40 hover:text-gold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-gold p-3 rounded-full hover:bg-white/5 border border-white/10 hover:border-gold/30 hover:translate-x-1"
              aria-label="Next memory"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
         </div>
      </div>

    </section>
  );
}
