export default function Hero() {
  return (
    <section id="beranda" className="relative h-screen min-h-[600px] bg-[var(--bg-color)] graph-paper overflow-hidden flex flex-col md:flex-row">
      
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0 flex flex-col md:flex-row">
        <div className="w-full md:w-[62%] h-full bg-dark-maroon style-clip" style={{ clipPath: 'polygon(0 0, 100% 0, 88% 100%, 0% 100%)' }}></div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[60]">
        <div className="h-8 w-[1px] bg-gold opacity-40 mb-2 animate-[pulse_2s_infinite]"></div>
        <span className="font-syne-mono text-[8px] text-gold tracking-[0.3em] uppercase">scroll</span>
      </div>

      <div className="max-w-7xl mx-auto w-full h-full flex flex-col md:flex-row relative z-10">
        {/* Left Zone */}
        <div className="w-full md:w-[55%] h-full flex flex-col justify-center px-6 md:px-10 lg:px-12 pt-28 md:pt-16 pb-16 md:pb-0 relative text-left">
          
          {/* Decorative Dots */}
          <div className="absolute top-24 md:bottom-32 md:top-auto left-6 md:left-10 flex gap-2 sr-up delay-6 z-10 hidden md:flex">
            <div className="w-[6px] h-[6px] bg-gold rounded-full"></div>
            <div className="w-[6px] h-[6px] bg-gold/40 rounded-full"></div>
            <div className="w-[6px] h-[6px] bg-gold/20 rounded-full"></div>
          </div>

          {/* Vertical Text */}
          <div className="absolute left-4 md:left-8 bottom-16 md:bottom-20 origin-bottom-left -rotate-90 sr-fade delay-5 hidden sm:block">
            <span className="font-syne font-black text-[9px] tracking-[0.4em] text-gold/40 uppercase">
              Epsilonscience 2026
            </span>
          </div>

          <div className="pl-0 sm:pl-8 lg:pl-16">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-3 border border-gold px-3 py-1 mb-6 md:mb-8 w-fit sr-fade delay-3 z-10">
              <span className="font-instrument text-gold text-sm italic">ε</span>
              <span className="font-syne-mono text-[10px] text-cream tracking-[0.2em] uppercase">
                Epsilonscience — XII.A5
              </span>
            </div>

            {/* Main Title */}
            <h1 className="flex flex-col m-0 p-0 leading-[0.85] mb-8 md:mb-10 z-10">
              <span className="font-instrument italic text-[clamp(3.5rem,8vw,6rem)] text-white leading-none m-0 block sr-up delay-4">
                Epsilonscience
              </span>
              <span className="font-instrument italic text-[clamp(3rem,6vw,5rem)] text-gold leading-none m-0 mt-2 block sr-up delay-5">
                XII.A5
              </span>
            </h1>

            {/* Gold Line */}
            <div className="h-[1px] bg-gold w-0 mb-6 md:mb-8 transition-all duration-1000 ease-in sr-fade delay-5 visible:w-16 z-10" style={{width: '64px'}}></div>

            {/* Subtitle */}
            <p className="font-syne font-medium italic text-base text-white/60 max-w-sm leading-relaxed mb-10 md:mb-12 sr-up delay-5 z-10">
              Sebuah perjalanan dan kebersamaan XII.A5
            </p>

            {/* Links */}
            <div className="flex flex-col items-start gap-4 md:gap-5 sr-fade delay-5 z-10">
              <a href="#galeri" className="group flex items-center gap-3 font-syne font-black text-gold uppercase tracking-widest text-xs md:text-sm transition-all focus-visible:outline-2 focus-visible:outline-gold p-2 -ml-2 rounded-md hover:bg-gold/10">
                Galeri
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a href="#siswa" className="group flex items-center gap-3 font-syne font-black text-white uppercase tracking-widest text-xs md:text-sm transition-all focus-visible:outline-2 focus-visible:outline-gold p-2 -ml-2 rounded-md hover:bg-white/10">
                Anggota Kelas
                <span className="text-lg text-gold transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Content Zone (Right) */}
        <div className="w-full md:w-[45%] hidden md:flex flex-col justify-center px-6 md:px-12 py-20 relative overflow-hidden z-0">
          
          {/* SVG Watermark */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none z-0">
            <svg width="320" height="320" viewBox="0 0 100 100" fill="none" stroke="#FFD700" strokeWidth="1.5">
              <path d="M50 20 C 50 10, 80 10, 80 30 C 80 55, 50 70, 50 90 C 50 70, 20 55, 20 30 C 20 10, 50 10, 50 20" />
              <circle cx="50" cy="20" r="5" />
            </svg>
          </div>

          {/* Info Card - Artistic Flair Style */}
          <div className="absolute bottom-[100px] right-10 w-48 h-64 bg-warm-white border border-gold/30 rotate-[3deg] p-3 flex flex-col shadow-xl z-20 hover:rotate-0 transition-transform duration-500 hover:shadow-2xl">
            <div className="h-2/3 bg-maroon relative flex items-center justify-center overflow-hidden rounded-[2px]">
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #EEF2FF 0px, #EEF2FF 1px, transparent 1px, transparent 10px)' }}></div>
               <span className="font-instrument italic text-4xl text-white relative z-10 transition-transform duration-500 hover:scale-110">FS</span>
            </div>
            <div className="pt-4 text-center">
               <p className="font-syne font-black text-[10px] text-dark-maroon uppercase tracking-wider mb-1">Franti Surya</p>
               <p className="font-syne-mono text-[8px] text-gold uppercase">Wali Kelas • SMAN 1 Cileungsi</p>
            </div>
            <div className="absolute top-5 left-5 flex gap-1">
              <div className="w-1.5 h-1.5 bg-gold rounded-full shadow-sm"></div>
              <div className="w-1.5 h-1.5 bg-gold rounded-full opacity-30 shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
