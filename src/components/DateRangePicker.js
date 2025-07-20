import React from 'react';

const DateRangePicker = ({ value, onChange }) => {
  return (
    <div className="date-range-picker">
     <div style={{ marginBottom: '12px' }}>
      <label style={{ display: 'block' }}>
        Start Date:
        <br />
        <input
          style={{ display: 'block', marginTop: '4px' }}
          type="date"
          value={value.start ? value.start.split('T')[0] : ''}
          onChange={e => onChange({ ...value, start: e.target.value })}
        />
      </label> 
            </div>
            <div>
      <label style={{ display: 'block' }}>
        End Date (optional):
        <br />
        <input
          style={{ display: 'block', marginTop: '4px' }}
          type="date"
          value={value.end ? value.end.split('T')[0] : ''}
          onChange={e => onChange({ ...value, end: e.target.value })}
        />
      </label> </div>
    </div>
  );
};

export default DateRangePicker; 
