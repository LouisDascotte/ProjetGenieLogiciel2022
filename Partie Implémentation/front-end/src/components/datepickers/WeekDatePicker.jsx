import DatePicker from 'react-datepicker';
import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { addWeeks, subWeeks } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

const WeekDatePicker = ({onChange }) => {
  /*
  On the first datepicker, the minDate is set to 2022-01-01 and the maxDate is set to 8 weeks before the second datepicker.
  On the second datepicker, the minDate is set to 8 weeks after the first datepicker and the maxDate is set to 52 weeks after the first datepicker or 2022-12-31, whichever is earlier.
  */
  
  const minDate = new Date("2022-01-01");
  const maxDate = new Date("2022-12-31");
  const minTime = 8;
  const maxTime = 52;
  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(new Date(addWeeks(startDate, 8)));

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
        maxDate={subWeeks(endDate, minTime)}
        locale="fr-FR"
        dateFormat="dd/MM/yyyy"
        showWeekNumbers
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
        minDate={addWeeks(startDate, minTime)}
        maxDate={new Date(Math.min.apply(null, [maxDate, addWeeks(startDate, maxTime)]))}
        dateFormat="dd/MM/yyyy"
        showWeekNumbers
      ></DatePicker>
      </Grid>
    </Grid>
  
  );
};

export default WeekDatePicker;