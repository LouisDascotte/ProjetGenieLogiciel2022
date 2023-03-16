import React from 'react'
import {OutlinedInput, Button, ButtonGroup, Stack, Box, Divider, Select, FormControl, InputLabel } from '@mui/material';
import { categories } from '../utils/constants';
import { useState } from 'react'; 
import ManagePortfolios from '../pages/ManagePortfolios';
import { Sidebar, Menu, MenuItem, useProSidebar} from 'react-pro-sidebar';
import { BrowserRouter, Routes , Route, Link} from 'react-router-dom';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MainPage from '../pages/MainPage';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ElectricMeterOutlinedIcon from '@mui/icons-material/ElectricMeterOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';




const SideMenu = () => {
    const { collapseSidebar } = useProSidebar();
    const [page, setPage] = useState("");
    const changePage = (event) => {
        setPage(event.target.value);
        
    }
    
    return (
    
    
        <Sidebar style={{ height:"100%"}}>
            <Menu>
                <MenuItem
                    icon= {<MenuOutlinedIcon/>}
                    onClick={() => {
                        collapseSidebar();
                    }}
                    style={{ textAlign: 'center'}}>
                        
                        
                        
                </MenuItem>
                <MenuItem icon={<WalletOutlinedIcon/>}>
                    <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth size="small" margin="normal">
                            <InputLabel margin="normal" id="select-portfolio-label">Portfolio :</InputLabel>
                                <Select
                                labelId="portfolio-select-label"
                                id="portfolio-select"
                                value={page}
                                label="Portfolio :"
                                onChange={changePage}
                                >
                                <MenuItem value={"/"}>None</MenuItem>
                                <MenuItem value={"/portfolio1"}>Porfolio 1</MenuItem>                    
                                </Select>
                            </FormControl>
                        </Box>
                    </MenuItem>
                <MenuItem onClick={()=>{}}> 
                    <Divider/>
                </MenuItem>
                <Link to="/main-page" className='link' >
                    <MenuItem icon={<VisibilityOutlinedIcon />} onClick={()=>{}}>
                        General overview
                    </MenuItem>
                </Link>
                <Link to="/manage-portfolios" className='link'>
                    <MenuItem icon={<AccountBalanceWalletOutlinedIcon />} onClick={()=>{}}>
                        Manage portfolios
                    </MenuItem>
                </Link>
                <Link to="/manage-meters" className='link'>
                    <MenuItem icon={<ElectricMeterOutlinedIcon />}>
                        Manage meters
                    </MenuItem>
                </Link>
                <Link to="/manage-contracts" className='link'>
                    <MenuItem icon={<AssignmentIndOutlinedIcon />}>
                        Manage contracts
                    </MenuItem>
                </Link>
                <Link to="/manage-invoices" className='link'>
                    <MenuItem icon={<ReceiptOutlinedIcon />} >
                        Manage invoices
                    </MenuItem>
                </Link>
            </Menu>
        </Sidebar>
    
  );

};
export default SideMenu