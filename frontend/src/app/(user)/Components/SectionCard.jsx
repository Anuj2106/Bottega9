'use client';

import { useState } from "react";
import { Heart } from "lucide-react";
import "../Css/SectionCard.css";
import Products from "../../api/Products/route";
import Image from "next/image";
import AOSWrapper from "./Aos";

const SectionCard = ({
  showBadge = true,
  showDescription = true,
  showRating = true,
  showAddToCart = true,
}) => {
  const [likedItems, setLikedItems] = useState({});

  const toggleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const truncateDescription = (text, maxWords = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
  };

  return (
    <AOSWrapper animation="fade-up" delay={100} duration={2000}>
      <section className="container my-5">
        <div className="horizontal-scroll-wrapper">
          {Products.map((product) => {
            const images = Array.isArray(product.images)
              ? product.images
              : product.imageUrl
              ? [product.imageUrl]
              : [];

            const carouselId = `carousel-${product.id}`;

            return (
              <div className="card section-product-card flex-shrink-0" key={product.id}>
                {/* Image Section */}
                <div className="image-container">
                  {showBadge && (
                    <span className="product-badge">
                      {product.isBestSeller ? "Best Seller" : ""}
                    </span>
                  )}

                  {/* Wishlist */}
                  <button
                    className="wishlist-btn"
                    onClick={() => toggleLike(product.id)}
                    aria-label={likedItems[product.id] ? 'Unlike' : 'Like'}
                  >
                    <Heart
                      size={18}
                      fill={likedItems[product.id] ? "red" : "none"}
                      color={likedItems[product.id] ? "red" : "var(--brand)"}
                    />
                  </button>

                  {/* Carousel */}
                  <div id={carouselId} className="carousel slide" data-bs-touch="true" data-bs-interval="false">
                    <div className="carousel-inner">
                      {images.map((imgUrl, i) => (
                        <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                          <Image
                            src={imgUrl}
                            width={300}
                            height={300}
                            alt={`${product.name} image ${i + 1}`}
                            className="product-img"
                            unoptimized
                            priority={i === 0}
                          />
                        </div>
                      ))}
                    </div>

                    {images.length > 1 && (
                      <div className="carousel-indicators">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            data-bs-target={`#${carouselId}`}
                            data-bs-slide-to={i}
                            className={i === 0 ? "active" : ""}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body p-3">
                  <h5 className="product-name">{product.name}</h5>

                  {showDescription && (
                    <p className="product-desc">{truncateDescription(product.description)}</p>
                  )}

                  {showRating && (
                    <span className="badge bg-light text-dark border rounded-pill small mb-2 d-inline-block">
                      ★ 4.9 • Luxe Rated
                    </span>
                  )}

                  {/* Price + Add to Cart now in body */}
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div>
                      {product.offerPrice && product.offerPrice < product.price ? (
                        <>
                          <span className="price-new">₹{product.offerPrice}</span>
                          <span className="price-old">₹{product.price}</span>
                        </>
                      ) : (
                        <span className="price-new">₹{product.price}</span>
                      )}
                    </div>

                    {showAddToCart && (
                      <button className="btn btn-brand btn-sm rounded-pill px-3">
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </AOSWrapper>
  );
};

export default SectionCard;
