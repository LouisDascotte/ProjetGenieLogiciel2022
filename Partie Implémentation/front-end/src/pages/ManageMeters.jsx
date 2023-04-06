import React from 'react'
import SideMenu from '../components/SideMenu';
import {Stack,Card, Box, Grid, Button, ThemeProvider, createTheme} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import TopMenu from '../components/TopMenu';
import TempList from '../components/TempList';
import ElementsList from '../components/ElementsList';
import {Link} from 'react-router-dom';
import axios from '../api/axios';

const theme = createTheme({
  palette: {
    primary: {
      main: "#9bcc6c",
      contrastText: '#fff'
    }, 
    secondary: {
      main: "#000",
      contrastText: '#000000'
    }
  }
});

const METER_URL = "http://localhost:8080/api/meter/"

const ManageMeters = () => {
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  const response = axios.get(METER_URL + "all", {
    headers : {"Content-Type":"application/json",
  "Authorization" : `Bearer ${jwt}`,
  "Access-Control-Allow-Origin":true}
  } ).then(response=>{
    console.log(response.data);
  });
  const pageAddress = "/manage-meters";
  const pageName = "Manage meters";
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Grid align='center'>
          <Card sx={{width:'40%', m:2, height:'60%'}}>
            <ElementsList/>

          </Card>
          <ThemeProvider theme={theme}>
            <Link to='/register-account' className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
              <Button  variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                Assignment history
              </Button>
            </Link>
          </ThemeProvider>
          
        </Grid>
      </Stack>
    </Stack>
  );
}

export default ManageMeters