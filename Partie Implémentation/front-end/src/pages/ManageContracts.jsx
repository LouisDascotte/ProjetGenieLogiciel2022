import React from 'react'
import SideMenu from '../components/SideMenu';
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ArrowBack} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { ContractList } from '../resources/Lists';



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

  const pageAddress = "/staff-contracts";
  const pageName = "Manage contracts";

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
                    <ListItem key={contract.contractID}>
                      <ListItemText primary={`${contract.contractID}`} />
                      <Link to={`/staff-contracts/${contract.contractID}`} className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
                        <Button variant="contained" onClick={() => handleContractClick(contract.contractID)}>
                          See Details
                        </Button>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Card> 
            <Grid item xs={12} align='center'>
              <Link to='/staff-contracts/new' className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
                <Button  variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                  New contract
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} align='center'>
              <Link to='/register-account' className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
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