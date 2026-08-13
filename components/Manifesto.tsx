export default function Manifesto() {
  return (
    <section id="tentang" className="relative pt-[60px] pb-[60px] md:pt-[80px] md:pb-[80px] px-6 md:px-[6vw] lg:px-[8vw] bg-[var(--bg-color)] graph-paper overflow-hidden">
      
      {/* Floating ε Mark */}
      <div className="absolute -right-10 top-20 text-maroon opacity-[0.05] pointer-events-none font-instrument italic text-[300px]">
        ε
      </div>

      {/* SECTION MARKER */}
      <div className="absolute right-8 top-32 rotate-90 origin-right text-[10px] font-black tracking-[0.3em] text-maroon/30 uppercase hidden md:block">
        01 — TENTANG
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-0 relative z-10 px-0 sm:px-6 md:px-0">
        
        {/* LEFT COLUMN */}
        <div className="w-full md:w-[40%] relative space-y-4 md:space-y-6 sr-up md:pr-10">
          <h2 className="font-instrument italic text-[3rem] sm:text-[3.5rem] md:text-[4.5rem] text-dark-maroon leading-[1.1] whitespace-pre-line">
            {"Epsilonscience\nXII.A5"}
          </h2>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-[60%] flex flex-col space-y-12 md:space-y-16 lg:pl-[8vw]">
          
          <div className="sr-left delay-1">
            <div className="flex flex-col gap-2">
              <span className="font-syne-mono text-[10px] text-gold tracking-widest mb-1 uppercase">Visi Kelas</span>
              <p className="font-instrument italic text-xl md:text-2xl text-dark-maroon mb-2 leading-tight">
                Keunggulan Akademik dan Karakter.
              </p>
              <p className="font-syne text-[13px] md:text-[14px] text-muted leading-relaxed max-w-md">
                Mengutamakan prestasi dan pengembangan kompetensi keilmuan secara komprehensif dengan menjunjung tinggi nilai moral and integritas.
              </p>
            </div>
          </div>

          <div className="sr-left delay-2">
            <div className="flex flex-col gap-2">
              <span className="font-syne-mono text-[10px] text-gold tracking-widest mb-1 uppercase">Misi Kelas</span>
              <p className="font-instrument italic text-xl md:text-2xl text-dark-maroon mb-2 leading-tight">
                Solidaritas dan Dedikasi.
              </p>
              <p className="font-syne text-[13px] md:text-[14px] text-muted leading-relaxed max-w-md">
                Membangun ikatan persaudaraan yang erat di antara 36 siswa dan senantiasa memberikan kontribusi positif untuk almamater sekolah tercinta.
              </p>
            </div>
          </div>

          <div className="sr-left delay-3">
            <div className="flex flex-col gap-2">
              <span className="font-syne-mono text-[10px] text-gold tracking-widest mb-1 uppercase">Nilai Utama (Epsilonscience)</span>
              <p className="font-instrument italic text-xl md:text-2xl text-dark-maroon mb-2 leading-tight">
                Dari Hal Kecil Membawa Perubahan Signifikan.
              </p>
              <p className="font-syne text-[13px] md:text-[14px] text-muted leading-relaxed max-w-md">
                Berdasar pada disiplin rumpun ilmu alam, kami berpedoman bahwa setiap langkah analisis memiliki signifikansi dalam mencapai hasil komprehensif.
              </p>
            </div>
          </div>

          {/* Teacher Card */}
          <div className="border-l-2 border-gold pl-6 py-3 bg-warm-white/60 sr-up delay-4 hover:bg-warm-white transition-colors rounded-r-md">
            <p className="font-syne-mono text-[9px] text-gold uppercase tracking-widest mb-2">WALI KELAS</p>
            <p className="font-syne font-bold text-dark-maroon text-lg uppercase tracking-tight">Franti Surya</p>
            <p className="text-[11px] text-muted opacity-60 font-syne-mono tracking-tighter italic">PJOK • SMAN 1 CILEUNGSI</p>
          </div>

        </div>
      </div>
      
      {/* Bottom Feature Bar (Bleeds out) */}
      <div className="mt-12 md:mt-16 max-w-7xl mx-auto bg-maroon relative z-[50] flex flex-col md:flex-row items-center justify-between px-8 md:px-12 py-10 rounded-[4px] border border-gold/30 sr-up delay-2 gap-8 md:gap-0 shadow-lg">
        <div className="flex flex-row items-center gap-12 md:gap-16 w-full md:w-auto overflow-hidden">
          <div className="flex items-center gap-10 group">
            <span className="font-syne-mono text-[36px] md:text-[48px] text-gold transition-colors group-hover:text-cream">36</span>
            <span className="text-cream/80 text-[11px] md:text-[12px] font-black tracking-widest uppercase max-w-[160px] leading-tight">Anggota Kelas Terdaftar</span>
          </div>
        </div>
        
        <div className="w-full md:w-auto md:text-right border-t border-cream/10 md:border-t-0 pt-8 md:pt-0">
           <p className="font-instrument italic text-xl md:text-2xl text-cream md:pr-4 text-center md:text-right">
            &quot;Kelas paling mantap di Nepal&quot;
          </p>
        </div>
      </div>

    </section>
  );
}
