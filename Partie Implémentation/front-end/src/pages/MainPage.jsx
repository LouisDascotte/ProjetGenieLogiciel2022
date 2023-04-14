import React from 'react';
import { useState, useEffect } from "react";
import {Stack, Box, Divider, Grid} from '@mui/material';
import TopMenu from '../components/TopMenu';
import { Sidebar, Menu, MenuItem, useProSidebar} from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import {Select, FormControl, InputLabel } from '@mui/material';
import { Link} from 'react-router-dom';
import axios from "../api/axios";


const API_URL = "/api/client/all";


const MainPage = () => {
    const [page, setPage] = useState("");

    const fetchData = axios.get(API_URL).then(function(response) {
        console.log(response);
    });

    console.log(fetchData);

    const pageAddress = "/staff";
    const pageName = "General overview";

    const { collapseSidebar } = useProSidebar(); 


    const handleChange = (e) => {
        const{value} = e.target; 
        setPage(value);
    }  

  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <Sidebar style={{ height:"100%"}} defaultCollapsed >
        <Stack>
          <Menu>
            <MenuItem
            icon= {<MenuOutlinedIcon/>}
            onClick={() => {
                collapseSidebar();
            }}
            style={{ textAlign: 'center'}}
            >
            </MenuItem>
              <MenuItem icon={<WalletOutlinedIcon/>}>
                <Menu>
                  <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth size="small" margin="normal">
                  <InputLabel margin="normal" id="select-portfolio-label">Portfolio :</InputLabel>
                    <Select
                    labelId="portfolio-select-label"
                    id="portfolio-select"
                    value={page}
                    label="Portfolio :"
                    onChange={handleChange}
                    >
                    <MenuItem value={"data1"}>Portfolio 1</MenuItem>
                    <MenuItem value={"data2"}>Portfolio 2</MenuItem>
                  </Select>
                </FormControl>   
                </Box>
                </Menu>
              </MenuItem>
            </Menu>
          </Stack>
          <Menu>      
            <MenuItem onClick={()=>{}}> 
              <Divider/>
            </MenuItem>
            <Link to="/staff" className='link' >
              <MenuItem icon={<VisibilityOutlinedIcon />} onClick={()=>{}}>
                General overview
              </MenuItem>
            </Link>
            <Link to="/staff-clients" className='link'>
              <MenuItem icon={<AccountBalanceWalletOutlinedIcon />} onClick={()=>{}}>
                Manage clients
              </MenuItem>
            </Link>
            <Link to="/staff-contracts" className='link'>
              <MenuItem icon={<AssignmentIndOutlinedIcon />}>
                Manage contracts
              </MenuItem>
            </Link>
          </Menu>
        </Sidebar>
      <Stack sx={{display:'flex', width:"100%"}}>  
        <TopMenu pageAddress={pageAddress} pageName = {pageName}/>
        <Stack sx={{height:"80%", justifyContent:'center', alignItems:'center'}} >
        </Stack>
      </Stack>
    </Stack>
    );
}
export default MainPage