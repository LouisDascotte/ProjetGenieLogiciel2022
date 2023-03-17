import { Grid, Stack } from '@mui/material';
import React from 'react';
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';
import PeriodOfTime from '../components/PeriodOfTime';
import ScaleButtons from '../components/ScaleButtons';
import BiAxLineChart from '../components/BiAxLineChart';
import Module1 from '../components/Module1';


const ErrorPage = () => {
  const pageName = "test";
  return (
    <Stack direction='column' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <TopMenu pageName={pageName}/>
        <Stack sx={{display:'flex', width:"100%"}} position>
            <Stack direction="row">
                <ScaleButtons/>
                <PeriodOfTime/>
            </Stack>
            <BiAxLineChart/>
        </Stack>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Module1/>
            </Grid>
            <Grid item xs={12} md={6}>
                <Module1/>
            </Grid>
            <Grid item xs={12} md={6}>
                <Module1/>
            </Grid>
            <Grid item xs={12} md={6}>
                <Module1/>
            </Grid>
        </Grid>
    </Stack>
  );
}
export default ErrorPage