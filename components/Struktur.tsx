export default function Struktur() {
  return (
    <section id="organisasi" className="relative pt-[120px] pb-[120px] px-6 md:px-[8vw] bg-[#3A0A0A] overflow-hidden">
      
      {/* HEADER */}
      <div className="mb-20 text-center sr-up">
        <span className="block font-syne font-extrabold text-[9px] text-[#F4EDE0]/30 tracking-[0.25em] uppercase mb-4">
          04 — Struktur
        </span>
        <h2 className="font-instrument italic text-[2.5rem] text-[#F4EDE0] leading-tight mb-4 whitespace-pre-line">
          {"Yang Menggerakkan\nEpsilonscience."}
        </h2>
        <p className="font-syne text-[0.9rem] text-[#F4EDE0]/50 max-w-md mx-auto">
          Dari Pak Hugi sampai ke setiap jabatan — semua punya peran.
        </p>
      </div>

      {/* ORG CHART container */}
      <div className="max-w-[800px] mx-auto relative flex flex-col items-center">
        
        {/* Helper component for Nodes */}
        <Node label="Wali Kelas" name="Hugi Barkah Pambudi" sub="SMAN 1 Cileungsi" />

        {/* Vertical line down */}
        <div className="w-[1px] h-[40px] bg-[#C4973A]/30 sr-fade"></div>

        <Node label="Ketua Kelas" name="Abyan Dzaky Pratama" />

        {/* Vertical line down */}
        <div className="w-[1px] h-[40px] bg-[#C4973A]/30 sr-fade delay-1"></div>

        <Node label="Wakil Ketua" name="Adinda Putri Rahayu" />

        {/* Split line */}
        <div className="w-[1px] h-[30px] bg-[#C4973A]/30 sr-fade delay-2"></div>
         
        {/* Horizontal connect container */}
        <div className="w-[85%] md:w-[90%] border-t border-[#C4973A]/30 flex justify-between relative h-[30px] sr-fade delay-2">
          {/* 4 connecting vertical lines */}
          <div className="absolute left-[12.5%] top-0 w-[1px] h-[30px] bg-[#C4973A]/30"></div>
          <div className="absolute left-[37.5%] top-0 w-[1px] h-[30px] bg-[#C4973A]/30"></div>
          <div className="absolute left-[62.5%] top-0 w-[1px] h-[30px] bg-[#C4973A]/30"></div>
          <div className="absolute left-[87.5%] top-0 w-[1px] h-[30px] bg-[#C4973A]/30"></div>
        </div>

        {/* Level 3 nodes */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
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
    <div className="bg-[#C4973A]/10 border border-[#C4973A]/30 border-t-2 border-t-[#C4973A] rounded-[8px] p-5 min-w-[200px] text-center z-10 sr-up">
      <span className="block font-syne-mono text-[0.65rem] text-[#C4973A] uppercase tracking-widest mb-1">{label}</span>
      <h3 className="font-syne font-bold font-[0.95rem] text-[#F4EDE0]">{name}</h3>
      {sub && <span className="block font-syne text-[0.75rem] text-[#F4EDE0]/50 mt-1">{sub}</span>}
    </div>
  )
}

function SmallNode({label, name}: {label:string, name:string}) {
  return (
    <div className="bg-[#C4973A]/5 border border-[#C4973A]/20 border-t-2 border-t-[#C4973A]/60 rounded-[6px] p-4 text-center z-10 sr-up delay-3">
      <span className="block font-syne-mono text-[0.6rem] text-[#C4973A]/80 uppercase tracking-widest mb-1">{label}</span>
      <h3 className="font-syne font-bold text-[0.8rem] text-[#F4EDE0]">{name}</h3>
    </div>
  )
}
