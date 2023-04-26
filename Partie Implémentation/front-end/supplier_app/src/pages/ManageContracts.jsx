import React, { useEffect } from 'react'
import SideMenu from '../components/SideMenu';
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ArrowBack} from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import axios from 'axios';

const ManageContracts = () => {
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

  const nav = useNavigate();

  const pageAddress = "/contracts";
  const pageName = "Manage contracts";

  const [contracts, setContracts] = React.useState([]);

  useEffect(() => {
    async function getContracts() {
      try {
        const jwt = localStorage.getItem("jwt");
        const config = {
          headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
          }
        };
        const response = await axios.get("http://localhost:8080/api/contract/all", config);
        const actCont =response.data.filter((contract) => contract.status === "ACCEPTED")
        setContracts(actCont);
      } catch (error) {
        console.log(error);
      }
    }
    getContracts();
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu mainPage={"false"} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center'>
            <Card sx={{width:'50%', m:2, height:'60%'}}>
              <Box sx={{height:'100%', width:'100%'}} alignment='center' > 
                <Typography variant="h4" component="h2" align="center" fontWeight={800} >
                  Contracts List
                </Typography>
                <List style={{maxHeight: '100%', overflow: 'auto'}} >
                  { contracts.length === 0 ? <ListItem>No contracts found</ListItem>
                  :
                  contracts.map((contract) => (
                    <ListItem key={contract.id}>
                      <ListItemText primary={"contract #"+`${contract.id}`.slice(0,15)} />
                        <Button variant="contained" onClick={() => nav(`/contracts/${contract.id}`, { state : contract})}>
                          See Details
                        </Button>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Card> 

            <Grid item xs={12} align='center'>
              <Link to='/contracts/requests' className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
                <Button  variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                  Contract Requests
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default ManageContracts