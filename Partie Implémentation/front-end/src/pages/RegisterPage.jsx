import {React, useState, useRef, useEffect} from 'react'
import {Alert, createTheme, Button, styled ,Typography, Stack, Card, Box, Grid,  TextField, ThemeProvider} from '@mui/material';
import logo from '../resources/logo.png';
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import { useLoginFieldValidator } from '../components/hooks/useLoginFieldValidator';
import { useRegisterFieldValidator } from '../components/hooks/useRegisterFieldValidator';


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

const REGISTER_URL = "/api/client/auth/register"; // endpoint for the registration in the back end part


const RegisterPage = () => {

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
    alert(JSON.stringify(form, null, 2));

    

    // inspired by Dave Gray 
    //const jwt = localStorage.getItem("jwt");
    try{
      const body = {
        firstName : form.firstName, 
        lastName : form.lastName, 
        email : form.email, 
        phoneNumber : form.phoneNumber,
        language : form.language, 
        password : form.password, 
        address : {
          city : form.address.city,
          street : form.address.street, 
          houseNo : form.address.houseNo, 
          box : form.address.box, 
          postalCode : form.address.postalCode, 
          country : form.address.country    
        }
      };
      const response = await axios.post(REGISTER_URL, JSON.stringify(body), {
        headers : {"Content-Type":"application/json",
        //"Authorization" : `Bearer ${jwt}`,
        "Access-Control-Allow-Origin":true},
        //withCredentials: true
      }); 
      console.log(JSON.stringify(response));
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
              Sign up
              </Typography>
            <Typography 
            variant="h7" 
            sx={{mt:1, color:'#262626'}}>
              Register an account
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
                  label='first name' 
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
                  label='last name' 
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
                  label='email' 
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
                  label='phone number' 
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
                  label='address' 
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
                {/*<Grid 
                item xs={6} 
                align='center'>
                  <CssTextField 
                  sx={{width:"90%"}} 
                  size='small' 
                  variant='outlined' 
                  label='city' 
                  margin='normal' 
                  name='city' 
                  value={form.city} 
                  onChange={onUpdateField}
                  onBlur={onBlurField}/>
                  {errors.city.dirty && errors.city.error ? (
                    <Alert severity='error' sx={{width:"75%"}}>{errors.city.message}</Alert>
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
                container 
                spacing={0} 
                direction='row' 
                justifyContent='space-around' 
                item 
                xs={6} 
                align='center'>
                  <Grid 
                  item 
                  xs={5} 
                  align='center'>
                    <CssTextField 
                    sx={{width:"95%"}} 
                    size='small' 
                    variant='outlined' 
                    label='country' 
                    margin='normal' 
                    name='country' 
                    value={form.country} 
                    onChange={onUpdateField}
                    onBlur={onBlurField}/>
                    {errors.country.dirty && errors.country.error ? (
                    <Alert severity='error' sx={{width:"75%"}}>{errors.country.message}</Alert>
                      ) : null}
                  </Grid>
                  <Grid 
                  item 
                  xs={5} 
                  align='center'>
                    <CssTextField 
                    sx={{width:"95%"}}  
                    size='small' 
                    variant='outlined' 
                    label='postal code' 
                    margin='normal' 
                    name='postalCode' 
                    value={form.postalCode} 
                    onChange={onUpdateField}
                    onBlur={onBlurField}/>
                    {errors.postalCode.dirty && errors.postalCode.error ? (
                    <Alert severity='error' sx={{width:"75%"}}>{errors.postalCode.message}</Alert>
                      ) : null}
                  </Grid>
                    </Grid>
                <Grid 
                item 
                xs={6} 
                align='center'>
                  <CssTextField 
                  sx={{width:"90%"}} 
                  size='small' 
                  variant='outlined' 
                  label='language' 
                  margin='normal' 
                  name="language"
                  value={form.language}
                  onChange={onUpdateField}
                  onBlur={onBlurField}/>
                  {errors.language.dirty && errors.language.error ? (
                    <Alert severity='error' sx={{width:"75%"}}>{errors.language.message}</Alert>
                      ) : null}
                </Grid> */}
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
                  label='password' 
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
                  label='confirm password'
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
                Sign up
                </Button>
              
            </ThemeProvider>
            <Box 
            sx={{mb:2}}>
              <Link 
              className='link-2' 
              to='/login'>
                <Typography 
                variant="h7">
                  Already registered ? Click here to log in.
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