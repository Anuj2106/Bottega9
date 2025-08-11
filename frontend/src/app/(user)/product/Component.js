"use client";

import { useState } from "react";
import Image from "next/image";

const ProductPage = () => {
  const product = {
    name: "Handcrafted Hazel Chair",
    images: [
      "https://static.wixstatic.com/media/522d2f_c920cac3a8d7446fb4d76a0e9bcd92ba~mv2.png/v1/fill/w_800,h_800,q_85/522d2f_c920cac3a8d7446fb4d76a0e9bcd92ba~mv2.png",
      "https://static.wixstatic.com/media/522d2f_c920cac3a8d7446fb4d76a0e9bcd92ba~mv2.png/v1/fill/w_800,h_800,q_85/522d2f_c920cac3a8d7446fb4d76a0e9bcd92ba~mv2.png",
     "https://static.wixstatic.com/media/522d2f_ba9125830ccc4940af439233ac3ad78a~mv2.jpg/v1/fill/w_418,h_418,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/522d2f_ba9125830ccc4940af439233ac3ad78a~mv2.jpg",
    ],
    price: 4999,
    highlights: ["Free Delivery", "1 Year Warranty", "7 Day Easy Returns"],
    description: `
      Beautifully crafted with premium wood and artisanal expertise, 
      this Hazel Chair blends modern aesthetics with timeless design. 
      Perfect for living rooms, offices, or boutique spaces.
    `,
    features: [
      "Solid natural wood",
      "Ergonomic design for comfort",
      "Sustainable sourcing",
      "Custom finishes available",
    ],
    availableColors: ["Natural", "Walnut", "Espresso"],
    sizes: ["Standard", "Large"],
    specifications: {
      Material: "Solid Wood",
      Finish: "Natural Polish",
      Dimensions: "H: 85cm × W: 55cm × D: 60cm",
      Assembly: "No Assembly Required",
      Care: "Wipe with soft cloth",
    },
    reviews: [
      { id: 1, name: "Ananya", rating: 5, text: "Incredibly comfortable and stylish!" },
      { id: 2, name: "Rajat", rating: 4, text: "Great craftsmanship and timely delivery." },
    ],
  };

  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <main className="container py-5">
      <div className="row g-4">
        {/* Left Column - Images */}
        <div className="col-md-6">
          <div className="border rounded p-2 shadow-sm">
            <img
              src={mainImage}
              alt={product.name}
              className="img-fluid rounded"
            />
          </div>
          <div className="d-flex gap-2 mt-3 flex-wrap">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className={`rounded border ${mainImage === img ? "border-primary" : ""}`}
                style={{ width: "80px", height: "80px", cursor: "pointer", objectFit: "cover" }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <h4 className="text-primary mb-3">₹{product.price.toLocaleString()}</h4>

          <ul className="list-inline mb-3">
            {product.highlights.map((item, idx) => (
              <li key={idx} className="list-inline-item bg-light px-3 py-1 rounded border">
                {item}
              </li>
            ))}
          </ul>

          <p>{product.description}</p>

          <h5>Features</h5>
          <ul>
            {product.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          {/* Variants */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Color</label>
            <select className="form-select mb-3">
              {product.availableColors.map((color, i) => (
                <option key={i}>{color}</option>
              ))}
            </select>

            <label className="form-label fw-semibold">Size</label>
            <select className="form-select">
              {product.sizes.map((size, i) => (
                <option key={i}>{size}</option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary btn-lg w-100">Add to Cart</button>
        </div>
      </div>

      {/* Specifications */}
      <section className="mt-5">
        <h3>Specifications</h3>
        <table className="table table-bordered">
          <tbody>
            {Object.entries(product.specifications).map(([key, value], i) => (
              <tr key={i}>
                <th>{key}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Reviews */}
      <section className="mt-5">
        <h3>Customer Reviews</h3>
        {product.reviews.map((r) => (
          <div key={r.id} className="border-bottom pb-3 mb-3">
            <strong>{r.name}</strong> - {"⭐".repeat(r.rating)}
            <p className="mb-0">{r.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default ProductPage;
