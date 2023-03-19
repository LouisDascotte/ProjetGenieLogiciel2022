import DatePicker from 'react-datepicker';
import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";
import { frFR } from '@mui/material/locale';

const WeekDatePicker = ({onChange }) => {

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
        endDate={endDate}
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
        startDate={startDate}
        endDate={endDate}
        dateFormat="dd/MM/yyyy"
        showWeekNumbers
      ></DatePicker>
      </Grid>
    </Grid>
  
  );
};

export default WeekDatePicker;