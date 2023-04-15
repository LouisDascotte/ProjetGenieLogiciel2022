import React from 'react';
import { useState, useEffect } from "react";
import {Stack, Box, Divider, Grid} from '@mui/material';
import TopMenu from '../components/TopMenu';
import { Sidebar, Menu, MenuItem, useProSidebar} from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import DateAndTime from '../components/DateAndTime';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import {Select, FormControl, InputLabel } from '@mui/material';
import { Link} from 'react-router-dom';
import axios from "../api/axios";
import SideMenu from '../components/SideMenu';


const API_URL = "/api/client/all";


const MainPage = () => {
    const [page, setPage] = useState("");

    const fetchData = axios.get(API_URL).then(function(response) {
        console.log(response);
    });

    console.log(fetchData);

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
          <DateAndTime locale={'en-US'} />
        </Stack>
      </Stack>
    </Stack>
    );
}
export default MainPage