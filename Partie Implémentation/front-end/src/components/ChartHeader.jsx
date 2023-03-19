import { Grid, Typography } from '@mui/material';
import {React, useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import MonthDatePicker from './datepickers/MonthDatePicker.jsx';
import QuarterDatePicker from './datepickers/QuarterDatePicker.jsx';
import WeekDatePicker from './datepickers/WeekDatePicker.jsx';
import DayDatePicker from './datepickers/DayDatePicker.jsx';
import { Stack } from '@mui/system';
import ScaleButtons from './ScaleButtons.jsx';

{/* npm install react-datepicker --save */}


const ChartHeader = () => {
  
  const [scale, setScale] = useState('month');

  switch (scale) {
    case "day":
      return (
        <Grid container
        direction='row'
        alignItems='center'
        justifyContent='end'
        >
          <Grid item xs={9} >
            <ScaleButtons scale={scale} setScale={setScale} />
          </Grid>
          <Grid item xs={3} >
            <DayDatePicker />
          </Grid>
        </Grid>
      );
    case "week":
      return (
        <Grid container
        direction='row'
        alignItems='center'
        justifyContent='end'
        >
          <Grid item xs={9} >
            <ScaleButtons scale={scale} setScale={setScale} />
          </Grid>
          <Grid item xs={3} >
            <WeekDatePicker />
          </Grid>
        </Grid>
      );
    case "trimester":
      return (
        <Grid container
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        >
          <Grid item xs={3} >
            <ScaleButtons scale={scale} setScale={setScale} />
          </Grid>
          <Grid item xs={3} >
            <QuarterDatePicker />
          </Grid>
        </Grid>
      );
    case "semester":
      return (
        <Grid container
        direction='row'
        alignItems='center'
        justifyContent='end'
        >
          <Grid item xs={9} >
            <ScaleButtons scale={scale} setScale={setScale} />
          </Grid>
          <Grid item xs={3} >
            <MonthDatePicker />
          </Grid>
        </Grid>
      );
    case "year":
      return (
        <Grid container
        direction='row'
        alignItems='center'
        justifyContent='end'
        >
          <Grid item xs={9} >
            <ScaleButtons scale={scale} setScale={setScale} />
          </Grid>
          <Grid item xs={3} >
            <MonthDatePicker />
          </Grid>
        </Grid>
      );
    case "month":
    default:
      // Render the ScaleButtons and MonthDatePicker components if scale is "month"
      return (
        <Grid container
        direction='row'
        alignItems='center'
        justifyContent='end'
        >
          <Grid item xs={9} >
            <ScaleButtons scale={scale} setScale={setScale} />
          </Grid>
          <Grid item xs={3} >
            <MonthDatePicker />
          </Grid>
        </Grid>
      );
  }   

  /*
  return (
    <Grid container
    direction='row'
    alignItems='center'
    justifyContent='end'
    spacing={1}
    >
      <Grid item xs={6} >
        <Typography variant="h6" component="div" gutterBottom> From: </Typography>
      </Grid>
      <Grid item xs={6} > 
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
        ></DatePicker>
      </Grid>
      <Grid item xs={6} >
        <Typography variant="h6" component="div" gutterBottom> To: </Typography>
      </Grid>
      <Grid item xs={6} >
      <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="dd/MM/yyyy"
        ></DatePicker>
      </Grid>
    </Grid>
  );
  */
}

export default ChartHeader