'use client';

import { X, Plus, Minus, MapPin } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../utils/format';
import { useState } from 'react';
import { Modal } from './Modal';
import { DeliveryForm } from './DeliveryForm';
import { ShoppingCart } from 'lucide-react';

interface CartPanelProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

export function CartPanel({ isOpen, onCloseAction }: CartPanelProps) {
  const { items, removeItem, updateQuantity, handleOrderComplete } = useCart();
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);

  const total = items.reduce((acc, item) => {
    const itemTotal = (item.size.price + item.extras.reduce((sum, extra) => sum + extra.price, 0)) * item.quantity;
    return acc + itemTotal;
  }, 0);

  const formatOrder = () => {
    const orderDetails = [
      `🍨 *Pedido Açaí Goitacá*`,
      ...items.map(item => [
        `\n*Item ${items.indexOf(item) + 1}:*`,
        `Tamanho: ${item.size.size}`,
        `Base: ${item.base.name}`,
        `Complementos:`,
        ...item.complements.map(c => `- ${c.name}`),
        `Cobertura: ${item.topping.name}`,
        item.extras.length > 0 ? `Extras:` : '',
        ...item.extras.map(e => `- ${e.name}`),
        `Quantidade: ${item.quantity}`,
        `Subtotal: R$ ${(item.size.price + item.extras.reduce((sum, extra) => sum + extra.price, 0)) * item.quantity}`,
      ].join('\n')),
      `\n*Total: R$ ${total.toFixed(2)}*`
    ].join('\n');
    return encodeURIComponent(orderDetails);
  };

  const handleSubmitOrder = () => {
    if (items.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    window.location.href = `https://wa.me/5521990075396?text=${formatOrder()}`;
    handleOrderComplete(); // Chama a função do contexto para atualizar o total gasto
    onCloseAction(); // Fecha o painel do carrinho
  };

  const handleQuantityChange = (itemId: string, currentQuantity: number, newQuantity: number) => {
    if (currentQuantity === 1 && newQuantity === 0) {
      if (window.confirm('Deseja remover este item do carrinho?')) {
        removeItem(itemId);
      }
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCloseDelivery = () => {
    setIsDeliveryModalOpen(false);
    onCloseAction(); // Fecha também o carrinho
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100]">
      <div className="fixed right-0 top-0 h-full w-full sm:w-[350px] md:w-[400px] lg:w-[450px] bg-white shadow-xl flex flex-col">
        {/* Header do Carrinho */}
        <div className="bg-[#8f527b] p-3 sm:p-4 md:p-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-playfair">Seu Pedido</h2>
            <button
              onClick={onCloseAction}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Conteúdo do Carrinho */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-[#8f527b]/50" />
              <p className="text-base sm:text-lg font-medium">Seu carrinho está vazio</p>
              <p className="text-xs sm:text-sm mt-2">Adicione alguns itens deliciosos!</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg border border-gray-100 shadow-sm p-2.5 sm:p-3">
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#8f527b]">
                        Açaí {item.size.size}
                      </h3>
                      <div className="mt-1.5 sm:mt-2 space-y-0.5 sm:space-y-1 text-xs sm:text-sm text-gray-600">
                        <p><span className="font-medium">Base:</span> {item.base.name}</p>
                        {item.complements.length > 0 && (
                          <div>
                            <p className="font-medium">Complementos:</p>
                            <ul className="ml-3 sm:ml-4 list-disc">
                              {item.complements.map((c, idx) => (
                                <li key={idx}>{c.name}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {item.topping.name !== 'Sem cobertura' && (
                          <p><span className="font-medium">Cobertura:</span> {item.topping.name}</p>
                        )}
                        {item.extras.length > 0 && (
                          <div>
                            <p className="font-medium">Extras:</p>
                            <ul className="ml-3 sm:ml-4 list-disc">
                              {item.extras.map((e, idx) => (
                                <li key={idx}>{e.name} (+R$ {e.price.toFixed(2)})</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 sm:pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-1.5 sm:space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity, item.quantity - 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-[#8f527b]/10 text-[#8f527b] hover:bg-[#8f527b]/20"
                      >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <span className="font-medium text-[#8f527b] w-6 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity, item.quantity + 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-[#8f527b]/10 text-[#8f527b] hover:bg-[#8f527b]/20"
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    <div className="text-[#8f527b] font-semibold text-sm sm:text-base">
                      R$ {((item.size.price + item.extras.reduce((sum, extra) => sum + extra.price, 0)) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer do Carrinho */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-3 sm:p-4 md:p-5 bg-white">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-sm sm:text-base font-semibold text-gray-700">Total</span>
              <span className="text-base sm:text-lg md:text-xl font-bold text-[#8f527b]">
                R$ {total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => setIsDeliveryModalOpen(true)}
              className="w-full bg-[#8f527b] text-white py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#8f527b]/90 transition-colors flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              Finalizar Pedido
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={isDeliveryModalOpen}
        onCloseAction={() => setIsDeliveryModalOpen(false)}
        title="Endereço de Entrega"
      >
        <DeliveryForm onCloseAction={handleCloseDelivery} />
      </Modal>
    </div>
  );
} 