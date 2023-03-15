import { Stack } from '@mui/material';
import React from 'react';
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';

const Stats = () => {
  const pageAddress = "/stats";
  const pageName = "Statistical Analysis";
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
      </Stack>
    </Stack>
  );
}
export default Stats