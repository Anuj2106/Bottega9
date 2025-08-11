'use client';
import { useWishlist } from "@/app/Context/wishlist/wishlistContext";
import { useCart } from "@/app/Context/cart/cartContext";
import { Heart } from "lucide-react";
import "../Css/productCard.css";
import Image from "next/image";
import Link from "next/link";
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;


const ProductCard = ({ products = [] }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const truncateDescription = (text, maxWords = 15) => {
    const words = text?.split(" ") || [];
    return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : text;
  };

  return (
    <section className="container my-5">
      <div className="row g-4">
        {products.map((product) => {
          const {
            prod_id,
            prod_name,
            prod_price,
            prodoffer_prize,
            badge_name,
            prod_review,
            prod_des,
            images,
            prod_color,
            slug
          } = product;

          const imageArray = images?.split(",") || [];
          const carouselId = `carousel-${prod_id}`;
          const colors = prod_color ? prod_color.split(/[ ,]+/) : [];

          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 fade-in" key={prod_id}>
              <Link href={`/product/${slug}`} className="text-decoration-none">
                <div className="card section-product-card border-0 shadow-sm h-100">

                  {/* Image + Badge + Wishlist */}
                  <div className="image-container">
                    {badge_name && (
                      <span className="product-badge">
                        {badge_name}
                      </span>
                    )}

                    <button
                      className="wishlist-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product.prod_id);
                      }}
                    >
                      <Heart
                        fill={isWishlisted(product.prod_id) ? "red" : "none"}
                        color={isWishlisted(product.prod_id) ? "red" : "var(--brand)"}
                        size={18}
                      />
                    </button>

                    {/* Image Carousel */}
                    <div id={carouselId} className="carousel slide" data-bs-touch="true" data-bs-interval="false">
                      <div className="carousel-inner">
                        {imageArray.map((imgUrl, index) => (
                          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <Image
                              src={`${apiUrl}/uploads/product_images/${imgUrl}`}
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
                    <p className="product-desc">{truncateDescription(prod_des)}</p>

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
                          addToCart(product.prod_id);
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

export default ProductCard;
