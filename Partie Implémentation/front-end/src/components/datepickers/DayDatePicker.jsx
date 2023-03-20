import DatePicker from 'react-datepicker';
import {addDays, subDays} from 'date-fns';
import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";

const DayDatePicker = ({onChange }) => {

  /* 
  On the first datepicker, the minDate is set to 2022-01-01 and the maxDate is set to 14 days before the second datepicker.
  On the second datepicker, the minDate is set to 14 days after the first datepicker and the maxDate is set to 60 days after the first datepicker or 2022-12-31, whichever is earlier.
  */
  const minDate = new Date("2022-01-01");
  const maxDate = new Date("2022-12-31");
  const minTime = 14;
  const maxTime = 60;
  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(new Date(addDays(startDate, 30)));
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
        minDate={minDate}
        maxDate={subDays(endDate, minTime)}
        startDate={startDate}
        dateFormat="dd/MM/yyyy"
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
        dateFormat="dd/MM/yyyy"
        minDate={addDays(startDate, minTime)}
        maxDate={new Date(Math.min.apply(null, [maxDate, addDays(startDate, maxTime)]))}
      ></DatePicker>
      </Grid>
    </Grid>
  
  );
};

export default DayDatePicker;