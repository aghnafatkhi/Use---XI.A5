import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query as firestoreQuery } from 'firebase/firestore';
import { Search } from 'lucide-react';
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
        const fromDb = snap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
        if (snap.size >= 30) {
          setStudents(fromDb);
        } else {
          const merged = staticStudents.map(staticS => {
            const dbS = fromDb.find(s => s.absen === staticS.absen);
            return dbS ? { ...staticS, ...dbS } : staticS;
          });
          setStudents(merged);
        }
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
    <section id="siswa" className="relative pt-[60px] pb-[60px] md:pt-[80px] md:pb-[80px] bg-[var(--bg-color)] graph-paper">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 md:px-[6vw] lg:px-[8vw] mb-12 md:mb-16 relative">
        <div className="absolute left-0 top-0 origin-top-left -rotate-90 hidden lg:block">
          <span className="font-syne font-extrabold text-[9px] text-maroon/30 tracking-[0.25em] uppercase">
            03 — Data Siswa
          </span>
        </div>

        <div className="sr-up md:pr-10">
          <h2 className="font-instrument italic text-[3rem] md:text-[3.5rem] lg:text-[4rem] text-maroon leading-[1.1] mb-3 whitespace-pre-line">
            {"Anggota Kelas."}
          </h2>
          <p className="font-syne-mono text-[0.85rem] text-[var(--text-muted)] max-w-sm">
            {filtered.length} Siswa di XII.A5
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mt-10 md:mt-12 max-w-[420px] relative sr-up delay-2">
           <div className="flex items-center border-b-2 border-chalk pb-3 transition-colors focus-within:border-gold group">
             <Search size={18} className="text-gold mr-3 transition-transform group-focus-within:scale-110" />
             <input 
               type="text" 
               placeholder="Cari nama siswa..." 
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               className="w-full bg-transparent font-syne text-[1rem] text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
             />
             {query && (
               <button onClick={() => setQuery('')} className="text-[var(--text-muted)] hover:text-gold p-1 font-bold" aria-label="Clear search">×</button>
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
                'linear-gradient(135deg, #1A3FBF 0%, #3D6EFF 100%)',
                'linear-gradient(160deg, #0D1B4B 0%, #15329E 60%)',
                'linear-gradient(110deg, #1C41C4 0%, #0A153D 100%)',
                'linear-gradient(145deg, #FFD700 0%, #1A3FBF 100%)'
              ];
              const bg = gradients[index % gradients.length];
              const isFlipped = flipped === s.absen;

              return (
                <div 
                   key={s.absen} 
                   className="h-[260px] md:h-[280px] w-full [perspective:1200px] border border-chalk sr-up group cursor-pointer"
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
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[var(--bg-warm)] flex flex-col justify-between group-hover:shadow-[inset_0_-4px_0_0_#FFD700] transition-shadow duration-300">
                       <div className="h-[100px] md:h-[120px] w-full relative" style={{background: bg}}>
                          <div className="absolute bottom-[-28px] md:bottom-[-32px] left-1/2 -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-cream/20 border-[2px] border-gold/60 flex items-center justify-center backdrop-blur-sm shadow-md">
                            <span className="font-instrument italic text-[1.1rem] md:text-[1.3rem] text-white drop-shadow-md">{getInitials(s.name)}</span>
                          </div>
                       </div>
                       
                       <div className="pt-[36px] md:pt-[44px] px-3 md:px-4 pb-4 md:pb-5 text-center flex-1 flex flex-col items-center">
                          <h3 className="font-syne font-bold text-[0.8rem] md:text-[0.9rem] text-[var(--text-primary)] uppercase tracking-[0.02em] mb-1 line-clamp-2 leading-tight group-hover:text-maroon transition-colors">
                            {s.name}
                          </h3>
                          <span className="font-syne-mono text-[0.65rem] md:text-[0.7rem] text-gold mb-2 font-bold">No. {s.absen}</span>
                          {s.role && (
                            <span className="font-syne font-bold text-[0.55rem] md:text-[0.6rem] uppercase tracking-[0.05em] text-gold border border-gold px-2 py-[2px] rounded-full mt-auto bg-gold/5">
                              {s.role}
                            </span>
                          )}
                          <div className="w-[80%] h-[1px] bg-gold/10 absolute justify-self-end mt-auto bottom-3 md:bottom-4"></div>
                       </div>
                    </div>

                    {/* BACK FACE */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-maroon p-5 flex flex-col shadow-inner">
                       <div className="flex justify-between items-start mb-2">
                          <span className="font-syne-mono text-[2rem] md:text-[2.5rem] text-gold/30 leading-none">{s.absen}</span>
                          <span className="font-instrument italic text-white/30 text-2xl">ε</span>
                       </div>
                       <h3 className="font-syne font-bold text-[0.85rem] md:text-[0.95rem] text-white uppercase mb-1 leading-snug">{s.name}</h3>
                       {s.role && (
                         <span className="font-syne text-[0.7rem] md:text-[0.75rem] text-gold font-bold tracking-wide">{s.role}</span>
                       )}
                       
                       <div className="w-full h-[1px] bg-gold/20 my-4 md:my-5 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-gold rounded-full"></div>
                       </div>
                       
                       <p className="font-instrument italic text-[0.85rem] md:text-[0.95rem] text-white/90 leading-[1.4] flex-1">
                          &quot;{s.quote || 'Tercatat pada database akademik kelas XII.A5 periode ajaran ini.'}&quot;
                       </p>

                       <span className="font-syne-mono text-[0.6rem] md:text-[0.65rem] text-gold/50 mt-auto tracking-widest text-center">ARSIP SISWA • EPSILON</span>
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
