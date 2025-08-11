"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (!slug) return;

    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:3001/api/products/${slug}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();

        let imagesArray = [];
        if (Array.isArray(data.images)) {
          imagesArray = data.images;
        } else if (typeof data.images === "string") {
          imagesArray = data.images.split(",").map(img => img.trim());
        }

        data.images = imagesArray;
        setProduct(data);
        setMainImage(imagesArray[0] || "");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  if (loading) return <div className="container py-5">Loading...</div>;
  if (!product) return <div className="container py-5">Product not found</div>;

  return (
    <main className="container py-4">
      <div className="row gy-4 gx-lg-5">
        
        {/* LEFT COLUMN - MAIN IMAGE & THUMBNAILS */}
        <div className="col-lg-6">
          <div className="border rounded p-2 shadow-sm text-center bg-white">
            {mainImage ? (
              <Image
                src={`http://localhost:3001/uploads/product_images/${mainImage}`}
                alt={product.prod_name}
                width={500}
                height={500}
                className="img-fluid rounded"
                style={{ objectFit: "contain", maxHeight: "500px" }}
              />
            ) : (
              <p>No Image Available</p>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 0 && (
            <div className="d-flex gap-2 mt-3 flex-wrap justify-content-center">
              {product.images.map((img, i) => (
                <Image
                  key={i}
                  src={`http://localhost:3001/uploads/product_images/${img}`}
                  alt={`Thumbnail ${i + 1}`}
                  width={80}
                  height={80}
                  className={`rounded border ${mainImage === img ? "border-primary" : ""}`}
                  style={{
                    width: "80px",
                    height: "80px",
                    cursor: "pointer",
                    objectFit: "cover"
                  }}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN - DETAILS */}
        <div className="col-lg-6">
          {/* Product Title */}
          <h1 className="fw-bold mb-2">{product.prod_name}</h1>

          {/* Price */}
          <h4 className="text-primary mb-3">₹{product.prod_price?.toLocaleString()}</h4>

          {/* Colors */}
          {product.prod_color && (
            <div className="mb-3">
              <strong>Available Colors:</strong>
              <div className="d-flex gap-2 mt-2 flex-wrap">
                {product.prod_color.split(/[ ,]+/).map((color, idx) => (
                  <div
                    key={idx}
                    title={color}
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: color,
                      border: "1px solid #ccc"
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* Short Description */}
          <p className="text-muted">{product.prod_des}</p>

          {/* Stock Status */}
          <p><strong>Stock:</strong> {product.stock_quantity}</p>

          {/* Add to Cart Button */}
          <button className="btn btn-primary btn-lg w-100 mt-3">
            Add to Cart
          </button>
        </div>
      </div>

      {/* FEATURES SECTION */}
      {product.prod_think && (
        <section className="mt-5">
          <h3 className="mb-3">Features / Additional Info</h3>
          <p className="mb-0">{product.prod_think}</p>
        </section>
      )}

      {/* DIMENSIONS SECTION */}
      {product.prod_dimensions && (
        <section className="mt-4">
          <h5 className="mb-2">Dimensions</h5>
          <p className="mb-0">{product.prod_dimensions}</p>
        </section>
      )}
    </main>
  );
}
