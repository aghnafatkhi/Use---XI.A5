export default function Struktur() {
  return (
    <section id="organisasi" className="relative pt-[60px] pb-[60px] md:pt-[80px] md:pb-[80px] px-6 md:px-[6vw] lg:px-[8vw] bg-dark-maroon overflow-hidden">
      
      {/* HEADER */}
      <div className="mb-10 text-center sr-up">
        <span className="block font-syne font-extrabold text-[9px] text-cream/30 tracking-[0.25em] uppercase mb-4">
          05 — Susunan Organisasi
        </span>
        <h2 className="font-instrument italic text-[3rem] md:text-[3.5rem] text-cream leading-[1.1] mb-6 whitespace-pre-line">
          {"Struktur Kepengurusan\nKelas XII.A5."}
        </h2>
      </div>

      {/* ORG CHART container */}
      <div className="max-w-[800px] mx-auto relative flex flex-col items-center">
        
        {/* Helper component for Nodes */}
        <Node label="Wali Kelas" name="Franti Surya" sub="SMAN 1 Cileungsi" />

        {/* Vertical line down */}
        <div className="w-[1px] h-[40px] md:h-[50px] bg-gold/30 sr-fade"></div>

        <Node label="Ketua Kelas" name="Alisha Putri Vallena Haris" />

        {/* Vertical line down */}
        <div className="w-[1px] h-[40px] md:h-[50px] bg-gold/30 sr-fade delay-1"></div>

        <Node label="Wakil Ketua" name="Octaviana Sintya Mardiyanti" />

        {/* Split line */}
        <div className="hidden sm:block w-[1px] h-[30px] md:h-[40px] bg-gold/30 sr-fade delay-2"></div>
         
        {/* Horizontal connect container */}
        <div className="hidden sm:flex w-[85%] md:w-[90%] border-t border-gold/30 justify-between relative h-[30px] md:h-[40px] sr-fade delay-2">
          {/* 4 connecting vertical lines */}
          <div className="absolute left-[12.5%] top-0 w-[1px] h-[30px] md:h-[40px] bg-gold/30"></div>
          <div className="absolute left-[37.5%] top-0 w-[1px] h-[30px] md:h-[40px] bg-gold/30"></div>
          <div className="absolute left-[62.5%] top-0 w-[1px] h-[30px] md:h-[40px] bg-gold/30"></div>
          <div className="absolute left-[87.5%] top-0 w-[1px] h-[30px] md:h-[40px] bg-gold/30"></div>
        </div>

        {/* Level 3 & 4 Container wrapper */}
        <div className="w-full relative">
          {/* Center vertical line passing through Level 3 to connect Level 4 */}
          <div className="hidden sm:block absolute left-1/2 top-[-30px] md:top-[-40px] w-[1px] h-[calc(100%+60px)] md:h-[calc(100%+80px)] bg-gold/30 -translate-x-1/2 -z-10"></div>

          {/* Level 3 nodes */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-2">
            <SmallNode label="Sekretaris 1" name="Diandra Pravita Nurani" />
            <SmallNode label="Sekretaris 2" name="Zahratusita Sumitra" />
            <SmallNode label="Bendahara 1" name="Novailla Salwa Khoirunisa" />
            <SmallNode label="Bendahara 2" name="Salma Tazkiyyatul Aqwal" />
          </div>

          <div className="w-[1px] h-[20px] sm:h-[30px] md:h-[40px]"></div>

          {/* Horizontal connect container Level 4 */}
          <div className="hidden sm:flex w-[80%] md:w-[85%] mx-auto border-t border-gold/30 justify-between relative h-[30px] md:h-[40px] sr-fade delay-3">
            <div className="absolute left-[16.6%] top-0 w-[1px] h-[30px] md:h-[40px] bg-gold/30"></div>
            <div className="absolute left-[50%] top-0 w-[1px] h-[30px] md:h-[40px] bg-gold/30"></div>
            <div className="absolute left-[83.3%] top-0 w-[1px] h-[30px] md:h-[40px] bg-gold/30"></div>
          </div>

          {/* Level 4 nodes */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 px-2">
            <SmallNode label="Seksi Pendidikan" name={["Axelizar Achmad", "Ghina Ayundia Fairuz"]} />
            <SmallNode label="Seksi Upacara / Keamanan" name={["Asyifa Khoerunnisa", "Raffiendra Ghazan Ari Nugroho"]} />
            <SmallNode label="Seksi Kebersihan" name={["Christian Jhosua Halomoan Hutabarat", "Maura Esther Tiara Hartana"]} />
            <SmallNode label="Seksi Kerohanian" name={["Rasendriya Bhamakerti", "Nafisha Putri Radisty"]} />
            <SmallNode label="Seksi Olahraga / Kesehatan" name={["Dimas Alfarizky", "Adam Mudzaki"]} />
            <SmallNode label="Seksi Peralatan" name={["Muhammad Vicky Wiraputra", "Hanzhalah Abdurrahman Al Fayyad"]} />
          </div>
        </div>

      </div>
    </section>
  );
}

function Node({label, name, sub}: {label:string, name:string, sub?:string}) {
  return (
    <div className="bg-gold/10 border border-gold/30 border-t-2 border-t-gold rounded-[4px] p-5 md:p-6 min-w-[220px] text-center z-10 sr-up w-[85%] sm:w-auto shadow-lg hover:bg-gold/20 transition-colors">
      <span className="block font-syne-mono text-[0.65rem] md:text-[0.7rem] text-gold uppercase tracking-widest mb-1.5">{label}</span>
      <h3 className="font-syne font-bold text-[1rem] md:text-[1.1rem] text-white">{name}</h3>
      {sub && <span className="block font-syne text-[0.75rem] text-white/60 mt-1">{sub}</span>}
    </div>
  )
}

function SmallNode({label, name}: {label:string, name:string | string[]}) {
  const names = Array.isArray(name) ? name : [name];
  return (
    <div className="bg-gold/5 border border-gold/20 border-t-2 border-t-gold/60 rounded-[4px] p-4 md:p-5 text-center z-10 sr-up delay-3 hover:bg-gold/10 transition-colors flex flex-col justify-center h-full">
      <span className="block font-syne-mono text-[0.6rem] md:text-[0.65rem] text-gold/80 uppercase tracking-widest mb-2">{label}</span>
      <div className="flex flex-col gap-2">
        {names.map((n, i) => (
          <div key={i}>
            {i > 0 && <div className="w-8 h-[1px] bg-gold/20 mx-auto my-2"></div>}
            <h3 className="font-syne font-bold text-[0.8rem] md:text-[0.9rem] text-white leading-tight">{n}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
