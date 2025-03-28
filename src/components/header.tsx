'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Modal } from './Modal';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';
import { useCart } from '../contexts/CartContext';
import { MessageCircle, LogIn, LogOut, User } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export function Header() {
  const { items } = useCart();
  const { data: session } = useSession();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleLogout = async () => {
    await signOut({ redirect: true });
  };

  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0];
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap');
      `}</style>
      {/* Background Color */}
      <div className="absolute inset-0 bg-[#995b85]" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center min-h-[5rem] sm:min-h-[6rem] md:min-h-[7rem] py-2 sm:py-3 md:py-4 gap-2 sm:gap-3 md:gap-4">
          {/* Logo and Status */}
          <div className="flex-shrink-0 flex items-center gap-3 sm:gap-4 md:gap-5">
            <img 
              src="/images/perso.png" 
              alt="Açaí Goitacá" 
              className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-18 lg:w-18 object-contain rounded-full border-2 border-white"
            />
            <div className="flex flex-col">
              <Link href="/" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white font-playfair tracking-wide">
                Açaí Goitacá
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm sm:text-base md:text-lg text-white/90">
                  Horário: 10h às 22h
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://wa.me/5522997494416"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors p-1.5 sm:p-2"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            {session ? (
              <div className="flex items-center gap-2">
                <div className="bg-white/10 text-white border-2 border-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  {getFirstName(session.user?.name || '')}
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white text-[#8f527b] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-white/90 transition-colors flex items-center gap-1.5 sm:gap-2"
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  Sair
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-transparent text-white border-2 border-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-white/10 transition-colors flex items-center gap-1.5 sm:gap-2"
                >
                  <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                  Entrar
                </button>
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="bg-white text-[#8f527b] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-white/90 transition-colors"
                >
                  Registrar
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isLoginModalOpen}
        onCloseAction={() => setIsLoginModalOpen(false)}
        title="Entrar"
      >
        <LoginForm 
          onCloseModalAction={() => setIsLoginModalOpen(false)}
          onRegisterClickAction={openRegisterModal}
        />
      </Modal>

      <Modal
        isOpen={isRegisterModalOpen}
        onCloseAction={() => setIsRegisterModalOpen(false)}
        title="Criar Conta"
      >
        <RegisterForm 
          onCloseModalAction={() => setIsRegisterModalOpen(false)}
          onLoginClickAction={openLoginModal}
        />
      </Modal>
    </header>
  );
}
