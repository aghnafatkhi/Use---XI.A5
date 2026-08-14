import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query as firestoreQuery } from 'firebase/firestore';
import { Search, Sparkles, X, Quote } from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { staticStudents } from '../lib/constants';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: any, operationType: OperationType, path: string | null) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const isPermissionDenied = errorMessage.toLowerCase().includes('permission-denied') || 
                             errorMessage.toLowerCase().includes('insufficient permissions');

  const errInfo: FirestoreErrorInfo = {
    error: errorMessage,
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };

  console.error('Firestore Error: ', JSON.stringify(errInfo));

  if (isPermissionDenied) {
    throw new Error(JSON.stringify(errInfo));
  }
}

const getInitials = (name: string) => {
  const parts = name.split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return (parts[0][0] + (parts[0][1] || '')).toUpperCase();
};

export default function Siswa() {
  const [query, setQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [students, setStudents] = useState<any[]>(staticStudents);
  const [flippedAbsen, setFlippedAbsen] = useState<number | null>(null);

  useEffect(() => {
    const pathForOnSnapshot = 'students';
    const q = firestoreQuery(collection(db, pathForOnSnapshot), orderBy('absen', 'asc'));
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
      handleFirestoreError(error, OperationType.GET, pathForOnSnapshot);
    });
    return () => unsub();
  }, []);

  const filtered = students.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <section 
      id="siswa" 
      className="relative pt-12 pb-16 md:pt-16 md:pb-24 bg-[var(--bg-color)] graph-paper overflow-hidden"
    >
      
      {/* Decorative vertical lines on desktop */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-gold/10 hidden xl:block pointer-events-none"></div>
      
      {/* Colossal watermark - hidden on mobile for clean, fast render */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
        <div className="absolute right-6 top-48 origin-top-right rotate-90 opacity-[0.02] text-dark-maroon font-syne font-black text-[120px] tracking-widest uppercase select-none">
          MEMBERLIST
        </div>
      </div>

      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-[8vw] mb-10 md:mb-12 relative z-10">
        
        {/* Fine cross hair detail on header */}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-gold/30 hidden xl:block"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-gold/30 hidden xl:block"></div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-syne-mono text-[8px] text-gold tracking-[0.3em] uppercase font-bold">
                03 / THE CHRONICLES
              </span>
              <div className="w-1 h-1 bg-gold rounded-full"></div>
            </div>
            
            <h2 className="font-syne font-black text-3xl md:text-5xl lg:text-6xl text-dark-maroon tracking-tighter uppercase leading-[0.95] m-0">
              DAFTAR <br />
              <span className="font-instrument italic font-light text-gold text-2xl md:text-4xl lg:text-5xl lowercase tracking-normal block mt-1">
                anggota kelas.
              </span>
            </h2>
            
            <p className="font-syne-mono text-[8px] md:text-[9px] text-muted tracking-widest uppercase block pt-1">
              MENAMPILKAN {filtered.length} KEPALA KELUARGA • XII.A5
            </p>
          </div>

          {/* SEARCH BAR - Clean border stamp */}
          <div className="w-full md:w-80">
            <div className="flex items-center border border-gold/25 bg-white/50 backdrop-blur-sm px-4 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.01)] rounded-[1px] transition-colors focus-within:border-gold group">
              <Search size={13} className="text-gold mr-2.5 transition-transform group-focus-within:scale-105" />
              <input 
                type="text" 
                placeholder="Cari nama siswa..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent font-syne text-[11px] text-dark-maroon placeholder-muted/60 outline-none"
              />
              {query && (
                <button 
                  onClick={() => setQuery('')} 
                  className="text-muted/70 hover:text-gold pl-1.5 text-sm leading-none font-bold" 
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* STUDENT GRID - Flat layout optimized for direct touch clicks */}
      <div className="max-w-7xl mx-auto px-6 md:px-[8vw] relative z-10">
        {filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-gold/15 rounded-[1px] bg-white/10">
            <Sparkles className="text-gold/30 mx-auto mb-3" size={20} />
            <p className="font-syne text-muted text-[10px] uppercase tracking-wider">
              Biodata tidak ditemukan. Silakan coba pencarian lain.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((s, index) => {
              const gradients = [
                'linear-gradient(135deg, #4A121A 0%, #1E0508 100%)', // Deep Maroon/Crimson
                'linear-gradient(135deg, #1C2442 0%, #0B0E1B 100%)', // Premium Deep Navy
                'linear-gradient(135deg, #3C2915 0%, #150E06 100%)', // Premium Antique Gold-Brown
                'linear-gradient(135deg, #2D1A3B 0%, #100617 100%)'  // Deep Velvet Purple
              ];
              const bg = gradients[index % gradients.length];

              return (
                <div 
                  key={s.absen} 
                  className="bg-white border border-gold/15 p-2.5 md:p-3.5 flex flex-col justify-between shadow-[2px_6px_15px_rgba(0,0,0,0.02)] hover:shadow-[4px_12px_24px_rgba(0,0,0,0.06)] hover:border-gold/30 transition-all duration-300 rounded-[1px] cursor-pointer group relative overflow-visible"
                  onClick={() => setFlippedAbsen(flippedAbsen === s.absen ? null : s.absen)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setFlippedAbsen(flippedAbsen === s.absen ? null : s.absen); }}
                >
                  {/* Photo/Initials Container with 3D Flip perspective */}
                  <div className="[perspective:1000px] h-[110px] sm:h-[135px] md:h-[155px] w-full relative">
                    <div 
                      className={`w-full h-full relative transition-transform duration-500 [transform-style:preserve-3d] ${
                        flippedAbsen === s.absen ? '[transform:rotateY(180deg)]' : ''
                      }`}
                    >
                      {/* FRONT FACE */}
                      <div 
                        className="absolute inset-0 w-full h-full [backface-visibility:hidden] overflow-hidden rounded-[1px]"
                        style={{ background: bg }}
                      >
                        {/* Inner frame lines */}
                        <div className="absolute inset-1.5 border border-white/5 pointer-events-none">
                          <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/20"></div>
                          <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-white/20"></div>
                          <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-white/20"></div>
                          <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/20"></div>
                        </div>

                        {/* Absen Stamp */}
                        <div className="absolute top-2 left-2 bg-black/45 backdrop-blur-sm border border-white/10 px-1 py-0.5 rounded-[1px]">
                          <span className="font-syne-mono text-[5px] sm:text-[6px] text-gold tracking-widest uppercase font-bold">
                            ABS. {s.absen.toString().padStart(2, '0')}
                          </span>
                        </div>

                        {/* Initials */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-instrument italic text-xl sm:text-2xl md:text-3xl text-cream/95 select-none transition-transform duration-300 group-hover:scale-105">
                            {getInitials(s.name)}
                          </span>
                        </div>

                        {/* Sparkle decorative indicator */}
                        <div className="absolute bottom-2 right-2 text-white/35">
                          <Sparkles size={8} />
                        </div>
                      </div>

                      {/* BACK FACE */}
                      <div 
                        className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-dark-maroon border border-gold/30 p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden rounded-[1px]"
                      >
                        {/* Quote Content */}
                        <div className="flex-grow flex flex-col justify-center text-center">
                          <p className="font-instrument italic text-[8px] sm:text-[10px] md:text-xs text-cream/90 leading-relaxed line-clamp-4">
                            &ldquo;{s.quote || 'Tercatat sebagai bagian dari keluarga besar XII.A5.'}&rdquo;
                          </p>
                        </div>

                        {/* Bottom action trigger to open modal detail */}
                        <div className="flex justify-between items-center border-t border-gold/10 pt-1.5 mt-1">
                          <span className="font-syne-mono text-[5px] text-gold/60 uppercase">TAP TO RETURN</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStudent(s);
                            }}
                            className="bg-gold hover:bg-gold/90 text-dark-maroon text-[5px] sm:text-[7px] font-syne font-black uppercase tracking-widest px-1.5 py-0.5 rounded-[1px] transition-colors"
                          >
                            DETAIL
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Label Info (Always visible below flippable photo card!) */}
                  <div className="pt-2 flex-grow flex flex-col justify-between items-center text-center">
                    <div className="w-full">
                      <h3 className="font-syne font-black text-[9px] sm:text-xs text-dark-maroon uppercase tracking-tight line-clamp-1 group-hover:text-gold transition-colors">
                        {s.name}
                      </h3>
                    </div>

                    {s.role ? (
                      <div className="bg-gold/10 border border-gold/25 px-2 py-0.5 mt-1 inline-block">
                        <span className="font-syne font-black text-[6px] sm:text-[7px] uppercase tracking-[0.1em] text-dark-maroon">
                          {s.role}
                        </span>
                      </div>
                    ) : (
                      <span className="font-syne-mono text-[6px] sm:text-[7px] text-muted/60 tracking-wider uppercase mt-1">
                        ANGGOTA
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* INDEPENDENT STUDENT DETAILS DIALOG: Super clean, high-performance modal with perfect readability */}
      {selectedStudent && (
        <div 
          className="fixed inset-0 z-[2100] flex items-center justify-center p-4 bg-dark-maroon/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedStudent(null)}
        >
          <div 
            className="bg-white border border-gold/20 w-full max-w-md p-6 md:p-8 rounded-[1px] shadow-2xl relative flex flex-col justify-between overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Elegant Background Logo Detail */}
            <div className="absolute -right-10 -bottom-10 opacity-5 font-syne font-black text-9xl text-dark-maroon select-none pointer-events-none">
              &epsilon;
            </div>

            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-dark-maroon/60 hover:text-gold transition-colors p-1.5 rounded-full hover:bg-gold/10 cursor-pointer"
              onClick={() => setSelectedStudent(null)}
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>

            {/* Content Top */}
            <div className="flex justify-between items-start border-b border-gold/10 pb-4 mb-5">
              <span className="font-syne-mono text-[10px] text-gold/90 uppercase tracking-widest font-bold">
                NO. ABSEN {selectedStudent.absen.toString().padStart(2, '0')}
              </span>
              <span className="font-instrument italic text-gold text-lg select-none leading-none">
                &epsilon;
              </span>
            </div>

            {/* Main content body */}
            <div className="space-y-4">
              <div>
                <h3 className="font-syne font-black text-lg md:text-xl text-dark-maroon uppercase tracking-tight leading-tight">
                  {selectedStudent.name}
                </h3>
                {selectedStudent.role ? (
                  <span className="font-syne font-black text-[9px] text-gold uppercase tracking-wider block mt-1.5 bg-gold/10 border border-gold/25 px-2.5 py-0.5 rounded-[1px] w-fit">
                    {selectedStudent.role}
                  </span>
                ) : (
                  <span className="font-syne-mono text-[8px] text-muted tracking-widest uppercase block mt-1.5">
                    ANGGOTA KELAS XII.A5
                  </span>
                )}
              </div>

              {/* Quote Section */}
              <div className="relative py-4 px-5 bg-[var(--bg-warm)] border-l-2 border-gold rounded-r-[1px] mt-2">
                <Quote size={16} className="text-gold/40 absolute top-2.5 left-2.5 pointer-events-none" />
                <p className="font-instrument italic text-base text-dark-maroon leading-relaxed pl-4 pt-1">
                  &ldquo;{selectedStudent.quote || 'Tercatat pada database akademik kelas XII.A5 periode ajaran ini.'}&rdquo;
                </p>
              </div>
            </div>

            {/* Bottom ledger details */}
            <div className="border-t border-gold/10 pt-4 mt-6 flex justify-between items-center text-[8px] font-syne-mono text-muted/60 uppercase tracking-widest">
              <span>MEMOIR DIARY</span>
              <span>XII.A5 RECORD</span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
