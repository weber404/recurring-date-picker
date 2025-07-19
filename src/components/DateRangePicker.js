import React from 'react';

const DateRangePicker = ({ value, onChange }) => {
  return (
    <div className="date-range-picker">
      <label>
        Start Date:
        <input
          type="date"
          value={value.start ? value.start.split('T')[0] : ''}
          onChange={e => onChange({ ...value, start: e.target.value })}
        />
      </label>
      <label>
        End Date (optional):
        <input
          type="date"
          value={value.end ? value.end.split('T')[0] : ''}
          onChange={e => onChange({ ...value, end: e.target.value })}
        />
      </label>
    </div>
  );
};

export default DateRangePicker; 