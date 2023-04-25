import React from 'react'
import {Stack, FormGroup, FormControlLabel, Checkbox,  Box, Typography, TextField, InputLabel, Button, IconButton, Dialog, DialogContent, DialogTitle} from '@mui/material';
import {useNavigate, useLocation} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';


const BillingInformationsPage = () => {

  /*const [billingInfos, setBillingInfos] = React.useState({
    name : "",
    address : "", 
    bic : "", 
    iban : "",
  });*/

  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [bic, setBic] = React.useState("");
  const [iban, setIban] = React.useState("");
  const [open, setOpen] = React.useState(false);

  // Used to check if the user wants to pay manually or not
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  }

  const saveChanges = () => {
    console.log(name);
    console.log(address);
    console.log(bic);
    console.log(iban);
  }


  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}} alignItems='center'>
        <TopMenu pageAddress={"/billing-informations"} pageName={"Billing informations"}/>
        <Box sx={{borderRadius:"16px", backgroundColor:"white", width:"80%", mt:5}}>
          <Stack alignItems='center' justifyContent={"center"} sx={{m:4}}>
            <Stack direction='row' justifyContent='space-between'>
              <Typography variant="h6" sx={{mr:3}}>
                Name :
              </Typography>
              <TextField variant="outlined" size="small" onChange={e => setName(e.target.value)}/>
            </Stack>
            <Stack direction='row' justifyContent='space-between' sx={{mt:2}}>
              <Typography variant="h6" sx={{mr:3}}>
                Address :
              </Typography>
              <TextField variant="outlined" size="small" onChange={e => setAddress(e.target.value)}/>
            </Stack>
            <Stack direction='row' justifyContent='space-between' sx={{mt:2}}>
              <Typography variant="h6" sx={{mr:3}}>
                BIC :
              </Typography>
              <TextField variant="outlined" size="small" onChange={e => setBic(e.target.value)}/>
            </Stack>
            <Stack direction='row' justifyContent='space-between' sx={{mt:2}}>
              <Typography variant="h6" sx={{mr:3}}>
                IBAN :
              </Typography>
              <TextField type='number' variant="outlined" size="small" onChange={e => setIban(e.target.value)}/>
            </Stack>
            <FormControlLabel sx={{mt:2}} control={<Checkbox checked={checked} onChange={handleChange}/>} label="I prefer paying manually." />
            <Stack direction='row'>
              <Button variant="outlined" sx={{mt:2}} onClick={saveChanges}>
                Save changes
              </Button>
              { checked ? 
              <Button variant='outlined' sx={{mt:2, ml: 3}} onClick={()=> setOpen(true)}>
                Show payment informations
              </Button> : null}
            </Stack>
            <Dialog open={open} onClose={()=> setOpen(false)}>
              <DialogTitle sx={{textAlign:"center"}}>
                Payment informations
              </DialogTitle>
              <DialogContent>
                <Stack direction='row' justifyContent='space-between'>
                  <Typography variant="h6" sx={{mr:3}}>
                    Name :
                  </Typography>
                </Stack>
              </DialogContent>
            </Dialog>
            
          </Stack>
          
        </Box>
      </Stack>
    </Stack>
  )
}

export default BillingInformationsPage