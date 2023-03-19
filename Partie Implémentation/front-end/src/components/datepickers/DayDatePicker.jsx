import DatePicker from 'react-datepicker';
import {addDays} from 'date-fns';
import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";

const DayDatePicker = ({onChange }) => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(addDays(new Date(), 30)));
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
        maxDate={addDays(new Date(), 60)}
        placeholderText="Select a date between today and 60 days in the future"
      ></DatePicker>
      </Grid>
    </Grid>
  
  );
};

export default DayDatePicker;