import React from 'react'
import { Grid, Card } from '@mui/material';
import ElementsList from './ElementsList';

const TempList = () => {
  return (
    <Grid align='center'>
    <Card sx={{width:'40%', m:2, height:'60%'}}>
      <ElementsList/>
    </Card>
  </Grid>
  );
}

export default TempList