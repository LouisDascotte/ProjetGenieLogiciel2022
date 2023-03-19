import { Card, Grid, Stack } from '@mui/material';
import React from 'react';
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';
import DatePickers from '../components/DatePickers';
import ScaleButtons from '../components/ScaleButtons';
import BiAxLineChart from '../components/BiAxLineChart';
import ChartFooter from '../components/ChartFooter';


const Testing = () => {
  const pageName = "test";
	const pageAddress = "/test";
  return (
    <Stack direction='column' sx={{width:"100%"}}>
      <Stack direction='column' spacing={6} sx={{height:"90%", justifyContent:'center', alignItems:'center'}}>
        <Grid container 
        justifyContent='space-between'
        paddingTop={6}
        paddingLeft={4}
        paddingRight={4}
        >
          <Grid item>
            <ScaleButtons />
          </Grid>
          <Grid item>
            <DatePickers />
          </Grid>
        </Grid>
        <BiAxLineChart />
        <ChartFooter />
      </Stack>
    </Stack>
  );
}
export default Testing