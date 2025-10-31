'use client';

import React from 'react';
import { User, ShoppingCart, Heart, Search } from 'lucide-react';
import '../Css/mobileFooter.css';
import Link from 'next/link';
import { useWishlist } from "@/app/Context/wishlist/wishlistContext";
import { useCart } from "@/app/Context/cart/cartContext";

const MobileFooter = () => {
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  return (
    <footer className="mobile-footer d-lg-none d-md-none d-block shadow-lg">
      <div className="footer-icons d-flex justify-content-around align-items-center text-center">
        
        {/* Login */}
        <Link href="/auth/Login" className="footer-item text-decoration-none">
          <User size={22} />
          <small className="footer-label">Login</small>
        </Link>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className="footer-item position-relative text-decoration-none"
        >
          <Heart />
          {wishlist.length > 0 && (
            <small className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {wishlist.length}
            </small>
          )}
          <small className="footer-label">Wishlist</small>
        </Link>

       

        {/* Cart */}
        <Link
          href="/cart"
          className="footer-item position-relative text-decoration-none"
        >
          <ShoppingCart size={22} />
          {cart.length > 0 && (
            <small className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
              {cart.length}
            </small>
          )}
          <small className="footer-label">Cart</small>
        </Link>

      </div>
    </footer>
  );
};

export default MobileFooter;
