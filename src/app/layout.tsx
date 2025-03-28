import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import { Header } from '../components/header';
import { CartProvider } from '../contexts/CartContext';
import { Providers } from "./providers";

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat'
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'Açaí Goitacá',
  description: 'Monte seu açaí personalizado',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${montserrat.className} m-0 p-0`} suppressHydrationWarning>
        <Providers>
          <CartProvider>
            <div className="flex flex-col min-h-screen max-w-[2000px] mx-auto">
              <Header />
              <main className="flex-1 pt-24">
                {children}
              </main>
            </div>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
