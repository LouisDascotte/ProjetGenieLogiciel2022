import { ToggleButton, ToggleButtonGroup, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';


const ScaleButtons = ({ scale, setScale }) => {
    const [value, setValue] = React.useState(scale);

    const theme = createTheme({
      palette: {
        primary: {
          main: '#9BCC6C',
        },
      },
    });
    
    const handleChange = (event) => {
        setValue(event.target.value);
        setScale(event.target.value);
    };
    
    return (
      <ThemeProvider theme={theme}>
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
          1D
          </ToggleButton>
          <ToggleButton value="week" aria-label="justified">
          1W
          </ToggleButton>
          <ToggleButton value="month" aria-label="justified">
          1M
          </ToggleButton>
          <ToggleButton value="trimester" aria-label="justified">
          3M
          </ToggleButton>
          <ToggleButton value="semester" aria-label="justified">
          6M
          </ToggleButton>
          <ToggleButton value="year" aria-label="justified">
          1Y
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      </ThemeProvider>
      
    );
    }

export default ScaleButtons