import { useRef, useState, useEffect } from 'react';

const memories = [
  { id: 1, title: "Hari Pertama Kita", date: "Agustus 2025", desc: "Awal dari segalanya.", rotate: "-2deg", bg: "linear-gradient(135deg, #5C1414 0%, #8B3333 100%)" },
  { id: 2, title: "Berjuang Bareng di PTS", date: "Oktober 2025", desc: "Sama-sama panik.", rotate: "1.5deg", bg: "linear-gradient(160deg, #3A0A0A 0%, #6B2020 60%)" },
  { id: 3, title: "Solid di PORSENI", date: "November 2025", desc: "Satu untuk semua.", rotate: "-1deg", bg: "linear-gradient(145deg, #C4973A 0%, #8B6020 50%, #5C1414 100%)" },
  { id: 4, title: "Ketawa Tanpa Alasan", date: "Sepanjang Tahun", desc: "Momen paling jujur.", rotate: "2deg", bg: "linear-gradient(125deg, #4A0E0E 30%, #7A3535 100%)" },
  { id: 5, title: "Epsilon Forever", date: "2025–2026", desc: "Sampai jumpa lagi.", rotate: "-1.5deg", bg: "linear-gradient(170deg, #5C1414 0%, #C4973A 100%)" }
];

export default function Kenangan() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    <section id="kenangan" className="relative pt-[120px] pb-[120px] bg-[#3A0A0A]">
      
      {/* HEADER */}
      <div className="px-6 md:px-[8vw] mb-12 relative text-center md:text-left sr-up">
        <span className="block font-syne font-extrabold text-[9px] text-[#F4EDE0]/30 tracking-[0.25em] uppercase mb-4">
          06 — Kenangan
        </span>
        <h2 className="font-instrument italic text-[3rem] text-[#F4EDE0] leading-tight mb-4 whitespace-pre-line">
          {"Yang Tidak Akan\nKami Lupakan."}
        </h2>
        <p className="font-syne text-[0.875rem] text-[#F4EDE0]/50">
          Lima momen. Dipilih bersama. Disimpan selamanya.
        </p>
      </div>

      {/* CAROUSEL */}
      <div className="relative w-full overflow-hidden sr-fade delay-3">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 md:px-[8vw] gap-8 pb-[40px] pt-[20px]"
          style={{ scrollPadding: '0 8vw' }}
        >
           {memories.map((m) => (
             <div 
               key={m.id} 
               className="w-[320px] shrink-0 snap-center transition-transform"
               style={{ transform: `rotate(${m.rotate})` }}
             >
               {/* Polaroid body */}
               <div className="bg-[#FDFAF5] dark:bg-[#1E0808] p-3 pb-10 shadow-[6px_8px_0px_rgba(58,10,10,0.2)] relative">
                 
                 {/* Washi Tape Accent */}
                 <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-[60px] h-[20px] bg-[#C4973A]/35 -rotate-6 z-10 mix-blend-multiply"></div>

                 {/* Image Area */}
                 <div className="h-[240px] w-full relative flex items-center justify-center" style={{ background: m.bg }}>
                   <span className="font-syne font-bold text-[0.75rem] text-[#F4EDE0]/80 uppercase tracking-wider z-10 px-4 text-center">
                     {m.title}
                   </span>
                 </div>

                 {/* Bottom area */}
                 <div className="mt-4 flex flex-col relative px-2">
                    <span className="font-syne-mono text-[0.65rem] text-[var(--text-muted)] absolute right-2 top-0">
                      {m.date}
                    </span>
                    <p className="font-satisfy text-[1.1rem] text-[#3A0A0A] dark:text-[#F4EDE0] text-center mt-2">
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
      <div className="flex flex-col items-center mt-8 space-y-6 sr-up delay-4">
         
         <div className="flex items-center space-x-16">
            <button 
              onClick={() => scrollBy(-1)}
              className="text-[#F4EDE0]/50 hover:text-[#C4973A] transition-colors focus-visible:outline-2 focus-visible:outline-[#C4973A]"
              aria-label="Previous memory"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {memories.map((_, i) => (
                 <div 
                   key={i} 
                   className={`h-[6px] rounded-full bg-[#F4EDE0]/20 transition-all duration-300 ${activeIndex === i ? 'w-[24px] bg-[#C4973A]' : 'w-[6px]'}`}
                 ></div>
              ))}
            </div>

            <button 
              onClick={() => scrollBy(1)}
              className="text-[#F4EDE0]/50 hover:text-[#C4973A] transition-colors focus-visible:outline-2 focus-visible:outline-[#C4973A]"
              aria-label="Next memory"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
         </div>
      </div>

    </section>
  );
}
