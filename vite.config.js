import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add Vitest configuration
  test: {
    globals: true, // Use Vitest globals (describe, it, expect, etc.)
    environment: 'jsdom', // Simulate browser environment
    setupFiles: './src/setupTests.js', // Path to setup file (ensure this file exists)
    // Optional: Configuration for CSS Modules or other CSS handling if needed in tests
    // css: true,
  },
})
