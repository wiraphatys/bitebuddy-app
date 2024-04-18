'use client'
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';

const lastMonday = dayjs().startOf('week').endOf('day');
const nextSunday = dayjs().endOf('week').startOf('day');

const isWeekend = (date: Dayjs) => {
    const day = date.day();
    let rec = [0, 6];
    
    for (let i = 0; i < rec.length; i++) {
        if (day === rec[i]) {
            return true;
        }
    }
    
    return false;
};

export default function DateValidationShouldDisableDate() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            shouldDisableDate={isWeekend}
            views={['year', 'month', 'day']}
          />
    </LocalizationProvider>
  );
}