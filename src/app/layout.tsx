import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins } from 'next/font/google';

import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryProvider } from '@/providers/query';
import { ToastContainer } from 'react-toastify';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Robson Natanael | Millinks',
  description: 'Links e contatos de Robson Natanael',
  openGraph: {
    title: 'Robson Natanael | Millinks',
    description: 'Links e contatos de Robson Natanael',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <QueryProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
          <ToastContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
