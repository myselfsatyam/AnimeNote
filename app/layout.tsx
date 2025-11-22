import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';

// Lazy load the chatbot component
const NarutoChatbot = dynamic(() => import('@/components/NarutoChatbot'), {
  ssr: false,
  loading: () => null,
});

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Optimize font loading
});

export const metadata: Metadata = {
  title: 'Anime Character Explorer | Discover Amazing Characters',
  description: 'Explore the world of anime through dynamic character profiles and inspiring quotes. Discover your favorite characters from popular anime series.',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <NarutoChatbot />
      </body>
    </html>
  );
}