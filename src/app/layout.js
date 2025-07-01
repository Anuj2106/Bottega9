'use client'; 

import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useEffect } from 'react';
import MobileFooter from "./Components/MobileFotter";
// Import CSS (OK here)





export default function RootLayout({ children }) {
   useEffect(() => {
    if (typeof document !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);
  return (
    <html lang="en">
      <title> Bontega9</title>
      <body >
        <div className="universal-container">

        {children}
        </div>
        <MobileFooter />
      </body>
    </html>
  );
}
