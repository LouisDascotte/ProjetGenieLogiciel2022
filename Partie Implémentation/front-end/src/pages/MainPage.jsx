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
import {createBrowserHistory} from "history";
import axios from "../api/axios";


const API_URL = "/api/client/all";


const MainPage = () => {
    // hardcoded const in order to test the "create portfolio message"
    const [hasSelectedPortfolio, setHasSelectedPortfolio] = useState(false);
    const [page, setPage] = useState("");

    /*const fetchData = axios.get(API_URL).then(function(response) {
        console.log(response);
    });

    console.log(fetchData);*/

    const pageAddress = "/main-page";
    const pageName = "General overview";

    const { collapseSidebar } = useProSidebar(); 


    const handleChange = (e) => {
        const{value} = e.target; 
        setPage(value);
    }

    useEffect(()=> {
        console.log("Value of page :", page);
        if (page !== ""){
            setHasSelectedPortfolio(true);
        }
    })

    

    return (
        <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
            <Sidebar style={{ height:"100%"}}>
                <Stack>
                    <Menu>
                        <MenuItem
                            icon= {<MenuOutlinedIcon/>}
                            onClick={() => {
                                collapseSidebar();
                            }}
                            style={{ textAlign: 'center'}}>
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
        <Stack sx={{display:'flex', width:"100%"}}>  
            <TopMenu pageAddress={pageAddress} pageName = {pageName}/>
            <Stack direction='row' justifyContent='center'>
                { // if the user created a portfolio, print 'Portfolio graphic', otherwise print the creation message
                // 'Portfolio graphic' replaces an actual portfolio infographic for now
                hasSelectedPortfolio ? <PortfolioMainGraph portfolio={page}/> : <PortfolioPlaceHolder/>
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