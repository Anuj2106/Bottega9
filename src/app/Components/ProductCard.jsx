'use client';
import { useState } from "react";
import { Heart } from "lucide-react";
import "../Css/productCard.css";
import Products from "../api/Products/route";

const ProductCard = () => {
  const [likedItems, setLikedItems] = useState({});

  const toggleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="container my-5">
      <div className="d-flex flex-nowrap gap-3 mx-auto row product-card">
        {Products.map((image) => {
          const images = Array.isArray(image.images)
            ? image.images
            : image.imageUrl
            ? [image.imageUrl]
            : [];

          return (
            <div
              className="card desktop-product-card p-0 col-md-3 col-sm-6 col-12 flex-shrink-0"
              key={image.id}
            >
              {/* ===== Image Carousel with Badge & Like ===== */}
              <div className="image-container position-relative">
                {/* Badge */}
                <span className="badge bg-dark text-white position-absolute top-0 start-0 m-2 z-2">
  {image.isBestSeller ? "Best Seller" : "Badge"}
</span>


                {/* Like Button */}
                <button
                  className="btn position-absolute top-0 end-0 m-2 p-1  shadow-sm z-2"
                  onClick={() => toggleLike(image.id)}
                >
                  <Heart
                    size={18}
                    fill={likedItems[image.id] ? "red" : "none"}
                    stroke={likedItems[image.id] ? "red" : "black"}
                  />
                </button>

                {/* Carousel */}
                <div
                  id={`carousel-${image.id}`}
                  className="carousel slide"
                  data-bs-touch="true"
                  data-bs-interval="false"
                >
                  {images.length > 1 && (
                    <div className="carousel-indicators">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          data-bs-target={`#carousel-${image.id}`}
                          data-bs-slide-to={index}
                          className={index === 0 ? "active" : ""}
                          aria-current={index === 0 ? "true" : undefined}
                          aria-label={`Slide ${index + 1}`}
                        ></button>
                      ))}
                    </div>
                  )}

                  <div className="carousel-inner">
                    {images.map((imgUrl, index) => (
                      <div
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                        key={index}
                      >
                        <img
                          src={imgUrl}
                          className="d-block w-100 productCard-img img-fluid"
                          alt={`Slide ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ===== Card Content ===== */}
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-center px-1">
                  <h6 className="m-0">{image.name}</h6>
                  <span>
                    <span className="text-warning">&#9733;</span> 4.9
                  </span>
                </div>
                <p className="text-muted ps-1">{image.description}</p>
                <div className="d-flex justify-content-between mx-1">
                  <strong>${image.price}</strong>
                  <button className="btn btn-dark text-capitalize">
                    add to cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductCard;
