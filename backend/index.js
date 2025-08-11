const express = require('express');
const path = require('path');
const cors = require('cors'); 
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 3001;
const cookieParser = require('cookie-parser');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));



require('dotenv').config(); // Load environment variables from .env file
//  For parsing cookies
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'radom ',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));


// Middleware for JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (Volt Dashboard CSS/JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));


// Serve uploaded images via /uploads path
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

const dashboardRoutes = require('./routes/dashboardRoute');
app.use('/api', dashboardRoutes); 

const authRoutes = require('./routes/authRoute');
app.use('/api',authRoutes )
const usersRoute=require('./routes/usersRoute');
app.use('/api',usersRoute);
const ProductRoute=require('./routes/productRoute');
app.use('/api',ProductRoute);
const categoryRoute=require('./routes/categoryRoute');
app.use('/api',categoryRoute);
 
const orderRoute=require('./routes/orderRoute');
app.use('/api',orderRoute);
const testimonialRoute=require('./routes/testimonialRoutes');
app.use('/api/testimonials',testimonialRoute);
const lookbookRoute = require('./routes/lookbookRoutes');
app.use('/api/lookbook', lookbookRoute);

const bannerRoute = require('./routes/bannerRoute');
app.use('/api/banner', bannerRoute);

 const wishlistRoutes=require('./routes/wishlistRoute')
  app.use('/api/wishlist',wishlistRoutes)
  const CartRoutes=require('./routes/cartRoutes');
  app.use('/api/cart',CartRoutes);

app.get("/api/check-session", (req, res) => {
  if (req.session.user && req.session.user.user_id) {
    res.status(200).json({ loggedIn: true, user: req.session.user });
  } else {
 
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
