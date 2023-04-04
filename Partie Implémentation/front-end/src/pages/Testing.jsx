import React, { useState } from 'react';
import { Stack } from '@mui/material';
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';

const Testing = () => {
  const pageName = "test";
	const pageAddress = "/test";

  return (

    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}} >
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
      </Stack>
    </Stack>

  );
}

export default Testing;