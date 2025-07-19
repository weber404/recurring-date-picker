import React from 'react';

const options = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

const RecurrenceOptions = ({ value, onChange }) => (
  <div className="recurrence-options">
    <label>Recurrence:</label>
    {options.map(opt => (
      <label key={opt.value}>
        <input
          type="radio"
          name="recurrence-type"
          value={opt.value}
          checked={value === opt.value}
          onChange={() => onChange(opt.value)}
        />
        {opt.label}
      </label>
    ))}
  </div>
);

export default RecurrenceOptions; 