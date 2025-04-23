import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest'; // Import vi for mocking
import ProductCard from './ProductCard';

// Mock product data
const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 9.99,
  image: 'test-image.jpg',
};

describe('ProductCard Component', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Test Product' })).toHaveAttribute(
      'src',
      'test-image.jpg'
    );
  });

  it('initializes quantity input with 1', () => {
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    const quantityInput = screen.getByRole('spinbutton', { name: /product quantity/i });
    expect(quantityInput).toHaveValue(1);
  });

  it('increments quantity when + button is clicked', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    const incrementButton = screen.getByRole('button', { name: /increase quantity/i });
    const quantityInput = screen.getByRole('spinbutton', { name: /product quantity/i });

    await user.click(incrementButton);
    expect(quantityInput).toHaveValue(2);
    await user.click(incrementButton);
    expect(quantityInput).toHaveValue(3);
  });

  it('decrements quantity when - button is clicked (minimum 1)', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    const decrementButton = screen.getByRole('button', { name: /decrease quantity/i });
    const incrementButton = screen.getByRole('button', { name: /increase quantity/i });
    const quantityInput = screen.getByRole('spinbutton', { name: /product quantity/i });

    // Increase first to test decrement
    await user.click(incrementButton);
    await user.click(incrementButton);
    expect(quantityInput).toHaveValue(3);

    await user.click(decrementButton);
    expect(quantityInput).toHaveValue(2);
    await user.click(decrementButton);
    expect(quantityInput).toHaveValue(1);
    // Cannot go below 1
    await user.click(decrementButton);
    expect(quantityInput).toHaveValue(1);
  });

  it('updates quantity when typing in the input field', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    const quantityInput = screen.getByRole('spinbutton', { name: /product quantity/i });

    await user.clear(quantityInput);
    await user.type(quantityInput, '5');
    expect(quantityInput).toHaveValue(5);
  });

   it('resets quantity to 1 if input is cleared or invalid', async () => {
     const user = userEvent.setup();
     render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
     const quantityInput = screen.getByRole('spinbutton', { name: /product quantity/i });

     // Test clearing
     await user.clear(quantityInput);
     // Input value becomes null when cleared, component state handles reset on blur/add
     expect(quantityInput).toHaveValue(null);
     // Simulate blur to trigger reset
     await user.tab();
     expect(quantityInput).toHaveValue(1);

     // Test invalid input (e.g., negative)
     await user.clear(quantityInput);
     await user.type(quantityInput, '-5');
     // Component prevents negative value directly, might reset to 1 or keep previous valid
     // Let's check after blur
     await user.tab();
     expect(quantityInput).toHaveValue(1);

     // Test zero
     await user.clear(quantityInput);
     await user.type(quantityInput, '0');
     await user.tab();
     expect(quantityInput).toHaveValue(1);
   });


  it('calls onAddToCart with correct product and quantity when button is clicked', async () => {
    const user = userEvent.setup();
    const handleAddToCart = vi.fn(); // Create a mock function
    render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);

    const quantityInput = screen.getByRole('spinbutton', { name: /product quantity/i });
    const addButton = screen.getByRole('button', { name: /add to cart/i });

    // Set quantity to 3
    await user.clear(quantityInput);
    await user.type(quantityInput, '3');

    await user.click(addButton);

    // Check if the mock function was called correctly
    expect(handleAddToCart).toHaveBeenCalledTimes(1);
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct, 3);
  });

  it('resets quantity to 1 after adding to cart', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} onAddToCart={() => {}} />);
    const quantityInput = screen.getByRole('spinbutton', { name: /product quantity/i });
    const addButton = screen.getByRole('button', { name: /add to cart/i });

    // Set quantity
    await user.clear(quantityInput);
    await user.type(quantityInput, '4');
    expect(quantityInput).toHaveValue(4);

    // Add to cart
    await user.click(addButton);

    // Check if quantity reset
    expect(quantityInput).toHaveValue(1);
  });
});
