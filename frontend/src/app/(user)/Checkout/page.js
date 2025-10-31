'use client';
import { useCart } from "@/app/Context/cart/cartContext";
import Image from "next/image";
import "../Css/cart.css"; // Reuse your styles
const api = process.env.NEXT_PUBLIC_BACKEND_LINK;

const CheckoutPage = () => {
  const { cart } = useCart();

  const subtotal = cart.reduce((sum, item) => {
    const price = item.prodoffer_prize && item.prodoffer_prize < item.prod_price
      ? item.prodoffer_prize
      : item.prod_price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <main className="checkout-page luxury-bg container my-5">
      <h1 className="fw-bold mb-4 text-center text-md-start">Checkout</h1>
      <div className="row g-4 flex-column-reverse flex-lg-row">

        {/* Billing & Shipping Form */}
        <div className="col-lg-6">
          <div className="card p-4 shadow-sm">
            <h3 className="fw-semibold mb-3 text-center text-lg-start">Billing & Shipping</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" placeholder="John Doe" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="example@mail.com" />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" placeholder="123 Main St" />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input type="text" className="form-control" placeholder="City" />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">State</label>
                  <input type="text" className="form-control" placeholder="State" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">ZIP Code</label>
                  <input type="text" className="form-control" placeholder="123456" />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-6">
          <div className="card p-4 luxury-summary shadow-sm">
            <h3 className="fw-semibold mb-3 text-center text-lg-start">Order Summary</h3>

            {cart.length === 0 ? (
              <p className="text-center">Your cart is empty.</p>
            ) : (
              cart.map(item => (
                <div key={item.prod_id} className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <div className="me-2" style={{ width: 50, height: 50, position: "relative" }}>
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
                        fill
                        style={{ objectFit: "cover", borderRadius: "5px" }}
                        unoptimized
                      />
                    </div>
                    <span>{item.prod_name} x {item.quantity}</span>
                  </div>
                  <span>
                    ₹{(item.prodoffer_prize && item.prodoffer_prize < item.prod_price ? item.prodoffer_prize : item.prod_price) * item.quantity}
                  </span>
                </div>
              ))
            )}

            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
              <span>Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <button className="btn btn-gold w-100 py-3 fw-semibold mb-2">Proceed to Payment</button>
            <button className="btn btn-outline-gold w-100 py-2">Continue Shopping</button>
          </div>
        </div>

      </div>
    </main>
  );
};

export default CheckoutPage;
