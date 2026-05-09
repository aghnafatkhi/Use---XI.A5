import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang', href: '#tentang' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Siswa', href: '#siswa' },
    { label: 'Kenangan', href: '#kenangan' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full h-16 z-[999] transition-all duration-400 ease-in-out bg-[var(--bg-color)] shadow-sm border-b border-[#C4973A33]`}
      >
        <div className="h-full w-full max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-instrument text-[24px] text-[#C4973A] italic leading-none transform translate-y-0.5">ε</span>
            <div className="w-[1px] h-4 bg-[#C4973A4D]"></div>
            <span className="font-syne-mono text-[11px] text-[#3A0A0A] uppercase tracking-[0.2em]">XI IPA 5</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center gap-8">
              {navLinks.map((link, index) => (
                <div key={link.href} className="flex items-center gap-8">
                  <a 
                    href={link.href}
                    className="font-bold text-[11px] text-[#3A0A0A] uppercase tracking-widest hover:tracking-[0.15em] hover:text-[#C4973A] transition-all duration-300"
                  >
                    {link.label}
                  </a>
                  {index < navLinks.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-[#C4973A]"></span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Hamburg */}
          <div className="flex md:hidden items-center space-x-4">
            <button 
              className="flex flex-col justify-between h-[12px] w-[20px]"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="block h-[1.5px] w-full bg-[#C4973A]"></span>
              <span className="block h-[1.5px] w-full bg-[#C4973A]"></span>
              <span className="block h-[1.5px] w-full bg-[#C4973A]"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[1000] bg-[var(--bg-color)] flex flex-col p-8">
          <div className="flex justify-end mb-12">
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-[var(--text-primary)] text-3xl opacity-60 hover:text-[#C4973A]">&times;</button>
          </div>
          <div className="flex flex-col space-y-6">
            {navLinks.map((link, index) => (
              <a 
                key={link.href} 
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center font-instrument italic text-[2.5rem] text-[var(--text-primary)] animate-[slideUp_0.4s_ease-out_forwards]"
                style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
              >
                <span className="font-instrument text-[#C4973A] text-lg mr-4 not-italic relative -top-1">ε</span>
                {link.label}
              </a>
            ))}
          </div>
          
          <style jsx>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
