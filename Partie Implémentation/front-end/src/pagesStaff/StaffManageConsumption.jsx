import React from 'react'
import StaffSideMenu from '../pagesStaff/StaffSideMenu';
import {Stack,Card, Grid, Button, ThemeProvider, createTheme} from '@mui/material';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import ElementsList from '../components/ElementsList';



const ManageCons = () => {
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
  const pageAddress = "/staff-cons";
  const pageName = "Manage consumption";
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <StaffSideMenu mainPage={"false"} />
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Grid align='center'>
          <Card sx={{width:'40%', m:2, height:'60%'}}>
            <ElementsList/>
          </Card>
          <ThemeProvider theme={theme}>
            <Link to='/register-account' className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
              <Button  variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                Import Data
              </Button>
            </Link>
          </ThemeProvider>
        </Grid>
      </Stack>
    </Stack>
  );
}
  

export default ManageCons