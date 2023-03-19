import React, { useState, useContext, useEffect, useRef } from 'react'
import {Alert, Button,  Typography, Stack, Card, Box, Grid, Divider, TextField, ThemeProvider} from '@mui/material';
import logo from '../resources/logo.png';
import { Link, useNavigate } from "react-router-dom";
import { useLoginFieldValidator } from '../components/hooks/useLoginFieldValidator';
import { theme, CssTextField} from '../utils/style';
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";


const LOGIN_URL = "/api/client/login";

const LoginPage = () => {
  

  // LOGIC PART OF THE LOGIN PAGE 

  const navigate = useNavigate();
  const {setAuth} = useContext(AuthContext);


  const [form, setForm] = useState({
    email:"",
    password:"",
    
  });


  const {errors, validateForm, onBlurField} = useLoginFieldValidator(form);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const {isValid} = validateForm( { form, errors, forceTouchErrors: true}, "login");
    console.log(isValid);
    if (!isValid)
      return; 
    alert(JSON.stringify(form, null, 2));
    try{
      const response = await axios.post(LOGIN_URL, JSON.stringify({
        email : form.email, 
        password : form.password
      }), {
        headers : {"Content-Type":"application/json"}, 
        withCredentials: true
      }); 
      console.log(JSON.stringify(response?.data));
      /*const accessToken = response?.data?.accessToken; // TODO
      const roles = response?.data?.roles; // TODO*/
      setAuth({form})
    } catch(err){
      if(!err?.response){
        console.log("No server response.");
      } else {
        console.log("Login failed");
      }
    }
    
    navigate("/main-page");
  };

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
              Login
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
                  sx={{mt:2, width:'80%', mb:5}} 
                  >
                  Login
                </Button>
            </ThemeProvider>
            </form>
            <Link 
              className='link-2' 
              to='/reset-passwd'>
              <Typography 
                variant="h7" >
                Forgot your password ? Click here to reset.
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
                  Register New Account
                </Button>
              </Link>
            </ThemeProvider>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LoginPage