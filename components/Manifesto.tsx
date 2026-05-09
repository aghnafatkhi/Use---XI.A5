export default function Manifesto() {
  return (
    <section id="tentang" className="relative pt-[120px] pb-[120px] md:pt-[160px] md:pb-[160px] px-6 md:px-[6vw] lg:px-[8vw] bg-[var(--bg-color)] graph-paper overflow-hidden">
      
      {/* Floating ε Mark */}
      <div className="absolute -right-10 top-20 text-[#5C1414] opacity-[0.05] pointer-events-none font-instrument italic text-[300px]">
        ε
      </div>

      {/* SECTION MARKER */}
      <div className="absolute right-8 top-32 rotate-90 origin-right text-[10px] font-black tracking-[0.3em] text-[#5C14144D] dark:text-[#C4973A4D] uppercase hidden md:block">
        01 — TENTANG
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-0 relative z-10 px-0 sm:px-6 md:px-0">
        
        {/* LEFT COLUMN */}
        <div className="w-full md:w-[40%] relative space-y-4 md:space-y-6 sr-up md:pr-10">
          <p className="text-[10px] font-black tracking-[0.2em] text-[#C4973A] uppercase">TENTANG KAMI</p>
          <h2 className="font-instrument italic text-[3rem] sm:text-[3.5rem] md:text-[4.5rem] text-[#3A0A0A] dark:text-[#F4EDE0] leading-[1.1] whitespace-pre-line">
            {"Epsilonscience\nXI IPA 5"}
          </h2>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-[60%] flex flex-col space-y-12 md:space-y-16 lg:pl-[8vw]">
          
          <div className="sr-left delay-1">
            <div className="flex flex-col gap-2">
              <span className="font-syne-mono text-[10px] text-[#C4973A] tracking-widest mb-1 uppercase">Visi Kelas</span>
              <p className="font-instrument italic text-xl md:text-2xl text-[#3A0A0A] dark:text-[#F4EDE0] mb-2 leading-tight">
                Keunggulan Akademik dan Karakter.
              </p>
              <p className="font-syne text-[13px] md:text-[14px] text-[#5C141499] dark:text-[#F4EDE099] leading-relaxed max-w-md">
                Mengutamakan prestasi dan pengembangan kompetensi keilmuan secara komprehensif dengan menjunjung tinggi nilai moral dan integritas.
              </p>
            </div>
          </div>

          <div className="sr-left delay-2">
            <div className="flex flex-col gap-2">
              <span className="font-syne-mono text-[10px] text-[#C4973A] tracking-widest mb-1 uppercase">Misi Kelas</span>
              <p className="font-instrument italic text-xl md:text-2xl text-[#3A0A0A] dark:text-[#F4EDE0] mb-2 leading-tight">
                Solidaritas dan Dedikasi.
              </p>
              <p className="font-syne text-[13px] md:text-[14px] text-[#5C141499] dark:text-[#F4EDE099] leading-relaxed max-w-md">
                Membangun ikatan persaudaraan yang erat di antara 36 siswa dan senantiasa memberikan kontribusi positif untuk almamater sekolah tercinta.
              </p>
            </div>
          </div>

          <div className="sr-left delay-3">
            <div className="flex flex-col gap-2">
              <span className="font-syne-mono text-[10px] text-[#C4973A] tracking-widest mb-1 uppercase">Nilai Utama (Epsilonscience)</span>
              <p className="font-instrument italic text-xl md:text-2xl text-[#3A0A0A] dark:text-[#F4EDE0] mb-2 leading-tight">
                Dari Hal Kecil Membawa Perubahan Signifikan.
              </p>
              <p className="font-syne text-[13px] md:text-[14px] text-[#5C141499] dark:text-[#F4EDE099] leading-relaxed max-w-md">
                Berdasar pada disiplin rumpun ilmu alam, kami berpedoman bahwa setiap langkah analisis memiliki signifikansi dalam mencapai hasil komprehensif.
              </p>
            </div>
          </div>

          {/* Teacher Card */}
          <div className="border-l-2 border-[#C4973A] pl-6 py-3 bg-[#FDFAF599] dark:bg-[#1E080899] sr-up delay-4 hover:bg-[#FDFAF5] dark:hover:bg-[#1E0808] transition-colors rounded-r-md">
            <p className="font-syne-mono text-[9px] text-[#C4973A] uppercase tracking-widest mb-2">WALI KELAS</p>
            <p className="font-syne font-bold text-[#3A0A0A] dark:text-[#F4EDE0] text-lg uppercase tracking-tight">Hugi Barkah Pambudi</p>
            <p className="text-[11px] text-[#5C1414CC] dark:text-[#F4EDE0CC] opacity-60 font-syne-mono tracking-tighter italic">FISIKA • SMAN 1 CILEUNGSI</p>
          </div>

        </div>
      </div>
      
      {/* Bottom Feature Bar (Bleeds out) */}
      <div className="mt-24 md:mt-32 max-w-7xl mx-auto bg-[#5C1414] relative z-[50] flex flex-col md:flex-row items-center justify-between px-8 md:px-12 py-8 rounded-[4px] border border-[#C4973A4D] sr-up delay-2 gap-8 md:gap-0 shadow-lg">
        <div className="flex flex-row items-center gap-8 md:gap-12 w-full md:w-auto overflow-hidden">
          <div className="flex items-center gap-4 group">
            <span className="font-syne-mono text-[32px] md:text-[40px] text-[#C4973A80] transition-colors group-hover:text-[#C4973A]">36</span>
            <span className="text-[#F4EDE099] text-[10px] md:text-[11px] font-black tracking-widest uppercase max-w-[80px] leading-tight">Warga Kelas Terdaftar</span>
          </div>
          <div className="w-[1px] h-12 bg-[#F4EDE01A]"></div>
          <div className="flex items-center gap-4 group">
            <span className="font-syne-mono text-[32px] md:text-[40px] text-[#C4973A80] transition-colors group-hover:text-[#C4973A]">08</span>
            <span className="text-[#F4EDE099] text-[10px] md:text-[11px] font-black tracking-widest uppercase max-w-[80px] leading-tight">Agenda Mendatang</span>
          </div>
        </div>
        
        <div className="w-full md:w-auto md:text-right border-t border-[#F4EDE01A] md:border-t-0 pt-6 md:pt-0">
           <p className="font-instrument italic text-xl md:text-2xl text-[#F4EDE0] md:pr-4 text-center md:text-right">
            &quot;Cegah stunting untuk generasi sehat, cerdas, dan produktif.&quot;
          </p>
        </div>
      </div>

    </section>
  );
}
