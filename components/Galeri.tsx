'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { staticGalleryData } from '../lib/constants';

export default function Galeri() {
  const [showAll, setShowAll] = useState(false);
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

  const visibleItems = showAll ? galleryData : galleryData.slice(0, 6);

  // Close lightbox on Escape, navigate with arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      
      const item = visibleItems[lightboxIndex];
      const multi = item.images && item.images.length > 0;

      if (e.key === 'ArrowRight') {
        if (multi) {
          setCurrentImageIndex(prev => (prev + 1) % item.images.length);
        } else {
          setLightboxIndex((prev) => (prev! + 1) % visibleItems.length);
        }
      }
      if (e.key === 'ArrowLeft') {
        if (multi) {
          setCurrentImageIndex(prev => (prev - 1 + item.images.length) % item.images.length);
        } else {
          setLightboxIndex((prev) => (prev! - 1 + visibleItems.length) % visibleItems.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, visibleItems]);

  return (
    <section 
      id="galeri" 
      className="relative pt-12 pb-12 md:pt-20 md:pb-20 bg-[var(--bg-warm)] overflow-hidden"
    >
      
      {/* Colossal watermark text with mobile overflow protection - hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
        <div className="absolute left-[-20px] top-1/4 text-maroon/[0.02] font-syne font-black text-[clamp(12rem,18vw,26rem)] select-none uppercase">
          ARCHIVE
        </div>
      </div>

      {/* HEADER AREA */}
      <div className="max-w-7xl mx-auto px-6 md:px-[8vw] mb-10 md:mb-14 relative z-10">
        
        {/* Handcrafted marker stamp */}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-gold/30 hidden xl:block"></div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gold/10">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-syne-mono text-[8px] text-gold tracking-[0.35em] uppercase font-bold">
                04 / THE DOCUMENTARIES
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-gold/50"></div>
            </div>
            
            <h2 className="font-syne font-black text-4xl md:text-5xl lg:text-6xl text-dark-maroon tracking-tighter uppercase leading-[0.95] m-0">
              KILAS <br />
              <span className="font-instrument italic font-light text-gold text-3xl md:text-4xl lg:text-5xl lowercase tracking-normal block mt-1">
                dokumentasi kelas.
              </span>
            </h2>
          </div>
          
          <p className="font-syne text-xs text-muted/65 tracking-wide uppercase max-w-xs leading-relaxed md:text-right">
            Rekam jejak, petualangan, and tawa kolektif yang berhasil diabadikan sepanjang kebersamaan kelas.
          </p>
        </div>
      </div>
      
      {/* GALLERY GRID (Editorial Masonry Wall) */}
      <div className="max-w-7xl mx-auto px-6 md:px-[8vw] relative z-10">
        {/* CSS Grid for Editorial Masonry Look - deliberately asymmetrical layout blocks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 auto-rows-auto">
          {visibleItems.map((item, index) => {
            // Determine custom column span and layout based on index for asymmetrical composition
            let colSpan = "md:col-span-6 lg:col-span-4";
            let rotateClass = "md:rotate-[0.5deg] rotate-0";
            let borderStyle = "rounded-[1px]";

            if (index % 5 === 0) {
              colSpan = "md:col-span-12 lg:col-span-8"; // Featured widescreen item
              rotateClass = "md:rotate-[-0.8deg] rotate-0";
              borderStyle = "rounded-tr-[30px]";
            } else if (index % 5 === 1) {
              colSpan = "md:col-span-6 lg:col-span-4";
              rotateClass = "md:rotate-[1deg] rotate-0";
              borderStyle = "rounded-[1px]";
            } else if (index % 5 === 2) {
              colSpan = "md:col-span-6 lg:col-span-6";
              rotateClass = "md:rotate-[-1.2deg] rotate-0";
              borderStyle = "rounded-bl-[24px]";
            } else if (index % 5 === 3) {
              colSpan = "md:col-span-6 lg:col-span-6";
              rotateClass = "md:rotate-[0.6deg] rotate-0";
              borderStyle = "rounded-[1px]";
            } else {
              colSpan = "md:col-span-12 lg:col-span-4";
              rotateClass = "md:rotate-[-0.5deg] rotate-0";
              borderStyle = "rounded-tl-[24px]";
            }

            return (
              <div 
                key={item.title}
                data-category={item.category}
                className={`${colSpan} ${rotateClass} bg-white p-4.5 border border-gold/15 shadow-[6px_10px_25px_rgba(0,0,0,0.03)] hover:scale-[1.015] hover:rotate-0 hover:shadow-[10px_16px_35px_rgba(0,0,0,0.08)] hover:border-gold/30 transition-all duration-500 cursor-pointer relative group flex flex-col justify-between`}
                onClick={() => { setLightboxIndex(index); setCurrentImageIndex(0); }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setLightboxIndex(index); }}
              >
                
                {/* Vintage stamp graphic overlay inside card */}
                <div className="absolute top-7 right-7 z-10 opacity-30 group-hover:opacity-75 transition-opacity pointer-events-none">
                  <span className="font-syne-mono text-[6px] text-white/95 border border-white/40 px-1 py-0.5 rounded-[1px] uppercase tracking-widest bg-black/20 backdrop-blur-sm">
                    EXH.{index + 1}
                  </span>
                </div>

                {/* Aspect Ratio Photo container */}
                <div className={`overflow-hidden relative w-full h-64 ${borderStyle} bg-dark-maroon`}>
                  {/* Visual grid lining */}
                  <div className="absolute inset-3 border border-white/5 pointer-events-none z-10"></div>

                  <div 
                    className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    style={{ background: item.bg?.startsWith('http') || item.bg?.startsWith('data:') ? `url(${item.bg}) center/cover no-repeat` : item.bg }}
                  >
                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition-colors duration-500"></div>
                  </div>
                </div>

                {/* Caption / Handmade card footnotes */}
                <div className="pt-4 pb-1.5 flex justify-between items-end border-t border-gold/10 mt-4 px-1">
                  <div className="text-left">
                    <span className="font-syne-mono text-[7px] text-gold tracking-widest block uppercase font-bold mb-1.5">
                      {item.category.replace('-', ' ')}
                    </span>
                    <h3 className="font-syne font-black text-xs md:text-sm text-dark-maroon uppercase tracking-tight m-0 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  
                  <div className="flex flex-col items-end text-right">
                    <span className="font-instrument italic text-[11px] text-gold/80 block select-none">
                      memoir &nearr;
                    </span>
                    <span className="font-syne-mono text-[6px] text-muted tracking-widest mt-1">
                      CHRONICLED
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* SEE MORE BUTTON */}
        {galleryData.length > 6 && (
          <div className="mt-14 flex justify-center relative z-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3.5 bg-dark-maroon text-white font-syne text-xs uppercase tracking-[0.25em] font-black border border-dark-maroon hover:bg-white hover:text-dark-maroon hover:border-gold/30 rounded-[1px] transition-all duration-300 shadow-[4px_6px_20px_rgba(13,27,75,0.08)] cursor-pointer select-none"
            >
              {showAll ? 'Lihat Lebih Sedikit' : 'Tampilkan Semua Dokumentasi'}
            </button>
          </div>
        )}

      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[2000] bg-[rgba(13,27,75,0.98)] flex flex-col items-center justify-center p-3 md:p-8" 
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
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
          
          {/* Nav buttons */}
          <button 
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-gold p-3 focus-visible:outline-2 focus-visible:outline-gold bg-dark-maroon/50 hover:bg-dark-maroon rounded-full transition-all z-50"
            onClick={(e) => { 
              e.stopPropagation(); 
              const item = visibleItems[lightboxIndex];
              if (item.images && item.images.length > 1) {
                setCurrentImageIndex(prev => (prev - 1 + item.images.length) % item.images.length);
              } else {
                setLightboxIndex((prev) => (prev! - 1 + visibleItems.length) % visibleItems.length);
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
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-gold p-3 focus-visible:outline-2 focus-visible:outline-gold bg-dark-maroon/50 hover:bg-dark-maroon rounded-full transition-all z-50"
            onClick={(e) => { 
              e.stopPropagation(); 
              const item = visibleItems[lightboxIndex];
              if (item.images && item.images.length > 1) {
                setCurrentImageIndex(prev => (prev + 1) % item.images.length);
              } else {
                setLightboxIndex((prev) => (prev! + 1) % visibleItems.length);
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
             <div 
               className="w-full h-full transition-all duration-500 ease-in-out" 
               style={{ 
                 background: (visibleItems[lightboxIndex].images && visibleItems[lightboxIndex].images.length > 0) 
                   ? `url(${visibleItems[lightboxIndex].images[currentImageIndex]}) center/contain no-repeat` 
                   : (visibleItems[lightboxIndex].bg?.startsWith('http') || visibleItems[lightboxIndex].bg?.startsWith('data:') 
                     ? `url(${visibleItems[lightboxIndex].bg}) center/contain no-repeat` 
                     : visibleItems[lightboxIndex].bg) 
               }}
             >
                {!visibleItems[lightboxIndex].images?.length && !visibleItems[lightboxIndex].bg && <div className="w-full h-full bg-dark-maroon/20"></div>}
             </div>
             
             {/* Pagination dots */}
             {(visibleItems[lightboxIndex].images?.length > 1) && (
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {visibleItems[lightboxIndex].images.map((_: any, i: number) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-gold w-4' : 'bg-white/30'}`}></div>
                  ))}
               </div>
             )}
          </div>
          
          <div className="mt-8 text-center max-w-xl" onClick={(e) => e.stopPropagation()}>
            <h4 className="font-syne font-bold text-white text-xl md:text-2xl mb-2">{visibleItems[lightboxIndex].title}</h4>
            <p className="font-syne-mono text-gold text-xs uppercase tracking-widest">{visibleItems[lightboxIndex].category.replace('-', ' ')}</p>
          </div>
        </div>
      )}
    </section>
  );
}
