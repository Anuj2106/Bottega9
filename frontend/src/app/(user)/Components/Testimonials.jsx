"use client";
import { useState, useRef } from "react";
import "../Css/Testimonial.css";
import person from "../../api/Testimonial/route";

const Testimonial = () => {
  const defaultVideo =
    "https://www.josmostudio.com/cdn/shop/videos/c/vp/7b802c1abfc944feb3e0088afb7c83a7/7b802c1abfc944feb3e0088afb7c83a7.HD-1080p-4.8Mbps-36204439.mp4?v=0";

  const [expandedVideoSrc, setExpandedVideoSrc] = useState(defaultVideo);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  const handleClick = (item) => {
    const videoToPlay = item.youtube ? item.youtube : item.video || defaultVideo;
    setShowVideo(false);
    setTimeout(() => {
      setExpandedVideoSrc(videoToPlay);
      setShowVideo(true);
      if (videoRef.current && !item.youtube) {
        videoRef.current.load();
      }
    }, 300);
  };

  const goToPrevSlide = () => {
    const slide = document.querySelector(".testimonial-sliderproduct-slider");
    if (slide) {
      slide.scrollBy({ left: -slide.clientWidth, behavior: "smooth" });
    }
  };

  const goToNextSlide = () => {
    const slide = document.querySelector(".testimonial-sliderproduct-slider");
    if (slide) {
      slide.scrollBy({ left: slide.clientWidth, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="testimonial-sliderslider py-5 bg-light">
        <div className="container">
          <h2 className="text-center text-capitalize text-decoration-underline mb-4">
            “What Customers Think About Us”
          </h2>

          {/* Navigation buttons */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button
              onClick={goToPrevSlide}
              className="btn testimonial-sliderprev-button"
              aria-label="Previous testimonials"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="#333"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={goToNextSlide}
              className="btn testimonial-slidernext-button"
              aria-label="Next testimonials"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="#333"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Slider */}
          <div className="testimonial-sliderproduct-slider d-flex gap-3 overflow-auto pb-3 no-scrollbar">
            {person.map((item) => (
              <div
                key={item.id}
                className="testimonial-card p-4 bg-white rounded shadow-sm text-center flex-shrink-0"
                style={{ width: "260px", cursor: "pointer" }}
                onClick={() => handleClick(item)}
              >
                <div className="profile-image-wrapper mx-auto mb-3">
                  <img
                    src={item.image}
                    alt={item.name || "Customer"}
                    className="profile-image rounded-circle border border-3 shadow-sm"
                    style={{
                      borderColor: "#ccc", // light grey instead of green
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                </div>
                <p className="review-message fst-italic text-muted mb-3" style={{ fontSize: "0.95rem" }}>
                  “{item.quote}”
                </p>
                <h6 className="reviewer-name fw-semibold mb-0">{item.name}</h6>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video / YouTube Player Section */}
      <section className="container ">
        <div
          className={`video-wrapper position-relative ${showVideo ? "fade-in" : "fade-out"}`}
        >
          {!expandedVideoSrc ? (
            <div>Loading...</div>
          ) : expandedVideoSrc.includes("youtube.com") ||
            expandedVideoSrc.includes("youtu.be") ? (
            <iframe
              width="100%"
              height="480"
              src={`${expandedVideoSrc}?modestbranding=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded shadow-sm"
            ></iframe>
          ) : (
            <video
              className="w-100 rounded shadow-sm"
              ref={videoRef}
              loop
              autoPlay
              muted
              controls
              preload="auto"
            >
              <source src={expandedVideoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </section>
    </>
  );
};

export default Testimonial;
