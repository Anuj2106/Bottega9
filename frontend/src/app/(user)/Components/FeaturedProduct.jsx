import React from 'react'

const FeaturedProduct = () => {
  return (
    <section className="featured-products py-5 ">
        <div className="container">
          <h2 className="section-title fw-bolder text-center mb-5">Featured Products</h2>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="product-card">
                <div className="product-image">
                  <img src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=800&q=80" alt="Bingley Table Lamp" />
                  <div className="product-badge">New</div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">Bingley Table Lamp (15")</h3>
                  <div className="product-price">
                    <span className="current-price">₹ 20,000</span>
                  </div>
                  <p className="product-options">2 options available</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="product-card">
                <div className="product-image">
                  <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80" alt="Monti Coffee Table" />
                  <div className="product-badge bestseller">Best Seller</div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">Monti Coffee Table (40")</h3>
                  <div className="product-price">
                    <span className="current-price">₹ 90,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="product-card">
                <div className="product-image">
                  <img src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=800&q=80" alt="Organic Dinnerware Set" />
                  <div className="product-badge sale">Sale</div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">Organic Porcelain Dinnerware Set</h3>
                  <div className="product-price">
                    <span className="current-price">₹ 2,940</span>
                    <span className="original-price">₹ 4,200</span>
                  </div>
                  <p className="product-options">20 options available</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="product-card">
                <div className="product-image">
                  <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80" alt="Anton Nightstand" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">Anton Solid Wood Nightstand (22")</h3>
                  <div className="product-price">
                    <span className="current-price">₹ 42,500</span>
                  </div>
                  <p className="product-options">2 options available</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <button className="btn btn-outline-primary btn-lg">Load More Products</button>
          </div>
        </div>
      </section>
  )
}

export default FeaturedProduct