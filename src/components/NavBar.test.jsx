import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import { describe, it, expect } from 'vitest';
import NavBar from './NavBar';

// Helper function to render with MemoryRouter
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: MemoryRouter });
};

describe('NavBar Component', () => {
  it('renders the shop logo/name', () => {
    renderWithRouter(<NavBar cartItemCount={0} />);
    const logoLink = screen.getByRole('link', { name: /my shop/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders navigation links (Home and Shop)', () => {
    renderWithRouter(<NavBar cartItemCount={0} />);
    const homeLink = screen.getByRole('link', { name: /^home$/i });
    const shopLink = screen.getByRole('link', { name: /shop/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    expect(shopLink).toBeInTheDocument();
    expect(shopLink).toHaveAttribute('href', '/shop');
  });

  it('displays the correct cart item count', () => {
    renderWithRouter(<NavBar cartItemCount={5} />);
    const cartCount = screen.getByText('5');
    expect(cartCount).toBeInTheDocument();
    expect(cartCount).toHaveClass('cart-count');
  });

  it('displays 0 when cart item count is 0', () => {
    renderWithRouter(<NavBar cartItemCount={0} />);
    const cartCount = screen.getByText('0');
    expect(cartCount).toBeInTheDocument();
  });

  it('renders the cart icon', () => {
    renderWithRouter(<NavBar cartItemCount={0} />);
    const cartIcon = screen.getByText('🛒');
    expect(cartIcon).toBeInTheDocument();
  });
});
