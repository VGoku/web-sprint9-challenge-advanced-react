// import AppFunctional from "./AppFunctional";

// // Write your tests here
// test('sanity', () => {
//   expect(true).toBe(false)
// })


import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppFunctional from './AppFunctional';

test('renders coordinates and steps', () => {
  render(<AppFunctional />);
  expect(screen.getByText(/coordinates/i)).toBeInTheDocument();
  expect(screen.getByText(/you moved 0 times/i)).toBeInTheDocument();
});

test('initial active square is in the center', () => {
  render(<AppFunctional />);
  const squares = screen.getAllByText(/B/i);
  expect(squares).toHaveLength(1);
  expect(squares[0].closest('.square')).toHaveClass('active');
});

test('typing in the email input changes its value', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByPlaceholderText(/type email/i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  expect(emailInput).toHaveValue('test@example.com');
});

test('moving up updates the coordinates and steps', () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByText(/up/i));
  expect(screen.getByText(/coordinates/i)).toHaveTextContent('(2,1)');
  expect(screen.getByText(/you moved 1 time/i)).toBeInTheDocument();
});

test('reset button resets the state', () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByText(/up/i));
  fireEvent.click(screen.getByText(/reset/i));
  expect(screen.getByText(/coordinates/i)).toHaveTextContent('(2,2)');
  expect(screen.getByText(/you moved 0 times/i)).toBeInTheDocument();
});
