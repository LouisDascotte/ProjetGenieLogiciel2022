import React from 'react'
import {Stack, Box, Typography, TextField, InputLabel, Button, IconButton} from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';


const BillingInformationsPage = () => {

  // Used to choose if the user wants to pay with a credit card or a manual payment
  const [manualPayment, setManualPayment] = React.useState(false);

  const [billingInfos, setBillingInfos] = React.useState({
    name : "",
    address : "", 
    bic : "", 
    iban : "",
  });

  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}} alignItems='center'>
        <TopMenu pageAddress={"/billing-informations"} pageName={"Billing informations"}/>
        <Stack>
          <Typography variant="h7">
            Name :
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default BillingInformationsPage