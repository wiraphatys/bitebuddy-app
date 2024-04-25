import { DateRangePickerLocalization } from '@mui/x-date-pickers';

const datepickerLocalization: DateRangePickerLocalization = {
  getFirstMonthLabel: () => 'First Month',
  getSecondMonthLabel: () => 'Second Month',
  getWeekdaysLabel: () => ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  getWeekArray: () => [1, 2, 3, 4, 5, 6, 7],
  getYearSelectionText: (year: any) => `${year}`,
  getDatePickerHeaderText: (date:any) => `${date.toLocaleDateString()}`,
  getLoadingLabel: () => 'Loading...',
  getNoYearText: () => 'No year',
};

export default datepickerLocalization;
