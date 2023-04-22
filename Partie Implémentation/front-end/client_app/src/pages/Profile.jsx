import {React, useState, useEffect} from 'react'
import SideMenu from '../components/SideMenu';
import {Stack, Box, Grid, Card, Typography, TextField} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import TopMenu from '../components/TopMenu';
import axios from '../api/axios';

const URL = "http://localhost:8080/api/client/"


const Profile = () => {

  const pageAddress = "/profile";
  const pageName = "Profile";

  const jwt = localStorage.getItem("jwt");

  /*const [infos, setInfos] = useState({
    last_name : "", 
    first_name : "", 
    phone_number : "", 
    email : "", 
    address : ""
  });*/

  const [infos, setInfos] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  

  useEffect(()=>{
    const response = axios.get(URL + "me",{
      headers : {"Content-Type":"application/json",
    "Authorization" : `Bearer ${jwt}`,
    "Access-Control-Allow-Origin":true}
    }).then(response=>{
      console.log(response.data);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setPhoneNumber(response.data.phoneNo);
      setEmail(response.data.email);
      setAddress(response.data.address);
    })
  },[])
  
console.log(infos.address);


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
                  First Name
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{backgroundColor:"#f3f4f6", borderRadius:"16px", width:'90%', mt:2, textAlign:'center'}}>{firstName}</Box>
              </Grid>
            </Grid>
            <Grid direction='row' sx={{m:2}} justifyContent="center" container>
              <Grid item xs={6}>
                <Typography variant='h5' sx={{mr:5, mt:1.5}}>
                  Last Name
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <Box sx={{backgroundColor:"#f3f4f6", borderRadius:"16px", width:'90%', mt:2, textAlign:'center'}}>{lastName}</Box>
              </Grid>
            </Grid>
            <Grid direction='row' sx={{m:2}} justifyContent="center" container>
              <Grid item xs={6}>
                <Typography variant='h5' sx={{mr:5, mt:1.5}}>
                  Phone Number
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <Box sx={{backgroundColor:"#f3f4f6", borderRadius:"16px", width:'90%', mt:2, textAlign:'center'}}>{phoneNumber}</Box>
              </Grid>
            </Grid>
            <Grid direction='row' sx={{m:2}} justifyContent="center" container>
              <Grid item xs={6}>
                <Typography variant='h5' sx={{mr:5, mt:1.5}}>
                  Email Address
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <Box sx={{backgroundColor:"#f3f4f6", borderRadius:"16px", width:'90%', mt:2, textAlign:'center'}}>{email}</Box>
              </Grid>
            </Grid>
            <Grid direction='row' sx={{m:2}} justifyContent="center" container>
              <Grid item xs={6}>
                <Typography variant='h5' sx={{mr:5, mt:1.5}}>
                  Address
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <Box sx={{backgroundColor:"#f3f4f6", borderRadius:"16px", width:'90%', mt:2, textAlign:'center'}}>{address}</Box>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Stack>
    </Stack>
  );
}
export default Profile