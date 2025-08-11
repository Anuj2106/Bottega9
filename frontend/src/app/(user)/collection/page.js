'use client';
import Image from "next/image";
import '../Css/collection.css'; // NEW luxury styles

const CollectionPage = ({ products = [] }) => {
  return (
    <main className="collection-page">

      {/* Hero Banner */}
      <section className="hero-banner d-flex align-items-center text-white text-center">
        <div className="container animate-fade-up">
          <h1 className="display-3 fw-bold mb-3">Explore Our Luxury Collections</h1>
          <p className="lead mb-0">
            Discover bespoke furniture crafted with passion and precision
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="bg-white py-3 border-bottom">
        <div className="container">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><a href="#" className="text-dark">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Collections</li>
          </ol>
        </div>
      </nav>

      {/* Filters Section */}
      <section className="filters-section py-4 bg-light">
        <div className="container">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-6">
              <div className="d-flex flex-wrap gap-2">
                {["Seating", "Tables", "Storage", "Lighting"].map((cat, i) => (
                  <button key={i} className="btn btn-filter">{cat}</button>
                ))}
              </div>
            </div>
            <div className="col-12 col-md-6 text-md-end">
              <select className="form-select form-select-sm w-auto d-inline-block">
                <option value="popularity" defaultValue>Sort by popularity</option>
                <option value="newest">Newest arrivals</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="products-section py-5">
        <div className="container">
          <div className="row g-4">
            {products.length === 0 && (
              <p className="text-center text-muted">No products available at the moment.</p>
            )}
            {products.map(product => {
              const { prod_id, prod_name, prod_price, prodoffer_prize, prod_des, images } = product;
              const imageArray = images?.split(",") || [];
              return (
                <div key={prod_id} className="col-12 col-sm-6 col-md-4 col-lg-3 animate-fade-up">
                  <div className="product-card h-100 rounded shadow-sm overflow-hidden position-relative">
                    {/* Image */}
                    <div className="product-image-wrapper">
                      {imageArray[0] && (
                        <Image
                          src={`http://localhost:3001/uploads/product_images/${imageArray[0]}`}
                          alt={prod_name}
                          width={400}
                          height={400}
                          className="product-image"
                          unoptimized
                        />
                      )}
                      {/* Hover Overlay */}
                      <div className="product-overlay d-flex flex-column justify-content-center align-items-center">
                        <button className="btn btn-gold btn-sm mb-2">Quick View</button>
                        <button className="btn btn-outline-light btn-sm">Add to Cart</button>
                      </div>
                    </div>
                    {/* Details */}
                    <div className="p-3 d-flex flex-column">
                      <h5 className="fw-semibold">{prod_name}</h5>
                      <p className="text-muted flex-grow-1" style={{ fontSize: "0.9rem" }}>
                        {prod_des.length > 60 ? prod_des.slice(0, 57) + "..." : prod_des}
                      </p>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <div>
                          {prodoffer_prize < prod_price ? (
                            <>
                              <span className="fw-bold text-dark">₹{prodoffer_prize}</span>
                              <span className="text-muted text-decoration-line-through ms-2">₹{prod_price}</span>
                            </>
                          ) : (
                            <span className="fw-bold text-dark">₹{prod_price}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <nav aria-label="Page navigation" className="mt-5">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled"><a className="page-link">Previous</a></li>
              <li className="page-item active"><a className="page-link">1</a></li>
              <li className="page-item"><a className="page-link">2</a></li>
              <li className="page-item"><a className="page-link">3</a></li>
              <li className="page-item"><a className="page-link">Next</a></li>
            </ul>
          </nav>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta py-5 text-center">
        <div className="container animate-fade-up">
          <h3 className="mb-3">Looking for personalized designs?</h3>
          <p className="mb-4">
            Get in touch with Bottega9 for a bespoke furniture consultation.
          </p>
          <button className="btn btn-gold btn-lg px-4">Book a Consultation</button>
        </div>
      </section>
    </main>
  );
};

export default CollectionPage;
