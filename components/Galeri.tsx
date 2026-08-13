import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { staticGalleryData } from '../lib/constants';

export default function Galeri() {
  const [activeFilter, setActiveFilter] = useState('semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryData, setGalleryData] = useState<any[]>(staticGalleryData);

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setGalleryData(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else {
        setGalleryData(staticGalleryData);
      }
    }, (error) => {
      console.error(error);
    });
    return () => unsub();
  }, []);

  const filteredItems = activeFilter === 'semua' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeFilter);


  // Close lightbox on Escape, navigate with arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      
      const item = filteredItems[lightboxIndex];
      const multi = item.images && item.images.length > 0;

      if (e.key === 'ArrowRight') {
        if (multi) {
          setCurrentImageIndex(prev => (prev + 1) % item.images.length);
        } else {
          setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
        }
      }
      if (e.key === 'ArrowLeft') {
        if (multi) {
          setCurrentImageIndex(prev => (prev - 1 + item.images.length) % item.images.length);
        } else {
          setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  return (
    <section id="galeri" className="relative pt-[60px] pb-[60px] md:pt-[80px] md:pb-[80px] bg-[var(--bg-warm)]">
      
      {/* HEADER AREA */}
      <div className="max-w-7xl mx-auto px-6 md:px-[6vw] lg:px-[8vw] mb-12 flex flex-col md:flex-row md:items-end justify-between relative">
        <div className="absolute left-0 top-12 origin-top-left -rotate-90 hidden lg:block">
          <span className="font-syne font-extrabold text-[9px] text-maroon/30 tracking-[0.25em] uppercase">
            02 — Galeri
          </span>
        </div>

        {/* Left Side Header */}
        <div className="sr-up md:pr-10">
          <h2 className="font-instrument italic text-[3rem] md:text-[3.5rem] lg:text-[4rem] text-maroon dark:text-cream leading-[1.1] whitespace-pre-line mb-6 md:mb-0">
            {"Dokumentasi\nAktivitas Kelas."}
          </h2>
        </div>

        {/* Right Side Header */}
        <div className="flex flex-col items-start md:items-end sr-up delay-2">
          {/* Filters removed as per user request */}
        </div>
      </div>
      
      {/* GALLERY GRID (Full Bleed) */}
      <div className="w-full relative z-10">
        {/* CSS Grid for Editorial Masonry Look */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1.3fr_1fr] gap-[4px] auto-rows-min">
          {filteredItems.map((item, index) => {
            // Determine height class based on sequence
            const heightClass = (index % 5 === 4) ? 'pt-[100%]' : (index % 2 === 0 ? 'pt-[70%]' : 'pt-[55%]');

            return (
              <div 
                key={item.title}
                data-category={item.category}
                className={`relative overflow-hidden group cursor-pointer w-full sr-up`}
                style={{ transitionDelay: `${(index % 6) * 0.1}s` }}
                onClick={() => { setLightboxIndex(index); setCurrentImageIndex(0); }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setLightboxIndex(index); }}
              >
                {/* Ratio padding */}
                <div className={`${heightClass} w-full`}></div>
                
                {/* Background Image/Color */}
                <div 
                  className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  style={{ background: item.bg?.startsWith('http') || item.bg?.startsWith('data:') ? `url(${item.bg}) center/cover no-repeat` : item.bg }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 z-0"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                    <span className="font-syne font-bold text-[0.9rem] md:text-[1.1rem] text-white uppercase tracking-[0.1em] mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {item.title}
                    </span>
                    <span className="font-syne-mono text-[0.7rem] text-gold uppercase tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {item.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                {/* Hover Reveal Overlay */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-dark-maroon/80 to-transparent translate-y-full flex items-end justify-center pb-6 transition-transform duration-300 ease-out group-hover:translate-y-0 z-20 pointer-events-none">
                  <span className="font-syne font-bold text-[0.8rem] text-white tracking-wider uppercase">Buka Foto <span className="ml-1">↗</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[2000] bg-[rgba(13,27,75,0.98)] flex flex-col items-center justify-center p-3 md:p-8" onClick={() => setLightboxIndex(null)}>
          <button 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-gold transition-colors p-3 z-50 rounded-full hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <button 
            className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-gold p-2.5 sm:p-4 focus-visible:outline-2 focus-visible:outline-gold bg-dark-maroon/50 hover:bg-dark-maroon rounded-full transition-all z-50"
            onClick={(e) => { 
              e.stopPropagation(); 
              const item = filteredItems[lightboxIndex];
              if (item.images && item.images.length > 1) {
                setCurrentImageIndex(prev => (prev - 1 + item.images.length) % item.images.length);
              } else {
                setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
                setCurrentImageIndex(0);
              }
            }}
            aria-label="Previous image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-6 sm:h-6">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button 
            className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-gold p-2.5 sm:p-4 focus-visible:outline-2 focus-visible:outline-gold bg-dark-maroon/50 hover:bg-dark-maroon rounded-full transition-all z-50"
            onClick={(e) => { 
              e.stopPropagation(); 
              const item = filteredItems[lightboxIndex];
              if (item.images && item.images.length > 1) {
                setCurrentImageIndex(prev => (prev + 1) % item.images.length);
              } else {
                setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
                setCurrentImageIndex(0);
              }
            }}
            aria-label="Next image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-6 sm:h-6">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div className="w-[92vw] sm:w-[85vw] max-w-5xl h-[60vh] sm:h-[75vh] relative rounded-md overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
             {/* Main image or gallery */}
             <div 
               className="w-full h-full transition-all duration-500 ease-in-out" 
               style={{ 
                 background: (filteredItems[lightboxIndex].images && filteredItems[lightboxIndex].images.length > 0) 
                   ? `url(${filteredItems[lightboxIndex].images[currentImageIndex]}) center/contain no-repeat` 
                   : (filteredItems[lightboxIndex].bg?.startsWith('http') || filteredItems[lightboxIndex].bg?.startsWith('data:') 
                     ? `url(${filteredItems[lightboxIndex].bg}) center/contain no-repeat` 
                     : filteredItems[lightboxIndex].bg) 
               }}
             >
                {/* Fallback for cases where background is transparent/missing */}
                {!filteredItems[lightboxIndex].images?.length && !filteredItems[lightboxIndex].bg && <div className="w-full h-full bg-dark-maroon/20"></div>}
             </div>
             
             {/* Gallery Pagination dots if multiple images */}
             {(filteredItems[lightboxIndex].images?.length > 1) && (
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {filteredItems[lightboxIndex].images.map((_: any, i: number) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-gold w-4' : 'bg-white/30'}`}></div>
                  ))}
               </div>
             )}
          </div>
          
          <div className="mt-8 text-center max-w-xl" onClick={(e) => e.stopPropagation()}>
            <h4 className="font-syne font-bold text-white text-xl md:text-2xl mb-2">{filteredItems[lightboxIndex].title}</h4>
            <p className="font-syne-mono text-gold text-xs uppercase tracking-widest">{filteredItems[lightboxIndex].category.replace('-', ' ')}</p>
          </div>
        </div>
      )}
    </section>
  );
}
