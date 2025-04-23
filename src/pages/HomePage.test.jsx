import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomePage from './HomePage';

describe('HomePage Component', () => {
  it('renders the welcome heading', () => {
    render(<HomePage />);
    // Check if the main heading exists
    const headingElement = screen.getByRole('heading', {
      name: /welcome to our shop!/i, // Case-insensitive match
    });
    expect(headingElement).toBeInTheDocument();
  });

  it('renders the introductory paragraph', () => {
    render(<HomePage />);
    // Check for the paragraph text
    const paragraphElement = screen.getByText(
      /browse our amazing collection of products/i
    );
    expect(paragraphElement).toBeInTheDocument();
  });

   it('renders the image placeholder', () => {
     render(<HomePage />);
     // Check for the placeholder text
     const placeholder = screen.getByText(/image placeholder/i); // Adjusted regex slightly
     expect(placeholder).toBeInTheDocument();
   });
});
