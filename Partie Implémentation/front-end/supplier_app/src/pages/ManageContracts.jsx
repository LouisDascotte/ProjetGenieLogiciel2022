import React, { useEffect } from 'react'
import SideMenu from '../components/SideMenu';
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ArrowBack} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { ContractList } from '../resources/Lists';
import { getContracts } from '../api/contractApi';
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

  const pageAddress = "/contracts";
  const pageName = "Manage contracts";
<<<<<<< HEAD

  const [contracts, setContracts] = React.useState([]);

  useEffect(() => {
    async function getContracts() {
      try {
        const jwt = localStorage.getItem("jwt");
        const config = {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
          }
        };
        const response = await axios.get("http://localhost:8080/api/contract/all", config);
        console.log(response.data);
        setContracts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getContracts();
  }, []);
=======
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu mainPage={"false"} />
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Grid align='center'>
          <Card sx={{width:'40%', m:2, height:'60%'}}>
            <ContractsList/>
          </Card>
          <ThemeProvider theme={theme}>
            <Link to='/contract-request' className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
              <Button  variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                New contract request
              </Button>
            </Link>
          </ThemeProvider>
          
        </Grid>
          
      </Stack>
    </Stack>
  );
}
>>>>>>> e4eea14916440ba0aecde5621da279bf37dcb0ff
  

  const [selectedContract, setSelectedContract] = React.useState(null);

  const handleContractClick = (contractID) => {
    setSelectedContract(contractID);
    console.log(contractID);
  };
  const handleResetClick = () => {
    setSelectedContract(null);
  };
  const getClientNameByContractId = (contractID) => {
    const client = ContractList.find((contract) => contract.id === contractID);
    return client.clientName;
  };

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
                  {ContractList.map((contract) => (
                    <ListItem key={contract.contractId}>
                      <ListItemText primary={`${contract.contractId}`} />
                      <Link to={`/contracts/${contract.contractId}`} className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
                        <Button variant="contained" onClick={() => handleContractClick(contract.contractId)}>
                          See Details
                        </Button>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Card> 
            <Grid item xs={12} align='center'>
              <Link to='/contracts/new' className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
                <Button  variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                  New contract
                </Button>
              </Link>
            </Grid>
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