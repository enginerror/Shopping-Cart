import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CheckoutSuccessPage.css';

function CheckoutSuccessPage() {
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p className="order-number">Order Number: <span>{orderNumber}</span></p>
        <p className="success-message">
          Thank you for your purchase. We've received your order and will process it right away.
          You will receive an email confirmation shortly.
        </p>
        
        <div className="success-details">
          <div className="detail-item">
            <h3>Estimated Delivery</h3>
            <p>{new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          </div>
          
          <div className="detail-item">
            <h3>Payment Method</h3>
            <p>Credit Card</p>
          </div>
        </div>
        
        <div className="success-actions">
          <Link to="/" className="action-button primary">
            Return Home
          </Link>
          <Link to="/shop" className="action-button secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccessPage;