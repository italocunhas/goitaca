import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Açaí Goitacá',
  description: 'O melhor açaí de Bangu!',
  metadataBase: new URL('https://acaigoitaca.vercel.app'),
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          {children}
          <Toaster position="bottom-right" />
        </CartProvider>
      </body>
    </html>
  );
}
