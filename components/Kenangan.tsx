import { useRef, useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';

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
          { id: '1', title: "Masa Orientasi", date: "Agustus 2025", desc: "Hari pertama berkumpul sebagai kesatuan XII IPA 5.", rotate: "-2deg", bg: "linear-gradient(135deg, #5C1414 0%, #8B3333 100%)" },
          { id: '2', title: "Persiapan Ujian", date: "Oktober 2025", desc: "Kegiatan belajar bersama menjelang Evaluasi Tengah Semester.", rotate: "1.5deg", bg: "linear-gradient(160deg, #3A0A0A 0%, #6B2020 60%)" }
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
    <section id="kenangan" className="relative pt-[120px] pb-[120px] md:pt-[160px] md:pb-[160px] bg-[#3A0A0A]">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 md:px-[6vw] lg:px-[8vw] mb-12 md:mb-16 relative text-center md:text-left sr-up">
        <span className="block font-syne font-extrabold text-[9px] text-[#F4EDE0]/30 tracking-[0.25em] uppercase mb-4">
          06 — Kilas Balik
        </span>
        <h2 className="font-instrument italic text-[3rem] md:text-[3.5rem] lg:text-[4rem] text-[#F4EDE0] leading-[1.1] mb-6 whitespace-pre-line">
          {"Catatan Perjalanan\nXII IPA 5."}
        </h2>
        <p className="font-syne text-[0.9rem] md:text-[1rem] text-[#F4EDE0]/50 max-w-sm mx-auto md:mx-0">
          Dokumentasi momen bermakna selama menempuh perjalanan studi.
        </p>
      </div>

      {/* CAROUSEL */}
      <div className="relative w-full overflow-hidden sr-fade delay-3">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 md:px-[6vw] lg:px-[8vw] gap-8 pb-[40px] pt-[20px]"
          style={{ scrollPadding: '0 8vw' }}
        >
           {memories.map((m) => (
             <div 
               key={m.id} 
               className="w-[300px] md:w-[320px] shrink-0 snap-center transition-transform group cursor-pointer hover:-translate-y-2 duration-500"
               style={{ transform: `rotate(${m.rotate})` }}
             >
               {/* Polaroid body */}
               <div className="bg-[#FDFAF5] dark:bg-[#1E0808] p-3 pb-10 shadow-[6px_8px_0px_rgba(58,10,10,0.2)] md:shadow-[8px_12px_0px_rgba(0,0,0,0.3)] relative group-hover:shadow-[12px_16px_0px_rgba(0,0,0,0.4)] transition-shadow duration-500">
                 
                 {/* Washi Tape Accent */}
                 <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-[60px] h-[20px] bg-[#C4973A]/35 -rotate-6 z-10 mix-blend-multiply opacity-80"></div>

                 {/* Image Area */}
                 <div className="h-[240px] w-full relative flex items-center justify-center overflow-hidden" style={{ background: m.bg?.startsWith('http') || m.bg?.startsWith('data:') ? `url(${m.bg}) center/cover no-repeat` : m.bg }}>
                   <div className="absolute inset-0 bg-[#1E0808]/10 group-hover:opacity-0 transition-opacity duration-500"></div>
                   <span className="font-syne font-bold text-[0.8rem] md:text-[0.85rem] text-[#F4EDE0]/90 uppercase tracking-[0.1em] z-10 px-4 text-center leading-snug drop-shadow-md">
                     {m.title}
                   </span>
                 </div>

                 {/* Bottom area */}
                 <div className="mt-5 flex flex-col relative px-2">
                    <span className="font-syne-mono text-[0.65rem] text-[#C4973A] absolute top-[-10px] right-2 tracking-widest font-bold">
                      {m.date}
                    </span>
                    <p className="font-satisfy text-[1.1rem] md:text-[1.2rem] text-[#3A0A0A] dark:text-[#F4EDE0] text-center mt-3 leading-relaxed">
                       {m.desc}
                    </p>
                 </div>
               </div>
             </div>
           ))}
           {/* Spacer element for right padding inside scroll */}
           <div className="w-[1px] shrink-0"></div>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col items-center mt-8 md:mt-12 space-y-6 sr-up delay-4">
         
         <div className="flex items-center space-x-16">
            <button 
              onClick={() => scrollBy(-1)}
              className="text-[#F4EDE0]/50 hover:text-[#C4973A] transition-colors focus-visible:outline-2 focus-visible:outline-[#C4973A] p-2 rounded-full hover:bg-[#F4EDE0]/5"
              aria-label="Previous memory"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-3">
              {memories.map((_, i) => (
                 <div 
                   key={i} 
                   className={`h-[6px] rounded-full transition-all duration-300 ${activeIndex === i ? 'w-[24px] bg-[#C4973A]' : 'w-[6px] bg-[#F4EDE0]/20 hover:bg-[#F4EDE0]/40'}`}
                 ></div>
              ))}
            </div>

            <button 
              onClick={() => scrollBy(1)}
              className="text-[#F4EDE0]/50 hover:text-[#C4973A] transition-colors focus-visible:outline-2 focus-visible:outline-[#C4973A] p-2 rounded-full hover:bg-[#F4EDE0]/5"
              aria-label="Next memory"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
         </div>
      </div>

    </section>
  );
}
