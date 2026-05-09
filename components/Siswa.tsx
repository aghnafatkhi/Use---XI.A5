import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query as firestoreQuery } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { staticStudents } from '../lib/constants';

// Helper to get initials
const getInitials = (name: string) => {
  const parts = name.split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return (parts[0][0] + (parts[0][1] || '')).toUpperCase();
};

export default function Siswa() {
  const [query, setQuery] = useState('');
  const [flipped, setFlipped] = useState<string | null>(null);
  const [students, setStudents] = useState<any[]>(staticStudents);

  useEffect(() => {
    const q = firestoreQuery(collection(db, 'students'), orderBy('absen', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setStudents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        setStudents(staticStudents);
      }
    }, (error) => {
      console.error(error);
    });
    return () => unsub();
  }, []);

  const filtered = students.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <section id="siswa" className="relative pt-[120px] pb-[120px] bg-[var(--bg-color)] graph-paper">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 md:px-[6vw] lg:px-[8vw] mb-12 md:mb-16 relative">
        <div className="absolute left-0 top-0 origin-top-left -rotate-90 hidden lg:block">
          <span className="font-syne font-extrabold text-[9px] text-[#5C1414]/30 tracking-[0.25em] uppercase">
            03 — Data Siswa
          </span>
        </div>

        <div className="sr-up md:pr-10">
          <h2 className="font-instrument italic text-[3rem] md:text-[3.5rem] lg:text-[4rem] text-[#5C1414] dark:text-[#F4EDE0] leading-[1.1] mb-3 whitespace-pre-line">
            {"Sistem Induk\nAnggota Kelas."}
          </h2>
          <p className="font-syne-mono text-[0.85rem] text-[var(--text-muted)] max-w-sm">
            Menampilkan ikhtisar {filtered.length} dari 36 siswa terdaftar.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mt-10 md:mt-12 max-w-[420px] relative sr-up delay-2">
           <div className="flex items-center border-b-2 border-[#EDE0CE] pb-3 transition-colors focus-within:border-[#C4973A] group">
             <span className="font-instrument text-[#C4973A] text-lg mr-3 transition-transform group-focus-within:scale-110">ε</span>
             <input 
               type="text" 
               placeholder="Cari nama siswa..." 
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               className="w-full bg-transparent font-syne text-[1rem] text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
             />
             {query && (
               <button onClick={() => setQuery('')} className="text-[var(--text-muted)] hover:text-[#C4973A] p-1 font-bold" aria-label="Clear search">×</button>
             )}
           </div>
        </div>
      </div>

      {/* STUDENT GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-[6vw] lg:px-[8vw]">
        {filtered.length === 0 ? (
          <div className="text-center py-20 sr-fade">
             <p className="font-syne text-[var(--text-muted)] text-[1.1rem]">Catatan biodata tidak dapat ditemukan dalam kueri pencarian. Harap ulangi.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2px] md:gap-[4px]">
            {filtered.map((s, index) => {
              const gradients = [
                'linear-gradient(135deg, #5C1414 0%, #8B3333 100%)',
                'linear-gradient(160deg, #3A0A0A 0%, #6B2020 60%)',
                'linear-gradient(110deg, #7A2020 0%, #4A0E0E 100%)',
                'linear-gradient(145deg, #8B6020 0%, #5C1414 100%)'
              ];
              const bg = gradients[index % gradients.length];
              const isFlipped = flipped === s.absen;

              return (
                <div 
                   key={s.absen} 
                   className="h-[260px] md:h-[280px] w-full [perspective:1200px] border border-[#EDE0CE] dark:border-[#EDE0CE]/10 sr-up group cursor-pointer"
                   style={{ transitionDelay: `${(index % 8) * 0.05}s` }}
                   onMouseEnter={() => setFlipped(s.absen)}
                   onMouseLeave={() => setFlipped(null)}
                   onClick={() => setFlipped(isFlipped ? null : s.absen)} // For mobile
                   role="button"
                   tabIndex={0}
                   onKeyDown={(e) => { if (e.key === 'Enter') setFlipped(isFlipped ? null : s.absen); }}
                >
                  <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                    
                    {/* FRONT FACE */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[var(--bg-warm)] flex flex-col justify-between group-hover:shadow-[inset_0_-4px_0_0_#C4973A] transition-shadow duration-300">
                       <div className="h-[100px] md:h-[120px] w-full relative" style={{background: bg}}>
                          <div className="absolute bottom-[-28px] md:bottom-[-32px] left-1/2 -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#F4EDE0]/10 dark:bg-[#1E0808]/50 border-[2px] border-[#C4973A]/60 flex items-center justify-center backdrop-blur-sm shadow-md">
                            <span className="font-instrument italic text-[1.1rem] md:text-[1.3rem] text-[#F4EDE0] drop-shadow-md">{getInitials(s.name)}</span>
                          </div>
                       </div>
                       
                       <div className="pt-[36px] md:pt-[44px] px-3 md:px-4 pb-4 md:pb-5 text-center flex-1 flex flex-col items-center">
                         <h3 className="font-syne font-bold text-[0.8rem] md:text-[0.9rem] text-[var(--text-primary)] uppercase tracking-[0.02em] mb-1 line-clamp-2 leading-tight group-hover:text-[#5C1414] transition-colors">
                           {s.name}
                         </h3>
                         <span className="font-syne-mono text-[0.65rem] md:text-[0.7rem] text-[#C4973A] mb-2 font-bold">No. {s.absen}</span>
                         {s.role && (
                           <span className="font-syne font-bold text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.05em] text-[#C4973A] border border-[#C4973A] px-2 py-[2px] rounded-full mt-auto bg-[#C4973A]/5">
                             {s.role}
                           </span>
                         )}
                         <div className="w-[80%] h-[1px] bg-[#C4973A]/10 absolute justify-self-end mt-auto bottom-3 md:bottom-4"></div>
                       </div>
                    </div>

                    {/* BACK FACE */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#5C1414] p-5 flex flex-col shadow-inner">
                       <div className="flex justify-between items-start mb-2">
                         <span className="font-syne-mono text-[2rem] md:text-[2.5rem] text-[#C4973A]/30 leading-none">{s.absen}</span>
                         <span className="font-instrument italic text-[#F4EDE0]/30 text-2xl">ε</span>
                       </div>
                       <h3 className="font-syne font-bold text-[0.85rem] md:text-[0.95rem] text-[#F4EDE0] uppercase mb-1 leading-snug">{s.name}</h3>
                       {s.role && (
                         <span className="font-syne text-[0.7rem] md:text-[0.75rem] text-[#C4973A] font-bold tracking-wide">{s.role}</span>
                       )}
                       
                       <div className="w-full h-[1px] bg-[#C4973A]/20 my-4 md:my-5 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#C4973A] rounded-full"></div>
                       </div>
                       
                       <p className="font-instrument italic text-[0.9rem] md:text-[1rem] text-[#F4EDE0]/80 leading-[1.5] flex-1">
                         Tercatat pada database akademik kelas XI IPA 5 periode ajaran ini.
                       </p>

                       <span className="font-syne-mono text-[0.6rem] md:text-[0.65rem] text-[#C4973A]/50 mt-auto tracking-widest text-center">ARSIP SISWA • EPSILON</span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </section>
  );
}
