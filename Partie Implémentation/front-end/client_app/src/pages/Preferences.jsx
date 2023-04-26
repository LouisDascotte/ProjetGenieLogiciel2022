import React from 'react'
import SideMenu from '../components/SideMenu';
import {Stack, Box, Grid, TextField, Typography, Button, Alert, FormControl, Select, MenuItem, Divider, InputLabel} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import TopMenu from '../components/TopMenu';
import axios from '../api/axios';
import { useTranslation } from 'react-i18next';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import i18next from 'i18next';
import Cookies from "js-cookie";

const URL = "http://localhost:8080/api/s";

const Preferences = () => {
  const pageAddress = "/preferences";
  const pageName = "Preferences";

  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const [favPortfolio, setFavPortfolio] = React.useState("");
  const [favPortfolioId, setFavPortfolioId] = React.useState("");
  const [lang, setLang] = React.useState("");
  const [portfolios, setPortfolios] = React.useState([]);

  const [language, setLanguage] = React.useState(Cookies.get("i18next") || "en");

  const {t} = useTranslation();

  const handleChange= (e) => {
    setLanguage(e.target.value);
    i18next.changeLanguage(e.target.value);
  }

  const languages = [
    {
      code : 'fr', 
      name : 'Français', 
      country_code : 'fr'
    }, 
    {
      code : 'en', 
      name : 'English',
      country_code : 'gb'
    }
  ]

  const changePassword = () => {
    const jwt = localStorage.getItem("jwt");
    const body = {
      "old_password" : oldPassword,
      "new_password" : newPassword,
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

  const updateSettings = () => {
    const jwt = localStorage.getItem("jwt");
    const body = {
      "lang" : Cookies.get("i18next").toUpperCase(),
      "favoritePortfolioId" : favPortfolioId
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

  const [oldPasswordError, setOldPasswordError] = React.useState(false);
  const [newPasswordError, setNewPasswordError] = React.useState(false);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = React.useState(false);

  const handleOldPassword = (e) => {
    const reg = new RegExp(/^.{8,}$/);
    if (reg.test(e.target.value)){
      setOldPassword(e.target.value);
      setOldPasswordError(false);
    } else {
      setOldPasswordError(true);
    }
  }

  const handleNewPassword = (e) => {
    const reg = new RegExp(/^.{8,}$/);
    if (reg.test(e.target.value)){
      setNewPassword(e.target.value);
      setNewPasswordError(false);
    } else {
      setNewPasswordError(true);
    }
  }

  const handleConfirmNewPassword = (e) => {
    const reg = new RegExp(/^.{8,}$/);
    if (reg.test(e.target.value)){
      setConfirmNewPassword(e.target.value);
      setConfirmNewPasswordError(false);
    } else {
      setConfirmNewPasswordError(true);
    }
  }



  React.useEffect(()=>{
    const response = axios.get("http://localhost:8080/api/client/me", {
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
        "Access-Control-Allow-Origin" : true
    }}).then(response => {
      setFavPortfolioId(response.data.client.favoritePortfolioId);
      //setFavPortfolio()
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
          setFavPortfolioId(portfolio.id)
        }
        
      })
    })

   
  }, [])



  const handleSelect = (e) => {
    setFavPortfolioId(e.target.value.id);
    setFavPortfolio(e.target.value.name)
  }


  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}} alignItems='center'>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Box sx={{borderRadius:"16px", backgroundColor:"white", width:"80%", mt:5}}>
          <Stack alignItems='center' justifyContent={"center"} sx={{m:4}}>
            <Stack  alignItems='center' justifyContent='center' sx={{mt:1}}>
              <Typography variant='h6' sx={{mr:1}}>{t('old_password')} : </Typography>
              <TextField variant='outlined' size='small' type="password" sx={{width:"100%"}} onChange={handleOldPassword} />
              {oldPasswordError ? <Alert severity='error'>{t('password_error_size')}</Alert> : null}
            </Stack>
            <Stack  alignItems='center' justifyContent='center' sx={{mt:1}}>
              <Typography variant='h6' sx={{mr:1}}>{t('new_password')} : </Typography>
              <TextField variant='outlined' size='small' type="password" sx={{width:"100%"}} onChange={handleNewPassword}/>
              {newPasswordError ? <Alert severity='error'>{t('password_error_size')}</Alert> : null}
            </Stack>
            <Stack  alignItems='center' justifyContent='center' sx={{mt:1}}>
              <Typography variant='h6' sx={{mr:1}}>{t('confirm_new_password')}: </Typography>
              <TextField variant='outlined' size='small' type="password" sx={{width:"100%"}} onChange={handleConfirmNewPassword}/>
              {newPassword !== confirmNewPassword ? <Alert severity="error">{t('passwords_dont_match')}</Alert> : null }
              {confirmNewPasswordError ? <Alert severity='error'>{t('password_error_size')}</Alert> : null}
            </Stack>
            <Button variant='outlined' size='large' sx={{mt:2}} onClick={changePassword} >{t('change_password')}</Button>
            <Divider variant="middle" color='black' sx={{ borderBottomWidth: 2 , m:2, width:'60%'}}/>
            <Stack direction='row'  alignItems='center' justifyContent='center' sx={{mt:2}}>
              <Typography variant='h6' sx={{mr:1}} style={{whiteSpace:"nowrap"}}>{t('favorite_portfolio')} :  </Typography>
              <FormControl sx={{ m: 1, minWidth: "100%" }}>
                <InputLabel sx={{width:'100%'}}>{t('favorite_portfolio')} : </InputLabel>
                  <Select onChange={handleSelect} sx={{width:'100%'}} label={t('favorite_portfolio')} value={favPortfolio}>
                  
                  {portfolios.map(portfolio => {
                    return <MenuItem value={portfolio}>{portfolio.name}</MenuItem>
                  })}
                  </Select>
                </FormControl>
            </Stack>
            <Stack direction='row' alignItems='center' justifyContent='center' sx={{mt:2}}>
            <Typography variant='h6' sx={{mr:1}} style={{whiteSpace:"nowrap"}}>{t('language')} :  </Typography>
              <FormControl sx={{width:'100%'}}>
                <InputLabel id="demo-simple-select-label">{t('language')} :</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    label="Language"
                    name='language'
                    onChange={handleChange}
                    sx={{width:'100%'}}
                  >
                  {languages.map(({code, name, country_code}) => (
                    <MenuItem key={country_code} value={code}> <span className={`fi fi-${country_code}`}></span> {name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            
            <Button variant="outlined" onClick={updateSettings} sx={{mt:2}}>
              {t('apply_changes')}
            </Button>
          </Stack>
          
        </Box>
        
        
        
      </Stack>
    </Stack>
  );
}

export default Preferences