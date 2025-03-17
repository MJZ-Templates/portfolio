export const COLORS = {
  primary: '#007bff',
  secondary: '#00ff88',
  text: {
    primary: '#333',
    secondary: '#666',
  },
  background: {
    primary: '#f8f9fa',
    secondary: '#e9ecef',
    white: 'white',
  },
  gradient: {
    primary: 'linear-gradient(to right, #007bff, #00ff88)',
    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
  },
  shadow: {
    primary: 'rgba(0, 123, 255, 0.15)',
    secondary: 'rgba(0, 0, 0, 0.1)',
    skill: 'rgba(0, 123, 255, 0.1)',
  },
} as const;

export type ColorTypes = typeof COLORS;