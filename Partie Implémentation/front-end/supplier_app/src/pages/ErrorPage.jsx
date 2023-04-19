import { Stack } from '@mui/material';
import React from 'react';
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';

const ErrorPage = () => {
  const pageName = "Error";
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageName={pageName}/>
        < Stack sx={{display:'flex', width:"100%", height:"100%", justifyContent:'flex-start', alignItems:'center'}}>
            <h1 className='errorText' >Page Not Found</h1>
        </Stack>
      </Stack>
    </Stack>
  );
}
export default ErrorPage