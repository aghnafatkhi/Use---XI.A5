import { useState } from 'react';

const students = [
  { absen: '01', name: 'Abyan Dzaky Pratama', role: 'Ketua Kelas' },
  { absen: '02', name: 'Adinda Putri Rahayu', role: 'Wakil Ketua' },
  { absen: '03', name: 'Aghna Nur Fadhilah', role: 'Sekretaris 1' },
  { absen: '04', name: 'Ahmad Fauzi' },
  { absen: '05', name: 'Aisha Nuraini', role: 'Bendahara 1' },
  { absen: '06', name: 'Alya Salsabila' },
  { absen: '07', name: 'Ananda Rizki Putra' },
  { absen: '08', name: 'Annisa Farah Diba', role: 'Sekretaris 2' },
  { absen: '09', name: 'Arif Rahman Hakim' },
  { absen: '10', name: 'Aulia Rahma Sari' },
  { absen: '11', name: 'Bagas Dwi Santoso' },
  { absen: '12', name: 'Bella Putri Andini' },
  { absen: '13', name: 'Cahya Ramadhan' },
  { absen: '14', name: 'Daffa Bintang Nugraha' },
  { absen: '15', name: 'Dea Amelia Putri', role: 'Bendahara 2' },
  { absen: '16', name: 'Dendi Saputra' },
  { absen: '17', name: 'Dhia Azzahra' },
  { absen: '18', name: 'Dimas Eka Pratama' },
  { absen: '19', name: 'Elsa Febrianti' },
  { absen: '20', name: 'Fadhil Akbar Maulana' },
  { absen: '21', name: 'Fathia Nur Azizah' },
  { absen: '22', name: 'Fikri Ramadhan' },
  { absen: '23', name: 'Gilang Permana' },
  { absen: '24', name: 'Hafidz Maulana' },
  { absen: '25', name: 'Hana Nur Aisyah' },
  { absen: '26', name: 'Ilham Saputra' },
  { absen: '27', name: 'Indah Permata Sari' },
  { absen: '28', name: 'Jasmine Putri Utami' },
  { absen: '29', name: 'Kevin Andriansyah' },
  { absen: '30', name: 'Layla Salsabila Putri' },
  { absen: '31', name: 'M. Farhan Ramadhan' },
  { absen: '32', name: 'Nadira Aulia' },
  { absen: '33', name: 'Putri Ramadhani' },
  { absen: '34', name: 'Rafi Ardiansyah' },
  { absen: '35', name: 'Salsabila Zahra' },
  { absen: '36', name: 'Zahra Nur Fadillah' }
];

// Helper to get initials
const getInitials = (name: string) => {
  const parts = name.split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return (parts[0][0] + (parts[0][1] || '')).toUpperCase();
};

export default function Siswa() {
  const [query, setQuery] = useState('');
  const [flipped, setFlipped] = useState<string | null>(null);

  const filtered = students.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <section id="siswa" className="relative pt-[120px] pb-[120px] bg-[var(--bg-color)] graph-paper">
      {/* HEADER */}
      <div className="px-6 md:px-[8vw] mb-16 relative">
        <div className="absolute left-0 top-0 origin-top-left -rotate-90 hidden md:block">
          <span className="font-syne font-extrabold text-[9px] text-[#5C1414]/30 tracking-[0.25em] uppercase">
            03 — Warga Kelas
          </span>
        </div>

        <div className="sr-up">
          <h2 className="font-instrument italic text-[3rem] text-[#5C1414] dark:text-[#F4EDE0] leading-tight mb-2 whitespace-pre-line">
            {"36 Kepala,\nSatu Keluarga."}
          </h2>
          <p className="font-syne-mono text-[0.75rem] text-[var(--text-muted)]">
            Menampilkan {filtered.length} dari 36 siswa
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="mt-12 max-w-[420px] relative sr-up delay-2">
           <div className="flex items-center border-b border-[#EDE0CE] pb-2 transition-colors focus-within:border-[#C4973A]">
             <span className="font-instrument text-[#C4973A] text-[12px] mr-3">ε</span>
             <input 
               type="text" 
               placeholder="Cari nama..." 
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               className="w-full bg-transparent font-syne text-[0.9rem] text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
             />
             {query && (
               <button onClick={() => setQuery('')} className="text-[var(--text-muted)] hover:text-[#C4973A]" aria-label="Clear search">×</button>
             )}
           </div>
        </div>
      </div>

      {/* STUDENT GRID */}
      <div className="px-6 md:px-[8vw]">
        {filtered.length === 0 ? (
          <div className="text-center py-20 sr-fade">
             <p className="font-syne text-[var(--text-muted)] text-[1rem]">Tidak ada yang bernama itu di sini 😅</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[1px]">
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
                   className="h-[280px] w-full [perspective:1200px] border border-[#EDE0CE] dark:border-[#EDE0CE]/10 sr-up"
                   style={{ transitionDelay: `${(index % 8) * 0.05}s` }}
                   onMouseEnter={() => setFlipped(s.absen)}
                   onMouseLeave={() => setFlipped(null)}
                   onClick={() => setFlipped(isFlipped ? null : s.absen)} // For mobile
                >
                  <div className={`relative w-full h-full transition-transform duration-600 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                    
                    {/* FRONT FACE */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[var(--color-white-card)] flex flex-col justify-between">
                       <div className="h-[120px] w-full relative" style={{background: bg}}>
                          <div className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#F4EDE0]/15 dark:bg-[#1E0808]/50 border-[1.5px] border-[#C4973A]/40 flex items-center justify-center">
                            <span className="font-instrument italic text-[1.2rem] text-[#F4EDE0]">{getInitials(s.name)}</span>
                          </div>
                       </div>
                       
                       <div className="pt-[40px] px-3 pb-4 text-center flex-1 flex flex-col items-center">
                         <h3 className="font-syne font-bold text-[0.8rem] text-[var(--text-primary)] uppercase tracking-[0.02em] mb-1 line-clamp-2">
                           {s.name}
                         </h3>
                         <span className="font-syne-mono text-[0.65rem] text-[#C4973A] mb-2">No. {s.absen}</span>
                         {s.role && (
                           <span className="font-syne font-bold text-[0.55rem] uppercase tracking-[0.05em] text-[#C4973A] border border-[#C4973A] px-2 py-0.5 rounded-full mt-auto">
                             {s.role}
                           </span>
                         )}
                         <div className="w-[90%] h-[1px] bg-[#C4973A]/15 absolute justify-self-end mt-auto bottom-4"></div>
                       </div>
                    </div>

                    {/* BACK FACE */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#5C1414] p-4 flex flex-col">
                       <span className="font-syne-mono text-[2rem] text-[#C4973A]/30 self-start mb-2 leading-none">{s.absen}</span>
                       <h3 className="font-syne font-bold text-[0.85rem] text-[#F4EDE0] uppercase mb-1">{s.name}</h3>
                       {s.role && (
                         <span className="font-syne text-[0.75rem] text-[#C4973A]">{s.role}</span>
                       )}
                       
                       <div className="w-full h-[1px] bg-[#C4973A]/20 my-4"></div>
                       
                       <p className="font-instrument italic text-[0.9rem] text-[#F4EDE0]/70 leading-[1.5] flex-1">
                         "Anggota aktif Epsilonscience 2025/2026."
                       </p>

                       <span className="font-syne-mono text-[0.65rem] text-[#C4973A]/50 mt-auto">ε Epsilonscience</span>
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
