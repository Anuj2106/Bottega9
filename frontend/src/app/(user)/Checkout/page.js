'use client';
import { useCart } from "@/app/Context/cart/cartContext";
import { useAuth } from "@/app/Context/auth/authContext";
import Image from "next/image";
import Swal from "sweetalert2"; 
// ✅ import SweetAlert2
import axios from "axios";
import "../Css/cart.css";

const api = process.env.NEXT_PUBLIC_BACKEND_LINK;

const CheckoutPage = () => {
  const { cart ,clearCart} = useCart();
const { userId, isAuthenticated } = useAuth();
  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => {
    const price =
      item.prodoffer_prize && item.prodoffer_prize < item.prod_price
        ? item.prodoffer_prize
        : item.prod_price;
    return sum + price * item.quantity;
  }, 0);

  // Shipping logic
  const shippingFee = subtotal >= 100000 ? 0 : 700;
  const grandTotal = subtotal + shippingFee;

  // ✅ Handle order submission
const handlePlaceOrder = async (e) => {
  e.preventDefault();

  if (!isAuthenticated) {
    Swal.fire({
      title: "Login Required",
      text: "Please log in to place an order.",
      icon: "warning",
      confirmButtonText: "Login",
      confirmButtonColor: "#d4af37",
    });
    return;
  }

  const form = e.target;

  // ✅ Collect all form data
  const formData = {
    user_id: userId,
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    contact: form.contact.value.trim(),
    address: form.address.value.trim(),
    city: form.city.value.trim(),
    state: form.state.value.trim(),
    zip: form.zip.value.trim(),
    items: cart.map((item) => ({
      prod_id: item.prod_id,
      quantity: item.quantity,
      prod_name: item.prod_name,
      color: item.color || null,
      prodoffer_prize: item.prodoffer_prize,
      prod_price: item.prod_price,
    })),
    subtotal,
    shippingFee,
    grandTotal,
  };

  // ✅ Simple validation
  if (!formData.name || !formData.email || !formData.contact || !formData.address) {
    Swal.fire({
      title: "Missing Information",
      text: "Please fill in all required fields.",
      icon: "warning",
      confirmButtonText: "OK",
      confirmButtonColor: "#d4af37",
    });
    return;
  }

  try {
    const res = await axios.post(`${api}/api/order/place`, formData);

    if (res.data.success) {
      Swal.fire({
        title: "Order Placed Successfully! 🎉",
        text: "Thank you for shopping with us ❤️",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#d4af37",
      });
      // ✅ Clear cart and form
      clearCart();
      form.reset();
    } else {
      throw new Error(res.data.error || "Something went wrong");
    }
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Failed to place order. Please try again.",
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "#d4af37",
    });
  }
};

  return (
    <main className="checkout-page luxury-bg container my-5">
      <h1 className="fw-bold mb-4 text-center text-md-start">Checkout</h1>
      <div className="row g-4 flex-column-reverse flex-lg-row">

        {/* Billing & Shipping Form */}
        <div className="col-lg-6">
          <div className="card p-4 shadow-sm">
            <h3 className="fw-semibold mb-3 text-center text-lg-start">Billing & Shipping</h3>

            <form onSubmit={handlePlaceOrder}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" name="name" className="form-control" placeholder="John Doe" required />
              </div>
              <div className="mb-3">
  <label className="form-label">Contact Number</label>
  <input
    type="tel"
    name="contact"
    className="form-control"
    placeholder="9876543210"
    required
  />
</div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-control" placeholder="example@mail.com" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" name="address" className="form-control" placeholder="123 Main St" required />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input type="text" name="city" className="form-control" placeholder="City" required />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">State</label>
                  <input type="text" name="state" className="form-control" placeholder="State" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">ZIP Code</label>
                  <input type="text" name="zip" className="form-control" placeholder="123456" required />
                </div>
              </div>

              <button type="submit" className="btn btn-gold w-100 py-3 fw-semibold mt-3">
                Place Order
              </button>
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
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>


            <button className="btn btn-outline-gold w-100 py-2">Continue Shopping</button>
          </div>
        </div>

      </div>
    </main>
  );
};

export default CheckoutPage;
