'use client';

import { useState, useEffect } from 'react';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-maroon relative">
      <div className="w-full h-[1px] bg-gold/20"></div>

      <div className="pt-10 pb-8 px-6 md:px-[8vw] max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-8">
        
        {/* LEFT */}
        <div className="relative md:w-1/4">
          <div className="absolute -left-4 -top-8 font-instrument text-[64px] text-gold/15 leading-none select-none pointer-events-none z-0">
            ε
          </div>
          <div className="relative z-10 flex flex-col">
            <span className="font-satisfy text-[1.6rem] text-white mb-1">Epsilonscience</span>
            <span className="font-syne-mono text-[0.65rem] text-white/40 tracking-[0.1em] uppercase">
              XII.A5 · SMAN 1 Cileungsi
            </span>
          </div>
        </div>

        {/* RIGHT LINKS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:flex md:flex-row md:justify-end md:gap-16 flex-grow">
          {/* CENTER */}
          <div className="flex flex-col">
            <span className="block font-syne font-extrabold text-[9px] text-gold/60 tracking-[0.2em] uppercase mb-3">
              Navigasi
            </span>
            <div className="flex flex-col space-y-1">
              {['Beranda', 'Tentang', 'Galeri', 'Siswa', 'Kenangan'].map(item => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="font-syne text-[0.75rem] text-white/50 hover:text-gold leading-[2] transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col">
            <span className="block font-syne font-extrabold text-[9px] text-gold/60 tracking-[0.2em] uppercase mb-3">
              Media Sosial
            </span>
            <div className="flex flex-col space-y-1">
              <a 
                href="https://www.youtube.com/@epsilonsciencee" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-syne text-[0.75rem] text-white/50 hover:text-gold leading-[2] transition-colors"
              >
                YouTube
              </a>
              <a 
                href="https://www.instagram.com/epsilonscience5" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-syne text-[0.75rem] text-white/50 hover:text-gold leading-[2] transition-colors"
              >
                Instagram
              </a>
              <a 
                href="https://www.tiktok.com/@epsil0nsciencee" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-syne text-[0.75rem] text-white/50 hover:text-gold leading-[2] transition-colors"
              >
                TikTok
              </a>
            </div>
          </div>

          {/* KELAS */}
          <div className="flex flex-col col-span-2 sm:col-span-1">
            <span className="block font-syne font-extrabold text-[9px] text-gold/60 tracking-[0.2em] uppercase mb-3">
              Kelas Kami
            </span>
            <div className="flex flex-col space-y-1">
              <span className="font-syne text-[0.75rem] text-white/50 leading-[2]">Wali Kelas: Franti Surya</span>
              <span className="font-syne text-[0.75rem] text-white/50 leading-[2]">Sekolah: SMAN 1 Cileungsi</span>
              <span className="font-syne text-[0.75rem] text-white/50 leading-[2]">Tahun Ajaran: 2026/2027</span>
              <span className="font-syne text-[0.75rem] text-white/50 leading-[2]">Jumlah Siswa: 36 orang</span>
            </div>
          </div>
        </div>

      </div>

      <div className="w-full h-[1px] bg-white/5"></div>

      <div className="py-6 px-6 text-center flex flex-col space-y-1">
         <span className="font-syne text-[0.75rem] text-white/30">© 2026-2027 Epsilonscience — Hak Cipta Dilindungi Undang-Undang.</span>
         <span className="font-syne text-[0.75rem] text-white/30">Repositori Dokumentasi Resmi SMAN 1 Cileungsi.</span>
      </div>

      {/* BACK TO TOP */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[1000] font-syne font-bold text-[0.75rem] text-gold/60 hover:text-gold transition-all duration-500 focus-visible:outline-2 focus-visible:outline-gold back-to-top-btn ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Kembali ke atas"
      >
        Kembali ke atas ↑
      </button>

    </footer>
  );
}
