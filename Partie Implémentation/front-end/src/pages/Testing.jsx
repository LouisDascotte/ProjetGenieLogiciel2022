import { Card, Grid, Stack } from '@mui/material';
import React from 'react';
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';
import ChartFooter from '../components/ChartFooter';
import ChartHeader from '../components/ChartHeader';
import BiAx from '../components/BiAx';


const Testing = () => {
  const pageName = "test";
	const pageAddress = "/test";
  return (

    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}} >
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Stack sx={{height:"80%", justifyContent:'start', alignItems:'center'}}>
            <ChartHeader />
            <BiAx scale={"week"} showGas={true} showWater={true} showElec={true} />
            <Stack sx={{width:"60%", justifyContent:"center"}} >
              <ChartFooter />
            </Stack>
          </Stack>
        </Stack>
    </Stack>
   

  );
}
export default Testing