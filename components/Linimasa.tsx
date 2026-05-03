import { useState, useEffect } from 'react';

const events = [
  { id: 1, date: 'Jul 2025', title: 'Tahun Ajaran Baru Dimulai', desc: 'Hari pertama sebagai XI IPA 5 — deg-degan tapi excited.' },
  { id: 2, date: 'Aug 2025', title: 'MPLS: Masa Pengenalan Lingkungan Sekolah', desc: 'Kenalan, bingung, tapi mulai nemu teman baru.' },
  { id: 3, date: 'Sep 2025', title: 'Praktikum IPA Perdana', desc: 'Lab kimia, bau reagen, tapi bangga banget bisa pipet sendiri.' },
  { id: 4, date: 'Okt 2025', title: 'PTS Ganjil', desc: 'Belajar semalaman. Tetap banyak yang lupa. 😅' },
  { id: 5, date: 'Nov 2025', title: 'PORSENI: Pekan Olahraga & Seni', desc: 'Dari lapangan sampai panggung — Epsilonscience ada di sana.' },
  { id: 6, date: 'Des 2025', title: 'UAS Ganjil', desc: 'Semester pertama mau berakhir. Rasanya cepat sekali.' },
  { id: 7, date: 'Jan 2026', title: 'Semester Genap Dimulai', desc: 'Fresh start, resolusi baru, niat belajar (semoga bertahan).' },
  { id: 8, date: 'Jun 2026', title: 'Kenaikan Kelas & Perpisahan', desc: 'Hari yang kita takutkan sekaligus tunggu-tunggu.' },
];

export default function Linimasa() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target date: June 1, 2026
    const targetDate = new Date('2026-06-01T00:00:00').getTime();

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
    <section id="agenda" className="relative pt-[120px] pb-[120px] px-6 md:px-[8vw] bg-[var(--bg-color)]">
      {/* HEADER */}
      <div className="mb-16 relative">
        <div className="sr-up">
          <span className="block font-syne font-extrabold text-[9px] text-[#5C1414]/30 tracking-[0.25em] uppercase mb-4">
            05 — Linimasa
          </span>
          <h2 className="font-instrument italic text-[3rem] text-[#5C1414] dark:text-[#F4EDE0] leading-tight whitespace-pre-line">
            {"Satu Tahun\nPenuh Cerita."}
          </h2>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 max-w-7xl mx-auto">
        
        {/* LEFT: TIMELINE (60%) */}
        <div className="w-full lg:w-[60%] relative">
          {/* Vertical line */}
          <div className="absolute left-[80px] top-0 bottom-0 w-[1px] bg-[#EDE0CE] dark:bg-[#EDE0CE]/20 z-0"></div>

          <div className="flex flex-col relative z-10">
            {events.map((ev, index) => (
              <div key={ev.id} className="flex relative mb-0 group sr-up" style={{ transitionDelay: `${(index % 4) * 0.1}s` }}>
                {/* Date Left */}
                <div className="w-[80px] flex-shrink-0 pt-1 pr-6 flex justify-end">
                  <span className="font-syne-mono text-[0.7rem] text-[#C4973A]">{ev.date}</span>
                </div>
                
                {/* Center Dot */}
                <div className="absolute left-[80px] top-[10px] w-2 h-2 rounded-full bg-[#C4973A] -translate-x-1/2"></div>
                
                {/* Right Card */}
                <div className="pl-6 border-l-[2px] border-[#C4973A] pb-8 relative -left-[1px]">
                   <span className="block font-syne-mono text-[0.65rem] text-[#C4973A]/70 uppercase mb-1">
                     {ev.date.split(' ')[0]}
                   </span>
                   <h3 className="font-syne font-bold text-[0.95rem] text-[var(--text-primary)] mb-2">
                     {ev.title}
                   </h3>
                   <p className="font-syne font-normal text-[0.8rem] text-[var(--text-muted)] leading-[1.6] max-w-md">
                     {ev.desc}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: COUNTDOWN & STICKY NOTES (40%) */}
        <div className="w-full lg:w-[40%] flex flex-col space-y-16">
          
          {/* COUNTDOWN */}
          <div className="sr-up delay-2">
            <span className="block font-syne font-bold text-[0.75rem] text-[#C4973A] uppercase tracking-widest mb-4">
              Menuju Perpisahan
            </span>
            <div className="w-full h-[1px] bg-[#C4973A]/20 mb-6"></div>
            
            <div className="flex items-start gap-2 sm:gap-4 md:gap-2 lg:gap-4 mb-6">
              {[
                { val: timeLeft.days, label: 'Hari' },
                { val: timeLeft.hours, label: 'Jam' },
                { val: timeLeft.minutes, label: 'Menit' },
                { val: timeLeft.seconds, label: 'Detik' }
              ].map((time, i, arr) => (
                <div key={time.label} className="flex items-start">
                  <div className="flex flex-col items-center">
                    <span className="font-instrument text-[2.5rem] sm:text-[3rem] text-[var(--text-primary)] leading-none tabular-nums">
                      {time.val.toString().padStart(2, '0')}
                    </span>
                    <span className="font-syne-mono text-[0.65rem] text-[var(--text-muted)] mt-2">{time.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="font-instrument text-[2rem] text-[#C4973A] mx-2 sm:mx-4 md:mx-2 lg:mx-4 mt-1">:</span>
                  )}
                </div>
              ))}
            </div>
            
            <div className="w-full h-[1px] bg-[#C4973A]/20"></div>
          </div>

          {/* STICKY NOTES */}
          <div className="flex flex-col space-y-6 items-center sm:items-start pl-0 sm:pl-8 lg:pl-0">
             
             {/* Note 1 */}
             <div className="w-[240px] bg-[#FFF8E7] dark:bg-[#2A1616] p-5 rounded-[2px] shadow-[3px_4px_0px_rgba(58,10,10,0.08)] -rotate-[1.5deg] relative sr-up delay-3">
               <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#C4973A] rounded-full"></div>
               <p className="font-syne text-[0.8rem] text-[#3A0A0A] dark:text-[#F4EDE0] leading-[1.6] mt-2">
                 📌 Jadwal piket minggu ini sudah di-update ya, cek grup kelas!
               </p>
             </div>

             {/* Note 2 */}
             <div className="w-[240px] bg-[#FFF8E7] dark:bg-[#2A1616] p-5 rounded-[2px] shadow-[3px_4px_0px_rgba(58,10,10,0.08)] rotate-[1deg] relative ml-4 sr-up delay-4">
               <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#C4973A] rounded-full"></div>
               <p className="font-syne text-[0.8rem] text-[#3A0A0A] dark:text-[#F4EDE0] leading-[1.6] mt-2">
                 📌 Tugas Fisika dikumpulkan sebelum Jumat. Jangan lupa nama dan kelas.
               </p>
             </div>

             {/* Note 3 */}
             <div className="w-[240px] bg-[#FFF8E7] dark:bg-[#2A1616] p-5 rounded-[2px] shadow-[3px_4px_0px_rgba(58,10,10,0.08)] -rotate-[0.8deg] relative -ml-2 sr-up delay-5">
               <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#C4973A] rounded-full"></div>
               <p className="font-syne text-[0.8rem] text-[#3A0A0A] dark:text-[#F4EDE0] leading-[1.6] mt-2">
                 📌 Foto kelas semester ini dijadwalkan bulan depan. Seragam harus rapi. Serius ini.
               </p>
             </div>

          </div>

        </div>
      </div>

    </section>
  );
}
