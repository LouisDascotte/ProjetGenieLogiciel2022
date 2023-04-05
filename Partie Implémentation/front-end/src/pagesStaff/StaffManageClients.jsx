import React from 'react'
import SideMenu from '../components/SideMenu';
import {ArrowBack} from '@mui/icons-material'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import ElementsList from '../components/ElementsList';
import { clientList as clients, portfolioList } from '../resources/clientList';



const ManageClients = () => {
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

  const pageAddress = "/staff-clients";
  const pageName = "Manage clients";

  const [selectedPortfolio, setSelectedPortfolio] = React.useState(null);
  const handlePortfolioClick = (portfolioID) => {
    setSelectedPortfolio(portfolioID);
    console.log(portfolioID);
  };
  const handleResetClick = () => {
    setSelectedPortfolio(null);
  };

  return (

    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu/>
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center'>
            <Card sx={{width:'50%', m:2, height:'60%' }} >
              {selectedPortfolio ? (
                <Stack>
                  <Button variant="contained" color="primary" startIcon={<ArrowBack />} onClick={handleResetClick}>
                    Retour
                  </Button>
                  <Typography variant="h4" component="h2" align="center" fontWeight={500} >
                    Meters of {portfolioList[selectedPortfolio].owner.slice(0,15)}
                  </Typography>
                  <List style={{maxHeight: '100%', overflow: 'auto'}} >
                    {portfolioList[selectedPortfolio].meters.map((meterID) => (
                      <ListItem key={meterID}>
                        <ListItemText primary={meterID.meterID} />
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              ) : (
                <Stack>
                  <Typography variant="h4" component="h2" align="center" fontWeight={800} >
                    Client List
                  </Typography>
                  <List style={{maxHeight: '100%', overflow: 'auto'}} >
                    {clients.map((client) => (
                      <ListItem key={client.clientID}>
                        <ListItemText primary={`${client.name}`} />
                        <Button variant="contained" onClick={() => handlePortfolioClick(client.portfolioID)}>
                          See meters
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              )}
            </Card>
              <Link to='/register-account' className='link-3' style={{display: 'inline-block', mt:2, width:'50%', mb:5}}>
                <Button  variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                  Add New Client
                </Button>
              </Link>
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );

}

export default ManageClients