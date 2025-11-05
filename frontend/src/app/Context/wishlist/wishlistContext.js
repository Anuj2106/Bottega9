"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/authContext";

const WishlistContext = createContext();
export const WishlistProvider = ({ children }) => {
  const { userId, isAuthenticated } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

  const [wishlist, setWishlist] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchWishlist();
    } else {
      setWishlist([]);
      setWishlistItems([]);
    }
  }, [userId, isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/wishlist/${userId}`);
      setWishlist(res.data.map((item) => item.prod_id));
      setWishlistItems(res.data);
    } catch (err) {
      console.error("Wishlist fetch error:", err);
    }
  };

  const toggleWishlist = async (prod_id) => {
    if (!isAuthenticated || !userId) return;
    try {
      await axios.post(`${apiUrl}/api/wishlist/toggle`, { user_id: userId, prod_id });
      fetchWishlist(); // refresh after toggle
    } catch (err) {
      console.error("Toggle wishlist error:", err);
    }
  };

  const removeFromWishlist = async (prod_id) => {
    if (!isAuthenticated || !userId) return;
    try {
      await axios.delete(`${apiUrl}/api/wishlist/${userId}/${prod_id}`);
      fetchWishlist();
    } catch (err) {
      console.error("Remove from wishlist error:", err);
    }
  };

  const isWishlisted = (prod_id) => wishlist.includes(prod_id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, wishlistItems, toggleWishlist, removeFromWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
