'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
 // Assuming you have a CSS file for styles

const Lookbook = () => {
  return (
    <section className="container my-5">
      <div className="row g-0 align-items-center flex-lg-row flex-column-reverse">
        
        {/* LEFT: Text Section */}
        <div className="col-lg-6 bg-light p-4 p-md-5 text-center text-lg-start">
          <h5 className="text-uppercase fw-bold mb-3 fs-6">Lookbook</h5>
          <p className="fs-6 fs-md-5 lh-base lh-lg">
            At <strong>BOTTEGA9</strong>, we turn interior design into an art form — blending
            simplicity and elegance to create timeless spaces. Discover how design
            and production go hand in hand in our latest work.
          </p>
        </div>

        {/* RIGHT: Image + Overlay */}
        <div className="col-lg-6 position-relative p-0">
          <img
            src="https://static.wixstatic.com/media/57adc0_2fcc6f5cf163454b912759b63e7e8026~mv2.png/v1/fill/w_885,h_528,al_c,q_90,usm_2.00_1.00_0.00,enc_avif,quality_auto/57adc0_2fcc6f5cf163454b912759b63e7e8026~mv2.png"
            alt="Lookbook"
            className="img-fluid w-100 lookbook-image"
            style={{
              objectFit: 'cover',
              height: '100%',
              minHeight: '400px',
              maxHeight: '600px',
            }}
          />

          {/* Overlay Content */}
          <div className="overlay-content position-absolute top-50 start-50 translate-middle text-white text-center px-3">
            <h2 className="display-6 display-md-5 fw-semibold fst-italic border-bottom border-white d-inline-block pb-1">
              Look book<br /><span className="fw-bold">{new Date().getFullYear()}.</span>
            </h2>
            <br />
            <button
              onClick={() => window.location.href = '/lookbook-2023'}
              className="btn btn-outline-light mt-3 d-flex align-items-center gap-2 mx-auto"
            >
              EXPLORE
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

     
    </section>
  );
};

export default Lookbook;
