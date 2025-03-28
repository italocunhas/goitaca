'use client';

import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { SIZES, BASES, COMPLEMENTS, TOPPINGS, EXTRAS } from '../data';
import { useCart } from '../contexts/CartContext';
import { CartItem } from '../contexts/CartContext';
import { CartPanel } from './CartPanel';
import { useAcaiBuilder } from '../hooks/useAcaiBuilder';
import { useAcaiNavigation } from '../hooks/useAcaiNavigation';
import { Modal } from './Modal';
import { DeliveryForm } from './DeliveryForm';

export function Main() {
  const { addItem, items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { currentStep, scrollToNextStep, scrollToSection } = useAcaiNavigation();
  const {
    selectedSize,
    setSelectedSize,
    selectedBases,
    handleBaseToggle,
    selectedComplements,
    handleComplementToggle,
    selectedToppings,
    handleToppingToggle,
    selectedExtras,
    handleExtraToggle,
    quantity,
    setQuantity,
    calculateTotal,
    resetForm
  } = useAcaiBuilder();
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize || selectedBases.length === 0) {
      return;
    }

    const item: CartItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      size: {
        size: selectedSize.size,
        price: selectedSize.price
      },
      base: {
        name: selectedBases.join(', ')
      },
      topping: {
        name: selectedToppings.length > 0 ? selectedToppings.join(', ') : 'Sem cobertura'
      },
      complements: selectedComplements.map(name => ({ name })),
      extras: selectedExtras.map(name => ({
        name,
        price: EXTRAS.find(e => e.name === name)?.price || 0
      })),
      quantity: quantity
    };

    addItem(item);
    resetForm();
    
    setTimeout(() => {
      const tamanhoSection = document.getElementById('tamanho');
      if (tamanhoSection) {
        const headerOffset = 140; // Aumentado para 140px para dar mais espaço
        const elementPosition = tamanhoSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleSizeSelect = (size: typeof SIZES[0]) => {
    setSelectedSize(size);
    scrollToSection('base');
  };

  const handleBaseSelect = (base: typeof BASES[0]) => {
    const wasSelected = selectedBases.includes(base.name);
    handleBaseToggle(base.name);
    if (!wasSelected && selectedBases.length === 1) {
      scrollToSection('cobertura');
    }
  };

  const handleComplementSelect = (complement: typeof COMPLEMENTS[0]) => {
    const wasSelected = selectedComplements.includes(complement.name);
    handleComplementToggle(complement.name);
    
    if (!wasSelected && selectedComplements.length === 4) {
      setTimeout(() => {
        scrollToSection('extras');
      }, 100);
    }
  };

  const handleToppingSelect = (topping: typeof TOPPINGS[0]) => {
    const wasSelected = selectedToppings.includes(topping.name);
    handleToppingToggle(topping.name);
    if (!wasSelected && selectedToppings.length === 1) {
      scrollToSection('complementos');
    }
  };

  const handleExtraSelect = (extra: typeof EXTRAS[0]) => {
    handleExtraToggle(extra.name);
  };

  return (
    <main className="flex-1 pb-24">
      {/* Tamanho */}
      <section id="tamanho" className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-[#8f527b] font-playfair">Tamanho</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SIZES.map((size) => (
            <button
              key={size.size}
              onClick={() => handleSizeSelect(size)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedSize?.size === size.size
                  ? 'border-[#8f527b] bg-[#8f527b]/5'
                  : 'border-gray-200 hover:border-[#8f527b]'
              }`}
            >
              <div className="relative w-full aspect-square mb-2">
                <img 
                  src={size.image} 
                  alt={size.size} 
                  className="absolute inset-0 w-full h-full object-contain rounded-md" 
                />
              </div>
              <div className="text-lg font-bold">{size.size}</div>
              <div className="text-[#8f527b] font-bold">R$ {size.price.toFixed(2)}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Base */}
      <section id="base" className="bg-white rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 text-[#8f527b] font-playfair">Base (Escolha até 2)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {BASES.map((base) => (
            <button
              key={base.name}
              onClick={() => handleBaseSelect(base)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedBases.includes(base.name)
                  ? 'border-[#8f527b] bg-[#8f527b]/5'
                  : 'border-gray-200 hover:border-[#8f527b]'
              }`}
            >
              <img
                src={base.image}
                alt={base.name}
                className="w-full h-32 sm:h-40 object-cover rounded-lg mb-2"
              />
              <div className="text-lg font-bold text-center">{base.name}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Cobertura */}
      <section id="cobertura" className="bg-white rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 text-[#8f527b] font-playfair">Cobertura (Escolha até 2)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TOPPINGS.map((topping) => (
            <button
              key={topping.name}
              onClick={() => handleToppingSelect(topping)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedToppings.includes(topping.name)
                  ? 'border-[#8f527b] bg-[#8f527b]/5'
                  : 'border-gray-200 hover:border-[#8f527b]'
              }`}
            >
              <img
                src={topping.image}
                alt={topping.name}
                className="w-16 h-16 object-cover mx-auto rounded-full mb-2"
              />
              <div className="text-lg font-bold text-center">{topping.name}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Complementos */}
      <section id="complementos" className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-[#8f527b] font-playfair">Complementos (Escolha até 5)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COMPLEMENTS.map((complement) => (
            <button
              key={complement.name}
              onClick={() => handleComplementSelect(complement)}
              disabled={!selectedComplements.includes(complement.name) && selectedComplements.length >= 5}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedComplements.includes(complement.name)
                  ? 'border-[#8f527b] bg-[#8f527b]/5'
                  : 'border-gray-200 hover:border-[#8f527b]'
              } ${
                !selectedComplements.includes(complement.name) && selectedComplements.length >= 5
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              <img
                src={complement.image}
                alt={complement.name}
                className="w-16 h-16 object-cover mx-auto rounded-full mb-2"
              />
              <div className="text-lg font-bold text-center">{complement.name}</div>
              {selectedComplements.includes(complement.name) && (
                <Check size={20} className="text-[#8f527b] mx-auto mt-2" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Extras */}
      <section id="extras" className="bg-white rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 text-[#8f527b] font-playfair">Extras</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {EXTRAS.map((extra) => (
            <button
              key={extra.name}
              onClick={() => handleExtraSelect(extra)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedExtras.includes(extra.name)
                  ? 'border-[#8f527b] bg-[#8f527b]/5'
                  : 'border-gray-200 hover:border-[#8f527b]'
              }`}
            >
              <img
                src={extra.image}
                alt={extra.name}
                className="w-16 h-16 object-cover mx-auto rounded-full mb-2"
              />
              <div className="text-lg font-bold text-center">{extra.name}</div>
              <div className="text-[#8f527b] font-bold text-center">R$ {extra.price.toFixed(2)}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 sm:p-4 z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-end items-center gap-3 sm:gap-4 px-3 sm:px-4">
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex-1 sm:flex-none bg-white text-[#8f527b] border-2 border-[#8f527b] px-5 sm:px-6 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-[#8f527b]/5 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              Ver Carrinho {items.length > 0 && `(${items.length})`}
            </button>
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || selectedBases.length === 0}
              className="flex-1 sm:flex-none bg-[#8f527b] text-white px-5 sm:px-6 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-[#8f527b]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-md hover:shadow-lg"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>

      <CartPanel isOpen={isCartOpen} onCloseAction={() => setIsCartOpen(false)} />

      <Modal
        isOpen={isDeliveryModalOpen}
        onCloseAction={() => setIsDeliveryModalOpen(false)}
        title="Endereço de Entrega"
      >
        <DeliveryForm onCloseAction={() => setIsDeliveryModalOpen(false)} />
      </Modal>
    </main>
  );
} 