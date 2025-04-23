import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>Welcome to <span>ShopEase</span></h1>
        <p>
          Discover our amazing collection of high-quality products. From electronics to fashion,
          we have something for everyone!
        </p>
        <Link to="/shop" className="home-cta-button">
          Shop Now
        </Link>
      </div>

      <div className="home-image-container">
        <div className="home-feature">
          <div className="home-feature-icon">🚚</div>
          <h3>Free Shipping</h3>
          <p>Enjoy free shipping on all orders over $50</p>
        </div>
        
        <div className="home-feature">
          <div className="home-feature-icon">⭐</div>
          <h3>Top Quality</h3>
          <p>Curated products from premium brands</p>
        </div>
        
        <div className="home-feature">
          <div className="home-feature-icon">↩️</div>
          <h3>Easy Returns</h3>
          <p>30-day hassle-free return policy</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
