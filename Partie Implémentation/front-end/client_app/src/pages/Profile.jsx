import {React, useState, useEffect} from 'react'
import SideMenu from '../components/SideMenu';
import {Stack, Box, Grid, Card, Typography, TextField} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import TopMenu from '../components/TopMenu';
import axios from '../api/axios';
import {useTranslation} from 'react-i18next';

const URL = "http://localhost:8080/api/client/"


const Profile = () => {

  const {t} = useTranslation();
  const pageAddress = "/profile";
  const pageName = t('profile');

  const jwt = localStorage.getItem("jwt");

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
      setFirstName(response.data.client.firstName);
      setLastName(response.data.client.lastName);
      setPhoneNumber(response.data.client.phoneNo);
      setEmail(response.data.email);
      setAddress(response.data.client.address);
    })
  },[])
  


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
                  {t('first_name')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{backgroundColor:"#f3f4f6", borderRadius:"16px", width:'90%', mt:2, textAlign:'center'}}>{firstName}</Box>
              </Grid>
            </Grid>
            <Grid direction='row' sx={{m:2}} justifyContent="center" container>
              <Grid item xs={6}>
                <Typography variant='h5' sx={{mr:5, mt:1.5}}>
                  {t('last_name')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <Box sx={{backgroundColor:"#f3f4f6", borderRadius:"16px", width:'90%', mt:2, textAlign:'center'}}>{lastName}</Box>
              </Grid>
            </Grid>
            <Grid direction='row' sx={{m:2}} justifyContent="center" container>
              <Grid item xs={6}>
                <Typography variant='h5' sx={{mr:5, mt:1.5}}>
                  {t('phone_num')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <Box sx={{backgroundColor:"#f3f4f6", borderRadius:"16px", width:'90%', mt:2, textAlign:'center'}}>{phoneNumber}</Box>
              </Grid>
            </Grid>
            <Grid direction='row' sx={{m:2}} justifyContent="center" container>
              <Grid item xs={6}>
                <Typography variant='h5' sx={{mr:5, mt:1.5}}>
                  {t('email')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <Box sx={{backgroundColor:"#f3f4f6", borderRadius:"16px", width:'90%', mt:2, textAlign:'center'}}>{email}</Box>
              </Grid>
            </Grid>
            <Grid direction='row' sx={{m:2}} justifyContent="center" container>
              <Grid item xs={6}>
                <Typography variant='h5' sx={{mr:5, mt:1.5}}>
                  {t('address')}
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