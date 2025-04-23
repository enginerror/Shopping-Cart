// This file runs before each test file
import '@testing-library/jest-dom'; // Adds custom jest-dom matchers

// For fixing tests that reference document/window
if (typeof window !== 'undefined') {
  // Set up window.matchMedia mock for responsive design tests
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };
}
