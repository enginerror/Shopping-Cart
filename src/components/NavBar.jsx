import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavBar.css';

function NavBar({ cartItemCount, cart, onUpdateQuantity, onRemoveItem }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartDropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleClickOutside = (event) => {
    if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
      setIsCartOpen(false);
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  useEffect(() => {
    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen]);

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        ShopEase
      </Link>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" className={({isActive}) => isActive ? "active" : ""}>
            Shop
          </NavLink>
        </li>
      </ul>
      <div className="nav-cart" ref={cartDropdownRef}>
        <div className="cart-trigger" onClick={toggleCart}>
          <span className="cart-icon">🛒</span>
          <span className="cart-count">{cartItemCount}</span>
        </div>
        
        {isCartOpen && (
          <div className="cart-dropdown">
            <h3>Your Cart</h3>
            
            {cart.length === 0 ? (
              <div className="empty-cart-message">Your cart is empty</div>
            ) : (
              <>
                <ul className="cart-items-dropdown">
                  {cart.map((item) => (
                    <li key={item.id} className="cart-item-mini">
                      <img 
                        src={item.product.image} 
                        alt={item.product.title} 
                        className="item-mini-image"
                      />
                      <div className="item-mini-details">
                        <h4>{item.product.title}</h4>
                        <div className="item-mini-price-qty">
                          <span className="item-mini-price">${(item.product.price * item.quantity).toFixed(2)}</span>
                          <div className="item-mini-qty">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                            >-</button>
                            <span>{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >+</button>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="remove-item-btn"
                        aria-label="Remove item"
                      >×</button>
                    </li>
                  ))}
                </ul>
                
                <div className="cart-dropdown-footer">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button onClick={handleCheckout} className="checkout-button">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  cartItemCount: PropTypes.number.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
      }).isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired
};

export default NavBar;
