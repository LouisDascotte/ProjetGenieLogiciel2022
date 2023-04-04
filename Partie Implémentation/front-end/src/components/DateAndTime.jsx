import React, { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';

function DateTime({ locale}) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Stack 
      direction='column'
      alignItems='center'
      justifyContent='center'
      >
        <Typography variant="h4" component="div" fontWeight={1000} fontSize={72} gutterBottom>
          {dateTime.toLocaleDateString(locale)}
        </Typography>
        <Typography variant="h4" component="div" fontWeight={1000} fontSize={72} gutterBottom>
          {dateTime.toLocaleTimeString(locale)}
        </Typography>
      </Stack>
    </div>
  );
}

export default DateTime;
