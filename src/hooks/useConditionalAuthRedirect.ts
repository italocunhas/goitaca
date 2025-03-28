import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RedirectConfig {
  authenticated?: string;
  unauthenticated?: string;
}

export const useConditionalAuthRedirect = (config: RedirectConfig) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && config.authenticated) {
      router.push(config.authenticated);
    } else if (status === "unauthenticated" && config.unauthenticated) {
      router.push(config.unauthenticated);
    }
  }, [status, router, config]);

  return { session, status };
}; 