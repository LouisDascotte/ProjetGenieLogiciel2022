import React from 'react'
import SideMenu from '../components/SideMenu';
import {Stack,Card, Box, Grid, Button, ThemeProvider, createTheme, IconButton} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import TopMenu from '../components/TopMenu';
import {Link} from 'react-router-dom';
import axios from '../api/axios';
import MetersList from '../components/MetersList';
import { useTranslation } from 'react-i18next';

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
  const jwt = localStorage.getItem("jwt");
  const {t} = useTranslation();
  
  
  const pageAddress = "/manage-meters";
  const pageName = t('manage_meters');
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Grid align='center'>
          <Card sx={{width:'40%', m:2, height:'60%'}}>
            <MetersList/>
          </Card>
          <ThemeProvider theme={theme}>
            <Link to='/assignment-history' className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
              <Button  variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                {t('assignment_history')}
              </Button>
            </Link>
          </ThemeProvider>
          
        </Grid>
      </Stack>
    </Stack>
  );
}

export default ManageMeters