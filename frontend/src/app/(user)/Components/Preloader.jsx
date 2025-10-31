"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const Preloader = ({ onFinish }) => {
  const [isZoomingOut, setIsZoomingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsZoomingOut(true); // start zoom out
      setTimeout(() => {
        onFinish(); // remove preloader after animation
      }, 1000); // match animation duration
    }, 1500); // simulate data load
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-container">
      <Image
        src="/image/Logo.png"
        alt="Preloader"
        width={300}
        height={300}
        className={`splash-image ${isZoomingOut ? "zoom-out" : ""}`}
      />
    </div>
  );
};

export default Preloader;
