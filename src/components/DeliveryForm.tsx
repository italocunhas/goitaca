'use client';

import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface DeliveryFormData {
  cidade: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  pontoReferencia: string;
}

interface ValidationErrors {
  cidade?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  pontoReferencia?: string;
}

export function DeliveryForm({ onCloseAction }: { onCloseAction: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const { items, handleOrderComplete } = useCart();
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    rua: '',
    numero: '',
    bairro: '',
    complemento: '',
    pontoReferencia: ''
  });

  const total = items.reduce((acc, item) => {
    const itemTotal = (item.size.price + item.extras.reduce((sum, extra) => sum + extra.price, 0)) * item.quantity;
    return acc + itemTotal;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Atualiza o progresso do prêmio
      handleOrderComplete();

      // Formata a mensagem com os detalhes do pedido e endereço
      const message = formatWhatsAppMessage();
      
      // Envia a mensagem para o WhatsApp
      const whatsappUrl = `https://wa.me/5522997494416?text=${message}`;
      
      // Abre o WhatsApp em uma nova aba
      window.open(whatsappUrl, '_blank');

      // Fecha os modais
      onCloseAction();
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar pedido. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatWhatsAppMessage = () => {
    const orderDetails = [
      `🍨 *Novo Pedido - Açaí Goitacá*\n`,
      `*Dados do Cliente:*`,
      `Nome: ${formData.nome}`,
      `Telefone: ${formData.telefone}`,
      `\n*Endereço de Entrega:*`,
      `Rua: ${formData.rua}`,
      `Número: ${formData.numero}`,
      `Bairro: ${formData.bairro}`,
      formData.complemento ? `Complemento: ${formData.complemento}` : null,
      `Ponto de Referência: ${formData.pontoReferencia}`,
      `\n*Itens do Pedido:*`,
      ...items.map(item => [
        `\n*Item ${items.indexOf(item) + 1}:*`,
        `Tamanho: ${item.size.size}`,
        `Base: ${item.base.name}`,
        item.complements.length > 0 ? `Complementos:\n${item.complements.map(c => `- ${c.name}`).join('\n')}` : null,
        `Cobertura: ${item.topping.name}`,
        item.extras.length > 0 ? `Extras:\n${item.extras.map(e => `- ${e.name} (+R$ ${e.price.toFixed(2)})`).join('\n')}` : null,
        `Quantidade: ${item.quantity}`,
        `Subtotal: R$ ${(item.size.price + item.extras.reduce((sum, extra) => sum + extra.price, 0)) * item.quantity}`
      ].filter(Boolean)),
      `\n*Total do Pedido: R$ ${total.toFixed(2)}*`
    ].filter(Boolean).join('\n');

    return encodeURIComponent(orderDetails);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Informações Pessoais */}
          <div className="bg-[#8f527b]/5 p-3 sm:p-4 md:p-5 rounded-lg">
            <h3 className="text-[#8f527b] text-base sm:text-lg font-semibold mb-3">
              Informações Pessoais
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8f527b] focus:border-transparent transition-all"
                  placeholder="Digite seu nome"
                  required
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8f527b] focus:border-transparent transition-all"
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-[#8f527b]/5 p-3 sm:p-4 md:p-5 rounded-lg">
            <h3 className="text-[#8f527b] text-base sm:text-lg font-semibold mb-3">
              Endereço de Entrega
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                    Rua
                  </label>
                  <input
                    type="text"
                    name="rua"
                    value={formData.rua}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8f527b] focus:border-transparent transition-all"
                    placeholder="Nome da rua"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                    Número
                  </label>
                  <input
                    type="text"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8f527b] focus:border-transparent transition-all"
                    placeholder="Nº"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Bairro
                </label>
                <input
                  type="text"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8f527b] focus:border-transparent transition-all"
                  placeholder="Seu bairro"
                  required
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Complemento (opcional)
                </label>
                <input
                  type="text"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8f527b] focus:border-transparent transition-all"
                  placeholder="Apt, Bloco, etc."
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                  Ponto de Referência
                </label>
                <textarea
                  name="pontoReferencia"
                  value={formData.pontoReferencia}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8f527b] focus:border-transparent transition-all"
                  placeholder="Ex: Próximo ao mercado, casa azul..."
                  rows={2}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Total e Botão */}
        <div className="pt-4 sm:pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm sm:text-base text-gray-700 font-medium">
              Total do Pedido:
            </span>
            <span className="text-lg sm:text-xl font-bold text-[#8f527b]">
              R$ {total.toFixed(2)}
            </span>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#8f527b] text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#8f527b]/90 transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                Finalizar Pedido
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 