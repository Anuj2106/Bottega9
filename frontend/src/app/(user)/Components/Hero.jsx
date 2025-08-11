'use client';

import React, { useEffect, useState } from 'react';
import styles from '../Css/hero.module.css';
import { CircleChevronRight, CircleChevronLeft } from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';

const Hero = ({ Page }) => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/banner/index/${Page}`);
        setBanners(res.data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };
  

    fetchBanners();
  }, [Page]);
  
  

  return (
    <section className="container my-4">
      <div
        id="heroCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="5000"
        data-bs-touch="true"
      >
        <div className="carousel-inner g-0 px-0">
          {banners.map((banner, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={banner.banner_id}>
              <div className={`${styles.heroContainer} position-relative`}>
                {/* Video if available */}
                {banner.banner_video ? (
                  <video
                    className={`${styles.heroVideo} w-100`}
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={`http://localhost:3001/uploads/banner_media/${banner.banner_video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : banner.banner_img ? (
                 
                  <div className={`${styles.heroVideo} w-100`}>
                    <Image
                      src={`http://localhost:3001/uploads/banner_media/${banner.banner_img}`}
                      alt={banner.heading}
                      layout="responsive"
                      width={1920}
                      height={1080}
                      priority
                      alt={banner.banner_img}
                     
                      
                    />
                  </div>
                ) : null}

                <div
                  className={`${styles.heroContent} position-absolute top-50 start-50 translate-middle text-center`}
                >
                  <h1 className="display-5 fw-semibold primary-text">{banner.banner_title}</h1>
                  <p className="lead primary-text">{banner.banner_subhead}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev d-none d-md-block bg-transparent border-0"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <CircleChevronLeft size={36} color="grey" />
        </button>
        <button
          className="carousel-control-next d-none d-md-block bg-transparent border-0"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <CircleChevronRight size={36} color="grey" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
