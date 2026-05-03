export default function Manifesto() {
  return (
    <section id="tentang" className="relative pt-[140px] pb-[140px] px-6 md:px-[8vw] bg-[var(--bg-color)] graph-paper overflow-hidden">
      
      {/* Floating ε Mark */}
      <div className="absolute -right-10 top-20 text-[#5C1414] opacity-[0.05] pointer-events-none font-instrument italic text-[300px]">
        ε
      </div>

      {/* SECTION MARKER */}
      <div className="absolute right-8 top-32 rotate-90 origin-right text-[10px] font-black tracking-[0.3em] text-[#5C14144D] dark:text-[#C4973A4D] uppercase">
        01 — TENTANG
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-0 relative z-10">
        
        {/* LEFT COLUMN */}
        <div className="w-full md:w-[40%] relative space-y-4 sr-up">
          <p className="text-[10px] font-black tracking-[0.2em] text-[#C4973A] uppercase">SIAPA KAMI</p>
          <h2 className="font-instrument italic text-[4rem] md:text-[5rem] text-[#3A0A0A] dark:text-[#F4EDE0] leading-tight whitespace-pre-line">
            {"Perubahan kecil,\ndampak besar."}
          </h2>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-[60%] flex flex-col space-y-12 md:pl-[8vw] pr-10">
          
          <div className="sr-left delay-1">
            <div className="flex flex-col gap-1 mb-4">
              <span className="font-syne-mono text-[10px] text-[#C4973A] tracking-widest mb-1">01 / 03</span>
              <p className="font-instrument italic text-lg text-[#3A0A0A] dark:text-[#F4EDE0] mb-1">
                Epsilon — simbol perubahan terkecil dalam matematika.
              </p>
              <p className="font-syne text-[12px] text-[#5C141480] dark:text-[#F4EDE080] leading-relaxed max-w-sm">
                Kami percaya bahwa langkah kecil setiap hari membawa perubahan yang luar biasa besar.
              </p>
            </div>
          </div>

          <div className="sr-left delay-2">
            <div className="flex flex-col gap-1 mb-4">
              <span className="font-syne-mono text-[10px] text-[#C4973A] tracking-widest mb-1">02 / 03</span>
              <p className="font-instrument italic text-lg text-[#3A0A0A] dark:text-[#F4EDE0] mb-1">
                Science — bukan hanya mata pelajaran, tapi cara pandang.
              </p>
              <p className="font-syne text-[12px] text-[#5C141480] dark:text-[#F4EDE080] leading-relaxed max-w-sm">
                Di sini, kami belajar bertanya dengan benar sebelum mencari jawaban.
              </p>
            </div>
          </div>

          <div className="sr-left delay-3">
            <div className="flex flex-col gap-1 mb-4">
              <span className="font-syne-mono text-[10px] text-[#C4973A] tracking-widest mb-1">03 / 03</span>
              <p className="font-instrument italic text-lg text-[#3A0A0A] dark:text-[#F4EDE0] mb-1">
                36 siswa. Satu kelas. Ribuan cerita yang belum selesai ditulis.
              </p>
              <p className="font-syne text-[12px] text-[#5C141480] dark:text-[#F4EDE080] leading-relaxed max-w-sm">
                Tahun ajaran 2025/2026 adalah milik kami.
              </p>
            </div>
          </div>

          {/* Teacher Card */}
          <div className="border-l-2 border-[#C4973A] pl-6 py-2 bg-[#FDFAF599] dark:bg-[#1E080899] sr-up delay-4">
            <p className="font-syne-mono text-[9px] text-[#C4973A] uppercase tracking-widest mb-2">WALI KELAS</p>
            <p className="font-syne font-bold text-[#3A0A0A] dark:text-[#F4EDE0] text-lg uppercase tracking-tight">Hugi Barkah Pambudi</p>
            <p className="text-[11px] text-[#5C1414CC] dark:text-[#F4EDE0CC] opacity-60 font-syne-mono tracking-tighter italic">FISIKA • SMAN 1 CILEUNGSI</p>
          </div>

        </div>
      </div>
      
      {/* Bottom Feature Bar (Bleeds out) */}
      <div className="mt-24 h-auto md:h-24 -mx-6 md:-mx-[8vw] bg-[#5C1414] relative z-[50] flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-6 md:py-0 border-t border-[#C4973A4D] sr-up delay-2 gap-6 md:gap-0">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="flex items-center gap-4">
            <span className="font-syne-mono text-[28px] text-[#C4973A66]">36</span>
            <span className="text-[#F4EDE099] text-[10px] font-black tracking-widest uppercase max-w-[60px] leading-tight">Warga Kelas Terdaftar</span>
          </div>
          <div className="w-full md:w-[1px] h-[1px] md:h-10 bg-[#F4EDE01A]"></div>
          <div className="flex items-center gap-4">
            <span className="font-syne-mono text-[28px] text-[#C4973A66]">08</span>
            <span className="text-[#F4EDE099] text-[10px] font-black tracking-widest uppercase max-w-[60px] leading-tight">Agenda Mendatang</span>
          </div>
        </div>
        
        <div className="md:flex-1 md:text-right">
           <p className="font-instrument italic text-lg text-[#F4EDE0] md:pr-6 text-center md:text-right">
            "Cegah stunting untuk generasi sehat, cerdas, dan produktif."
          </p>
        </div>
      </div>

    </section>
  );
}
