'use client';
import '@/app/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer';
import MobileFooter from './Components/MobileFotter';
import Topnavbar from './Components/TopNavbar';
import { WishlistProvider } from "@/app/Context/wishlist/wishlistContext";
import {CartProvider } from "@/app/Context/cart/cartContext";

export default function HomeLayout({ children }) {

 

  return (
    <>
   
          <WishlistProvider>
            <CartProvider>

        <div className="universal-container">
          <Topnavbar />
   

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
