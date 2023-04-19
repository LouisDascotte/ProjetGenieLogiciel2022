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

  const [infos, setInfos] = useState({
    supplierName: "",
    operatingArea: ""
  });


  const response = axios.get(URL + "me",{
    headers : {"Content-Type":"application/json",
  "Authorization" : `Bearer ${jwt}`,
  "Access-Control-Allow-Origin":true}
  }).then(response=>{
    console.log(response.data);
    console.log(response.data.firstName);
    infos.supplierName = response.data.lastName;
    infos.operatingArea = response.data.operatingArea;
  })



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
                <TextField label='Supplier Name'sx={{mr:4}}/>
              </Grid>
            </Grid>
            <Grid direction='row' sx={{m:2}} justifyContent="center" container>
              <Grid item xs={6}>
                <Typography variant='h5' sx={{mr:5, mt:1.5}}>
                  Last Name
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField label='last name'sx={{mr:4}}/>
              </Grid>
            </Grid>
            <Grid direction='row' sx={{m:2}} justifyContent="center" container>
              <Grid item xs={6}>
                <Typography variant='h5' sx={{mr:5, mt:1.5}}>
                  Phone Number
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField label='phone number'sx={{mr:4}}/>
              </Grid>
            </Grid>
            <Grid direction='row' sx={{m:2}} justifyContent="center" container>
              <Grid item xs={6}>
                <Typography variant='h5' sx={{mr:5, mt:1.5}}>
                  Email Address
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField label='email'sx={{mr:4}}/>
              </Grid>
            </Grid>
            <Grid direction='row' sx={{m:2}} justifyContent="center" container>
              <Grid item xs={6}>
                <Typography variant='h5' sx={{mr:5, mt:1.5}}>
                  Address
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField label='address' sx={{mr:4}}/>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Stack>
    </Stack>
  );
}
export default Profile