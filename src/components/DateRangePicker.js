import React from 'react';

const DateRangePicker = ({ value, onChange }) => {
  return (
    <div className="date-range-picker">
     <div>
      <label>
        Start Date:
        <input
          type="date"
          value={value.start ? value.start.split('T')[0] : ''}
          onChange={e => onChange({ ...value, start: e.target.value })}
        />
      </label> 
            </div>
            <div>
      <label>
        End Date (optional):
        <input
          type="date"
          value={value.end ? value.end.split('T')[0] : ''}
          onChange={e => onChange({ ...value, end: e.target.value })}
        />
      </label> </div>
    </div>
  );
};

export default DateRangePicker; 
