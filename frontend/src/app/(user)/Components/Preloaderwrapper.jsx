"use client";
import { useState, useEffect } from "react";
import Preloader from "./Preloader";

const PreloaderWrapper = ({ children }) => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Show loader for 1.5s (or until some client-side data is ready)
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (showPreloader) {
    return <Preloader onFinish={() => setShowPreloader(false)} />;
  }

  return children;
};

export default PreloaderWrapper;
