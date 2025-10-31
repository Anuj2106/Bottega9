'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_LINK;

const FeaturedCategory = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    fetchFeaturedCategories();
  }, []);

  const fetchFeaturedCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/featured-category/index`, { withCredentials: true });
      setFeaturedCategories(response.data);
    } catch (err) {
      console.error('Error fetching featured categories:', err);
    }
  };

  return (
    <section className="featured-categories py-5">
      <div className="container">
        <h2 className="section-title text-center fw-bolder mb-5">Shop by Category</h2>
        <div className="row g-4">
          {featuredCategories.length > 0 ? (
            featuredCategories.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6">
                <div className="category-card">
                  <div className="category-image">
                    <img 
                      src={`${apiUrl}/${item.image_url}`} 
                      alt={item.cat_name} 
                      style={{ width: '100%', objectFit: 'cover' }} 
                    />
                    <div className="category-overlay">
                      <h3 className="category-title">{item.cat_name}</h3>
                      <Link href={`/shop/${item.cat_slug}`}>
                        <button className="btn btn-category">Shop Now</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No featured categories available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategory;
