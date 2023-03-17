import React from 'react'
import SideMenu from '../components/SideMenu';
import {Stack,Card, Box, Grid, Button, ThemeProvider, createTheme} from '@mui/material';
import TopMenu from '../components/TopMenu';
import BiAxLineChart from '../components/BiAxLineChart';

const StatAnalysis = () => {
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
    const pageAddress = "/stats";
    const pageName = "Statistical Analysis";
    return (
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu/>
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Stack sx={{height:"90%", justifyContent:'center', alignItems:'center'}}>
            <BiAxLineChart />
          </Stack>
        </Stack>
      </Stack>
    );
  }
  
  export default StatAnalysis;