import React from 'react';

const daysOfWeek = [
  { value: 0, label: 'Sun' },
  { value: 1, label: 'Mon' },
  { value: 2, label: 'Tue' },
  { value: 3, label: 'Wed' },
  { value: 4, label: 'Thu' },
  { value: 5, label: 'Fri' },
  { value: 6, label: 'Sat' },
];

const CustomizationControls = ({ value, onChange, recurrenceType }) => {
  return (
    <div className="customization-controls">
      <label>
        Every
        <input
          type="number"
          min={1}
          value={value.interval || 1}
          onChange={e => onChange({ interval: parseInt(e.target.value, 10) })}
          style={{ width: 50, margin: '0 8px' }}
        />
        {recurrenceType.charAt(0).toUpperCase() + recurrenceType.slice(1)}(s)
      </label>
      {recurrenceType === 'weekly' && (
        <div>
          <label>Select days of week:</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {daysOfWeek.map(day => (
              <label key={day.value}>
                <input
                  type="checkbox"
                  checked={value.daysOfWeek?.includes(day.value) || false}
                  onChange={e => {
                    const days = value.daysOfWeek || [];
                    if (e.target.checked) {
                      onChange({ daysOfWeek: [...days, day.value] });
                    } else {
                      onChange({ daysOfWeek: days.filter(d => d !== day.value) });
                    }
                  }}
                />
                {day.label}
              </label>
            ))}
          </div>
        </div>
      )}
      {recurrenceType === 'monthly' && (
        <div>
          <label>
            <input
              type="radio"
              name="monthly-pattern"
              checked={!value.pattern || value.pattern === 'date'}
              onChange={() => onChange({ pattern: 'date' })}
            />
            On this date each month
          </label>
          <label>
            <input
              type="radio"
              name="monthly-pattern"
              checked={value.pattern === 'weekday'}
              onChange={() => onChange({ pattern: 'weekday' })}
            />
            The
            <select
              value={value.weekOfMonth || 1}
              onChange={e => onChange({ weekOfMonth: parseInt(e.target.value, 10) })}
              disabled={value.pattern !== 'weekday'}
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n === 1 ? 'First' : n === 2 ? 'Second' : n === 3 ? 'Third' : n === 4 ? 'Fourth' : 'Fifth'}</option>
              ))}
            </select>
            <select
              value={value.dayOfWeek || 0}
              onChange={e => onChange({ dayOfWeek: parseInt(e.target.value, 10) })}
              disabled={value.pattern !== 'weekday'}
            >
              {daysOfWeek.map(day => (
                <option key={day.value} value={day.value}>{day.label}</option>
              ))}
            </select>
            of every month
          </label>
        </div>
      )}
    </div>
  );
};

export default CustomizationControls; 