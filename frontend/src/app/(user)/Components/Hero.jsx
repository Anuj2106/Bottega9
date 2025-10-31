'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { CircleChevronRight, CircleChevronLeft } from 'lucide-react';
import Link from 'next/link';

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
      <section className="hero-section d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
        <p>Loading...</p>
      </section>
    );
  }

  if (!banners.length) {
    return null;
  }

  return (
    <section className="hero-section my-3 position-relative">
      <div
        id="heroCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="5000"
        data-bs-touch="true"
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          {banners.map((_, idx) => (
            <button
              key={idx}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={idx}
              className={idx === 0 ? 'active' : ''}
              aria-current={idx === 0 ? 'true' : undefined}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Banner Slides */}
        <div className="carousel-inner">
          {banners.map((banner, index) => (
            <div
              key={banner.banner_id || index}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              {banner.banner_img && (
                <div className="position-relative w-100" style={{ height: '70vh', overflow: 'hidden' }}>
                  <Image
                    src={`${apiUrl}/uploads/banner_media/${banner.banner_img}`}
                    alt={banner.banner_title || 'Banner'}
                    fill
                    className="d-block w-100"
                    style={{ objectFit: 'cover' }}
                    priority={index === 0}
                  />
                  {/* Overlay text */}
                  {/* <div className="carousel-caption top-50 start-50 translate-middle text-center">
                    <h1 className="    text-white mb-3">{banner.banner_title}</h1>
                    {banner.banner_subhead && (
                      <h3 className="lead text-white mb-4">{banner.banner_subhead}</h3>
                    )}
                    <Link
                      href={`/shop/${banner.banner_page}`}
                      className="btn btn-dark btn-lg fw-semibold"
                    >

                      {banner.banner_btn_text || 'Shop Now'}
                    </Link>
                  </div> */}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        {banners.length > 1 && (
          <>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide="prev"
            >
              <CircleChevronLeft size={32} color="#fff" />
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide="next"
            >
              <CircleChevronRight size={32} color="#fff" />
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
