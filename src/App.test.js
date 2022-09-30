import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter as Router } from 'react-router-dom';

test('renders learn react link', () => {
  render(<Router> <App /> </Router>);
  const linkElement = screen.getByText('Sign In');
  expect(linkElement).toBeInTheDocument();
});
