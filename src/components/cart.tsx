'use client';

import { useState } from 'react';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

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
    window.location.href = `https://wa.me/5522997494416?text=${formatOrder()}`;
    clearCart();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
      >
        <ShoppingCart size={24} />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-h-[80vh] rounded-t-2xl p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-purple-900">Seu Carrinho</h2>
              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Seu carrinho está vazio</p>
            ) : (
              <>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{item.size.size}</h3>
                          <p className="text-sm text-gray-600">{item.base.name}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)}>
                          <X size={16} className="text-gray-500" />
                        </button>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <p>Complementos: {item.complements.map(c => c.name).join(', ')}</p>
                        <p>Cobertura: {item.topping.name}</p>
                        {item.extras.length > 0 && (
                          <p>Extras: {item.extras.map(e => e.name).join(', ')}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="font-semibold">
                          R$ {(item.size.price + item.extras.reduce((sum, extra) => sum + extra.price, 0)) * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span>Total:</span>
                    <span className="font-bold text-purple-600">R$ {total.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={handleSubmitOrder}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Fazer Pedido
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
} 