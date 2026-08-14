import { useState, useEffect } from 'react';

const events = [
  { id: 1, date: 'Jul 2026', title: 'Pembukaan Tahun Ajaran', desc: 'Rapat awal pembentukan struktur dan tata tertib.' },
  { id: 2, date: 'Aug 2026', title: 'Masa Pengenalan', desc: 'Kegiatan orientasi akademis dan pengenalan lingkungan kelas.' },
  { id: 3, date: 'Sep 2026', title: 'Praktikum Laboratorium', desc: 'Sesi praktikum ilmiah perdana dalam kurikulum IPA semester ini.' },
  { id: 4, date: 'Okt 2026', title: 'Evaluasi Tengah Semester', desc: 'Mengukur pemahaman peserta didik paruh pertama semester.' },
  { id: 5, date: 'Nov 2026', title: 'PORSENI Sekolah', desc: 'Keterlibatan dan partisipasi kontingen sekolah dalam kompetisi.' },
  { id: 6, date: 'Des 2026', title: 'Penilaian Akhir Semester', desc: 'Asesmen final tahunan guna mengevaluasi capaian siswa.' },
  { id: 7, date: 'Jan 2027', title: 'Awal Semester Genap', desc: 'Pembukaan kembali studi dengan agenda pencapaian ketuntasan kompetensi.' },
  { id: 8, date: 'Jun 2027', title: 'Ujian Akhir Kelulusan', desc: 'Agenda akhir untuk penentuan kelulusan siswa menuju jenjang pendidikan tinggi.' },
];

export default function Linimasa() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target date: June 1, 2027
    const targetDate = new Date('2027-06-01T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="agenda" className="relative pt-[60px] pb-[80px] md:pt-[80px] md:pb-[100px] px-6 md:px-[6vw] lg:px-[8vw] bg-[var(--bg-color)]">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-16 relative">
        <div className="absolute left-0 top-0 origin-top-left -rotate-90 hidden lg:block">
          <span className="font-syne font-extrabold text-[9px] text-maroon/30 tracking-[0.25em] uppercase">
            04 — Linimasa
          </span>
        </div>
        <div className="sr-up md:pr-10">
          <span className="block font-syne font-extrabold text-[9px] text-maroon/30 tracking-[0.25em] uppercase mb-4 lg:hidden">
            04 — Agenda Utama
          </span>
          <h2 className="font-instrument italic text-[3rem] md:text-[3.5rem] lg:text-[4rem] text-maroon dark:text-cream leading-[1.1] whitespace-pre-line">
            {"Jadwal Akademik\nTahun Berjalan."}
          </h2>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 max-w-7xl mx-auto">
        
        {/* LEFT: TIMELINE (60%) */}
        <div className="w-full lg:w-[60%] relative md:pr-8">
          {/* Vertical line - hidden on small mobile, visible on sm and up */}
          <div className="absolute left-[70px] sm:left-[80px] top-0 bottom-0 w-[1px] bg-chalk dark:bg-chalk/20 z-0 hidden sm:block"></div>

          <div className="flex flex-col relative z-10 space-y-8 sm:space-y-0">
            {events.map((ev, index) => (
              <div key={ev.id} className="flex flex-col sm:flex-row relative mb-0 group sr-up" style={{ transitionDelay: `${(index % 4) * 0.1}s` }}>
                {/* Date Left - visible on sm and up */}
                <div className="w-[80px] flex-shrink-0 pt-1 pr-6 justify-end hidden sm:flex">
                  <span className="font-syne-mono text-[0.7rem] text-gold text-right">{ev.date}</span>
                </div>
                
                {/* Center Dot - visible on sm and up */}
                <div className="absolute left-[80px] top-[10px] w-2 h-2 rounded-full bg-gold -translate-x-1/2 hidden sm:block"></div>
                
                {/* Date Mobile - visible only on mobile */}
                <div className="sm:hidden mb-2 border-b border-gold/30 pb-2 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                     <span className="font-syne-mono text-[0.8rem] text-gold font-bold">{ev.date}</span>
                   </div>
                   <span className="font-syne-mono text-[0.65rem] text-[var(--text-muted)] uppercase">
                     {ev.date.split(' ')[0]}
                   </span>
                 </div>
                
                {/* Right Card */}
                <div className="sm:pl-6 sm:border-l-[2px] sm:border-gold sm:pb-8 relative sm:-left-[1px]">
                   <span className="font-syne-mono text-[0.65rem] text-gold/70 uppercase mb-2 hidden sm:block tracking-widest">
                     {ev.date.split(' ')[0]}
                   </span>
                   <h3 className="font-syne font-bold text-lg md:text-xl text-[var(--text-primary)] mb-2">
                     {ev.title}
                   </h3>
                   <p className="font-syne font-normal text-[0.85rem] md:text-[0.9rem] text-[var(--text-muted)] leading-[1.6] max-w-md">
                     {ev.desc}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: COUNTDOWN & STICKY NOTES (40%) */}
        <div className="w-full lg:w-[40%] flex flex-col space-y-16 lg:pl-8">
          
          {/* COUNTDOWN */}
          <div className="sr-up delay-2 bg-maroon p-6 sm:p-8 rounded-[2px] shadow-lg relative overflow-hidden border border-gold/20 text-center sm:text-left">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold opacity-10 rounded-bl-full pointer-events-none"></div>
            
            <span className="block font-syne-mono text-[0.75rem] text-gold uppercase tracking-widest mb-6 font-bold">
              Hitung Mundur Kelulusan
            </span>
            
            <div className="flex justify-center sm:justify-start items-center gap-2 sm:gap-4 md:gap-3 lg:gap-4 mb-2">
              {[
                { val: timeLeft.days, label: 'Hari' },
                { val: timeLeft.hours, label: 'Jam' },
                { val: timeLeft.minutes, label: 'Mnt' },
                { val: timeLeft.seconds, label: 'Dtk' }
              ].map((time, i, arr) => (
                <div key={time.label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <span className="font-instrument italic text-[2.5rem] sm:text-[3.5rem] text-white leading-none tabular-nums drop-shadow-md">
                      {time.val.toString().padStart(2, '0')}
                    </span>
                    <span className="font-syne-mono text-[0.65rem] text-white/60 mt-1 uppercase tracking-wider">{time.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="font-instrument italic text-[2rem] sm:text-[3rem] text-gold mx-2 sm:mx-3 md:mx-2 lg:mx-3 pb-4 opacity-50">:</span>
                  )}
                </div>
              ))}
            </div>
            
            <p className="font-syne text-[0.8rem] text-white/70 italic mt-6 border-t border-white/10 pt-4 leading-relaxed">
              &quot;Waktu terus berputar, jadikan setiap momen hari ini bermakna untuk esok.&quot;
            </p>
          </div>

          {/* STICKY NOTES */}
          <div className="flex flex-col space-y-5 lg:space-y-6 items-center sm:items-start w-full max-w-[320px] mx-auto sm:max-w-none">
             
             {/* Note 1 */}
             <div className="w-full sm:w-[260px] bg-cream/70 dark:bg-maroon/20 p-5 sm:p-6 rounded-[2px] shadow-[4px_4px_0px_rgba(255,215,0,0.2)] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.5)] md:-rotate-[1.5deg] rotate-0 relative sr-up delay-3 border border-gold/20 transition-transform md:hover:rotate-0 hover:-translate-y-1">
               <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-gold rounded-full shadow-sm"></div>
               <p className="font-syne-mono text-gold font-bold uppercase tracking-widest mb-2 mt-2 text-[0.65rem] border-b border-gold/20 pb-1 inline-block">Surat Edaran #01</p>
               <p className="font-syne text-[0.85rem] text-dark-maroon dark:text-cream leading-[1.6]">
                 Pembaruan jadwal piket telah disertakan pada dokumen administrasi kelas. Mohon segera bertugas saat hari KBM.
               </p>
             </div>
 
             {/* Note 2 */}
             <div className="w-full sm:w-[260px] bg-cream/70 dark:bg-maroon/20 p-5 sm:p-6 rounded-[2px] shadow-[4px_4px_0px_rgba(255,215,0,0.2)] dark:shadow-[4px_4px_0px_rgba(0,0,0,0.5)] md:rotate-[1.5deg] rotate-0 relative sm:ml-6 lg:ml-8 sr-up delay-4 border border-gold/20 transition-transform md:hover:rotate-0 hover:-translate-y-1">
               <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-gold/40 rounded-full flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
               </div>
               <p className="font-syne-mono text-gold font-bold uppercase tracking-widest mb-2 mt-2 text-[0.65rem] border-b border-gold/20 pb-1 inline-block">Edaran Tugas</p>
               <p className="font-syne text-[0.85rem] text-dark-maroon dark:text-cream leading-[1.6]">
                 Batas waktu seluruh pengumpulan laporan tugas Bahasa Indonesia adalah hari Jumat sebelum pukul 14.00 WIB.
               </p>
             </div>

          </div>

        </div>
      </div>

    </section>
  );
}
