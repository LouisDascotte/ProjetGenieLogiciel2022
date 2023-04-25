import {React, useState, useRef, useEffect} from 'react'
import {Alert, createTheme, Button, styled ,Typography, Stack, Card, Box, Grid,  TextField, ThemeProvider} from '@mui/material';
import logo from '../resources/logo.png';
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import { useLoginFieldValidator } from '../components/hooks/useLoginFieldValidator';
import { useRegisterFieldValidator } from '../components/hooks/useRegisterFieldValidator';
import {useTranslation} from "react-i18next";

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

const REGISTER_URL = "/api/auth/client/register"; // endpoint for the registration in the back end part


const RegisterPage = () => {

  const { t } = useTranslation();

  let address = {
    street_number : "",
    street_name : "",
    city : "",
    province : "",
    region : "",
    country : "",
    postal_code : "",
  }
  const autoCompleteRef = useRef(); 
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "be" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["address"]
  };
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log(place);
      address = { 
      street_number : "",
      street_name : "",
      city : "",
      province : "",
      region : "",
      country : "",
      postal_code : "",}
      place.address_components.forEach(function(c){
        switch(c.types[0]){
          case 'street_number':
            address.street_number = c.long_name;
            form.address.houseNo = c.long_name; 
            break; 
          case 'route':
            address.street_name = c.long_name; 
            form.address.street = c.long_name; 
            break; 
          case 'locality':
            address.city = c.long_name; 
            form.address.city = c.long_name; 
            break;
          case 'administrative_area_level_2':
            address.province = c.long_name;
            break;
          case 'administrative_area_level_1':
            address.region  = c.long_name; 
            form.address.region = c.long_name; 
            break; 
          case 'postal_code':
            address.postal_code = c.long_name; 
            form.address.postalCode = c.long_name;
            break;
          case 'country' :
            address.country = c.long_name; 
            form.address.country = c.long_name; 
            break;
        }
      })
      console.log(address);
     });
    }, []);

  const [form, setForm]=useState(
    {
      type:"register",
      firstName:"",
      lastName:"",
      email:"",
      phoneNumber:"",
      address : {
        city : "",
        street : "", 
        houseNo : "", 
        box : "", 
        postalCode : "", 
        country : "",
        region : ""
      },
      language:"",
      password:"",
      confirmPassword:"",
    }
  );

  const navigate = useNavigate();

  const{errors, validateForm, onBlurField} = useRegisterFieldValidator(form);

  const onSubmitForm = async (e) => {
    e.preventDefault(); 
    const {isValid} = validateForm( {form, errors, forceTouchErrors:true}, "register");
    if (!isValid){
      return;
    }

    // inspired by Dave Gray 
    try{
      const body = {
        firstName : form.firstName, 
        lastName : form.lastName, 
        email : form.email, 
        phoneNumber : form.phoneNumber,
        language : "EN", 
        password : form.password, 
        address : form.address.street + " " + form.address.houseNo + " " +form.address.box +" " + form.address.postalCode +" " + form.address.city +" " + form.address.country,
      };
      
      const response = await axios.post(REGISTER_URL, JSON.stringify(body), {
        headers : {"Content-Type":"application/json",
        //"Authorization" : `Bearer ${jwt}`,
        "Access-Control-Allow-Origin":true},
        //withCredentials: true
      })
      navigate("/registration-success"); 

      // TODO : Clean input fields 
    } catch (err) {
      if (!err?.response) {
        console.log("no serv response");
      } else {
        console.log("registration failed");
      }
    }

    
  }

  const onUpdateField=e=>{
    const field = e.target.name; 
    const nextFormState= {
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



  
  // code part
  return (
    <Grid 
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh', margin:'auto', height:"auto"}}>
      <Grid 
      width={'90%'}>
        <Card 
        width={'100%'} 
        sx={{height:"auto", boxShadow:'5px 5px 5px #9bcc6c'}}>
          <Stack 
          alignItems='center' 
          width={'100%'} 
          sx={{width:'100%'}}>
            <img 
            className='login-logo' 
            src={logo} 
            alt='logo' 
            width={70} 
            height={70}/>
            <Typography 
            className='typo' 
            variant="h4">
              {t('signup')}
              </Typography>
            <Typography 
            variant="h7" 
            sx={{mt:1, color:'#262626'}}>
              {t('register_account')}
              </Typography>       
            <form onSubmit={onSubmitForm} align="center"> 
            <Box 
            width='100%'>
              <Grid 
              container 
              spacing={0} 
              direction='row' 
              justifyContent='space-around' 
              xs={12}>
                <Grid 
                item xs={6} 
                align='center'>
                  <CssTextField 
                  sx={{width:"90%"}} 
                  size='small' 
                  variant='outlined' 
                  label={t('first_name')} 
                  margin='normal' 
                  name='firstName' 
                  value={form.firstName} 
                  onChange={onUpdateField}
                  onBlur={onBlurField}/>
                  {errors.firstName.dirty && errors.firstName.error ? (
                    <Alert severity='error' sx={{width:'75%'}}>{errors.firstName.message}</Alert>
                      ) : null}
                </Grid>
                
                <Grid 
                item xs={6} 
                align='center'>
                  <CssTextField 
                  sx={{width:"90%"}} 
                  size='small' 
                  variant='outlined' 
                  label={t('last_name')}
                  margin='normal' 
                  name='lastName' 
                  value={form.lastName} 
                  onChange={onUpdateField}
                  onBlur={onBlurField}/>
                  {errors.lastName.dirty && errors.lastName.error ? (
                    <Alert severity='error' sx={{width:"75%"}}>{errors.lastName.message}</Alert>
                      ) : null}
                </Grid> 
              </Grid>
            </Box>
            <Box 
            width='100%'>
              <Grid 
              container 
              spacing={0} 
              direction='row' 
              justifyContent='space-evenly' 
              xs={12}>
                <Grid 
                item 
                xs={6} 
                align='center'>
                  <CssTextField 
                  sx={{width:"90%"}} 
                  type='email' 
                  size='small' 
                  variant='outlined' 
                  label={t('email')}
                  margin='normal' 
                  name='email' 
                  value={form.email} 
                  onChange={onUpdateField}
                  onBlur={onBlurField}/>
                  {errors.email.dirty && errors.email.error ? (
                    <Alert severity='error' sx={{width:"75%"}}>{errors.email.message}</Alert>
                      ) : null}
                </Grid>
                <Grid 
                item 
                xs={6} 
                align='center'>
                  <CssTextField 
                  sx={{width:"90%"}} 
                  size='small' 
                  variant='outlined' 
                  type='tel' 
                  label={t('phone_num')}
                  margin='normal' 
                  name='phoneNumber' 
                  value={form.phoneNumber} 
                  onChange={onUpdateField}
                  onBlur={onBlurField}/>
                  {errors.phoneNumber.dirty && errors.phoneNumber.error ? (
                    <Alert severity='error' sx={{width:"75%"}}>{errors.phoneNumber.message}</Alert>
                      ) : null}
                </Grid> 
              </Grid>
            </Box>
            <Box 
            width='100%'>
              <Grid 
              container 
              spacing={0} 
              direction='row' 
              justifyContent='space-evenly' 
              xs={12}>
                <Grid 
                item xs={12}
                align='center'>
                  
                  <CssTextField 
                  sx={{width:"90%"}} 
                  size='small' 
                  variant='outlined' 
                  label={t('address')}
                  margin='normal'
                  name='address' 
                  value={address.street} 
                  inputRef={inputRef}
                  //onChange={onUpdateField}
                  //onBlur={onBlurField}
                  />
                  {/*errors.address.dirty && errors.address.error ? (
                    <Alert severity='error' sx={{width:"75%"}}>{errors.address.message}</Alert>
                  ) : null*/}
                </Grid>
              </Grid>
            </Box>
            <Box 
            width='100%'>
              <Grid 
              container 
              spacing={0} 
              direction='row' 
              justifyContent='space-evenly' 
              xs={12}>
                <Grid 
                item 
                xs={6} 
                align='center'>
                  <CssTextField 
                  sx={{width:"90%"}} 
                  size='small' 
                  variant='outlined' 
                  type='password' 
                  label={t('password')}
                  margin='normal' 
                  name='password' 
                  value={form.password} 
                  onChange={onUpdateField}
                  onBlur={onBlurField}/>
                  {errors.password.dirty && errors.password.error ? (
                    <Alert severity='error' sx={{width:"75%"}}>{errors.password.message}</Alert>
                      ) : null}
                </Grid>
                <Grid 
                item 
                xs={6} 
                align='center'>
                  <CssTextField 
                  sx={{width:"90%"}} 
                  size='small' 
                  variant='outlined' 
                  type='password' 
                  label={t('confirm_password')}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={onUpdateField} 
                  margin='normal'
                  onBlur={onBlurField}/>
                  {errors.confirmPassword.dirty && errors.confirmPassword.error ? (
                    <Alert severity='error' sx={{width:"75%"}}>{errors.confirmPassword.message}</Alert>
                      ) : null}
                </Grid> 
              </Grid>
            </Box>
            <ThemeProvider 
            theme={theme}>
             
                
              <Button 
              variant='contained' 
              color='primary' 
              sx={{mt:2, width:'80%', mb:2}}
              type='submit'>
                {t('signup')}
                </Button>
              
            </ThemeProvider>
            <Box 
            sx={{mb:2}}>
              <Link 
              className='link-2' 
              to='/login'>
                <Typography 
                variant="h7">
                  {t('already_registered')}
                  </Typography>
              </Link>
            </Box>
            </form>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  )
}

export default RegisterPage

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