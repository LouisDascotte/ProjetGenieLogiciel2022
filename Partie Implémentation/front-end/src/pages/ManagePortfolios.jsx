import React from 'react'
import SideMenu from '../components/SideMenu';
import {Stack,Card, Box, Grid, Button, ThemeProvider, createTheme} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import TopMenu from '../components/TopMenu';
import ElementsList from '../components/ElementsList';
import TempList from '../components/TempList';
import {Link} from 'react-router-dom';
import PortfoliosList from '../components/portfolio/PortfoliosList';

const ManagePortfolios = () => {
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
  const pageAddress = "/manage-portfolios";
  const pageName = "Manage portfolios";
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Grid align='center'>
          <Card sx={{width:'40%', m:2, height:'60%'}}>
            <PortfoliosList/>
          </Card>
          <ThemeProvider theme={theme}>
            <Link to='/create-portfolio' className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
              <Button  variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                Create portfolio
              </Button>
            </Link>
          </ThemeProvider>
          
        </Grid>
      </Stack>
      
    </Stack>
  );
}

export default ManagePortfolios