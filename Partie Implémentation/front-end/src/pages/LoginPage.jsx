import React, { useState } from 'react'
import SideMenu from '../components/SideMenu';
import {createTheme, Button, styled , alpha, Typography, Stack, Card, Box, Grid, Divider, TextField, ThemeProvider} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import PortfolioPlaceHolder from '../components/PortfolioPlaceHolder';
import { Link, NavLink, Navigate } from "react-router-dom";
import TopMenu from '../components/TopMenu';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#9acd6c',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#9acd6c',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#9acd6c',
    },
  },
});

const LoginPage = () => {

  const[mail, setMail] = useState([]);
  const[password, setPassword] = useState([]);

 /** function sendLoginRequest(){
    const reqBody={
      mail: mail, 
      password: password,
    };

    fetch("api/auth/login", {
      headers: {
        "Content-Type": "application/json"
      },

      method: 'post',
      body: JSON.stringify(reqBody)
    }).then((response) =>{
      if (response.status === 200)
        return Promise.all([response.json(), response.headers]);
      else return Promise.reject("Some error occured.");
    }).then(([body, headers]) => {
      setJwt(headers.get("authorization"))
    })
  }*/


  const handleClick=(e)=>{
    e.preventDefault()
    const logs={mail, password}
    console.log(logs)
  }


  const onSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/login', {
      method:'post',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mail: mail, 
        password: password
      })
    })
  }


  // Styling part

  const theme = createTheme({
    palette: {
      primary: {
        main: "#9bcc6c",
        contrastText: '#fff'
      }, 
      secondary: {
        main: "#000",
        contrastText: '#000000'
      }
    }
  });

  

  // code part
  return (
    <Grid container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh', margin:'auto' }}>
      <Grid item xs={12} width={400} >
        <Card sx={{height: 500, boxShadow:'5px 5px 5px #9bcc6c'}}>
          <Stack alignItems='center'>
            <img className='login-logo' src={logo} alt='logo' width={70} height={70}/>
            <Typography className='typo' variant="h4">Login</Typography>
            <Typography variant="h7" sx={{mt:1, color:'#262626'}}>Sign in to your account</Typography>
            <form align='center' style={{textAlign:'center'}}>
              <CssTextField className='login-textfield'size='small' variant='outlined' label='id/email' margin='normal' sx={{width:'80%'}} name='email' value={mail} onChange={(e)=>setMail(e.target.value)}/>
              <CssTextField type='password' className='login-textfield' size='small' variant='outlined' label='password' margin='normal' sx={{width:'80%'}} value={password} name='passwd' onChange={(e)=>setPassword(e.target.value)}/>
            </form>
            <ThemeProvider theme={theme}>
              <Link to='/main-page' className='link-4' style={{display: 'inline-block', mt:2, width:'80%', mb:5}}>
                <Button variant='contained' color='primary' sx={{mt:2, width:'100%', mb:5}} onClick={(e)=> onSubmit(e.target.value)}>Login</Button>
              </Link>
            </ThemeProvider>
            <Link className='link-2' to='/reset-passwd'>
              <Typography variant="h7" >Forgot your password ? Click here to reset.</Typography>
            </Link>
            <ThemeProvider theme={theme}>
              <Link to='/register-account' className='link-3' style={{display: 'inline-block', mt:2, width:'80%', mb:5}}>
                <Button  variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>Register New Account</Button>
              </Link>
            </ThemeProvider>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LoginPage