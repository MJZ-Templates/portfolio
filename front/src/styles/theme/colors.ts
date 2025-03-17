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
    button: 'linear-gradient(135deg, #007bff, #00ff88)',
    overlay: {
      primary: 'radial-gradient(circle at top right, rgba(0, 123, 255, 0.1), transparent 70%)',
      secondary: 'radial-gradient(circle at bottom left, rgba(0, 255, 136, 0.1), transparent 70%)'
    },
    hover: 'linear-gradient(135deg, #007bff20, #00ff8820)'
  },
  shadow: {
    primary: 'rgba(0, 123, 255, 0.15)',
    secondary: 'rgba(0, 0, 0, 0.1)',
    skill: 'rgba(0, 123, 255, 0.1)',
  },
  input: {
    border: '#eee',
    placeholder: '#999',
  },
} as const;

export type ColorTypes = typeof COLORS;