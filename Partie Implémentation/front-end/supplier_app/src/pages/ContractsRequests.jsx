import React from 'react'
import SideMenu from '../components/SideMenu';
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ArrowBack} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { ContractList, ContractRequestList } from '../resources/Lists';



const ContractsRequests = () => {
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

  const pageAddress = "/contracts/requests";
  const pageName = "Manage Contract Requests";

  return (
    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu mainPage={"false"} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center'>
            <Card sx={{width:'50%', m:2, height:'auto'}}>
              <Box sx={{height:'100%', width:'100%'}} alignment='center' > 
                <Typography variant="h4" component="h2" align="center" fontWeight={800} >
                  Contract Requests
                </Typography>
                <List style={{maxHeight: '100%', overflow: 'auto'}} >
                  {ContractRequestList.map((contractRequest) => (
                    <ListItem key={contractRequest.contractRequestId}>
                      <ListItemText primary={`${contractRequest.contractRequestId}`} />
                      <Link to={`/contracts/requests/${contractRequest.contractRequestId}`} className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
                        <Button variant="contained" >
                          See Details
                        </Button>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Card> 
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default ContractsRequests