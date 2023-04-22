import React from 'react'
import SideMenu from '../components/SideMenu';
import {Stack, Box, Grid, TextField, Typography, Button, Alert, FormControl, Select, MenuItem, Divider, InputLabel} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import TopMenu from '../components/TopMenu';
import axios from '../api/axios';


const URL = "http://localhost:8080/api/s";

const Preferences = () => {
  const pageAddress = "/preferences";
  const pageName = "Preferences";

  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [favPortfolio, setFavPortfolio] = React.useState("");
  const [lang, setLang] = React.useState("");
  const [portfolios, setPortfolios] = React.useState([]);

  const changePassword = () => {
    const jwt = localStorage.getItem("jwt");
    const body = {
      "lang" : lang,
      "old_password" : oldPassword,
      "new_password" : newPassword,
      "favoritePortfolioId" : favPortfolio
    }
    const response = axios.put("http://localhost:8080/api/client/me", JSON.stringify(body),{
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${jwt}`,
        "Access-Control-Allow-Origin" : true
      }
    }).then(response=>{
      console.log(response);
    })
  }



  React.useEffect(()=>{
    const response = axios.get("http://localhost:8080/api/client/me", {
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
        "Access-Control-Allow-Origin" : true
    }}).then(response => {
      setFavPortfolio(response.data.client.favoritePortfolioId);
      setLang(response.data.client.lang);
    })

    const request = axios.get("http://localhost:8080/api/portfolio/all", {
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
        "Access-Control-Allow-Origin" : true
    }}).then(response => {
      setPortfolios(response.data)
      portfolios.map(portfolio => {
        if (portfolio.id === favPortfolio){
          setFavPortfolio(portfolio.name)
        }
        
      })
    })

   
  }, [])
  const handleSelect = (e) => {
    setFavPortfolio(e.target.value);
  }


  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}} alignItems='center'>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Box sx={{borderRadius:"16px", backgroundColor:"white", width:"80%", mt:5}}>
          <Stack alignItems='center' justifyContent={"center"} sx={{m:4}}>
            <Stack  alignItems='center' justifyContent='center' sx={{mt:1}}>
              <Typography variant='h6' sx={{mr:1}}>Old password : </Typography>
              <TextField variant='outlined' size='small' type="password" sx={{width:"100%"}} onChange={e=>setOldPassword(e.target.value)} />
            </Stack>
            <Stack  alignItems='center' justifyContent='center' sx={{mt:1}}>
              <Typography variant='h6' sx={{mr:1}}>New password : </Typography>
              <TextField variant='outlined' size='small' type="password" sx={{width:"100%"}} onChange={e=>setNewPassword(e.target.value)}/>
            </Stack>
            <Stack  alignItems='center' justifyContent='center' sx={{mt:1}}>
              <Typography variant='h6' sx={{mr:1}}>Confirm new password : </Typography>
              <TextField variant='outlined' size='small' type="password" sx={{width:"100%"}} onChange={e => setConfirmNewPassword(e.target.value)}/>
              {newPassword !== confirmNewPassword ? <Alert severity="error">Passwords don't match</Alert> : null }
            </Stack>
            <Button variant='outlined' size='large' sx={{mt:2}} onClick={changePassword} >Change password</Button>
            <Divider variant="middle" color='black' sx={{ borderBottomWidth: 2 , m:2, width:'60%'}}/>
            <Stack direction='row'  alignItems='center' justifyContent='center' sx={{mt:2}}>
              <Typography variant='h6' sx={{mr:1}} style={{whiteSpace:"nowrap"}}>Favorite portfolio :  </Typography>
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <InputLabel sx={{width:'100%'}}>Favorite portfolio : </InputLabel>
                  <Select onChange={handleSelect} sx={{width:'100%'}} label="Favorite portfolio :">
                  
                  {portfolios.map(portfolio => {
                    return <MenuItem value={portfolio.id}>{portfolio.name}</MenuItem>
                  })}
                  </Select>
                </FormControl>
            </Stack>
            <Button variant="outlined">
              Apply changes
            </Button>
          </Stack>
          
        </Box>
        
        
        
      </Stack>
    </Stack>
  );
}

export default Preferences