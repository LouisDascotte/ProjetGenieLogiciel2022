import React, { useState } from 'react'
import SideMenu from '../components/SideMenu';
import {createTheme, Button, styled , alpha, Typography, Stack, Card, Box, Grid, Divider, TextField, ThemeProvider} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import PortfolioPlaceHolder from '../components/PortfolioPlaceHolder';
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import TopMenu from '../components/TopMenu';
import { useLoginFieldValidator } from '../components/hooks/useLoginFieldValidator';
import { theme, CssTextField} from '../utils/style';




const LoginPage = () => {

  // LOGIC PART

  const navigate = useNavigate();


  const [form, setForm] = useState({
    email:"",
    password:"",
    
  });


  const {errors, validateForm, onBlurField} = useLoginFieldValidator(form);

  const onSubmitForm = e => {
    e.preventDefault();
    const {isValid} = validateForm( { form, errors, forceTouchErrors: true}, "login");
    console.log(isValid);
    if (!isValid)
      return; 
    alert(JSON.stringify(form, null, 2));
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
                onChange={onUpdateField}/>
                {errors.email.dirty && errors.email.error ? (
                        <p className='regex-validator'>
                          {errors.email.message}
                        </p>
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
                onChange={onUpdateField}/>
                {errors.password.dirty && errors.password.error ? (
                        <p className='regex-validator'>
                          {errors.password.message}
                        </p>
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