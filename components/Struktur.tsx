export default function Struktur() {
  const seksiList = [
    {
      label: "Seksi Pendidikan",
      names: ["Axelizar Achmad", "Ghina Ayundia Fairuz"],
      id: "edu"
    },
    {
      label: "Seksi Upacara & Keamanan",
      names: ["Asyifa Khoerunnisa", "Raffiendra Ghazan Ari Nugroho"],
      id: "sec"
    },
    {
      label: "Seksi Kebersihan",
      names: ["Christian Jhosua Halomoan Hutabarat", "Maura Esther Tiara Hartana"],
      id: "clean"
    },
    {
      label: "Seksi Kerohanian",
      names: ["Rasendriya Bhamakerti", "Nafisha Putri Radisty"],
      id: "spiritual"
    },
    {
      label: "Seksi Olahraga & Kesehatan",
      names: ["Dimas Alfarizky", "Adam Mudzaki"],
      id: "health"
    },
    {
      label: "Seksi Peralatan",
      names: ["Muhammad Vicky Wiraputra", "Hanzhalah Abdurrahman Al Fayyad"],
      id: "tools"
    }
  ];

  return (
    <section 
      id="organisasi" 
      className="relative pt-12 pb-16 md:pt-16 md:pb-24 px-6 md:px-[8vw] bg-dark-maroon overflow-hidden"
    >
      
      {/* Decorative handcrafted corner stamps */}
      <div className="absolute top-12 left-12 w-6 h-6 border-t border-l border-gold/20 pointer-events-none hidden md:block"></div>
      <div className="absolute top-12 right-12 w-6 h-6 border-t border-r border-gold/20 pointer-events-none hidden md:block"></div>
      
      {/* Colossal watermark with mobile overflow protection - hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
        <div className="absolute right-[-20px] bottom-10 text-gold/[0.02] font-syne font-black text-[clamp(14rem,20vw,28rem)] select-none uppercase">
          TEAM
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER - Editorial asymmetrical style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14 border-b border-gold/10 pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-syne-mono text-[8px] text-gold tracking-[0.4em] uppercase font-bold">
                02 / THE ADMINISTRATION
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-gold/50"></div>
            </div>
            
            <h2 className="font-syne font-black text-3xl md:text-5xl lg:text-6xl text-white tracking-tighter uppercase leading-[0.95] m-0">
              KABINET <br />
              <span className="font-instrument italic font-light text-gold text-2xl md:text-4xl lg:text-5xl lowercase tracking-normal block mt-1">
                organisasi kelas.
              </span>
            </h2>
          </div>
          
          <p className="font-syne text-xs text-cream/40 tracking-wider uppercase max-w-xs leading-relaxed md:text-right">
            Struktur kepengurusan kolektif penata jalannya harmoni dan dinamika di kelas XII.A5.
          </p>
        </div>

        {/* PRIMARY LEADERS SECTION (Wali Kelas, Ketua, Wakil) - Focused on Name and Role */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16 md:mb-24">
          
          {/* Card 1: Wali Kelas (Pamong Kelas) */}
          <div 
            className="lg:col-span-4 bg-black/20 border border-gold/15 p-6 md:p-8 relative flex flex-col justify-between group rounded-[1px] hover:border-gold/30 transition-all duration-300"
            id="org-card-wali"
          >
            <div>
              <span className="font-syne-mono text-[8px] text-gold tracking-[0.25em] uppercase font-bold block mb-4">
                02.1 / PAMONG KELAS
              </span>
              
              <h3 className="font-instrument italic text-3xl md:text-4xl text-white leading-tight mb-2">
                Franti Surya
              </h3>
              
              <p className="font-syne font-bold text-[10px] text-gold tracking-widest uppercase mt-2">
                HOMEROOM ADVISOR
              </p>
            </div>

            <div className="border-t border-gold/10 mt-8 pt-4">
              <span className="font-syne-mono text-[8px] text-cream/50 uppercase tracking-widest block">
                BAHASA INDONESIA DEPARTMENT • SMAN 1 CILEUNGSI
              </span>
            </div>
          </div>

          {/* Card 2: Ketua Kelas - High-end premium focus */}
          <div 
            className="lg:col-span-5 bg-white text-dark-maroon p-6 md:p-8 relative flex flex-col justify-between shadow-xl md:rotate-[-1deg] rotate-0 lg:-translate-y-4 hover:rotate-0 hover:scale-[1.02] transition-all duration-500 rounded-[1px]"
            id="org-card-ketua"
          >
            {/* Hanging paperclip overlay details */}
            <div className="absolute top-[-10px] left-12 w-10 h-6 bg-gold/20 border border-gold/15 rounded-[1px] -rotate-12"></div>

            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="font-syne-mono text-[8px] text-gold tracking-[0.25em] uppercase font-bold">
                  02.2 / PREFECT (KETUA)
                </span>
                <span className="font-syne-mono text-[7px] text-dark-maroon/30 uppercase">OFFICE OF KETUA</span>
              </div>
              
              <h3 className="font-syne font-black text-2xl md:text-3xl text-dark-maroon leading-[1.1] uppercase tracking-tighter">
                Alisha Putri <br />
                Vallena Haris
              </h3>
            </div>

            <div className="border-t border-gold/20 mt-8 pt-4">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                <span className="font-syne-mono text-[8px] text-gold uppercase tracking-widest font-bold">
                  CHIEF COMMANDER XII.A5
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Wakil Ketua Kelas */}
          <div 
            className="lg:col-span-3 bg-black/40 border border-gold/15 p-6 md:p-8 relative flex flex-col justify-between rounded-[1px] hover:border-gold/25 transition-all duration-300"
            id="org-card-wakil"
          >
            <div>
              <span className="font-syne-mono text-[8px] text-gold/80 tracking-[0.2em] uppercase font-bold block mb-4">
                02.3 / VICE PREFECT
              </span>
              
              <h3 className="font-syne font-black text-lg text-white uppercase tracking-tight leading-tight">
                Octaviana Sintya Mardiyanti
              </h3>
              
              <p className="font-syne-mono text-[7px] text-gold uppercase tracking-widest font-bold mt-2">
                CO-LEADERSHIP
              </p>
            </div>

            <div className="border-t border-gold/10 mt-8 pt-4">
              <span className="font-syne-mono text-[8px] text-gold uppercase tracking-widest block">
                VICE CHIEF COMMANDER
              </span>
            </div>
          </div>

        </div>

        {/* SECONDARY OFFICERS (Sekretaris & Bendahara) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 md:mb-24">
          
          {/* Group 1: Sekretariat (Sekretaris) */}
          <div className="border border-gold/10 bg-black/10 p-6 md:p-8 rounded-[1px] relative">
            {/* Visual Header */}
            <div className="flex justify-between items-center border-b border-gold/10 pb-4 mb-6">
              <span className="font-syne font-black text-xs text-white uppercase tracking-wider">
                02.4 / SEKRETARIAT
              </span>
              <span className="font-syne-mono text-[7px] text-gold uppercase tracking-wider">CHRONICLE KEEPERS</span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-syne-mono text-[7px] text-gold tracking-widest uppercase block mb-1">
                    SEKRETARIS I
                  </span>
                  <h4 className="font-syne font-bold text-base text-white">
                    Diandra Pravita Nurani
                  </h4>
                </div>
                <span className="font-syne-mono text-[6px] text-cream/30">LGR.01</span>
              </div>

              <div className="h-[1px] bg-gold/10"></div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="font-syne-mono text-[7px] text-gold tracking-widest uppercase block mb-1">
                    SEKRETARIS II
                  </span>
                  <h4 className="font-syne font-bold text-base text-white">
                    Zahratusita Sumitra
                  </h4>
                </div>
                <span className="font-syne-mono text-[6px] text-cream/30">LGR.02</span>
              </div>
            </div>
          </div>

          {/* Group 2: Perbendaharaan (Bendahara) */}
          <div className="border border-gold/10 bg-black/10 p-6 md:p-8 rounded-[1px] relative">
            {/* Visual Header */}
            <div className="flex justify-between items-center border-b border-gold/10 pb-4 mb-6">
              <span className="font-syne font-black text-xs text-white uppercase tracking-wider">
                02.5 / TREASURERS
              </span>
              <span className="font-syne-mono text-[7px] text-gold uppercase tracking-wider">FINANCIAL LEDGER</span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-syne-mono text-[7px] text-gold tracking-widest uppercase block mb-1">
                    BENDAHARA I
                  </span>
                  <h4 className="font-syne font-bold text-base text-white">
                    Novailla Salwa Khoirunisa
                  </h4>
                </div>
                <span className="font-syne-mono text-[6px] text-cream/30">ACC.01</span>
              </div>

              <div className="h-[1px] bg-gold/10"></div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="font-syne-mono text-[7px] text-gold tracking-widest uppercase block mb-1">
                    BENDAHARA II
                  </span>
                  <h4 className="font-syne font-bold text-base text-white">
                    Salma Tazkiyyatul Aqwal
                  </h4>
                </div>
                <span className="font-syne-mono text-[6px] text-cream/30">ACC.02</span>
              </div>
            </div>
          </div>

        </div>

        {/* LEVEL 4: DEPARTEMEN / SEKSI BIDANG - Grid of Divisions */}
        <div className="border-t border-gold/10 pt-12 md:pt-16">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <span className="font-syne-mono text-[8px] text-gold tracking-[0.25em] uppercase font-bold">
              02.6 / DIVISION DIRECTORY (SEKSI-SEKSI)
            </span>
            <div className="h-[1px] bg-gold/10 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seksiList.map((seksi, index) => (
              <div 
                key={seksi.id}
                className="bg-black/20 border border-gold/10 hover:border-gold/20 p-5 md:p-6 relative flex flex-col justify-between transition-colors duration-300 rounded-[1px] group"
              >
                {/* Micro index counter at bottom-right */}
                <span className="absolute top-4 right-4 font-syne-mono text-[9px] text-gold/20 group-hover:text-gold/40 transition-colors">
                  {(index + 1).toString().padStart(2, '0')}
                </span>

                <div>
                  <span className="font-syne-mono text-[7px] text-gold/60 tracking-[0.2em] uppercase font-bold block mb-2">
                    DIVISION {index + 1}
                  </span>
                  
                  <h4 className="font-syne font-extrabold text-sm text-white uppercase tracking-tight mb-4">
                    {seksi.label}
                  </h4>
                </div>

                <div className="border-t border-gold/10 pt-4">
                  <span className="font-syne-mono text-[6px] text-gold/80 uppercase tracking-widest block mb-2">
                    OFFICERS IN CHARGE
                  </span>
                  <div className="space-y-1.5">
                    {seksi.names.map((name, i) => (
                      <span 
                        key={i} 
                        className="font-syne font-bold text-xs text-cream block"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
