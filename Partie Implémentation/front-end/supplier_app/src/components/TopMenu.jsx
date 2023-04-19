import React from 'react'
import { Box, Stack , Grid, Divider } from '@mui/material';
import { Link } from "react-router-dom";
import logo from '../resources/logo.png';
import AccountMenu from './AccountMenu';

// pageAddress is now useless, keeping it in case i need it in the future
const TopMenu = ({pageAddress, pageName}) => {
  return (
    <Stack sx={{display:'flex', width:"100%"}}>
      <Grid container direction="row">
        <Grid item xs={1} sx={{mt:1, ml:1}}>
          <Link to={'/main-page'} className='link' display='flex'><img src={logo} alt='logo' width={50} height={50} /></Link>
        </Grid>
        <Grid item xs align='center'>
          <h1 className='title'>{pageName}</h1>
        </Grid>
        <Grid item xs={1} sx={{mr:2}}>
          <AccountMenu/>
        </Grid>
      </Grid>
      <Divider variant="middle" color='#d9d9d9' sx={{ borderBottomWidth: 2 }}/>
    </Stack>
  );
}

export default TopMenu
/**
 * 
 * <Grid container justifyContent="space-around" sx={{p:2}} direction="row">
        <Grid justifyContent="center" item xs="auto">
          <Link to={'/main-page'} className='link'><img src={logo} alt='logo' width={50} height={50}/></Link>
        </Grid>
        <Grid item xs={"auto"}>
          <h1 className='title'>{pageName}</h1>
        </Grid>
        <Grid item xs>
          <AccountMenu/>
        </Grid>
      </Grid>
 */