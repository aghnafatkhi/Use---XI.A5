import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, Space_Mono } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-pj',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-sm',
});

export const metadata: Metadata = {
  title: 'Epsilonscience XII.A5',
  description: 'Website kenangan kelas XII.A5 SMAN 1 Cileungsi (2026/2027).',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${spaceMono.variable}`}>
      <body className="antialiased font-syne" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
