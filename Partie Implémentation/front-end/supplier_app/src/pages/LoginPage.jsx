import React, { useState, useContext, useEffect, useRef } from 'react'
import {Alert, Button,  Typography, Stack, Card, Box, Grid, Divider, TextField, ThemeProvider, FormControl, Menu, MenuItem, InputLabel, Select} from '@mui/material';
import logo from '../resources/logo.png';
import { Link, useNavigate } from "react-router-dom";
import { useLoginFieldValidator } from '../components/hooks/useLoginFieldValidator';
import { theme, CssTextField} from '../utils/style';
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";
import { useLocalState } from '../utils/useLocalStorage';
import {setAuthToken} from "../utils/setAuthToken";
import {authServices} from "../utils/services/auth-service";
import { useTranslation } from 'react-i18next';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import i18next from 'i18next';
import Cookies from "js-cookie";






const LOGIN_URL = "http://localhost:8080/api/auth/employee/login";

const LoginPage = () => {

  // ToDo : check usefulness of this part
  const [jwt, setJwt] = useLocalState("", "jwt"); 
  const [user, setUser] = useLocalState("", "user");
  const { t } = useTranslation();

  
  // Used for the redirection
  const navigate = useNavigate();

  // Used to set the credentials
  const [form, setForm] = useState({
    loginId:"",
    password:"",
    
  });


  // Used for the regex
  const {errors, validateForm, onBlurField} = useLoginFieldValidator(form);


  const onSubmitForm = async(e) => {
    e.preventDefault();
    const {isValid} = validateForm( { form, errors, forceTouchErrors: true}, "login");
    console.log(isValid);
    if (!isValid)
      return; 

    
    const body = {
      loginId : form.loginId,
      password: form.password
    }


    try{
      const response = await axios.post(LOGIN_URL, JSON.stringify(body), {
        headers : {"Content-Type":"application/json",
      //"Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }).then(response => {
        console.log("auth: " + response.headers["authorization"]);
        setJwt(response.headers["authorization"], "jwt");
        localStorage.setItem("jwt", response.headers["authorization"]);
        localStorage.setItem("user", response.data);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("operatingArea", response.data.operatingArea);     
        
        setAuthToken(response.headers["authorization"]);
      });
      
      navigate("/main-page");
    } catch(err){
      if(!err?.response){
        console.log("No server response.");
      } else {
        console.log("Login failed");
      }
    }
    
  }

  const onUpdateField = e => {
    const field = e.target.name; 
    const nextFormState = {
      ...form, 
      [field] : e.target.value,
    };
    
    setForm(nextFormState);
    if (errors[field].dirty){
      validateForm({
        form: nextFormState, 
        errors, 
        field,
      });
    }
  };

  const [language, setLanguage] = React.useState(Cookies.get("i18next") || "en");


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



  // RENDERED PART 

  return (
    <Grid 
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh', margin:'auto' }}>
      <Grid 
        item xs={12} 
        width={400} >
        <Card 
          sx={{height: "auto", boxShadow:'5px 5px 5px #9bcc6c'}}>
          <Stack 
            alignItems='center'>
            <img 
              className='login-logo' 
              src={logo} 
              alt='logo' 
              width={70} 
              height={70}/>
            <Typography 
              className='typo' 
              variant="h4">
              {t("Login")}
            </Typography>
            <Typography 
              variant="h7" 
              sx={{mt:1, color:'#262626'}}>
              Sign in to your account
            </Typography>
            <form 
              align='center' 
              style={{textAlign:'center'}} onSubmit={onSubmitForm}>
              <CssTextField 
                className='login-textfield'
                size='small' 
                variant='outlined' 
                label={t("id")} 
                margin='normal' 
                sx={{width:'80%'}} 
                name='loginId' 
                value={form.loginId} 
                onChange={onUpdateField}
                onBlur={onBlurField}/>
                {errors.loginId.dirty && errors.loginId.error ? (
                    <Alert 
                    severity='error' 
                    margin='normal' 
                    textAlign='center'
                    sx={{width:"75%", textAlign:"center"}} 
                    align="center">
                      {errors.loginId.message}
                      </Alert>
                      ) : null}
              <CssTextField 
                type='password' 
                className='login-textfield' 
                size='small' 
                variant='outlined' 
                label={t("password")} 
                margin='normal' 
                sx={{width:'80%'}} 
                value={form.password} 
                name='password' 
                onChange={onUpdateField}
                onBlur={onBlurField}/>
                {errors.password.dirty && errors.password.error ? (
                    <Alert severity='error' sx={{width:"75%"}}>{errors.password.message}</Alert>
                      ) : null}
            
            <ThemeProvider 
              theme={theme}>
                <Button 
                  variant='contained' 
                  color='primary' 
                  type='submit'
                  sx={{mt:2, width:'80%', mb:5}} 
                  >
                  {t("Login")}
                </Button>
            </ThemeProvider>
            </form>
            <Grid container sx={{width:"100%", mb:1, ml:5}} justifyContent='center' alignContent='center' alignItems={'center'} >
              <Grid item xs={6}>
                <FormControl sx={{width:'100%'}}>
                  <InputLabel id="demo-simple-select-label">{t('language')}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    label={t('language')}
                    name='language'
                    onChange={handleChange}
                    sx={{width:'80%'}}
                  >
                    {languages.map(({code, name, country_code}) => (
                      <MenuItem key={country_code} value={code}> <span className={`fi fi-${country_code}`}></span> {name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LoginPage