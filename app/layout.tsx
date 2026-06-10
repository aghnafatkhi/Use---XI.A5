import type {Metadata} from 'next';
import { Instrument_Serif, Syne, Syne_Mono, Satisfy } from 'next/font/google';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument',
});

const syne = Syne({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
  variable: '--font-syne',
});

const syneMono = Syne_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-syne-mono',
});

const satisfy = Satisfy({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-satisfy',
});

export const metadata: Metadata = {
  title: 'Epsilonscience XII IPA 5',
  description: 'Website kenangan kelas XII IPA 5 SMAN 1 Cileungsi (2025/2026).',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${syne.variable} ${syneMono.variable} ${satisfy.variable}`}>
      <body className="antialiased font-syne" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
