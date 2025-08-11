    'use client';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './Context/auth/authContext';
export default function RootLayout({ children }) {
   useEffect(() => {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
     
      
    }, []);



  return (
    <html lang="en">
        
      <body>
     <AuthProvider>

      {/* Main content */}
      {children}
     </AuthProvider>
      </body>
    </html>
  );
}

     

