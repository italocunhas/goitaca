import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return { logout };
}; 