import React from 'react';
import { format, isSameDay, addDays, startOfMonth, endOfMonth } from 'date-fns';

const MiniCalendarPreview = ({ dates, range }) => {
  if (!range.start) return null;
  const start = new Date(range.start);
  const monthStart = startOfMonth(start);
  const monthEnd = endOfMonth(start);
  const days = [];
  for (let d = monthStart; d <= monthEnd; d = addDays(d, 1)) {
    days.push(new Date(d));
  }

  // Calculate leading empty days (before monthStart)
  const leadingEmpty = monthStart.getDay(); // 0 (Sun) to 6 (Sat)
  // Calculate trailing empty days (after monthEnd)
  const trailingEmpty = 6 - monthEnd.getDay();

  // Add empty slots for leading days
  const calendarCells = [
    ...Array(leadingEmpty).fill(null),
    ...days,
    ...Array(trailingEmpty).fill(null)
  ];

  // Split calendarCells into rows of 7
  const rows = [];
  for (let i = 0; i < calendarCells.length; i += 7) {
    rows.push(calendarCells.slice(i, i + 7));
  }

  return (
    <div className="mini-calendar-preview">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <strong>{format(monthStart, 'MMMM yyyy')}</strong>
      </div>
      <div style={{ display: 'flex', gap: 2, fontWeight: 'bold' }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} style={{ width: 24, textAlign: 'center' }}>{d}</div>)}
      </div>
      <div>
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} style={{ display: 'flex' }}>
            {row.map((day, idx) => (
              <div
                key={day ? day.toISOString() : `empty-${rowIdx}-${idx}`}
                style={{
                  width: 24,
                  height: 24,
                  textAlign: 'center',
                  background: day && dates.some(date => isSameDay(date, day)) ? '#4caf50' : 'transparent',
                  color: day && dates.some(date => isSameDay(date, day)) ? 'white' : 'black',
                  borderRadius: '50%',
                  margin: 1,
                  lineHeight: '24px',
                  opacity: day ? 1 : 0,
                }}
              >
                {day ? day.getDate() : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* List of recurring dates */}
      <div style={{ marginTop: 16 }}>
        <strong>Recurring Dates:</strong>
        <ul>
          {dates.map(date => (
            <li key={date.toISOString()}>{format(date, 'EEEE, d MMMM yyyy')}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MiniCalendarPreview; 