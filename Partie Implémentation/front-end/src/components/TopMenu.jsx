import React from 'react'
import { Box, Stack , Grid, Divider } from '@mui/material';
import { Link } from "react-router-dom";
import logo from '../resources/logo.png';
import AccountMenu from './AccountMenu';

// pageAddress is now useless, keeping it in case i need it in the future
const TopMenu = ({pageAddress, pageName}) => {
  return (
    <Stack sx={{display:'flex', width:"100%"}}>
      <Grid container spacing={0} sx={{p:2}}>
        <Grid justifyContent="center" item xs>
          <Link to={'/main-page'} className='link'><img src={logo} alt='logo' width={50} height={50}/></Link>
        </Grid>
        <Grid item xs={7}>
          <h1 className='title'>{pageName}</h1>
        </Grid>
        <Grid>
          <AccountMenu/>
        </Grid>
      </Grid>
      <Divider variant="middle" color='#d9d9d9' sx={{ borderBottomWidth: 2 }}/>
    </Stack>
  );
}

export default TopMenu