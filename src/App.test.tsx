import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByAltText } = render(<App />);
  const linkElement = getByAltText(/Mitabits/i);
  expect(linkElement).toBeInTheDocument();
});
