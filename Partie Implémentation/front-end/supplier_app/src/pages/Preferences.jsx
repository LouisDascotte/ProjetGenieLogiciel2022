import React from 'react'
import SideMenu from '../components/SideMenu';
import {Stack, Box, Grid, TextField, Typography, Button} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import TopMenu from '../components/TopMenu';
import axios from '../api/axios';


const URL = "http://localhost:8080/api/s";

const Preferences = () => {
  const pageAddress = "/preferences";
  const pageName = "Preferences";


  const saveChanges = () => {
    const res = axios.post()
  }



  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Stack alignItems='center' justifyContent={"center"} sx={{m:4}}>
          <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"}>
            <Typography variant='h6' sx={{mr:8}}>App language :</Typography>
            <TextField label="language" sx={{mt:2}}/>
          </Stack>
          <Stack direction='row' alignItems={"center"} justifyContent={'space-evenly'}>
            <Typography variant="h6" sx={{mr:3}}>Change password :</Typography>
            <Stack justifyContent={'space-evenly'} alignItems={"flex-end"}>
              <TextField label='current password' sx={{mt:2}}/>
              <TextField label='new password' sx={{mt:2}}/>
              <TextField label='confirm new password' sx={{mt:2}}/>
            </Stack>
          </Stack>
          <Stack direction='row' alignItems={"center"} justifyContent={'space-evenly'}>
            <Typography variant="h6" sx={{mr:3.5}}>Favorite portfolio :</Typography>
            <TextField label="favorite portfolio" sx={{mt:2}}/>
          </Stack>
          <Typography variant='h6' sx={{mt:2}}> Toggle Dark mode</Typography> 
          <Button variant='outlined' size='large' sx={{mt:2}}>Save changes</Button>
        </Stack>
        
      </Stack>
    </Stack>
  );
}

export default Preferences