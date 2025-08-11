'use client';
import { useWishlist } from "@/app/Context/wishlist/wishlistContext";
import { useCart } from "@/app/Context/cart/cartContext";
import Image from "next/image";
import "../Css/wishlist.css"
const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;


const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  console.log("WISHLIST DATA IS ",wishlistItems);
  

  return (
    <main className="wishlist-page container my-5">
      <h1 className="fw-bold mb-4">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="luxury-empty-state p-5 text-center border rounded bg-light">
          <h5>Your wishlist is empty</h5>
          <p>Browse our luxury collections and add items you love here.</p>
        </div>
      ) : (
        <div className="row g-4">
          {wishlistItems.map(item => {
            const imageArray = item.images ? item.images.split(",") : [];
            return (
              <div className="col-12 col-md-6 col-lg-4" key={item.prod_id}>
                <div className="card product-card border-0 shadow-sm h-100">
                  {/* Image */}
                  <div className="position-relative">
                    {imageArray[0] && (
                      <Image
                        src={`${apiUrl}/uploads/product_images/${imageArray[0]}`}
                        alt={item.prod_name}
                        width={400}
                        height={300}
                        className="wishlist-img"
                        unoptimized
                      />
                    )}
                    {item.badge_name && (
                      <span className="product-badge">{item.badge_name}</span>
                    )}
                    <button
                      className="wishlist-remove-btn"
                      onClick={() => removeFromWishlist(item.prod_id)}
                      title="Remove from wishlist"
                    >
                      &times;
                    </button>
                  </div>

                  {/* Body */}
                  <div className="card-body p-3 d-flex flex-column">
                    <h5 className="fw-semibold mb-1">{item.prod_name}</h5>
                    <p className="text-muted small mb-2">{item.category_name}</p>

                    {/* Colors */}
                    {item.prod_color && (
                      <div className="d-flex gap-2 mb-2 flex-wrap">
                        {item.prod_color.split(/[ ,]+/).map((color, idx) => (
                          <div
                            key={idx}
                            className="color-swatch"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                    )}

                    {/* Price */}
                    <div className="fw-bold mb-3">
                      {item.prodoffer_prize < item.prod_price ? (
                        <>
                          ₹{item.prodoffer_prize}
                          <span className="text-muted text-decoration-line-through ms-2">
                            ₹{item.prod_price}
                          </span>
                        </>
                      ) : (
                        `₹${item.prod_price}`
                      )}
                    </div>

                    {/* Actions */}
                    <button
                      className="btn btn-gold rounded-pill w-100 mt-auto"
                      onClick={() => addToCart(item.prod_id)}
                    >
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default WishlistPage;
