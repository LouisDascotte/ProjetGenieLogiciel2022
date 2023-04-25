import React, { useState, useContext, useEffect, useRef } from 'react'
import {Alert, Button,  Typography, Stack, Card, Box, Grid, Divider, TextField, ThemeProvider, Snackbar, FormControl, InputLabel,  Select, MenuItem} from '@mui/material';
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

const LOGIN_URL = "http://localhost:8080/api/auth/client/login";

const LoginPage = () => {

  const {t} = useTranslation();
 
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Used for the redirection
  const navigate = useNavigate();

  // Used to set the credentials
  const [form, setForm] = useState({
    email:"",
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
      email : form.email,
      password: form.password
    }


    
    const response = await axios.post(LOGIN_URL, JSON.stringify(body), {
      headers : {"Content-Type":"application/json",
    //"Authorization" : `Bearer ${jwt}`,
    "Access-Control-Allow-Origin":true}
    }).then(response => {
      console.log("auth: " + response.headers["authorization"]);
      //setJwt(response.headers["authorization"], "jwt");
      localStorage.setItem("jwt", response.headers["authorization"]);
      localStorage.setItem("user", response.data);
      localStorage.setItem("authenticated", true);
      setAuthToken(response.headers["authorization"]);
    }).catch(err => {
      switch(err.response.status){
        case 401:
          setErrorMessage(t('invalid_creds'));
          break;
        case 403:
          setErrorMessage(t('unauthorized'));
          break;
        default:
          setErrorMessage("An error occured");
          break;
      }
      setOpenError(true);
      return;
    });

    const request = axios.get("http://localhost:8080/api/client/me", {
      headers : {"Content-Type":"application/json",
    "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
    "Access-Control-Allow-Origin":true}
    }).then(request => {
      localStorage.setItem("client_email", request.data.email);
      localStorage.setItem('firstName', request.data.client.firstName);
      localStorage.setItem("lastName", request.data.client.lastName);
      setOpen(true);
      setTimeout(()=>{
        navigate("/main-page");
      }, 1000);
    }).catch(err => {
      
    })
    
  
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


const [language, setLanguage] = React.useState('en');


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
      alignContent='center'
      style={{ minHeight: '100vh', margin:'auto' }}>
      <Grid 
        item xs={12} 
        width={400} 
        alignItems={'center'}
        alignContent='center'
        justifyContent={"center"}
        sx={{textAlign:'center'}}>
        <Card 
          sx={{height: "auto", boxShadow:'5px 5px 5px #9bcc6c'}}>
          <Stack 
            alignItems='center' justifyContent='center' alignContent='center'>
            <img 
              className='login-logo' 
              src={logo} 
              alt='logo' 
              width={70} 
              height={70}/>
            <Typography 
              className='typo' 
              variant="h4">
              Login
            </Typography>
            <Typography 
              variant="h7" 
              sx={{mt:1, color:'#262626'}}>
              {t('sign_in_to_account')}
            </Typography>
            <form 
              align='center' justifyContent='center'
              style={{textAlign:'center'}} onSubmit={onSubmitForm}>
              <CssTextField 
                className='login-textfield'
                size='small' 
                variant='outlined' 
                label='id/email' 
                margin='normal' 
                sx={{width:'80%'}} 
                name='email' 
                value={form.email} 
                onChange={onUpdateField}
                onBlur={onBlurField}/>
                {errors.email.dirty && errors.email.error ? (
                    <Alert 
                    severity='error' 
                    margin='normal' 
                    textAlign='center'
                    sx={{width:"75%", textAlign:"center"}} 
                    align="center">
                      {errors.email.message}
                      </Alert>
                      ) : null}
              <CssTextField 
                type='password' 
                className='login-textfield' 
                size='small' 
                variant='outlined' 
                label='password' 
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
                  sx={{mt:2, width:'80%', mb:3}} 
                  >
                  {t('login')}
                </Button>
            </ThemeProvider>
            </form>
            <Grid container sx={{width:"100%", mb:1, ml:5}} justifyContent='center' alignContent='center' alignItems={'center'} >
              <Grid item xs={6}>
                <FormControl sx={{width:'100%'}}>
                  <InputLabel id="demo-simple-select-label">Language</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    label="Language"
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
            <Link 
              className='link-2' 
              to='/reset-password'>
              <Typography 
                variant="h7" >
                {t('forgot_password')}
              </Typography>
            </Link>
            
            
            <ThemeProvider 
              theme={theme}>
              <Link 
                to='/register-account' 
                className='link-3' 
                style={{display: 'inline-block', mt:2, width:'80%', mb:5}}>
                <Button  
                  variant='outlined' 
                  color='secondary' 
                  sx={{mt:2, width:'100%', mb:5}}>
                  {t('register')}
                </Button>
              </Link>
            </ThemeProvider>
          </Stack>
        </Card>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={()=> setOpen(false)}>
        <Alert severity="success">{t('login_success')}</Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={3000} onClose={()=> setOpenError(false)}>
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </Grid>
  )
}

export default LoginPage