import React from 'react';
import useRecurrenceStore from './store/useRecurrenceStore';
import RecurrenceOptions from './components/RecurrenceOptions';
import CustomizationControls from './components/CustomizationControls';
import DateRangePicker from './components/DateRangePicker';
import MiniCalendarPreview from './components/MiniCalendarPreview';
import './RecurringDatePicker.css';

const RecurringDatePicker = () => {
  const {
    recurrenceType,
    setRecurrenceType,
    customization,
    setCustomization,
    dateRange,
    setDateRange,
    recurringDates,
    calculateRecurringDates,
  } = useRecurrenceStore();

  React.useEffect(() => {
    calculateRecurringDates();
  }, [recurrenceType, customization, dateRange, calculateRecurringDates]);

  return (
    <div className="recurring-date-picker">
      <h2>Recurring Date Picker</h2>
      <RecurrenceOptions value={recurrenceType} onChange={setRecurrenceType} />
      <CustomizationControls value={customization} onChange={setCustomization} recurrenceType={recurrenceType} />
      <DateRangePicker value={dateRange} onChange={setDateRange} />
      <MiniCalendarPreview dates={recurringDates} range={dateRange} />
    </div>
  );
};

export default RecurringDatePicker; 