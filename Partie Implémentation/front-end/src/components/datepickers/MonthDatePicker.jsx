import DatePicker from 'react-datepicker';
import React, { useState } from 'react';
import {addMonths, subMonths} from 'date-fns';
import { Grid, Typography } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";


/*
  On the first date picker, the minDate is the first day of the year, and the maxDate is the last day of the same year
*/

const MonthDatePicker = ({onChange }) => {

  const minDate = new Date("2022-01-01");
  const maxDate = new Date("2022-12-31");
  const minTime = 6;
  const maxTime = 24;

  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(new Date(addMonths(startDate, minTime)));
  
  return (
    <Grid container
    direction='row'
    alignItems='baseline'
    justifyContent='end'
    columns={9}
    >
      <Grid item xs={3} >
        <Typography variant="h6" component="div" gutterBottom> From: </Typography>
      </Grid>
      <Grid item xs={6} >
      <DatePicker
        //First date picker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        minDate={minDate}
        maxDate={subMonths(maxDate, minTime)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      ></DatePicker>
      </Grid>
      <Grid item xs={3} >
        <Typography variant="h6" component="div" gutterBottom> To: </Typography>
      </Grid>
      <Grid item xs={6} >
      <DatePicker
        //Second date picker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        endDate={addMonths(startDate, minTime)}
        minDate={addMonths(startDate, minTime)}
        maxDate={new Date(Math.min.apply(null, [maxDate, addMonths(startDate, maxTime)]))}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      ></DatePicker>
      </Grid>
    </Grid>
  
  );
};

export default MonthDatePicker;