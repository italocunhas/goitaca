'use client'

import { ArrowRight } from 'lucide-react';
import { BASES } from '../data';

export function Hero() {
  const handleMontarAcai = () => {
    const tamanhoSection = document.getElementById('tamanho');
    if (tamanhoSection) {
      const headerOffset = 150; // Aumentado para garantir mais espaço
      const elementPosition = tamanhoSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const acaiDelicioso = BASES.find(base => base.name === 'Açaí Delicioso');

  return (
    <div className="relative w-full">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full border-4 border-[#8f527b]"
        style={{
          backgroundImage: `url('/images/acaihero.png')`,
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#8f527b]/90 to-[#8f527b]/90 w-full" />
      
      {/* Content */}
      <div className="relative w-full py-24 sm:py-28 md:py-32 lg:py-36">
        <div className="max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Text Content */}
          <div className="text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
              O Melhor Açaí de Campos
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8">
              Monte seu açaí personalizado com as melhores frutas, complementos e coberturas. 
              Uma experiência única de sabor e qualidade.
            </p>
            <button 
              onClick={handleMontarAcai}
              className="bg-white text-[#8f527b] px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:bg-[#8f527b]/10 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              Montar Açaí
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}