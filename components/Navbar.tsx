'use client';

import { useState, useEffect } from 'react';
import { Youtube, Instagram, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    return () => document.body.classList.remove('mobile-menu-open');
  }, [menuOpen]);

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang', href: '#tentang' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Siswa', href: '#siswa' },
    { label: 'Kenangan', href: '#kenangan' },
  ];

  const socialLinks = [
    { icon: <Instagram size={16} />, href: 'https://www.instagram.com/epsilonscience5', label: 'Instagram' },
    { icon: <Youtube size={16} />, href: 'https://www.youtube.com/@epsilonsciencee', label: 'YouTube' },
    { icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ), href: 'https://www.tiktok.com/@epsil0nsciencee', label: 'TikTok' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full h-16 z-[999] transition-all duration-400 ease-in-out bg-[var(--bg-color)] shadow-sm border-b border-gold/20`}
      >
        <div className="h-full w-full max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="font-instrument text-[24px] text-gold italic leading-none transform translate-y-0.5">ε</span>
            <div className="w-[1px] h-4 bg-gold/30"></div>
            <span className="font-syne-mono text-[11px] text-dark-maroon uppercase tracking-[0.2em]">XII.A5</span>
          </div>
 
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link, index) => (
                <div key={link.href} className="flex items-center gap-8">
                  <a 
                    href={link.href}
                    className="font-bold text-[11px] text-dark-maroon uppercase tracking-widest hover:tracking-[0.15em] hover:text-gold transition-all duration-300"
                  >
                    {link.label}
                  </a>
                  {index < navLinks.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-gold"></span>
                  )}
                </div>
              ))}
            </div>
 
            <div className="flex items-center gap-5 pl-4 border-l border-gold/20">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-maroon/60 hover:text-gold transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
 
          {/* Mobile Hamburg */}
          <div className="flex md:hidden items-center space-x-4">
            <button 
              className="flex items-center justify-center h-11 w-11 text-dark-maroon hover:text-gold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-gold p-2"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>
 
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[3000] bg-[var(--bg-color)] flex flex-col p-8 overflow-y-auto"
          >
            <div className="flex justify-end mb-8">
              <button 
                onClick={() => setMenuOpen(false)} 
                aria-label="Close menu" 
                className="text-[var(--text-primary)] hover:text-gold transition-colors focus:outline-none h-11 w-11 flex items-center justify-center p-2"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-6 flex-grow justify-center py-6">
              {navLinks.map((link, index) => (
                <motion.a 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.04, duration: 0.25, ease: "easeOut" }}
                  className="flex items-center font-instrument italic text-[clamp(1.8rem,8vw,2.5rem)] text-[var(--text-primary)] hover:text-gold transition-colors"
                >
                  <span className="font-instrument text-gold text-lg mr-4 not-italic relative -top-1">ε</span>
                  {link.label}
                </motion.a>
              ))}
            </div>
 
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-auto py-10 border-t border-gold/20 flex items-center justify-center gap-10"
            >
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold opacity-60 hover:opacity-100 transition-opacity"
                  aria-label={social.label}
                >
                  {/* Scale up social icons for mobile */}
                  <div className="scale-125">
                    {social.icon}
                  </div>
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
