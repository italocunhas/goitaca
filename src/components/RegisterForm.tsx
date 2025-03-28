'use client';

import { useState } from 'react';
import { Loader2, Mail, Lock, User, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export function RegisterForm({ 
  onCloseModalAction, 
  onLoginClickAction 
}: { 
  onCloseModalAction: () => void;
  onLoginClickAction: () => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    emailConsent: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.emailConsent) {
      setError('É necessário aceitar o recebimento de e-mails para criar uma conta');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar conta');
      }

      if (data.success) {
        // Fazer login automaticamente após o registro
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          throw new Error('Erro ao fazer login após registro');
        }

        onCloseModalAction();
        router.refresh();
        router.push('/');
      } else {
        throw new Error('Erro ao criar conta');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[#8f527b] mb-2 font-playfair">Bem-vindo ao Açaí Goitacá!</h3>
        <p className="text-sm text-gray-600">Faça registro e ganhe acesso a promoções exclusivas e descontos especiais</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Nome Completo
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8f527b] focus:border-transparent transition-all text-sm pl-12"
              placeholder="Seu nome completo"
              required
            />
            <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8f527b] focus:border-transparent transition-all text-sm pl-12"
              placeholder="seu@email.com"
              required
            />
            <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Telefone
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8f527b] focus:border-transparent transition-all text-sm pl-12"
              placeholder="(00) 00000-0000"
            />
            <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Senha
          </label>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8f527b] focus:border-transparent transition-all text-sm pl-10"
              placeholder="••••••••"
              required
            />
            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0">
            <input
              type="checkbox"
              name="emailConsent"
              checked={true}
              disabled
              className="peer sr-only"
              required
            />
            <div className="w-5 h-5 border-2 border-[#8f527b] rounded flex items-center justify-center bg-[#8f527b]">
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <label className="text-sm text-gray-600">
            Eu autorizo o recebimento de e-mails sobre promoções, novidades e atualizações da Açaí Goitacá
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#8f527b] text-white py-3 rounded-lg font-semibold hover:bg-[#8f527b]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Criando conta...
            </>
          ) : (
            'Criar Conta'
          )}
        </button>

        <div className="text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <button 
            type="button" 
            onClick={onLoginClickAction}
            className="text-[#8f527b] hover:text-[#8f527b]/80 transition-colors font-medium"
          >
            Faça login
          </button>
        </div>
      </form>
    </div>
  );
} 