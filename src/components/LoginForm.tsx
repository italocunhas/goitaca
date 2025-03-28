'use client';

import { useState, useEffect } from 'react';
import { Loader2, Mail, Lock } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function LoginForm({ 
  onCloseModalAction, 
  onRegisterClickAction 
}: { 
  onCloseModalAction: () => void;
  onRegisterClickAction: () => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email ou senha inválidos');
        return;
      }

      // Salvar credenciais no localStorage para login automático
      localStorage.setItem('userCredentials', JSON.stringify({
        email: formData.email,
        password: formData.password
      }));

      onCloseModalAction();
      router.refresh();
      router.push('/');
    } catch (error) {
      setError('Ocorreu um erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar login automático ao montar o componente
  useEffect(() => {
    const savedCredentials = localStorage.getItem('userCredentials');
    if (savedCredentials) {
      const { email, password } = JSON.parse(savedCredentials);
      signIn('credentials', {
        email,
        password,
        redirect: false,
      }).then(result => {
        if (!result?.error) {
          router.refresh();
          router.push('/');
        } else {
          // Se as credenciais salvas não funcionarem, removê-las
          localStorage.removeItem('userCredentials');
        }
      });
    }
  }, [router]);

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[#8f527b] mb-2 font-playfair">Bem-vindo de volta!</h3>
        <p className="text-sm text-gray-600">Faça login e aproveite suas promoções exclusivas</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#8f527b] text-white py-3 rounded-lg font-semibold hover:bg-[#8f527b]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">ou</span>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          Ainda não tem uma conta?{' '}
          <button 
            type="button" 
            onClick={onRegisterClickAction}
            className="text-[#8f527b] hover:text-[#8f527b]/80 transition-colors font-medium"
          >
            Registre-se agora
          </button>
        </div>
      </form>
    </div>
  );
} 