"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/authContext";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const { isAuthenticated, userId } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchCart();
    } else {
      setCart([]); // clear cart on logout
    }
  }, [isAuthenticated, userId]);

  const fetchCart = async () => {
    if (!isAuthenticated || !userId) return;
    try {
      const res = await axios.get(`${apiUrl}/api/cart/${userId}`);
      setCart(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (prodId, extra = {}) => {
    if (!isAuthenticated || !userId) return alert("Please login to continue");
    try {
      const res = await axios.post(`${apiUrl}/api/cart/add`, {
        user_id: userId,
        prod_id: prodId,
        color: extra.color || null,
      });
      setCart((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (prodId) => {
    if (!isAuthenticated || !userId) return alert("Please login to continue");
    try {
      await axios.delete(`${apiUrl}/api/cart/remove/${userId}/${prodId}`);
      setCart((prev) => prev.filter((item) => item.prod_id !== prodId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (prodId, newQty) => {
    if (!isAuthenticated || !userId) return alert("Please login to continue");
    try {
      await axios.put(`${apiUrl}/api/cart/update`, { user_id: userId, prod_id: prodId, quantity: newQty });
      setCart((prev) =>
        prev.map((item) => (item.prod_id === prodId ? { ...item, quantity: newQty } : item))
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated || !userId) return alert("Please login to continue");
    try {
      await axios.delete(`${apiUrl}/api/cart/clear/${userId}`);
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, fetchCart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
