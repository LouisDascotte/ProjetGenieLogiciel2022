import React from 'react'
import {createTheme, Button, styled, Typography, Stack, Card,Grid, TextField, ThemeProvider} from '@mui/material';
import logo from '../resources/logo.png';
import { Link } from "react-router-dom";

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

const ResetPassword = () => {

  // code part
  return (
    <Grid container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh', margin:'auto' }}>
      <Grid item xs={12} width={400} >
        <Card sx={{height: 'auto', boxShadow:'5px 5px 5px #9bcc6c', pb:3}}>
          <Stack alignItems='center'>
            <img className='login-logo' src={logo} alt='logo' width={70} height={70}/>
            <Typography className='typo' variant="h4">Reset your password</Typography>
            <Typography variant="h7" sx={{mt:1, color:'#262626'}}>Enter the email you registered with.</Typography>
            <CssTextField className='login-textfield'size='small' variant='outlined' label='email' margin='normal' sx={{width:'80%'}}/>
            <ThemeProvider theme={theme}>
              <Link to='/main-page' className='link-4' style={{display: 'inline-block', mt:2, width:'80%', mb:5}}>
                <Button variant='contained' color='primary' sx={{mt:2, width:'100%', mb:5}}>Reset</Button>
              </Link>
            </ThemeProvider>
            <Link className='link-2' to='/login'>
              <Typography variant="h7">You remember your password ? Click here.</Typography>
            </Link>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ResetPassword