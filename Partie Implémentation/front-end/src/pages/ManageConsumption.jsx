import React from 'react'
import SideMenu from '../components/SideMenu';
import {Stack,Card, Grid, Button, ThemeProvider, createTheme, Hidden} from '@mui/material';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';



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
      },
      deletion : {
        main: "#ff0000",
        contrastText: '#000000'
      }
    }
  });
  const pageAddress = "/staff-cons";
  const pageName = "Manage consumption";
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu mainPage={"false"} />
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Grid align='center'>
          <Card sx={{width:'40%', m:2, height:'60%'}}>
          </Card>
          <ThemeProvider theme={theme}>
          <Grid item xs={12} align='center'>
              <Link to='/register-account' className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
                <Button  variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                  Import Data
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} align='center'>
              <Link to='/register-account' className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
                <Button  variant='outlined' color='deletion' disabled={false} sx={{mt:2, width:'100%', mb:5} }>
                  Delete
                </Button>
              </Link>
            </Grid>
          </ThemeProvider>
        </Grid>
      </Stack>
    </Stack>
  );
}
  

export default ManageCons