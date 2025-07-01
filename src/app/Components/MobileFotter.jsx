'use client';

import React from 'react';
import { User, Heart, Search } from 'lucide-react';
import '../Css/mobileFooter.css'; // external styles

const MobileFooter = () => {
  return (
    <footer className="mobile-footer d-lg-none d-md-none d-block">
      <div className="footer-icons d-flex justify-content-around align-items-center text-center">
        
        <div className="footer-item">
          <User size={22} />
          <small className="footer-label">Login</small>
        </div>

        <div className="footer-item">
          <Heart size={22} />
          <small className="footer-label">Wishlist</small>
        </div>

        <div className="footer-item">
          <Search size={22} />
          <small className="footer-label">Search</small>
        </div>

      </div>
    </footer>
  );
};

export default MobileFooter;
