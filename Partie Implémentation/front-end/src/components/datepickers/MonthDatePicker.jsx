import DatePicker from 'react-datepicker';
import React, { useState } from 'react';
import {addMonths, subMonths} from 'date-fns';
import { Grid, Typography } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";

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
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        minDate={minDate}
        maxDate={subMonths(endDate, minTime)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      ></DatePicker>
      </Grid>
      <Grid item xs={3} >
        <Typography variant="h6" component="div" gutterBottom> To: </Typography>
      </Grid>
      <Grid item xs={6} >
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        endDate={endDate}
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