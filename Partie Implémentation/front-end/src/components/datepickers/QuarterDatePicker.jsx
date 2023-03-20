import DatePicker from 'react-datepicker';
import React, { useState } from 'react';
import {addMonths} from 'date-fns';
import { Grid, Typography } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";

const QuarterDatePicker = ({onChange }) => {

  const minDate = new Date("2022-01-01");
  const maxDate = new Date();
  const minTime = 6;
  const maxTime = 18;

  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);

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
        dateFormat="yyyy, QQQ"
        showQuarterYearPicker
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
        dateFormat="yyyy, QQQ"
        maxDate={addMonths(new Date(), 48)}
        showQuarterYearPicker
      ></DatePicker>
      </Grid>
    </Grid>
  
  );
};

export default QuarterDatePicker;