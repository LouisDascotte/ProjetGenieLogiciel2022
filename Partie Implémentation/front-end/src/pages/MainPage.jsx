import React from 'react'
import SideMenu from '../components/SideMenu';
import {Stack, Box, Grid, Divider} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import PortfolioPlaceHolder from '../components/PortfolioPlaceHolder';
import { Link } from "react-router-dom";
import TopMenu from '../components/TopMenu';
import PortfolioMainGraph from '../components/PortfolioMainGraph';
import ReactECharts from 'echarts-for-react';

const MainPage = () => {
  // hardcoded const in order to test the "create portfolio message"
  const hasCreatedPortfolios = true; 
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