import DatePicker from 'react-datepicker';
import React, { useState } from 'react';
import {addMonths} from 'date-fns';
import { Grid, Typography } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";

const MonthDatePicker = ({onChange }) => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
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
        maxDate={addMonths(new Date(), 24)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      ></DatePicker>
      </Grid>
    </Grid>
  
  );
};

export default MonthDatePicker;