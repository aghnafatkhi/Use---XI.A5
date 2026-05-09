export default function Struktur() {
  return (
    <section id="organisasi" className="relative pt-[120px] pb-[120px] md:pt-[160px] md:pb-[160px] px-6 md:px-[6vw] lg:px-[8vw] bg-[#3A0A0A] overflow-hidden">
      
      {/* HEADER */}
      <div className="mb-20 text-center sr-up">
        <span className="block font-syne font-extrabold text-[9px] text-[#F4EDE0]/30 tracking-[0.25em] uppercase mb-4">
          05 — Susunan Organisasi
        </span>
        <h2 className="font-instrument italic text-[3rem] md:text-[3.5rem] text-[#F4EDE0] leading-[1.1] mb-6 whitespace-pre-line">
          {"Struktur Kepengurusan\nKelas XI IPA 5."}
        </h2>
        <p className="font-syne text-[0.9rem] md:text-[1rem] text-[#F4EDE0]/50 max-w-md mx-auto">
          Susunan fungsional yang mendukung keberlangsungan operasional kelas sepanjang periode akademis.
        </p>
      </div>

      {/* ORG CHART container */}
      <div className="max-w-[800px] mx-auto relative flex flex-col items-center">
        
        {/* Helper component for Nodes */}
        <Node label="Wali Kelas" name="Hugi Barkah Pambudi" sub="SMAN 1 Cileungsi" />

        {/* Vertical line down */}
        <div className="w-[1px] h-[40px] md:h-[50px] bg-[#C4973A]/30 sr-fade"></div>

        <Node label="Ketua Kelas" name="Abyan Dzaky Pratama" />

        {/* Vertical line down */}
        <div className="w-[1px] h-[40px] md:h-[50px] bg-[#C4973A]/30 sr-fade delay-1"></div>

        <Node label="Wakil Ketua" name="Adinda Putri Rahayu" />

        {/* Split line */}
        <div className="w-[1px] h-[30px] md:h-[40px] bg-[#C4973A]/30 sr-fade delay-2"></div>
         
        {/* Horizontal connect container */}
        <div className="w-[85%] md:w-[90%] border-t border-[#C4973A]/30 flex justify-between relative h-[30px] md:h-[40px] sr-fade delay-2">
          {/* 4 connecting vertical lines */}
          <div className="absolute left-[12.5%] top-0 w-[1px] h-[30px] md:h-[40px] bg-[#C4973A]/30"></div>
          <div className="absolute left-[37.5%] top-0 w-[1px] h-[30px] md:h-[40px] bg-[#C4973A]/30"></div>
          <div className="absolute left-[62.5%] top-0 w-[1px] h-[30px] md:h-[40px] bg-[#C4973A]/30"></div>
          <div className="absolute left-[87.5%] top-0 w-[1px] h-[30px] md:h-[40px] bg-[#C4973A]/30"></div>
        </div>

        {/* Level 3 nodes */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-2">
          <SmallNode label="Sekretaris 1" name="Aghna Nur Fadhilah" />
          <SmallNode label="Sekretaris 2" name="Annisa Farah Diba" />
          <SmallNode label="Bendahara 1" name="Aisha Nuraini" />
          <SmallNode label="Bendahara 2" name="Dea Amelia Putri" />
        </div>

      </div>
    </section>
  );
}

function Node({label, name, sub}: {label:string, name:string, sub?:string}) {
  return (
    <div className="bg-[#C4973A]/10 border border-[#C4973A]/30 border-t-2 border-t-[#C4973A] rounded-[4px] p-5 md:p-6 min-w-[220px] text-center z-10 sr-up w-[85%] sm:w-auto shadow-lg hover:bg-[#C4973A]/20 transition-colors">
      <span className="block font-syne-mono text-[0.65rem] md:text-[0.7rem] text-[#C4973A] uppercase tracking-widest mb-1.5">{label}</span>
      <h3 className="font-syne font-bold text-[1rem] md:text-[1.1rem] text-[#F4EDE0]">{name}</h3>
      {sub && <span className="block font-syne text-[0.75rem] text-[#F4EDE0]/60 mt-1">{sub}</span>}
    </div>
  )
}

function SmallNode({label, name}: {label:string, name:string}) {
  return (
    <div className="bg-[#C4973A]/5 border border-[#C4973A]/20 border-t-2 border-t-[#C4973A]/60 rounded-[4px] p-4 md:p-5 text-center z-10 sr-up delay-3 hover:bg-[#C4973A]/10 transition-colors">
      <span className="block font-syne-mono text-[0.6rem] md:text-[0.65rem] text-[#C4973A]/80 uppercase tracking-widest mb-1">{label}</span>
      <h3 className="font-syne font-bold text-[0.8rem] md:text-[0.9rem] text-[#F4EDE0] leading-tight">{name}</h3>
    </div>
  )
}
