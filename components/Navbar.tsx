import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check theme setup
    const saved = localStorage.getItem('eps-theme');
    if (saved === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('eps-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang', href: '#tentang' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Siswa', href: '#siswa' },
    { label: 'Agenda', href: '#agenda' },
    { label: 'Kenangan', href: '#kenangan' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full h-16 z-[999] transition-all duration-400 ease-in-out ${scrolled ? 'bg-[#3A0A0A] border-b border-[#C4973A33]' : 'bg-transparent border-b border-[#C4973A33]'}`}
      >
        <div className="h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-instrument text-[24px] text-[#C4973A] italic leading-none transform translate-y-0.5">ε</span>
            <div className="w-[1px] h-4 bg-[#C4973A4D]"></div>
            <span className="font-syne-mono text-[11px] text-[#5C1414CC] dark:text-[#F4EDE0]/60 uppercase tracking-[0.2em]">XI IPA 5</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center gap-8">
              {navLinks.map((link, index) => (
                <div key={link.href} className="flex items-center gap-8">
                  <a 
                    href={link.href}
                    className="font-bold text-[11px] text-[#5C1414CC] dark:text-[#F4EDE0]/70 uppercase tracking-widest hover:tracking-[0.15em] hover:text-[#C4973A] transition-all duration-300"
                  >
                    {link.label}
                  </a>
                  {index < navLinks.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-[#C4973A]"></span>
                  )}
                </div>
              ))}
            </div>
            
            <button 
              onClick={toggleTheme}
              className="ml-6 shrink-0 text-[#F4EDE0]/50 hover:text-[#C4973A] transition-colors focus-visible:outline-2 focus-visible:outline-[#C4973A]"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Hamburg */}
          <div className="flex md:hidden items-center space-x-4">
             <button 
                onClick={toggleTheme}
                className="text-[#F4EDE0]/50 hover:text-[#C4973A]"
                aria-label="Toggle dark mode"
              >
                  {theme === 'light' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  </svg>
                )}
              </button>
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
        <div className="fixed inset-0 z-[1000] bg-[#3A0A0A] flex flex-col p-8">
          <div className="flex justify-end mb-12">
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-[#F4EDE0] text-3xl opacity-60 hover:text-[#C4973A]">&times;</button>
          </div>
          <div className="flex flex-col space-y-6">
            {navLinks.map((link, index) => (
              <a 
                key={link.href} 
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center font-instrument italic text-[2.5rem] text-[#F4EDE0] animate-[slideUp_0.4s_ease-out_forwards]"
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
