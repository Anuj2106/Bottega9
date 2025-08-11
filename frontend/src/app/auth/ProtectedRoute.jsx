import { useAuth } from "@/app/Context/auth/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, blockedRoles = [] }) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // ✅ Redirect if logged in AND (role missing OR role is blocked)
      if (
        isAuthenticated &&
        user &&
        (user.role_id === undefined || blockedRoles.includes(user.role_id))
      ) {
        router.push("/");
        console.log("hello i am routes");
        
      }
    }
  }, [isAuthenticated, loading, user, router, blockedRoles]);

  if (loading) return <div>Loading...</div>;

  return children;
}
