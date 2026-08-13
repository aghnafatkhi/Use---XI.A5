import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [shrinking, setShrinking] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShrinking(true), 2000);
    const complete = setTimeout(() => onComplete(), 2400); // Gives time for transition
    return () => {
      clearTimeout(timer);
      clearTimeout(complete);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-dark-maroon transition-transform duration-500 ease-in-out ${shrinking ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="flex flex-col items-center justify-center relative">
        <span className="font-instrument text-[80px] italic text-gold leading-none mb-4 tracking-tighter">ε</span>
        <span className="font-satisfy text-[28px] text-white">Epsilonscience</span>
        {/* Progress line */}
        <div className="absolute -bottom-6 left-0 right-0 h-[1px]">
          <div className="h-full bg-gold w-0 animate-[loadingLine_1.6s_ease-in-out_forwards]"></div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes loadingLine {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
