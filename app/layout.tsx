import type { Metadata, Viewport } from 'next';
import './globals.css';
import PwaRegister from './PwaRegister';

export const metadata: Metadata = {
  metadataBase: new URL('https://historia-mibaso.mbaur747329.chatgpt.site'),
  title: 'Historia – klassische Weltgeschichte',
  description:
    'Eine schnelle, chronologische Reise durch die klassische Weltgeschichte.',
  applicationName: 'Historia',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Historia' },
  icons: { icon: '/icon-192.jpg', apple: '/icon-192.jpg' },
  openGraph: {
    title: 'Historia – klassische Weltgeschichte',
    description:
      'Von Narmer bis zum Ende Westroms – 16 kompakte Schlüsselszenen.',
    type: 'website',
    locale: 'de_DE',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Historia – klassische Weltgeschichte',
    description:
      'Von Narmer bis zum Ende Westroms – 16 kompakte Schlüsselszenen.',
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#f5eddb',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
