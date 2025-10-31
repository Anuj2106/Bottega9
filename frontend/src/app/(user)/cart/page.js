'use client';
import { useCart } from "@/app/Context/cart/cartContext";
import Image from "next/image";
import "../Css/cart.css"

const api = process.env.NEXT_PUBLIC_BACKEND_LINK;
const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce((sum, item) => {
    const price = item.prodoffer_prize && item.prodoffer_prize < item.prod_price
      ? item.prodoffer_prize
      : item.prod_price;
    return sum + price * item.quantity;
  }, 0);

  const handleProceedToCheckout = () => {
  // Navigate to checkout page or payment
  window.location.href = "/Checkout";
};

  return (
    <main className="cart-page luxury-bg container my-5">
      <h1 className="fw-bold mb-4 text-center text-md-start">Your Cart</h1>
      <div className="row g-4 flex-column-reverse flex-lg-row">
        
        {/* Cart Items */}
        <div className="col-lg-8">
          {cart.length === 0 ? (
            <div className="luxury-empty-state p-4 text-center border rounded bg-light">
              <h5>Your cart is empty.</h5>
              <p>Add items from our luxury collections to view them here.</p>
            </div>
          ) : (
            cart.map(item => (
              <div
                className="card cart-item-card flex-column flex-sm-row p-3 mb-4 border-0 shadow-sm align-items-center align-items-sm-start"
                key={item.prod_id}
              >
                {/* Product Image */}
                <div className="cart-item-image position-relative mb-3 mb-sm-0" style={{ width: 120, minWidth: 120 }}>
                 <Image
  src={
    item.images && item.images.length > 0
      ? (typeof item.images === "string"
          ? `${api}/uploads/product_images/${item.images.split(",")[0]}`
          : `${api}/uploads/product_images/${item.images[0]}`
        )
      : "/placeholder.png"
  }
  alt={item.prod_name}
  width={120}
  height={120}
  className="rounded cart-img"
  style={{ objectFit: "cover" }}
  unoptimized
/>
                </div>

                {/* Product Details */}
                <div className="ms-sm-4 flex-grow-1 text-center text-sm-start">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <a href={`/product/${item.slug}`} className="h5 text-dark mb-0 text-decoration-none fw-semibold">
                      {item.prod_name}
                    </a>
                    <button
                      className="btn btn-outline-danger btn-sm mt-2 mt-sm-0"
                      onClick={() => removeFromCart(item.prod_id)}
                    >
                      &times;
                    </button>
                  </div>

                  <p className="text-muted mb-2 small">{item.prod_des?.slice(0,45)}...</p>

                  {/* Colors */}
                  <div className="d-flex flex-wrap justify-content-center justify-content-sm-start gap-1 mb-3">
                    {item.prod_color && item.prod_color.split(/[ ,]+/).map((color, i) => (
                      <span key={i} className="color-swatch-cart" style={{ backgroundColor: color }} />
                    ))}
                  </div>

                  {/* Price + Quantity */}
                  <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-sm-start gap-3">
                    <span className="fw-bold luxury-price fs-5 text-dark">
                      {item.prodoffer_prize && item.prodoffer_prize < item.prod_price ? (
                        <>
                          ₹{item.prodoffer_prize}
                          <span className="text-muted text-decoration-line-through ms-2 fs-6">₹{item.prod_price}</span>
                        </>
                      ) : (
                        <>₹{item.prod_price}</>
                      )}
                    </span>

                    {/* Quantity Selector */}
                    <div className="d-flex align-items-center border rounded luxury-qty">
                      <button className="btn btn-sm btn-light luxury-qty-btn" 
                        onClick={() => updateQuantity(item.prod_id, item.quantity - 1)}
                        disabled={item.quantity <= 1}>-</button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.prod_id, Math.max(1, parseInt(e.target.value) || 1))}
                        className="form-control form-control-sm text-center border-0"
                        style={{ width: "48px", fontWeight: "600" }}
                      />
                      <button className="btn btn-sm btn-light luxury-qty-btn"
                        onClick={() => updateQuantity(item.prod_id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {cart.length > 0 && (
            <div className="d-flex justify-content-center justify-content-sm-end mt-3">
              <button className="btn btn-outline-gold px-4 w-100 w-sm-auto" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <aside className="col-lg-4">
          <div className="card p-4 luxury-summary shadow-sm">
            <h3 className="fw-semibold mb-3 border-bottom pb-2 text-center text-lg-start">Order Summary</h3>
            <div className="d-flex justify-content-between mb-2 luxury-summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2 luxury-summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5 mb-3 luxury-summary-total">
              <span>Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <button 
  className="btn btn-gold w-100 py-3 fw-semibold mb-2 d-flex justify-content-center align-items-center gap-2"
  onClick={() => handleProceedToCheckout()} // Add your click handler
>
  <span>Proceed to Checkout</span>
  <i className="bi bi-arrow-right"></i> {/* Optional Bootstrap Icon */}
</button>

            <button className="btn btn-outline-gold w-100 py-2">Continue Shopping</button>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default CartPage;
