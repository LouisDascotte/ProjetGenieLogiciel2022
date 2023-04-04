import DatePicker from 'react-datepicker';
import {addDays, subDays, addWeeks, subWeeks} from 'date-fns';
import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';
registerLocale('fr', fr)

const DatePickers = ({scale }) => {

  setDefaultLocale('fr');

  const minDate = new Date("2022-01-01");
  const maxDate = new Date("2022-12-31");
  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(new Date(addDays(startDate, 30)));
  

  switch (scale) {
    // Return a different set of dates depending on the scale
    // Month is the default case
    
    case "day": {
      const minTime = 14;
      const maxTime = 60;
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
            maxDate={subDays(maxDate, minTime)}
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
    }
    case "week": {
      const minTime = 8;
      const maxTime = 24;
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
            maxDate={subWeeks(maxDate, minTime)}
            startDate={startDate}
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
            dateFormat="dd/MM/yyyy"
            minDate={addWeeks(startDate, minTime)}
            maxDate={new Date(Math.min.apply(null, [maxDate, addWeeks(startDate, maxTime)]))}
            showWeekNumbers
          ></DatePicker>
          </Grid>
        </Grid>
      );
    }

    case "month":
    default:
      {
      const minTime = 6;
      const maxTime = 24;
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
            minDate={addWeeks(startDate, minTime)}
            maxDate={new Date(Math.min.apply(null, [maxDate, addDays(startDate, maxTime)]))}
          ></DatePicker>
          </Grid>
        </Grid>
      );
      }
    } 
};

export default DatePickers;