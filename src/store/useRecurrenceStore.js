import { create } from 'zustand';
import { addDays, addMonths, addYears, isBefore, isSameDay, startOfDay, isAfter } from 'date-fns';

const defaultCustomization = {
  interval: 1,
  daysOfWeek: [], // For weekly
  weekOfMonth: 1, // For monthly patterns
  dayOfWeek: 0,   // For monthly patterns
  pattern: 'date', // 'date' or 'weekday'
};

const recurrenceTypes = ['daily', 'weekly', 'monthly', 'yearly'];

const calculateRecurringDates = (recurrenceType, customization, dateRange) => {
  if (!dateRange.start) return [];
  const dates = [];
  let current = startOfDay(new Date(dateRange.start));
  const end = dateRange.end ? startOfDay(new Date(dateRange.end)) : addYears(current, 1);

  switch (recurrenceType) {
    case 'daily':
      while (isBefore(current, end) || isSameDay(current, end)) {
        dates.push(current);
        current = addDays(current, customization.interval || 1);
      }
      break;
    case 'weekly': {
      const startDate = startOfDay(new Date(dateRange.start));
      const endDate = startOfDay(new Date(end));
      // Find the first selected day on or after the start date
      let firstSelectedDay = null;
      let probe = new Date(startDate);
      while ((isBefore(probe, endDate) || isSameDay(probe, endDate))) {
        if (customization.daysOfWeek.includes(probe.getDay())) {
          firstSelectedDay = new Date(probe);
          break;
        }
        probe = addDays(probe, 1);
      }
      if (!firstSelectedDay) break;
      // Align the first interval week to the week containing that day (Sunday-based)
      let firstIntervalWeekStart = addDays(firstSelectedDay, -firstSelectedDay.getDay());
      let weekStart = new Date(firstIntervalWeekStart);
      while (isBefore(weekStart, endDate) || isSameDay(weekStart, endDate)) {
        for (let i = 0; i < 7; i++) {
          const day = addDays(weekStart, i);
          if (
            (isAfter(day, startDate) || isSameDay(day, startDate)) &&
            (isBefore(day, endDate) || isSameDay(day, endDate)) &&
            customization.daysOfWeek.includes(day.getDay())
          ) {
            dates.push(new Date(day));
          }
        }
        weekStart = addDays(weekStart, 7 * (customization.interval || 1));
      }
      break;
    }
    case 'monthly':
      while (isBefore(current, end) || isSameDay(current, end)) {
        if (customization.pattern === 'weekday') {
          // Find the Nth weekday of the month
          const month = current.getMonth();
          const year = current.getFullYear();
          let count = 0;
          let nthWeekday = null;
          for (let d = 1; d <= 31; d++) {
            const date = new Date(year, month, d);
            if (date.getMonth() !== month) break;
            if (date.getDay() === customization.dayOfWeek) {
              count++;
              if (count === customization.weekOfMonth) {
                nthWeekday = date;
                break;
              }
            }
          }
          if (nthWeekday && (isBefore(nthWeekday, end) || isSameDay(nthWeekday, end)) && (isBefore(current, nthWeekday) || isSameDay(current, nthWeekday))) {
            if ((isBefore(nthWeekday, end) || isSameDay(nthWeekday, end)) && (isBefore(startOfDay(new Date(dateRange.start)), nthWeekday) || isSameDay(startOfDay(new Date(dateRange.start)), nthWeekday))) {
              dates.push(nthWeekday);
            }
          }
          // Move to the same day in the next month
          current = addMonths(current, customization.interval || 1);
          current = new Date(current.getFullYear(), current.getMonth(), 1); // Set to first of next month
        } else {
          // On this date each month
          if (isBefore(current, end) || isSameDay(current, end)) {
            dates.push(new Date(current));
          }
          current = addMonths(current, customization.interval || 1);
        }
      }
      break;
    case 'yearly':
      while (isBefore(current, end) || isSameDay(current, end)) {
        dates.push(current);
        current = addYears(current, customization.interval || 1);
      }
      break;
    default:
      return dates;
  }
  return dates;
};

const useRecurrenceStore = create((set, get) => ({
  recurrenceType: 'daily',
  setRecurrenceType: (type) => set({ recurrenceType: type }),
  customization: defaultCustomization,
  setCustomization: (custom) => set({ customization: { ...get().customization, ...custom } }),
  dateRange: { start: null, end: null },
  setDateRange: (range) => set({ dateRange: range }),
  recurringDates: [],
  calculateRecurringDates: () => {
    const { recurrenceType, customization, dateRange } = get();
    const dates = calculateRecurringDates(recurrenceType, customization, dateRange);
    set({ recurringDates: dates });
  },
}));

export default useRecurrenceStore; 

