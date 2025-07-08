'use client';

import React from 'react';
import styles from '../Css/hero.module.css'; // Assuming you have a CSS module for styling
import { CircleChevronRight, CircleChevronLeft } from 'lucide-react';

const Hero = () => {
  return (
    <section className='container my-4'>
    <div  id="heroCarousel"
  className="carousel slide carousel-fade"
  data-bs-ride="carousel"
  data-bs-interval="5000"
  data-bs-touch="true" >
      <div className="carousel-inner g-0 px-0 ">

        {/* Slide 1 */}
        <div className="carousel-item active ">
          <div className={`${styles.heroContainer} position-relative`}>
            <video className={`${styles.heroVideo} w-100`} autoPlay muted loop playsInline>
              <source src="https://video.wixstatic.com/video/522d2f_a2fbe76fb00249568775c69ca4dbecd9/1080p/mp4/file.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className={`${styles.heroContent} position-absolute top-50 start-50 translate-middle text-center`}>
              <h1 className="display-5 fw-semibold primary-text">Timeless Craftsmanship</h1>
              <p className="lead primary-text">Elegant | Handmade | Luxurious</p>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item">
          <div className={`${styles.heroContainer} position-relative`}>
            <video className={`${styles.heroVideo} w-100`} autoPlay muted loop playsInline>
              <source src="https://www.josmostudio.com/cdn/shop/videos/c/vp/5334b8cb54ae41bb866d5780c1e624dd/5334b8cb54ae41bb866d5780c1e624dd.HD-1080p-2.5Mbps-49862222.mp4?v=0" type="video/mp4" />
            </video>
            <div className={`${styles.heroContent} position-absolute top-50 start-50 translate-middle text-center`}>
              <h1 className="display-5 fw-semibold primary-text">Modern Luxury</h1>
              <p className="lead primary-text">Bold | Sophisticated | Unique</p>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item">
          <div className={`${styles.heroContainer} position-relative`}>
            <video className={`${styles.heroVideo} w-100`} autoPlay muted loop playsInline>
              <source src="https://cdn.shopify.com/videos/c/o/v/507f3db11e3b4d669de48c88349b4b3b.mp4" type="video/mp4" />
            </video>
            <div className={`${styles.heroContent} position-absolute top-50 start-50 translate-middle text-center`}>
              <h1 className="display-5 fw-semibold primary-text">Heritage Designs</h1>
              <p className="lead primary-text">Classic | Authentic | Handmade</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Lucide Controls */}
      <button className="carousel-control-prev d-none d-md-block bg-transparent border-0" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <CircleChevronLeft size={36} color="grey" />
      </button>
      <button className="carousel-control-next d-none d-md-block  bg-transparent border-0" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <CircleChevronRight size={36} color="grey"/>
      </button>
    </div>
    </section>
  );
};

export default Hero;
