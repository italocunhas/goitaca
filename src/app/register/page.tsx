'use client';

import { RegisterForm } from '../../components/RegisterForm';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bem-vindo à Açaiteria
          </h1>
          <p className="text-xl text-gray-600">
            Crie sua conta e comece a montar seu açaí personalizado
          </p>
        </div>

        <RegisterForm 
          onCloseModalAction={() => router.back()}
          onLoginClickAction={() => router.push('/login')}
        />
      </div>
    </div>
  );
} 