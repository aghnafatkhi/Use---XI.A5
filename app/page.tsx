'use client';

import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/use-scroll-reveal';
import LoadingScreen from '../components/LoadingScreen';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Manifesto from '../components/Manifesto';
import Galeri from '../components/Galeri';
import Siswa from '../components/Siswa';
import Struktur from '../components/Struktur';
import Kenangan from '../components/Kenangan';
import Footer from '../components/Footer';

export default function Page() {
  const [loading, setLoading] = useState(true);
  useScrollReveal();

  useEffect(() => {
    // Hide body scrollbar during load
    document.body.style.overflow = loading ? 'hidden' : '';
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Galeri />
        <Siswa />
        <Struktur />
        <Kenangan />
      </main>
      <Footer />
    </>
  );
}
