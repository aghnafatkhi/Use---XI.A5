export default function Manifesto() {
  return (
    <section 
      id="tentang" 
      className="relative pt-12 pb-12 md:pt-20 md:pb-20 px-6 md:px-[8vw] bg-[var(--bg-color)] graph-paper overflow-hidden w-full"
    >
      
      {/* Colossal watermark behind the entire section with mobile overflow protection - hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
        <div className="absolute -left-12 top-10 text-maroon/5 font-instrument italic text-[clamp(16rem,25vw,36rem)] select-none">
          01
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-8 relative z-10">
        
        {/* LEFT COLUMN: Editorial Header */}
        <div className="w-full lg:w-[38%] relative flex flex-col justify-start lg:pr-10">
          
          {/* Handcrafted marker stamp */}
          <div className="flex items-center gap-3 mb-8">
            <span className="font-syne-mono text-[9px] text-gold tracking-[0.35em] uppercase font-bold">
              ESTABLISHED IN 2023
            </span>
            <div className="h-[1px] bg-gold/30 flex-grow max-w-[100px]"></div>
          </div>

          <h2 className="font-syne font-black text-4xl md:text-5xl lg:text-6xl text-dark-maroon leading-[0.9] uppercase tracking-tighter m-0 p-0">
            OUR <br />
            <span className="font-instrument italic font-light text-gold text-3xl md:text-4xl lg:text-5xl lowercase tracking-normal block mt-2">
              manifesto.
            </span>
          </h2>

          {/* Handcrafted line with small cross */}
          <div className="relative w-full h-[1px] bg-gradient-to-r from-gold/40 to-transparent mt-8 mb-6">
            <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[1px] h-3 bg-gold/40"></div>
            <div className="absolute top-1/2 left-10 -translate-y-1/2 w-3 h-[1px] bg-gold/40"></div>
          </div>

          <p className="font-syne font-medium text-xs text-muted/80 tracking-wide uppercase leading-relaxed max-w-sm">
            Epsilonscience bukan sekadar deret nama di buku absen. Kami adalah kolaborasi ide, rasa, dan mimpi yang diikat erat dalam sebuah harmoni keluarga.
          </p>

          <div className="mt-10 hidden lg:block">
            {/* Aesthetic stamp box */}
            <div className="border border-dashed border-gold/20 p-5 rounded-[1px] w-52 bg-white/40">
              <span className="font-syne-mono text-[7px] text-gold/80 tracking-widest block uppercase mb-1 font-bold">
                CLASS ID REGISTER
              </span>
              <span className="font-syne font-black text-xl text-dark-maroon block">
                XII.A5 / 2026
              </span>
              <span className="font-syne-mono text-[6px] text-muted tracking-wider block mt-2 uppercase">
                SMAN 1 CILEUNGSI
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Asymmetrical Editorial Cards Grid */}
        <div className="w-full lg:w-[62%] flex flex-col space-y-12 lg:space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            
            {/* Decorative hand-drawn line connecting items (only on large screens) */}
            <div className="absolute left-[50%] top-6 bottom-6 w-[1.5px] bg-gradient-to-b from-transparent via-gold/15 to-transparent hidden md:block pointer-events-none"></div>

            {/* CARD 1: VISI */}
            <div className="flex flex-col gap-3 group relative md:-translate-y-4">
              <div className="absolute top-0 left-0 w-8 h-[1px] bg-gold/40"></div>
              <span className="font-syne-mono text-[8px] text-gold tracking-[0.25em] uppercase font-bold pl-0.5 pt-2">
                01 / THE VISION
              </span>
              <p className="font-instrument italic text-xl md:text-2xl text-dark-maroon leading-tight mt-1">
                Keunggulan Akademik & Karakter.
              </p>
              <p className="font-syne text-[13px] text-muted leading-relaxed max-w-md mt-1">
                Mengutamakan prestasi dan pengembangan kompetensi keilmuan secara komprehensif dengan menjunjung tinggi nilai moral, integritas, dan keluhuran budi pekerti.
              </p>
            </div>

            {/* CARD 2: MISI */}
            <div className="flex flex-col gap-3 group relative md:translate-y-8 md:pl-6">
              <div className="absolute top-0 left-0 md:left-6 w-8 h-[1px] bg-gold/40"></div>
              <span className="font-syne-mono text-[8px] text-gold tracking-[0.25em] uppercase font-bold pl-0.5 pt-2">
                02 / THE MISSION
              </span>
              <p className="font-instrument italic text-xl md:text-2xl text-dark-maroon leading-tight mt-1">
                Solidaritas & Dedikasi Tanpa Batas.
              </p>
              <p className="font-syne text-[13px] text-muted leading-relaxed max-w-md mt-1">
                Membangun ikatan persaudaraan yang erat di antara 36 siswa dan senantiasa memberikan kontribusi positif untuk almamater sekolah tercinta.
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 md:pt-10">
            
            {/* CARD 3: CORE VALUES */}
            <div className="flex flex-col gap-3 md:col-span-7 relative">
              <div className="absolute top-0 left-0 w-8 h-[1px] bg-gold/40"></div>
              <span className="font-syne-mono text-[8px] text-gold tracking-[0.25em] uppercase font-bold pl-0.5 pt-2">
                03 / THE VALUE
              </span>
              <p className="font-instrument italic text-xl md:text-2xl text-dark-maroon leading-tight mt-1">
                Dari Hal Kecil Membawa Perubahan Signifikan.
              </p>
              <p className="font-syne text-[13px] text-muted leading-relaxed max-w-md mt-1">
                Berdasar pada disiplin rumpun ilmu alam, kami berpedoman bahwa setiap langkah analisis memiliki signifikansi dalam mencapai hasil komprehensif.
              </p>
            </div>

            {/* CARD 4: WALI KELAS - Styled as a handmade paper note offset */}
            <div className="md:col-span-5 bg-white border border-gold/15 p-6 shadow-[6px_10px_25px_rgba(0,0,0,0.03)] rounded-[1px] transform md:rotate-[1.5deg] rotate-0 hover:rotate-0 transition-transform duration-500 relative flex flex-col justify-between mt-4 md:mt-0">
              
              {/* Paper strip tape detail */}
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-16 h-5 bg-gold/15 backdrop-blur-sm border border-gold/10 rounded-[1px]"></div>

              <div>
                <span className="font-syne-mono text-[7px] text-gold tracking-[0.2em] uppercase font-bold block mb-1">
                  HOMEROOM CHIEF
                </span>
                <p className="font-syne font-black text-base text-dark-maroon uppercase tracking-tight">
                  Franti Surya
                </p>
                <p className="text-[10px] text-muted opacity-60 font-syne-mono tracking-tighter italic mt-1">
                  Bahasa Indonesia • SMAN 1 CILEUNGSI
                </p>
              </div>

              {/* Handcrafted coordinate detail */}
              <div className="border-t border-gold/10 mt-6 pt-3 flex justify-between items-center">
                <span className="font-syne-mono text-[6px] text-gold/80 tracking-widest uppercase">
                  LEADER IN CHARGE
                </span>
                <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
              </div>
            </div>

          </div>

        </div>
      </div>
      
      {/* Bottom Feature Bar: Designed as an asymmetric magazine ribbon */}
      <div className="mt-20 md:mt-28 max-w-7xl mx-auto bg-dark-maroon relative z-20 flex flex-col lg:flex-row items-stretch justify-between rounded-[1px] border border-gold/20 overflow-hidden shadow-2xl">
        
        {/* Left Side: Stats with retro blueprint look */}
        <div className="flex flex-col sm:flex-row items-center divide-y sm:divide-y-0 sm:divide-x divide-gold/15 bg-black/20 lg:w-[45%]">
          <div className="flex items-center gap-6 px-8 py-8 w-full justify-center sm:justify-start">
            <span className="font-syne font-black text-5xl text-gold select-none tracking-tighter">
              36
            </span>
            <div className="flex flex-col">
              <span className="text-cream font-syne text-[10px] font-black tracking-widest uppercase leading-tight">
                STUDENTS REGISTERED
              </span>
              <span className="font-syne-mono text-[7px] text-gold/60 uppercase tracking-widest mt-1">
                36 ANGGOTA KELAS AKTIF
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Quote styled as a hand-drawn excerpt */}
        <div className="flex items-center justify-center lg:justify-end px-8 py-6 lg:py-0 lg:w-[55%] relative overflow-hidden">
          {/* Faint gold graphic inside bar */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-gold/5 skew-x-12"></div>
          
          <p className="font-instrument italic text-lg md:text-xl text-cream/90 text-center lg:text-right font-light leading-relaxed max-w-md">
            &ldquo;Kelas paling mantap di Nepal&rdquo;
          </p>
        </div>

      </div>

    </section>
  );
}
