'use client';

import { useWishlist } from "@/app/Context/wishlist/wishlistContext";
import { useCart } from "@/app/Context/cart/cartContext";
import { Heart, Plus } from "lucide-react";
import "../Css/productCard.css";
import Image from "next/image";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

const ProductCard = ({ products = [] }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const truncateText = (text, maxLength = 60) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="container-fluid westelm-products-section">
      <div className="row westelm-products-grid">
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
            slug,
          } = product;

          const imageArray = images?.split(",") || [];
          const colors = prod_color ? prod_color.split(/[ ,]+/) : [];
          const hasDiscount = prodoffer_prize && prodoffer_prize < prod_price;
          const finalPrice = hasDiscount ? prodoffer_prize : prod_price;

          return (
      <div 
  className="col-12 col-sm-6 col-md-4 p-0  rounded shadow-sm  westelm-product-card" 
  key={prod_id}
>

              {/* Product Image */}
              <div className="position-relative westelm-product-image-container">
                {/* Badge */}
                {badge_name && (
                  <span className="badge position-absolute westelm-badge">{badge_name}</span>
                )}

                {/* Wishlist Heart */}
                <button
                  className="btn position-absolute westelm-wishlist-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(prod_id);
                  }}
                  aria-label="Add to wishlist"
                >
                  <Heart
                    fill={isWishlisted(prod_id) ? "#000" : "none"}
                    color="#000"
                    size={20}
                    strokeWidth={1.5}
                  />
                </button>

                {/* Product Link */}
                <Link href={`/product/${slug}`} className="text-decoration-none westelm-product-link">
                  <div className="westelm-image-wrapper">
                    {/* Primary Image */}
                    <Image
                      src={`${apiUrl}/uploads/product_images/${imageArray[0]}`}
                      width={400}
                      height={400}
                      alt={prod_name}
                      className="img-fluid westelm-product-image westelm-primary-image"
                      unoptimized
                    />
                    {/* Secondary Image for Hover */}
                    {imageArray[1] && (
                      <Image
                        src={`${apiUrl}/uploads/product_images/${imageArray[1]}`}
                        width={400}
                        height={400}
                        alt={`${prod_name} alternate view`}
                        className="img-fluid westelm-product-image westelm-secondary-image"
                        unoptimized
                      />
                    )}
                  </div>
                </Link>

                {/* Quick View Button */}
                {/* <button className="btn position-absolute westelm-quick-view-btn">
                  Quick View
                </button> */}
              </div>

              {/* Product Info */}
              <div className="westelm-product-info  text-center">
                {/* Product Name */}
                <h3 className="mb-2 westelm-product-name">
                  <Link href={`/product/${slug}`} className="text-decoration-none">
                    {truncateText(prod_name, 45)}
                  </Link>
                </h3>
<span
  className="fs-6 text-decoration-underline"
  role="button"
  data-bs-toggle="modal"
  data-bs-target={`#quickViewModal-${prod_id}`}
>
  Quick View
</span>

{/* Quick View Modal */}
<div
  className="modal fade"
  id={`quickViewModal-${prod_id}`}
  tabIndex="-1"
  aria-labelledby={`quickViewLabel-${prod_id}`}
  aria-hidden="true"
>
  <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title fw-bold" id={`quickViewLabel-${prod_id}`}>
          {prod_name}
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>

      <div className="modal-body">
        <div className="row g-4">
          {/* LEFT COLUMN - MAIN IMAGE & THUMBNAILS */}
          <div className="col-lg-6">
            <div className="border rounded p-2  text-center">
              <Image
                src={`${apiUrl}/uploads/product_images/${imageArray[0]}`}
                alt={prod_name}
                width={500}
                height={500}
                className="img-fluid rounded"
                style={{ objectFit: "contain", maxHeight: "400px" }}
                unoptimized
              />
            </div>

            {/* Thumbnails */}
            {imageArray.length > 1 && (
              <div className="d-flex gap-2 mt-3 flex-wrap justify-content-center">
                {imageArray.map((img, i) => (
                  <Image
                    key={i}
                    src={`${apiUrl}/uploads/product_images/${img}`}
                    alt={`Thumbnail ${i + 1}`}
                    width={70}
                    height={70}
                    className="rounded border"
                    style={{
                      width: "70px",
                      height: "70px",
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                    unoptimized
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - PRODUCT DETAILS */}
          <div className="col-lg-6">
            {/* Name */}
            <h4 className="fw-semibold">{prod_name}</h4>

            {/* Price */}
            <div className="mb-3">
              {hasDiscount ? (
                <>
                  <span className="fw-bold fs-5 me-2">₹{finalPrice.toLocaleString()}</span>
                  <span className="text-muted text-decoration-line-through">
                    ₹{prod_price.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="fw-bold fs-5">₹{finalPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Colors */}
            {colors.length > 0 && (
              <div className="mb-3">
                <strong>Available Colors:</strong>
                <div className="d-flex gap-2 mt-2 flex-wrap">
                  {colors.map((color, idx) => (
                    <div
                      key={idx}
                      title={color}
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        backgroundColor: color,
                        border: "1px solid #ccc",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* Short Description */}
            {product?.prod_des && (
              <p className="text-muted">{product.prod_des}</p>
            )}

            {/* Stock */}
            {product?.stock_quantity !== undefined && (
              <p>
                <strong>Stock:</strong> {product.stock_quantity}
              </p>
            )}

            {/* Features */}
            {product?.prod_think && (
              <div className="mt-3">
                <h6>Features</h6>
                <ul className="mb-0 small">
                  {product.prod_think
                    .split(/\n|,|\r/)
                    .map((item, index) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                </ul>
              </div>
            )}

            {/* Dimensions */}
            {product?.prod_dimensions && (
              <div className="mt-3">
                <h6>Dimensions</h6>
                <ul className="mb-0 small">
                  {product.prod_dimensions
                    .split(/\n|,|\r/)
                    .map((item, index) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
                </ul>
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(prod_id);
              }}
              className="btn btn-dark mt-4 d-flex align-items-center gap-2"
            >
              <Plus size={18} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



                {/* Color Swatches */}
               {/* Color Swatches with Total Count */}
{/* Total Color Options */}
{colors.length > 0 && (
  <div className="westelm-color-options " style={{ fontSize: "12px", marginBottom: "8px" }}>
    {colors.length} option{colors.length > 1 ? "s" : ""}
  </div>
)}



                {/* Price */}
                <div className="mb-3 westelm-price-container">
                  {hasDiscount ? (
                    <>
                      <span className="fw-semibold me-2 westelm-sale-price">₹{finalPrice.toLocaleString()}</span>
                      <span className="text-muted text-decoration-line-through westelm-original-price">₹{prod_price.toLocaleString()}</span>
                    </>
                  ) : (
                    <span className="fw-semibold westelm-price">₹{finalPrice.toLocaleString()}</span>
                  )}
                </div>

                {/* Add to Cart - Hidden by default, shown on hover */}
                {/* <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(prod_id);
                  }}
                  className="btn d-flex align-items-center justify-content-center w-100 westelm-add-to-cart"
                >
                  <Plus size={16} strokeWidth={2} className="me-2" />
                  Add to Cart
                </button> */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductCard;
