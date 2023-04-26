import React from 'react'
import SideMenu from '../components/SideMenu';
import {Stack,Card, Box, Grid, Button, ThemeProvider, createTheme} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import TopMenu from '../components/TopMenu';
import ContractsList from '../components/ContractsList';
import { useTranslation } from 'react-i18next';


const ManageContracts = () => {
  const {t} = useTranslation();
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
  const pageAddress = "/manage-contracts";
  const pageName = t('manage_contracts');
  const navigate = useNavigate();
  
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu mainPage={"false"} />
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Grid align='center' height={"auto"}>
          <Card sx={{width:'40%', m:2, height:'auto'}}>
            <ContractsList/>
          </Card>
          <ThemeProvider theme={theme}>
            <Link to='/contract-request' className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
              <Button  variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                {t('new_contract')}
              </Button>
            </Link>
          </ThemeProvider>
          
        </Grid>
          
      </Stack>
    </Stack>
  );
}
  

export default ManageContracts