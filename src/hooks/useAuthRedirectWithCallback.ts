import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RedirectConfig {
  authenticated?: string;
  unauthenticated?: string;
  onAuthenticated?: () => void;
  onUnauthenticated?: () => void;
}

export const useAuthRedirectWithCallback = (config: RedirectConfig) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
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
  }, [status, router, config]);

  return { session, status };
}; 