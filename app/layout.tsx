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
  title: 'Epsilonscience XII.A5 | SMAN 1 Cileungsi',
  description: 'Website kenangan kelas XII.A5 SMAN 1 Cileungsi (2026/2027). Mengabadikan cerita, prestasi, tawa, dan perjalanan kebersamaan angkatan Epsilon.',
  keywords: [
    'Epsilonscience',
    'XII.A5',
    'SMAN 1 Cileungsi',
    'Epsilon',
    'Buku Kenangan Kelas',
    'Alumni SMAN 1 Cileungsi',
    'Keluarga XII.A5'
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Epsilonscience XII.A5 | SMAN 1 Cileungsi',
    description: 'Website kenangan kelas XII.A5 SMAN 1 Cileungsi (2026/2027). Mengabadikan cerita, prestasi, tawa, dan perjalanan kebersamaan angkatan Epsilon.',
    url: 'https://epsilonscience-xiia5.vercel.app',
    siteName: 'Epsilonscience XII.A5',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://picsum.photos/seed/epsilon/1200/630',
        width: 1200,
        height: 630,
        alt: 'Epsilonscience XII.A5 Memori SMAN 1 Cileungsi',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Epsilonscience XII.A5 | SMAN 1 Cileungsi',
    description: 'Mengabadikan cerita, prestasi, tawa, dan perjalanan kebersamaan angkatan Epsilon SMAN 1 Cileungsi.',
    images: ['https://picsum.photos/seed/epsilon/1200/630'],
  },
};

export const viewport = {
  themeColor: '#0D1B4B',
  width: 'device-width',
  initialScale: 1,
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
