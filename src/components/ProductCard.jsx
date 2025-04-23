import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (event.target.value === '' || (value > 0 && !isNaN(value))) {
        setQuantity(event.target.value === '' ? '' : value);
    } else if (value <= 0) {
        setQuantity(1); // Reset to 1 if invalid or zero/negative
    }
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity === '' ? 1 : prevQuantity + 1));
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCartClick = () => {
    const finalQuantity = quantity === '' || quantity < 1 ? 1 : quantity;
    if (finalQuantity > 0) {
        onAddToCart(product, finalQuantity);
        setQuantity(1);
    }
  };

  // Input validation for direct typing
  const handleBlur = () => {
    if (quantity === '' || quantity < 1) {
      setQuantity(1);
    }
  };

  // Render star rating
  const renderStars = () => {
    if (!product.rating) return null;
    
    const rating = Math.round(product.rating.rate);
    return (
      <div className="product-rating">
        <span className="stars">{'★'.repeat(rating) + '☆'.repeat(5 - rating)}</span>
        <span className="count">({product.rating.count})</span>
      </div>
    );
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        {product.category && <div className="product-category">{product.category}</div>}
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">{product.price.toFixed(2)}</p>
        {renderStars()}
      </div>
      <div className="product-actions">
        <div className="quantity-control">
          <button 
            onClick={decrementQuantity} 
            aria-label="Decrease quantity"
          >-</button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
            min="1"
            aria-label="Product quantity"
            className="quantity-input"
          />
          <button 
            onClick={incrementQuantity} 
            aria-label="Increase quantity"
          >+</button>
        </div>
        <button 
          onClick={handleAddToCartClick} 
          className="add-to-cart-button"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

// Add prop type validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number
    }),
    // Optional description field
    description: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
