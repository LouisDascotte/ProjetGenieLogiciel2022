import { ToggleButton, ToggleButtonGroup, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';


const ScaleButtons = ({ scale, setScale }) => {
    const [value, setValue] = React.useState(scale);
    
    const handleChange = (event) => {
        setValue(event.target.value);
        setScale(event.target.value);
    };
    
    return (
      <Stack direction="row"
      spacing={1.5}
      alignItems='baseline'
      >
        <Typography variant="h6" component="div" gutterBottom>
          Scale:
        </Typography>
        <ToggleButtonGroup
            value={value}
            exclusive
            onChange={handleChange}
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
    );
    }

export default ScaleButtons