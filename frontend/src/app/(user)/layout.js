'use client';
import '@/app/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer';
import MobileFooter from './Components/MobileFotter';
import Topnavbar from './Components/TopNavbar';
import Header from './Components/Header';
import { WishlistProvider } from "@/app/Context/wishlist/wishlistContext";
import {CartProvider } from "@/app/Context/cart/cartContext";
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
export default function HomeLayout({ children }) {

   useEffect(() => {
    Aos.init({ once: true });
  }, []);

  return (
    <>
   
          <WishlistProvider>
            <CartProvider>

        <div className="universal-container">
          <Topnavbar />
          <Header />

          {children}
       
         
        </div>
        <MobileFooter />
    <Footer />
    {/*  Login MOdal  */}

            </CartProvider>
          </WishlistProvider>
    </>
     
  );
}
