import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecurringDatePicker from './RecurringDatePicker';

describe('RecurringDatePicker', () => {
  it('renders and allows changing recurrence type and date range', () => {
    render(<RecurringDatePicker />);
    expect(screen.getByText(/Recurring Date Picker/i)).toBeInTheDocument();
    // Change recurrence type
    fireEvent.click(screen.getByLabelText(/Monthly/i));
    expect(screen.getByLabelText(/Monthly/i)).toBeChecked();
    // Set start date
    const startDate = screen.getByLabelText(/Start Date/i);
    fireEvent.change(startDate, { target: { value: '2024-06-01' } });
    expect(startDate.value).toBe('2024-06-01');
    // Set end date
    const endDate = screen.getByLabelText(/End Date/i);
    fireEvent.change(endDate, { target: { value: '2024-06-30' } });
    expect(endDate.value).toBe('2024-06-30');
  });
}); 