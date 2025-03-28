import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      router.push("/login");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao registrar");
    } finally {
      setLoading(false);
    }
  };

  return { register, error, loading };
}; 