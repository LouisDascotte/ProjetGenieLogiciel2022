import React from 'react'
import SideMenu from '../components/SideMenu';
import {Stack, Box, Grid, Card, Typography, TextField} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import TopMenu from '../components/TopMenu';


const URL = "http://localhost:8080/api/client/"


const Profile = () => {
  const pageAddress = "/profile";
  const pageName = "Profile";
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}} alignItems='center'>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Card sx={{width:"40%", m:5}}>
          <Stack alignItems="center">
            <Stack direction='row' sx={{m:2}} justifyContent="center">
              <Typography variant='h5' sx={{mr:5}}>
                Last Name
              </Typography>
              <TextField label='last name'/>
            </Stack>
            <Stack direction="row" sx={{m:2}}>
              <Typography variant="h5" sx={{mr:5}}>
                First Name
              </Typography>
              <TextField label="first name"/>
            </Stack>
            <Stack direction='row' sx={{m:2}} justifyContent="center">
              <Typography variant='h5' sx={{mr:5}}>
                Phone number
              </Typography>
              <TextField label='last name'/>
            </Stack>
            <Stack direction='row' sx={{m:2}} justifyContent="center">
              <Typography variant='h5' sx={{mr:5}}>
                Email address
              </Typography>
              <TextField label='last name'/>
            </Stack>
            <Stack direction='row' sx={{m:2}} justifyContent="center">
              <Typography variant='h5' sx={{mr:5}}>
                Address
              </Typography>
              <TextField label='last name'/>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
}
export default Profile