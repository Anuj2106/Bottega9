'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { CircleChevronRight, CircleChevronLeft } from 'lucide-react';
import '../Css/hero.module.css'; // Import the new CSS file

const Hero = ({ Page }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

  
  useEffect(() => {
    const fetchBanners = async () => {
      if (!Page) return;
      try {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/api/banner/index/${Page}`);
        setBanners(res.data || []);
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, [Page]);
  
  if (loading) {
    return (
      <section className="hero-section loading d-flex align-items-center justify-content-center">
        <p>Loading...</p>
      </section>
    );
  }

  if (!banners.length) {
    return null;
  }

  return (
    <section className="hero-section container-fluid position-relative d-flex align-items-center">
      <div className="hero-overlay"></div>
      <div
        id="heroCarousel"
        className="carousel slide w-100"
        data-bs-ride="carousel"
        data-bs-interval="6000"
        data-bs-touch="true"
      >
        <div className="carousel-inner">
          {banners.map((banner, index) => (
            <div
              key={banner.banner_id || index}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <div className="hero-container container d-flex flex-column flex-md-row align-items-center justify-content-between py-5 gap-4">
                
                {/* Left: Text */}
                <div className="hero-text text-center text-md-start px-4 animate-fade-up">
                  <h3 className="hero-title display-3 fw-bold mb-4">
                    {banner.banner_title || 'Our Story'}
                  </h3>
                  <p className="hero-subtitle lead mb-4 animate-fade-up delay-1">
                    {banner.banner_subhead || 'Where artisanal craftsmanship meets modern elegance.'}
                  </p>
                  {(banner.banner_link || banner.banner_btn_text) && (
                    <a
                      href={banner.banner_link || '#philosophy'}
                      className="btn btn-brand btn-lg fw-semibold animate-fade-up delay-2"
                    >
                      {banner.banner_btn_text || 'Discover Our Philosophy'}
                    </a>
                  )}
                </div>
                
                {/* Right: Media */}
                <div className="hero-media px-4 animate-fade-left d-flex align-items-center justify-content-center w-100">
                  {banner.banner_video ? (
                    <video
                      className="hero-video img-fluid rounded-4 shadow-lg hover-scale w-100"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source
                        src={`${apiUrl}/uploads/banner_media/${banner.banner_video}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : banner.banner_img ? (
                    <Image
                      src={`${apiUrl}/uploads/banner_media/${banner.banner_img}`}
                      alt={banner.banner_title || 'Banner'}
                      width={800}
                      height={600}
                      className="hero-image img-fluid rounded-4 shadow-lg hover-scale"
                      priority={index === 0}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        {banners.length > 1 && (
          <div>
            <button
              className="carousel-control-prev hero-control"
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide="prev"
            >
              <CircleChevronLeft size={32} color="#fff" />
            </button>
            <button
              className="carousel-control-next hero-control"
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide="next"
            >
              <CircleChevronRight size={32} color="#fff" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
