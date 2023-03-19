import { Card, Grid, Stack } from '@mui/material';
import React from 'react';
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';
import BiAxLineChart from '../components/BiAxLineChart';
import ChartFooter from '../components/ChartFooter';
import ChartHeader from '../components/ChartHeader';


const Testing = () => {
  const pageName = "test";
	const pageAddress = "/test";
  return (

    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        
          <Grid container
          direction='column'
          alignItems='center'
          justifyContent='flex-start'
          >
            <Grid item >
              <ChartHeader />
            </Grid>
            <Grid item >
              <BiAxLineChart />
            </Grid>
            <Grid item >
              <ChartFooter />
            </Grid>
          </Grid>
        </Stack>
    </Stack>
   

  );
}
export default Testing