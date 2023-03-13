import React from 'react'
import SideMenu from '../components/SideMenu';
import {Stack, Box, Grid} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import TopMenu from '../components/TopMenu';

const Profile = () => {
  const pageAddress = "/profile";
  const pageName = "Profile";
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
      </Stack>
    </Stack>
  );
}
export default Profile