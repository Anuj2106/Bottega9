'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/authContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { isAuthenticated, userId } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

  // ✅ Fetch cart on mount or when userId changes
  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchCart();
    }
  }, [isAuthenticated, userId]);

  // ✅ Fetch cart
  const fetchCart = async () => {
    if (!isAuthenticated || !userId) return;

    try {
      const res = await axios.get(`${apiUrl}/api/cart/${userId}`);
      setCart(res.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  // ✅ Add to cart (supports color)
  const addToCart = async (prodId, extra = {}) => {
    if (!isAuthenticated || !userId) {
      alert('Please login to continue');
      return;
    }

    try {
      await axios.post(`${apiUrl}/api/cart/add`, {
        user_id: userId,
        prod_id: prodId,
        color: extra.color || null, // ✅ send selected color (if any)
      });

      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // ✅ Remove from cart
  const removeFromCart = async (prodId) => {
    if (!isAuthenticated || !userId) {
      alert('Please login to continue');
      return;
    }

    try {
      await axios.delete(`${apiUrl}/api/cart/remove/${userId}/${prodId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  // ✅ Update quantity
  const updateQuantity = async (prodId, newQty) => {
    if (!isAuthenticated || !userId) {
      alert('Please login to continue');
      return;
    }

    try {
      await axios.put(`${apiUrl}/api/cart/update`, {
        user_id: userId,
        prod_id: prodId,
        quantity: newQty,
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // ✅ Clear cart
  const clearCart = async () => {
    if (!isAuthenticated || !userId) {
      alert('Please login to continue');
      return;
    }

    try {
      await axios.delete(`${apiUrl}/api/cart/clear/${userId}`);
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 🧩 Custom hook
export const useCart = () => useContext(CartContext);
