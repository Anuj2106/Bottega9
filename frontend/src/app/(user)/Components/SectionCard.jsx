"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import "../Css/SectionCard.css";
import Image from "next/image";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

const SectionCard = ({ cat_id }) => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});

  const fetchProducts = async () => {
    if (!cat_id) return;

    try {
      const res = await axios.get(
        `${apiUrl}/api/product/category/${cat_id}`
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [cat_id]);

  const truncateDescription = (text, maxWords = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isWishlisted = (id) => !!wishlist[id];

  const addToCart = (id) => {
    console.log("Add to cart:", id);
    // Implement your add-to-cart logic here
  };

  return (
    <section className="container my-5">
      <div className="horizontal-scroll-wrapper row">
        {products.map((product) => {
          const {
            prod_id,
            slug,
            badge_name,
            prod_name,
            prod_des,
            prod_review,
            colors = [],
            prodoffer_prize,
            prod_price,
            images = [],
          } = product;

          const imageArray = Array.isArray(images)
            ? images
            : (images ? images.split(",") : []); // in case API sends string
          const carouselId = `carousel-${prod_id}`;

          return (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 fade-in"
              key={prod_id}
            >
              <Link
                href={`/product/${slug}`}
                className="text-decoration-none"
              >
                <div className="card section-product-card border-0 shadow-sm h-100">
                  {/* Image + Badge + Wishlist */}
                  <div className="image-container">
                    {badge_name && (
                      <span className="product-badge">{badge_name}</span>
                    )}

                    <button
                      className="wishlist-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(prod_id);
                      }}
                    >
                      <Heart
                        fill={isWishlisted(prod_id) ? "red" : "none"}
                        color={
                          isWishlisted(prod_id) ? "red" : "var(--brand)"
                        }
                        size={18}
                      />
                    </button>

                    {/* Image Carousel */}
                    <div
                      id={carouselId}
                      className="carousel slide"
                      data-bs-touch="true"
                      data-bs-interval="false"
                    >
                      <div className="carousel-inner">
                        {imageArray.map((imgUrl, index) => (
                          <div
                            key={index}
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                          >
                            <Image
                              src={`http://localhost:3001/uploads/product_images/${imgUrl}`}
                              width={500}
                              height={500}
                              className="d-block w-100 product-img"
                              alt={`Product ${index + 1}`}
                              unoptimized
                            />
                          </div>
                        ))}
                      </div>

                      {imageArray.length > 1 && (
                        <div className="carousel-indicators">
                          {imageArray.map((_, index) => (
                            <button
                              key={index}
                              type="button"
                              data-bs-target={`#${carouselId}`}
                              data-bs-slide-to={index}
                              className={index === 0 ? "active" : ""}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="card-body p-3 d-flex flex-column">
                    <h5 className="product-name">{prod_name}</h5>
                    <p className="product-desc">
                      {truncateDescription(prod_des)}
                    </p>

                    <div className="mb-2">
                      <span className="badge bg-light text-dark border rounded-pill small">
                        ★ {prod_review} • Luxe Rated
                      </span>
                    </div>

                    {colors.length > 0 && (
                      <div className="d-flex gap-2 mb-2 flex-wrap">
                        {colors.map((color, idx) => (
                          <div
                            key={idx}
                            title={color}
                            className="color-swatch"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                    )}

                    {/* Price + Add to Cart */}
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <div>
                        {prodoffer_prize < prod_price ? (
                          <>
                            <span className="price-new">₹{prodoffer_prize}</span>
                            <span className="price-old">₹{prod_price}</span>
                          </>
                        ) : (
                          <span className="price-new">₹{prod_price}</span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(prod_id);
                        }}
                        className="btn btn-brand btn-sm rounded-pill px-3"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCard;
