import useRecurrenceStore from './useRecurrenceStore';

describe('useRecurrenceStore recurrence calculation', () => {
  it('calculates daily recurrence', () => {
    const store = useRecurrenceStore.getState();
    store.setRecurrenceType('daily');
    store.setCustomization({ interval: 2 });
    store.setDateRange({ start: '2024-06-01', end: '2024-06-05' });
    store.calculateRecurringDates();
    const dates = useRecurrenceStore.getState().recurringDates;
    expect(dates.length).toBeGreaterThan(0);
    expect(dates[0].getDate()).toBe(1);
  });

  it('calculates weekly recurrence for specific days', () => {
    const store = useRecurrenceStore.getState();
    store.setRecurrenceType('weekly');
    store.setCustomization({ daysOfWeek: [1, 3] }); // Mon, Wed
    store.setDateRange({ start: '2024-06-01', end: '2024-06-14' });
    store.calculateRecurringDates();
    const dates = useRecurrenceStore.getState().recurringDates;
    expect(dates.some(d => d.getDay() === 1)).toBe(true);
    expect(dates.some(d => d.getDay() === 3)).toBe(true);
  });

  it('calculates monthly recurrence with weekday pattern', () => {
    const store = useRecurrenceStore.getState();
    store.setRecurrenceType('monthly');
    store.setCustomization({ pattern: 'weekday', weekOfMonth: 2, dayOfWeek: 2 }); // 2nd Tuesday
    store.setDateRange({ start: '2024-06-01', end: '2024-08-31' });
    store.calculateRecurringDates();
    const dates = useRecurrenceStore.getState().recurringDates;
    expect(dates.length).toBeGreaterThan(0);
  });
}); 