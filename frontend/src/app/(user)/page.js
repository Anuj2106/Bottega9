"use client";
import React, { useState, useEffect } from "react";
import Preloader from "./Components/Preloader"; // renamed Splash → Preloader
import "./Css/home.css";
import Highlights from "./Components/Highilights";
import Hero from "./Components/Hero";
import FeaturedCategory from "./Components/FeaturedCategory";
import FeaturedProduct from "./Components/FeaturedProduct";

const WestElmHomepage = () => {
  const [email, setEmail] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    // TODO: Add actual submission logic here
  };

  useEffect(() => {
    setHydrated(true);

    // ✅ Simulate data/API loading instead of just timeout
    const fetchData = async () => {
      try {
        // Example: preload featured products/categories
        await Promise.all([
          new Promise((resolve) => setTimeout(resolve, 1500)), // simulate API call
        ]);

        setShowPreloader(false); // hide preloader once ready
      } catch (err) {
        console.error("Preload failed", err);
        setShowPreloader(false);
      }
    };

    fetchData();
  }, []);

  if (!hydrated) return null; // Prevent SSR mismatch

  if (showPreloader) {
    return <Preloader onFinish={() => setShowPreloader(false)} />;
  }

  // ✅ Otherwise show the full homepage
  return (
    <>
 
    <div className="west-elm-homepage">

      {/* Promotional Banner */}
      <div className="promotional-banner">
        <div className="container">
          <span>15% off on Selected HDFC Credit cards* Use Code: HDFC15</span>
        </div>
      </div>

      {/* Hero Section */}
      <Hero Page="home"/>
      

     <Highlights/>
      {/* Featured Categories */}
     <FeaturedCategory/>

      {/* Featured Products */}
     <FeaturedProduct/>
   

      {/* Lifestyle Section */}
      <section className="lifestyle-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="lifestyle-image">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80" alt="Design Services" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="lifestyle-content">
                <h2 className="lifestyle-title">Free Design Services</h2>
                <p className="lifestyle-description">
                  Our design experts are here to help you create your dream space.<br />
                  Get personalized advice, room planning assistance, and styling tips - all complimentary.
                </p>
                <div className="lifestyle-features d-flex gap-4 mb-4">
                  <div className="feature-item">
                    <i className="fas fa-comments"></i>
                    <span>Design Chat</span>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-home"></i>
                    <span>Room Planning</span>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-tools"></i>
                    <span>Installation</span>
                  </div>
                </div>
                <button className="btn btn-primary btn-lg mt-2">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <section className="newsletter-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="newsletter-title">Sign Up For Sale &amp; New Arrivals</h2>
              <p className="newsletter-subtitle">
                Stay updated with the latest designs and exclusive offers
              </p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button className="btn btn-newsletter" type="submit">
                    Subscribe
                  </button>
                </div>
                <div className="form-check mt-3">
                  <input className="form-check-input" type="checkbox" id="privacyCheck" required />
                  <label className="form-check-label" htmlFor="privacyCheck">
                    I accept the West Elm Privacy Policy and consent to receiving updates and promotions
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> */}
    </div>
 </>

  );
};

export default WestElmHomepage;
