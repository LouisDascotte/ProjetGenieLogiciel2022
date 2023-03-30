import { Grid, Typography } from '@mui/material';
import {React, useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Stack } from '@mui/system';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DatePickers from './DatePickers.jsx';

{/* npm install react-datepicker --save */}


const ChartHeader = ({ scaleToggled, onToggleChange }) => {
  
      return (
        <Grid container
        direction='row'
        alignItems='center'
        justifyContent='end'
        >
          <Grid item xs={9} >
          <Stack direction="row"
          spacing={1.5}
          alignItems='baseline'
          >
            <Typography variant="h6" component="div" gutterBottom>
              Scale:
            </Typography>
            <ToggleButtonGroup
                value={scaleToggled}
                exclusive
                onChange={onToggleChange}
                aria-label="text alignment"
                color='primary'
                size='small'
            >
              <ToggleButton value="day" aria-label="justified">
              Day
              </ToggleButton>
              <ToggleButton value="week" aria-label="justified">
              Week
              </ToggleButton>
              <ToggleButton value="month" aria-label="justified">
              Month
              </ToggleButton>
            </ToggleButtonGroup>
      </Stack>
          </Grid>
          <Grid item xs={3} >
            <DatePickers scale={scaleToggled} />
          </Grid>
        </Grid>
      );
}

export default ChartHeader