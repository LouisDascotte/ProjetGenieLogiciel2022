import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Stack, Grid, Card, Box, Button, Paper } from '@mui/material';
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';
import Carousel from 'react-material-ui-carousel'



const ManageOffer = () => {

  const pageAddress = "/offers";
  const pageName = "Manage offers";

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

  const items = [
    {
      title: 'Slide 1',
      description: 'Description for Slide 1',
    },
    {
      title: 'Slide 2',
      description: 'Description for Slide 2',
    },
    {
      title: 'Slide 3',
      description: 'Description for Slide 3',
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu mainPage={"false"} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center'>
            <Carousel>
              {items.map((item, index) => (
                <Paper key={index}>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <Button variant="contained" color="primary">
                    Read More
                  </Button>
                </Paper>
              ))}
            </Carousel>
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
export default ManageOffer;