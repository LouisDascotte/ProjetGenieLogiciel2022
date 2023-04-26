import React from 'react';
import { useState, useEffect } from "react";
import {Stack, Box, Divider, Grid} from '@mui/material';
import TopMenu from '../components/TopMenu';
import { Sidebar, Menu, MenuItem, useProSidebar} from 'react-pro-sidebar';
import DateAndTime from '../components/DateAndTime';
import {Select, FormControl, InputLabel } from '@mui/material';
import { Link} from 'react-router-dom';
import axios from "../api/axios";
import SideMenu from '../components/SideMenu';




const MainPage = () => {
    const [page, setPage] = useState("");
    const [portfolios, setPortfolios] = useState([]);

    const pageAddress = "/main-page";
    const pageName = "General overview";

    const { collapseSidebar } = useProSidebar(); 


    const handleChange = (e) => {
        const{value} = e.target; 
        setPage(value);
    }

  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu>
      </SideMenu>
      <Stack sx={{display:'flex', width:"100%"}}>  
        <TopMenu pageAddress={pageAddress} pageName = {pageName}/>
        <Stack sx={{height:"80%", justifyContent:'center', alignItems:'center'}} >
          <DateAndTime locale={'fr-FR'} />
        </Stack>
      </Stack>
    </Stack>
    );
}
export default MainPage