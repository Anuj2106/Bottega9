'use client';
import { useCart } from "@/app/Context/cart/cartContext";
import Image from "next/image";
import "../Css/cart.css";
import { useEffect } from "react";

const api = process.env.NEXT_PUBLIC_BACKEND_LINK;

const CartPage = () => {
  const {fetchCart, cart, updateQuantity, removeFromCart, clearCart } = useCart();
  useEffect(() => {
    fetchCart();
  }, []);
  
  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => {
    const price =
      item.prodoffer_prize && item.prodoffer_prize < item.prod_price
        ? item.prodoffer_prize
        : item.prod_price;
    return sum + price * item.quantity;
  }, 0);

    // ✅ Shipping condition
  const shipping = subtotal >= 100000 ? 0 : 700;
  const total = subtotal + shipping;

  const handleProceedToCheckout = () => {
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
            cart.map((item) => (
              <div
                className="card cart-item-card flex-column flex-sm-row p-3 mb-4 border-0 shadow-sm align-items-center align-items-sm-start"
                key={item.prod_id}
              >
                {/* Product Image */}
                <div
                  className="cart-item-image position-relative mb-3 mb-sm-0"
                  style={{ width: 120, minWidth: 120 }}
                >
                  <Image
                    src={
                      item.images && item.images.length > 0
                        ? typeof item.images === "string"
                          ? `${api}/uploads/product_images/${item.images.split(",")[0]}`
                          : `${api}/uploads/product_images/${item.images[0]}`
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
                    <a
                      href={`/product/${item.slug}`}
                      className="h5 text-dark mb-0 text-decoration-none fw-semibold"
                    >
                      {item.prod_name}
                    </a>
                    <button
                      className="btn btn-outline-danger btn-sm mt-2 mt-sm-0"
                      onClick={() => removeFromCart(item.prod_id)}
                    >
                      &times;
                    </button>
                  </div>

                  <p className="text-muted mb-2 small">
                    {item.prod_des?.slice(0, 45)}...
                  </p>

                  {/* Colors */}
                 {item.color && (
  <div className="d-flex align-items-center gap-2 mb-3">
    <strong>Selected Color:</strong>
    <span
      className="color-swatch-cart"
      style={{
        backgroundColor: item.color,
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        border: "1px solid #ccc",
        display: "inline-block",
      }}
      title={item.color}
    />
    <span className="text-muted small">{item.color}</span>
  </div>
)}

                  {/* Price + Quantity */}
                  <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-sm-start gap-3">
                    <span className="fw-bold luxury-price fs-5 text-dark">
                      {item.prodoffer_prize && item.prodoffer_prize < item.prod_price ? (
                        <>
                          ₹{item.prodoffer_prize}
                          <span className="text-muted text-decoration-line-through ms-2 fs-6">
                            ₹{item.prod_price}
                          </span>
                        </>
                      ) : (
                        <>₹{item.prod_price}</>
                      )}
                    </span>

                    {/* Quantity Selector */}
                    <div className="d-flex align-items-center border rounded luxury-qty">
                      {/* Decrease Button */}
                      <button
                        className="btn btn-sm btn-light luxury-qty-btn"
                        onClick={() =>
                          updateQuantity(item.prod_id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>

                      {/* Quantity Input */}
                      <input
                        type="number"
                        min="1"
                        max={item.prod_stock || 99} // ✅ add max stock limit
                        value={item.quantity}
                        onChange={(e) => {
                          const newQty = Math.min(
                            Math.max(1, parseInt(e.target.value) || 1),
                            item.prod_stock || 99
                          );
                          updateQuantity(item.prod_id, newQty);
                        }}
                        className="form-control form-control-sm text-center border-0"
                        style={{ width: "48px", fontWeight: "600" }}
                      />

                      {/* Increase Button */}
                      <button
                        className="btn btn-sm btn-light luxury-qty-btn"
                        onClick={() => {
                          if (item.quantity < (item.prod_stock || 99)) {
                            updateQuantity(item.prod_id, item.quantity + 1);
                          } else {
                            alert(
                              `Only ${item.prod_stock || 99} items available in stock.`
                            );
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Stock info */}
                  {item.prod_stock !== undefined && (
                    <p className="text-muted small mt-1">
                      In Stock: {item.prod_stock}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}

          {cart.length > 0 && (
            <div className="d-flex justify-content-center justify-content-sm-end mt-3">
              <button
                className="btn btn-outline-gold px-4 w-100 w-sm-auto"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <aside className="col-lg-4">
          <div className="card p-4 luxury-summary shadow-sm">
            <h3 className="fw-semibold mb-3 border-bottom pb-2 text-center text-lg-start">
              Order Summary
            </h3>
            <div className="d-flex justify-content-between mb-2 luxury-summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2 luxury-summary-row">
              <span>Shipping</span>
              <span> {shipping === 0 ? (
                  <span className="text-success fw-semibold">Free</span>
                ) : (
                  `₹${shipping}`
                )}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5 mb-3 luxury-summary-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              className="btn btn-gold w-100 py-3 fw-semibold mb-2 d-flex justify-content-center align-items-center gap-2"
              onClick={handleProceedToCheckout}
            >
              <span>Proceed to Checkout</span>
              <i className="bi bi-arrow-right"></i>
            </button>

            <button className="btn btn-outline-gold w-100 py-2">
              Continue Shopping
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CartPage;
