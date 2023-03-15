import React from 'react'
import { useState } from 'react';
import {createTheme, Button, styled , alpha, Typography, Stack, Card, Box, Grid, Divider, TextField, ThemeProvider} from '@mui/material';
import logo from '../resources/logo.png';
import clsx from 'clsx';
import { redirect, Navigate, useNavigate } from 'react-router-dom';
import { useLoginFieldValidator } from '../components/hooks/useLoginFieldValidator';


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


const CreateNewPassword = () => {

  const navigate = useNavigate();
  // PARTIE VALIDATION DE MOT DE PASSE 

  // code inspiré par https://www.telerik.com/blogs/how-to-create-validate-react-form-hooks


  const [form, setForm] = useState({
    password:"",
    confirmPassword:"",
  });


  const {errors, validateForm, onBlurField} = useLoginFieldValidator(form);

  const onSubmitForm = e => {
    e.preventDefault();
    const {isValid} = validateForm( { form, errors, forceTouchErrors: true});
    if (!isValid)
      return; 
    alert(JSON.stringify(form, null, 2));
    navigate("/create-pass-success");
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

 

  

  
  // PARTIE VISUELLE WEB 

  return (
  
    <Grid 
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh', margin:'auto' }}
      key={"test"}>
      <Grid 
        item xs={12} 
        width={400} >
        <Card 
          sx={{height: 'auto', boxShadow:'5px 5px 5px #9bcc6c'}}>
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
              Create a new password
            </Typography>
            <Typography 
              variant="h7" 
              sx={{mt:1, color:'#262626'}}>
              Enter your new password.
            </Typography>
              <form onSubmit={onSubmitForm} align='center'>
              <CssTextField 
                className='login-textfield'
                size='small' 
                variant='outlined' 
                type='password' 
                label='new password' 
                margin='normal' 
                name='password'
                value={form.password}
                onChange={onUpdateField}
                onBlur={onBlurField}
                sx={{width:'80%'}}/>

              {errors.password.dirty && errors.password.error ? (
                        <p className='regex-validator'>
                          {errors.password.message}
                        </p>
                      ) : null}

              <CssTextField 
                type='password' 
                className='login-textfield' 
                size='small' 
                variant='outlined' 
                label='confirm password' 
                margin='normal' 
                name='confirmPassword'
                value={form.confirmPassword}
                onChange={onUpdateField}
                onBlur={onBlurField}
                sx={{width:'80%'}}/>

              {errors.confirmPassword.dirty && errors.confirmPassword.error ? (
                        <p className="regex-validator">
                          {errors.confirmPassword.message}
                        </p>
                      ) : null}

              <ThemeProvider theme={theme}>
                  <Button 
                    variant='contained' 
                    color='primary' 
                    sx={{mt:2, width:'80%', mb:5}}
                    type='submit'
                    >
                    Confirm
                  </Button>
                
              </ThemeProvider>
              </form>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CreateNewPassword

/*<Link 
                  to='/newpasswdsuccess' 
                  className='link-4' 
                  style={{display: 'inline-block', mt:2, width:'80%', mb:5}}>*/