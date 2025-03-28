import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '../components/header';
import { CartProvider } from '../contexts/CartContext';
import { Providers } from "./providers";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Açaí Goitacá',
  description: 'Monte seu açaí personalizado',
  metadataBase: new URL('https://acaigoitaca.vercel.app'),
  icons: {
    icon: '/favicon.ico',
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
        <Providers>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
