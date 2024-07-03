// // import AppFunctional from "./AppFunctional";

// // // Write your tests here
// // test('sanity', () => {
// //   expect(true).toBe(false)
// // })


import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppFunctional from './AppFunctional';

// Test to check if coordinates and steps are rendered initially
test('renders coordinates and steps', () => {
  render(<AppFunctional />);
  expect(screen.getByText(/coordinates/i)).toBeInTheDocument();// Checks if text containing 'coordinates' is present
  expect(screen.getByText(/you moved 0 times/i)).toBeInTheDocument();// Checks if text containing 'you moved 0 times' is present
});

// Test to ensure the initial active square is in the center
test('initial active square is in the center', () => {
  render(<AppFunctional />);
  const squares = screen.getAllByText(/B/i);// Finds all elements with text 'B'
  expect(squares).toHaveLength(1);// Expects there to be exactly one element with text 'B'
  expect(squares[0].closest('.square')).toHaveClass('active');// Expects the closest element with class 'square' to have class 'active'
});

// Test to simulate typing in the email input and checking its value
test('typing in the email input changes its value', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByPlaceholderText(/type email/i);// Finds input by placeholder text 'type email'
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });// Simulates typing 'test@example.com' into the input
  expect(emailInput).toHaveValue('test@example.com');// Expects the input value to be 'test@example.com'
});

// Test to simulate moving up and checking if coordinates and steps update accordingly
test('moving up updates the coordinates and steps', () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByText(/up/i));// Simulates clicking on an element with text 'up'
  expect(screen.getByText(/coordinates/i)).toHaveTextContent('(2,1)');// Expects text containing '(2,1)' to be present
  expect(screen.getByText(/you moved 1 time/i)).toBeInTheDocument();// Expects text containing 'you moved 1 time' to be present
});

// Test to simulate clicking the reset button and checking if state resets
test('reset button resets the state', () => {
  render(<AppFunctional />);
  fireEvent.click(screen.getByText(/up/i));// Simulates clicking on an element with text 'up'
  fireEvent.click(screen.getByText(/reset/i));// Simulates clicking on an element with text 'reset'
  expect(screen.getByText(/coordinates/i)).toHaveTextContent('(2,2)');// Expects text containing '(2,2)' to be present
  expect(screen.getByText(/you moved 0 times/i)).toBeInTheDocument();// Expects text containing 'you moved 0 times' to be present
});