import React from 'react';
import { useState, useEffect,  forceUpdate } from "react";
import {Stack, Box, Grid, Divider, TextField} from '@mui/material';
import PortfolioPlaceHolder from '../components/PortfolioPlaceHolder';
import TopMenu from '../components/TopMenu';
import PortfolioMainGraph from '../components/PortfolioMainGraph';
import { Sidebar, Menu, MenuItem, useProSidebar} from 'react-pro-sidebar';
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ElectricMeterOutlinedIcon from '@mui/icons-material/ElectricMeterOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import {Select, FormControl, InputLabel } from '@mui/material';
import {  Link} from 'react-router-dom';
import { useForceUpdate } from '../components/hooks/useForceUpdate';
import SideMenu from '../components/SideMenu';






const MainPage = () => {
  // hardcoded const in order to test the "create portfolio message"
  const hasCreatedPortfolios = false; 
  const pageAddress = "/main-page";
  const pageName = "General overview";
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        
        <TopMenu pageAddress={pageAddress} pageName = {pageName}/>
        
        <Stack direction='row' justifyContent='center' paddingTop='10%'>
          { // if the user created a portfolio, print 'Portfolio graphic', otherwise print the creation message
          // 'Portfolio graphic' replaces an actual portfolio infographic for now
          hasCreatedPortfolios ? <PortfolioMainGraph/> : <PortfolioPlaceHolder/>
          }
        </Stack>
    </Stack>
    </Stack>
    );
}
  


export default MainPage

/**<FormControl fullWidth size="small" margin="normal">
                                <InputLabel margin="normal" id="select-portfolio-label">Portfolio :</InputLabel>
                                    <Select
                                    labelId="portfolio-select-label"
                                    id="portfolio-select"
                                    value={page}
                                    label="Portfolio :"
                                    onChange={handleChange}
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Portfolio 1</MenuItem>
                                    <MenuItem value={2}>Portfolio 2</MenuItem>                    
                                    </Select>
                                </FormControl> */