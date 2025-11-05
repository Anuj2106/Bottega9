const nodemailer = require("nodemailer");

// ✅ Create a transporter using your email credentials
const transporter = nodemailer.createTransport({
  service: "gmail", // or use "smtp.ethereal.email" for testing
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // app password
  },
});

// ✅ Function to send order confirmation email
exports.sendOrderConfirmation = async (toEmail, orderDetails) => {
  const { name, order_id, subtotal, shipping_fee, grand_total, items } = orderDetails;

  const itemList = items
    .map(
      (item) =>
        `<li>${item.quantity} × ${item.prod_name} (${item.color || "N/A"})</li>`
    )
    .join("");

  const mailOptions = {
    from: `"Bontega Luxury" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Order Confirmation - Order #${order_id}`,
    html: `
      <h2>Thank you for your order, ${name}! 💫</h2>
      <p>Your order has been placed successfully. Here are your details:</p>
      <ul>${itemList}</ul>
      <p><strong>Subtotal:</strong> ₹${subtotal}</p>
      <p><strong>Shipping:</strong> ₹${shipping_fee === 0 ? "Free" : shipping_fee}</p>
      <p><strong>Total:</strong> ₹${grand_total}</p>
      <p>We'll notify you when your order is shipped.</p>
      <hr/>
      <p>With love,<br/>Bontega Team ❤️</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Order confirmation email sent to", toEmail);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
};
