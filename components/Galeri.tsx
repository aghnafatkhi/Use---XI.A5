import { useState, useEffect } from 'react';

const galleryData = [
  { id: 1, title: "Foto Bersama Pak Hugi", category: "foto-kelas", bg: "linear-gradient(135deg, #5C1414 0%, #8B3333 100%)" },
  { id: 2, title: "Praktikum Biologi Sel", category: "kegiatan", bg: "linear-gradient(160deg, #3A0A0A 0%, #6B2020 60%, #C4973A 100%)" },
  { id: 3, title: "Upacara 17 Agustus", category: "kegiatan", bg: "linear-gradient(110deg, #7A2020 0%, #4A0E0E 100%)" },
  { id: 4, title: "Baksos: Cegah Stunting", category: "momen", bg: "linear-gradient(145deg, #C4973A 0%, #8B6020 50%, #5C1414 100%)" },
  { id: 5, title: "Kimia: Asam Basa", category: "kegiatan", bg: "linear-gradient(125deg, #4A0E0E 30%, #7A3535 100%)" },
  { id: 6, title: "Makan Siang di Kantin", category: "momen", bg: "linear-gradient(155deg, #6B2020 0%, #C4973A 100%)" },
  { id: 7, title: "Foto Kelas Pertama", category: "foto-kelas", bg: "linear-gradient(170deg, #3A0A0A 0%, #5C1414 50%, #8B4040 100%)" },
  { id: 8, title: "Piket Bersih-Bersih", category: "kegiatan", bg: "linear-gradient(120deg, #8B4020 0%, #5C1414 100%)" },
  { id: 9, title: "Ultah Dadakan Kelas", category: "momen", bg: "linear-gradient(140deg, #5C1414 0%, #C4973A 80%, #8B6020 100%)" },
  { id: 10, title: "Kunjungan Lab IPA", category: "kegiatan", bg: "linear-gradient(165deg, #4A0E0E 0%, #6B3030 100%)" },
  { id: 11, title: "Class Meeting Sengit", category: "momen", bg: "linear-gradient(130deg, #7A2020 0%, #4A0E0E 70%, #C4973A 100%)" },
  { id: 12, title: "Foto Akhir Semester Ganjil", category: "foto-kelas", bg: "linear-gradient(150deg, #3A0A0A 0%, #8B3333 100%)" },
];

export default function Galeri() {
  const [activeFilter, setActiveFilter] = useState('semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeFilter === 'semua' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeFilter);

  // Close lightbox on Escape, navigate with arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section id="galeri" className="relative pt-[120px] pb-[120px] bg-[var(--bg-warm)]">
      
      {/* HEADER AREA */}
      <div className="px-6 md:px-[8vw] mb-12 flex flex-col md:flex-row md:items-end justify-between relative">
        <div className="absolute left-0 top-12 origin-top-left -rotate-90 hidden md:block">
          <span className="font-syne font-extrabold text-[9px] text-[#5C1414]/30 tracking-[0.25em] uppercase">
            02 — Galeri
          </span>
        </div>

        {/* Left Side Header */}
        <div className="sr-up">
          <h2 className="font-instrument italic text-[3rem] text-[#5C1414] dark:text-[#F4EDE0] leading-tight whitespace-pre-line mb-6 md:mb-0">
            {"Momen yang\nKami Abadikan."}
          </h2>
        </div>

        {/* Right Side Header */}
        <div className="flex flex-col items-end sr-up delay-2">
          {/* Upload Button */}
          <button 
             className="flex items-center font-syne font-bold text-[#C4973A] text-[0.875rem] mb-6 hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#C4973A]"
             onClick={() => alert("Upload feature would trigger file input here")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
              <rect x="3" y="8" width="18" height="12" rx="2" ry="2"></rect>
              <line x1="12" y1="11" x2="12" y2="17"></line>
              <line x1="9" y1="14" x2="15" y2="14"></line>
              <path d="M16 8v-2a2 2 0 0 0 -2 -2h-4a2 2 0 0 0 -2 2v2"></path>
            </svg>
            Tambah Foto
          </button>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-end">
             {[
               {id: 'semua', label: 'Semua'},
               {id: 'kegiatan', label: 'Kegiatan'},
               {id: 'foto-kelas', label: 'Foto Kelas'},
               {id: 'momen', label: 'Momen Seru'}
             ].map(filter => (
               <button
                 key={filter.id}
                 onClick={() => { setActiveFilter(filter.id); setLightboxIndex(null); }}
                 className={`font-syne text-[0.75rem] px-[14px] py-[6px] rounded-full border border-[#EDE0CE] transition-colors focus-visible:outline-2 focus-visible:outline-[#C4973A] ${
                   activeFilter === filter.id 
                     ? 'border-[#C4973A] text-[#C4973A] font-bold' 
                     : 'text-[var(--text-muted)] hover:border-[#C4973A]/50'
                 }`}
               >
                 {filter.label}
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* GALLERY GRID (Full Bleed) */}
      <div className="w-full">
        {/* CSS Grid for Editorial Masonry Look */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1.3fr_1fr] gap-[3px] auto-rows-min">
          {filteredItems.map((item, index) => {
            // Determine height class based on sequence
            const heightClass = (index % 5 === 4) ? 'pt-[100%]' : (index % 2 === 0 ? 'pt-[70%]' : 'pt-[55%]');

            return (
              <div 
                key={item.title}
                data-category={item.category}
                className={`relative overflow-hidden group cursor-pointer w-full sr-up`}
                style={{ transitionDelay: `${(index % 6) * 0.1}s` }}
                onClick={() => setLightboxIndex(index)}
              >
                {/* Ratio padding */}
                <div className={`${heightClass} w-full`}></div>
                
                {/* Background Gradient */}
                <div 
                  className="absolute inset-0 w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  style={{ background: item.bg }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
                    <span className="font-syne font-bold text-[0.8rem] text-[#F4EDE0] uppercase tracking-[0.1em] mb-1">
                      {item.title}
                    </span>
                    <span className="font-syne-mono text-[0.65rem] text-[#C4973A]/70 uppercase tracking-widest">
                      {item.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                {/* Hover Reveal Overlay */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[#3A0A0A]/50 translate-y-full flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-y-0 z-20">
                  <span className="font-syne font-bold text-[0.8rem] text-[#F4EDE0]">Lihat foto →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[2000] bg-[rgba(26,8,8,0.96)] flex flex-col items-center justify-center" onClick={() => setLightboxIndex(null)}>
          <button 
            className="absolute top-8 right-8 text-[#F4EDE0]/60 hover:text-[#C4973A] font-syne text-[32px] leading-none focus-visible:outline-2 focus-visible:outline-[#C4973A]"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            aria-label="Close lightbox"
          >×</button>
          
          <button 
            className="absolute left-8 top-1/2 -translate-y-1/2 text-[#F4EDE0]/50 hover:text-[#C4973A] p-4 focus-visible:outline-2 focus-visible:outline-[#C4973A]"
            onClick={(e) => { 
              e.stopPropagation(); 
              setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
            }}
            aria-label="Previous image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button 
            className="absolute right-8 top-1/2 -translate-y-1/2 text-[#F4EDE0]/50 hover:text-[#C4973A] p-4 focus-visible:outline-2 focus-visible:outline-[#C4973A]"
            onClick={(e) => { 
              e.stopPropagation(); 
              setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
            }}
            aria-label="Next image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div className="w-[80vw] h-[75vh] relative" onClick={(e) => e.stopPropagation()}>
             {/* Fake image using gradient for demo */}
             <div className="w-full h-full" style={{ background: filteredItems[lightboxIndex].bg }}></div>
          </div>
          
          <div className="mt-6 text-center" onClick={(e) => e.stopPropagation()}>
            <h4 className="font-syne font-bold text-[#F4EDE0] text-base mb-1">{filteredItems[lightboxIndex].title}</h4>
            <p className="font-syne-mono text-[#C4973A] text-[0.75rem] uppercase">{filteredItems[lightboxIndex].category.replace('-', ' ')}</p>
          </div>
        </div>
      )}
    </section>
  );
}
