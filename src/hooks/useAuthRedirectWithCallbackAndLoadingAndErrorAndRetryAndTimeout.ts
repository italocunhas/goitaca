import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RedirectConfig {
  authenticated?: string;
  unauthenticated?: string;
  onAuthenticated?: () => void;
  onUnauthenticated?: () => void;
  timeout?: number;
}

export const useAuthRedirectWithCallbackAndLoadingAndErrorAndRetryAndTimeout = (config: RedirectConfig) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleRedirect = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (status === "authenticated") {
        if (config.authenticated) {
          router.push(config.authenticated);
        }
        if (config.onAuthenticated) {
          config.onAuthenticated();
        }
      } else if (status === "unauthenticated") {
        if (config.unauthenticated) {
          router.push(config.unauthenticated);
        }
        if (config.onUnauthenticated) {
          config.onUnauthenticated();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao redirecionar");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleRedirect();

    if (config.timeout) {
      const id = setTimeout(() => {
        setError("Tempo limite excedido");
        setIsLoading(false);
      }, config.timeout);

      setTimeoutId(id);

      return () => {
        clearTimeout(id);
      };
    }
  }, [status, router, config]);

  return { session, status, isLoading, error, retry: handleRedirect };
}; 