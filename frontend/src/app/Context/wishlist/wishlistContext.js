"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/authContext"; // Make sure this path is correct
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { userId, isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]); // just the IDs
  const [wishlistItems, setWishlistItems] = useState([]); // full product data

  // Fetch wishlist items from API on login/user change
  useEffect(() => {
    if (isAuthenticated && userId) {
      axios
        .get(`${apiUrl}/api/wishlist/${userId}`)
        .then((res) => {
          // If response is [ {prod_id, ...productData} ]
          setWishlist(res.data.map((item) => item.prod_id)); // Only IDs
          setWishlistItems(res.data); // All product data for display
         
          
        })
        .catch((err) => console.error("Wishlist fetch error:", err));
    } else {
      // If user logs out, clear wishlist
      setWishlist([]);
      setWishlistItems([]);
    }
    console.log(isAuthenticated);
    
   
    
  }, [userId, isAuthenticated]);

  // Toggle wishlist
  const toggleWishlist = async (prod_id) => {
    if (!isAuthenticated || !userId) {
      console.warn("User must be logged in to toggle wishlist.");
      return;
    }

    try {
      const res = await axios.post(
        `${apiUrl}/api/wishlist/toggle`,
        {
          user_id: userId,
          prod_id,
        }
      );

      // Refresh wishlist after toggle for latest data
      // Or update in-place if you know what changed
      axios
        .get(`${apiUrl}/api/wishlist/${userId}`)
        .then((res) => {
          setWishlist(res.data.map((item) => item.prod_id));
          setWishlistItems(res.data);
        })
        .catch((err) => console.error("Wishlist fetch error after toggle:", err));
    } catch (err) {
      console.error("Toggle wishlist error:", err);
    }
  };
  const removeFromWishlist = async (prod_id) => {
  if (!isAuthenticated || !userId) return;
  try {
    await axios.delete(
      `${apiUrl}/api/wishlist/${userId}/${prod_id}`
    );
    // Refresh the wishlist data
    const res = await axios.get(`${apiUrl}/api/wishlist/${userId}`);
    setWishlist(res.data.map(item => item.prod_id));
    setWishlistItems(res.data);
  } catch (err) {
    console.error("Remove from wishlist error:", err);
  }
};


  const isWishlisted = (prod_id) => wishlist.includes(prod_id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,       // Fast ID-based access
        wishlistItems,
        removeFromWishlist,  // Full data for display
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
