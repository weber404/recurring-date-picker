import React from 'react';

const DateRangePicker = ({ value, onChange }) => {
  return (
    <div className="date-range-picker">
      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
        <label style={{ marginRight: '8px' }}>Start Date:</label>
        <input
          type="date"
          value={value.start ? value.start.split('T')[0] : ''}
          onChange={e => onChange({ ...value, start: e.target.value })}
        />
      </div>
      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
        <label style={{ marginRight: '8px' }}>End Date (optional):</label>
        <input
          type="date"
          value={value.end ? value.end.split('T')[0] : ''}
          onChange={e => onChange({ ...value, end: e.target.value })}
        />
      </div>
    </div>
  );
};

export default DateRangePicker; 
