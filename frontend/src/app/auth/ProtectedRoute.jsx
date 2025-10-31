import { useAuth } from "@/app/Context/auth/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, blockedRoles = [] }) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // 🚫 Guest user → redirect to login
      if (!isAuthenticated) {
        router.push("/");
        return;
      }

      // 🚫 Authenticated but blocked role
      if (!user?.role_id || blockedRoles.includes(user.role_id)) {
        router.push("/");
        return;
      }
    }
  }, [isAuthenticated, loading, user, router, blockedRoles]);

  if (loading) return <div>Loading...</div>;

  return children;
}
