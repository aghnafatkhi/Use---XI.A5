export default function Hero() {
  return (
    <section id="beranda" className="relative h-screen min-h-[600px] bg-[var(--bg-color)] graph-paper overflow-hidden flex flex-col md:flex-row">
      
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0 flex flex-col md:flex-row">
        <div className="w-full md:w-[62%] h-full bg-[#3A0A0A] style-clip" style={{ clipPath: 'polygon(0 0, 100% 0, 88% 100%, 0% 100%)' }}></div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[60]">
        <div className="h-8 w-[1px] bg-[#C4973A] opacity-40 mb-2 animate-[pulse_2s_infinite]"></div>
        <span className="font-syne-mono text-[8px] text-[#C4973A] tracking-[0.3em] uppercase">scroll</span>
      </div>

      <div className="max-w-7xl mx-auto w-full h-full flex flex-col md:flex-row relative z-10">
        {/* Left Zone */}
        <div className="w-full md:w-[55%] h-full flex flex-col justify-center px-6 md:px-10 lg:px-12 pt-28 md:pt-16 pb-16 md:pb-0 relative text-left">
          
          {/* Decorative Dots */}
          <div className="absolute top-24 md:bottom-32 md:top-auto left-6 md:left-10 flex gap-2 sr-up delay-6 z-10 hidden md:flex">
            <div className="w-[6px] h-[6px] bg-[#C4973A] rounded-full"></div>
            <div className="w-[6px] h-[6px] bg-[#C4973A66] rounded-full"></div>
            <div className="w-[6px] h-[6px] bg-[#C4973A33] rounded-full"></div>
          </div>

          {/* Vertical Text */}
          <div className="absolute left-4 md:left-8 bottom-16 md:bottom-20 origin-bottom-left -rotate-90 sr-fade delay-5 hidden sm:block">
            <span className="font-syne font-black text-[9px] tracking-[0.4em] text-[#C4973A66] uppercase">
              Epsilonscience 2025
            </span>
          </div>

          <div className="pl-0 sm:pl-8 lg:pl-16">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-3 border border-[#C4973A] px-3 py-1 mb-6 md:mb-8 w-fit sr-fade delay-3 z-10">
              <span className="font-instrument text-[#C4973A] text-sm italic">ε</span>
              <span className="font-syne-mono text-[10px] text-[#F4EDE0] tracking-[0.2em] uppercase">
                Epsilonscience — XI IPA 5
              </span>
            </div>

            {/* Main Title */}
            <h1 className="flex flex-col m-0 p-0 leading-[0.85] mb-8 md:mb-10 z-10">
              <span className="font-instrument italic text-[clamp(3.5rem,8vw,6rem)] text-[#F4EDE0] leading-none m-0 block sr-up delay-4">
                XI IPA 5
              </span>
              <span className="font-instrument italic text-[clamp(3rem,6vw,5rem)] text-[#C4973A] leading-none m-0 mt-2 block sr-up delay-5">
                Angkatan 2025.
              </span>
            </h1>

            {/* Gold Line */}
            <div className="h-[1px] bg-[#C4973A] w-0 mb-6 md:mb-8 transition-all duration-1000 ease-in sr-fade delay-5 visible:w-16 z-10" style={{width: '64px'}}></div>

            {/* Subtitle */}
            <p className="font-syne font-medium italic text-base text-[#F4EDE099] max-w-sm leading-relaxed mb-10 md:mb-12 sr-up delay-5 z-10">
              Sebuah dokumentasi perjalanan akademik dan kebersamaan siswa-siswi kelas XI IPA 5 SMAN 1 Cileungsi.
            </p>

            {/* Links */}
            <div className="flex flex-col items-start gap-4 md:gap-5 sr-fade delay-5 z-10">
              <a href="#galeri" className="group flex items-center gap-3 font-syne font-black text-[#C4973A] uppercase tracking-widest text-xs md:text-sm transition-all focus-visible:outline-2 focus-visible:outline-[#C4973A] p-2 -ml-2 rounded-md hover:bg-[#C4973A1A]">
                Galeri
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a href="#siswa" className="group flex items-center gap-3 font-syne font-black text-[#F4EDE0] uppercase tracking-widest text-xs md:text-sm transition-all focus-visible:outline-2 focus-visible:outline-[#C4973A] p-2 -ml-2 rounded-md hover:bg-[#F4EDE01A]">
                Anggota Kelas
                <span className="text-lg text-[#C4973A] transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Content Zone (Right) */}
        <div className="w-full md:w-[45%] hidden md:flex flex-col justify-center px-6 md:px-12 py-20 relative overflow-hidden z-0">
          
          {/* SVG Watermark */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none z-0">
            <svg width="320" height="320" viewBox="0 0 100 100" fill="none" stroke="#C4973A" strokeWidth="1.5">
              <path d="M50 20 C 50 10, 80 10, 80 30 C 80 55, 50 70, 50 90 C 50 70, 20 55, 20 30 C 20 10, 50 10, 50 20" />
              <circle cx="50" cy="20" r="5" />
            </svg>
          </div>

          {/* Info Card - Artistic Flair Style */}
          <div className="absolute bottom-[100px] right-10 w-48 h-64 bg-[#FDFAF5] dark:bg-[#1E0808] border border-[#C4973A4D] rotate-[3deg] p-3 flex flex-col shadow-xl z-20 hover:rotate-0 transition-transform duration-500 hover:shadow-2xl">
            <div className="h-2/3 bg-[#5C1414] relative flex items-center justify-center overflow-hidden rounded-[2px]">
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #F4EDE0 0px, #F4EDE0 1px, transparent 1px, transparent 10px)' }}></div>
               <span className="font-instrument italic text-4xl text-[#F4EDE0] relative z-10 transition-transform duration-500 hover:scale-110">HBP</span>
            </div>
            <div className="pt-4 text-center">
              <p className="font-syne font-black text-[10px] text-[#3A0A0A] dark:text-[#F4EDE0] uppercase tracking-wider mb-1">Hugi Barkah P.</p>
              <p className="font-syne-mono text-[8px] text-[#C4973A] uppercase">Wali Kelas • SMAN 1 Cileungsi</p>
            </div>
            <div className="absolute top-5 left-5 flex gap-1">
              <div className="w-1.5 h-1.5 bg-[#C4973A] rounded-full shadow-sm"></div>
              <div className="w-1.5 h-1.5 bg-[#C4973A] rounded-full opacity-30 shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
