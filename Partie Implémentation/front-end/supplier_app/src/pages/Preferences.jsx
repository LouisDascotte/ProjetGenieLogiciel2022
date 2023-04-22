import React from 'react'
import SideMenu from '../components/SideMenu';
import {Stack, Box, Grid, TextField, Typography, Button, Select} from '@mui/material';
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
          <Grid alignItems="center" direction='row'>
            <Grid item >
              <Typography variant='h6' sx={{mr:8}}>
                App language :
                </Typography>
            </Grid>
            <Grid item >
              <Select
              native >
                <option value="english">English</option>
                <option value="french">French</option>
              </Select>
            </Grid>
          </Grid>
          <Button sx={{mt:4}} variant="contained" onClick={saveChanges}>
            Save changes
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Preferences