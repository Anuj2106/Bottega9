"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId,SetuserId]=useState(null);
  const router = useRouter();

  const loginUser = async (email, password) => {
   
    try {
      const response = await axios.post(`${apiUrl}/api/login`, { 
        user_email:email,
         user_pass:password
         }, { withCredentials: true });

      const userData = response.data.user; // assuming backend sends { user: { id, name, role_id, ... } }

      setUser(userData);

      setIsAuthenticated(true);

      // ✅ Redirect based on role_id
      if (userData.role_id === 3) {
        router.push("/");
      } else {
        router.push("/dashboard");
      }

    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      alert("Invalid email or password");
    }
  };


  

  const logout = async () => {
    try {
      await axios.post(`${apiUrl}/api/logout`, {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/checksession`, { withCredentials: true });
      setUser(res.data.user);
        SetuserId(res.data.user.user_id);
      setIsAuthenticated(true);
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, user, isAuthenticated, loading, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
