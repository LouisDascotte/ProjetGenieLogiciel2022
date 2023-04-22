import {React, useState} from 'react'
import SideMenu from '../components/SideMenu';
import {Stack, Box, Grid, Card, Typography, TextField} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import TopMenu from '../components/TopMenu';
import axios from '../api/axios';

const URL = "http://localhost:8080/api/supplier/"


const Profile = () => {

  const pageAddress = "/profile";
  const pageName = "Profile";

  const jwt = localStorage.getItem("jwt");
  const [supplierName, setSupplierName] = useState(localStorage.getItem("name"));

  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}} alignItems='center'>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Card sx={{width:"60%", m:5}}>
          <Grid alignItems="center">
            <Grid direction='row' sx={{m:2}} justifyContent="center" container>
              <Grid item xs={6}>
                <Typography variant='h5' sx={{mr:5, mt:1.5}}>
                  Supplier Name
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField sx={{mr:4}} InputProps={{ readOnly: true }} value={supplierName} />
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Stack>
    </Stack>
  );
}
export default Profile