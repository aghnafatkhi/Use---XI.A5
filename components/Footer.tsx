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
    <footer className="bg-[#1A0808] relative">
      <div className="w-full h-[1px] bg-[#C4973A]/20"></div>

      <div className="pt-20 pb-10 px-6 md:px-[8vw] max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 md:gap-8">
        
        {/* LEFT */}
        <div className="relative md:w-1/3">
          <div className="absolute -left-4 -top-8 font-instrument text-[64px] text-[#C4973A]/15 leading-none select-none pointer-events-none z-0">
            ε
          </div>
          <div className="relative z-10 flex flex-col">
            <span className="font-satisfy text-[1.8rem] text-[#F4EDE0] mb-2">Epsilonscience</span>
            <span className="font-syne-mono text-[0.7rem] text-[#F4EDE0]/40 tracking-[0.1em] uppercase">
              Xi IPA 5 · SMAN 1 Cileungsi · 2025/2026
            </span>
          </div>
        </div>

        {/* CENTER */}
        <div className="md:w-1/3 flex flex-col md:items-center">
          <div>
            <span className="block font-syne font-extrabold text-[9px] text-[#C4973A]/60 tracking-[0.2em] uppercase mb-4">
              Navigasi
            </span>
            <div className="flex flex-col space-y-1">
              {['Beranda', 'Tentang', 'Galeri', 'Siswa', 'Agenda', 'Kenangan'].map(item => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="font-syne text-[0.8rem] text-[#F4EDE0]/50 hover:text-[#C4973A] leading-[2.2] transition-colors focus-visible:outline-2 focus-visible:outline-[#C4973A]"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:w-1/3 flex flex-col md:items-end">
          <div className="flex flex-col">
            <span className="block font-syne font-extrabold text-[9px] text-[#C4973A]/60 tracking-[0.2em] uppercase mb-4 md:text-right">
              Kelas Kami
            </span>
            <div className="flex flex-col space-y-1 md:text-right">
              <span className="font-syne text-[0.8rem] text-[#F4EDE0]/50 leading-[2]">Wali Kelas: Hugi Barkah Pambudi</span>
              <span className="font-syne text-[0.8rem] text-[#F4EDE0]/50 leading-[2]">Sekolah: SMAN 1 Cileungsi</span>
              <span className="font-syne text-[0.8rem] text-[#F4EDE0]/50 leading-[2]">Tahun Ajaran: 2025/2026</span>
              <span className="font-syne text-[0.8rem] text-[#F4EDE0]/50 leading-[2]">Jumlah Siswa: 36 orang</span>
            </div>
          </div>
        </div>

      </div>

      <div className="w-full h-[1px] bg-[#F4EDE0]/5"></div>

      <div className="py-6 px-6 text-center flex flex-col space-y-1">
         <span className="font-syne text-[0.75rem] text-[#F4EDE0]/30">© 2025 Epsilonscience — All memories reserved.</span>
         <span className="font-syne text-[0.75rem] text-[#F4EDE0]/30">Dibuat dengan bangga oleh warga Xi IPA 5.</span>
      </div>

      {/* BACK TO TOP */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[1000] font-syne font-bold text-[0.75rem] text-[#C4973A]/60 hover:text-[#C4973A] transition-all duration-500 focus-visible:outline-2 focus-visible:outline-[#C4973A] ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Kembali ke atas"
      >
        Kembali ke atas ↑
      </button>

    </footer>
  );
}
