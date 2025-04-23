import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';
import './ShopPage.css';

function ShopPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState(['all']);

  useEffect(() => {
    // Fetch products from FakeStoreAPI
    fetch('https://fakestoreapi.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Extract unique categories from the fetched data
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(['all', ...uniqueCategories]);
        
        setProducts(data);
        setDisplayedProducts(data);
        setLoading(false);
      })
      .catch((fetchError) => {
        console.error("Error fetching products:", fetchError);
        setError(fetchError.message);
        setLoading(false);
      });
  }, []);

  // Filter products based on search term and category
  useEffect(() => {
    let filtered = [...products];
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => 
        product.category === categoryFilter
      );
    }
    
    // Apply search term filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(term) || 
        product.description?.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      );
    }
    
    setDisplayedProducts(filtered);
  }, [searchTerm, categoryFilter, products]);

  if (loading) {
    return (
      <div className="shop-status">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return <div className="shop-status error">Error loading products: {error}</div>;
  }

  return (
    <div className="shop-page">
      <h1>Shop Our Products</h1>
      <p className="shop-description">
        Browse our collection of high-quality items. Use the filters to find exactly what you're looking for.
      </p>
      
      <div className="shop-controls">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="filter-dropdown"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      {displayedProducts.length === 0 ? (
        <div className="shop-status">No products match your search criteria.</div>
      ) : (
        <div className="product-grid">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart} // Pass the handler down
            />
          ))}
        </div>
      )}
    </div>
  );
}


ShopPage.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
};

export default ShopPage;
