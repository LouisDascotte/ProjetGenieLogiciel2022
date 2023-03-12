import React from 'react'
import SideMenu from '../components/SideMenu';
import {createTheme, Button, styled , alpha, Typography, Stack, Card, Box, Grid, Divider, TextField, ThemeProvider} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import PortfolioPlaceHolder from '../components/PortfolioPlaceHolder';
import { Link, NavLink } from "react-router-dom";
import TopMenu from '../components/TopMenu';

const RegisterNewAccount = () => {
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

  // code part
  return (
    <Grid container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh', margin:'auto' }}>
      <Grid width={'90%'}>
        <Card width={'100%'} sx={{height:"auto", boxShadow:'5px 5px 5px #9bcc6c'}}>
          <Stack alignItems='center' width={'100%'} sx={{width:'100%'}}>
            <img className='login-logo' src={logo} alt='logo' width={70} height={70}/>
            <Typography className='typo' variant="h4">Sign up</Typography>
            <Typography variant="h7" sx={{mt:1, color:'#262626'}}>Register an account</Typography>           
            <Box width='100%'>
              <Grid container spacing={0} direction='row' justifyContent='space-around' xs={12}>
                <Grid item xs={6} align='center'>
                  <CssTextField sx={{width:"90%"}} size='small' variant='outlined' label='first name' margin='normal'/>
                </Grid>
                <Grid item xs={6} align='center'>
                  <CssTextField sx={{width:"90%"}} size='small' variant='outlined' label='last name' margin='normal'/>
                </Grid> 
              </Grid>
            </Box>
            <Box width='100%'>
              <Grid container spacing={0} direction='row' justifyContent='space-evenly' xs={12}>
                <Grid item xs={6} align='center'>
                  <CssTextField sx={{width:"90%"}} type='email' size='small' variant='outlined' label='email' margin='normal'/>
                </Grid>
                <Grid item xs={6} align='center'>
                  <CssTextField sx={{width:"90%"}} size='small' variant='outlined' type='tel' label='phone number' margin='normal'/>
                </Grid> 
              </Grid>
            </Box>
            <Box width='100%'>
              <Grid container spacing={0} direction='row' justifyContent='space-evenly' xs={12}>
                <Grid item xs={6} align='center'>
                  <CssTextField sx={{width:"90%"}} size='small' variant='outlined' label='address' margin='normal'/>
                </Grid>
                <Grid item xs={6} align='center'>
                  <CssTextField sx={{width:"90%"}} size='small' variant='outlined' label='city' margin='normal'/>
                </Grid> 
              </Grid>
            </Box>
            <Box width='100%'>
              <Grid container spacing={0} direction='row' justifyContent='space-evenly' xs={12}>
                <Grid container spacing={0} direction='row' justifyContent='space-around' item xs={6} align='center'>
                  <Grid item xs={5} align='center'>
                    <CssTextField sx={{width:"95%"}} size='small' variant='outlined' label='country' margin='normal'/>
                  </Grid>
                  <Grid item xs={5} align='center'>
                    <CssTextField sx={{width:"95%"}}  size='small' variant='outlined' label='postal code' margin='normal'/>
                  </Grid>
                </Grid>
                <Grid item xs={6} align='center'>
                  <CssTextField sx={{width:"90%"}} size='small' variant='outlined' label='language' margin='normal'/>
                </Grid> 
              </Grid>
            </Box>
            <Box width='100%'>
              <Grid container spacing={0} direction='row' justifyContent='space-evenly' xs={12}>
                <Grid item xs={6} align='center'>
                  <CssTextField sx={{width:"90%"}} size='small' variant='outlined' type='password' label='password' margin='normal'/>
                </Grid>
                <Grid item xs={6} align='center'>
                  <CssTextField sx={{width:"90%"}} size='small' variant='outlined' type='password' label='confirm password' margin='normal'/>
                </Grid> 
              </Grid>
            </Box>
            <ThemeProvider theme={theme}>
              <Link to='/registration-success' className='link-4' style={{display: 'inline-block', mt:2, width:'80%', mb:5}}>
                <Button variant='contained' color='primary' sx={{mt:2, width:'100%', mb:2}}>Sign up</Button>
              </Link>
            </ThemeProvider>
            <Box sx={{mb:2}}>
              <Link className='link-2' to='/login'>
                <Typography variant="h7">Already registered ? Click here to log in.</Typography>
              </Link>
            </Box>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  )
}

export default RegisterNewAccount

/**
 * <Grid container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              sx={{flexGrow:1}}>
              <Grid item xs={'auto'}>
                <CssTextField variant='outlined' label='firstname' margin='normal'/>
              </Grid>
              <Grid item xs={'auto'}>
                <CssTextField variant='outlined' label='lastname' margin='normal'/>
              </Grid>             
            </Grid>   
 */