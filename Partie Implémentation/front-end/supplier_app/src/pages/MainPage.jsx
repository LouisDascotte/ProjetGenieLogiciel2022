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


<<<<<<< HEAD
=======
const PORTFOLIO_URL = "http://localhost:8080/api/portfolio/all";

>>>>>>> e4eea14916440ba0aecde5621da279bf37dcb0ff


const MainPage = () => {
    const [page, setPage] = useState("");
    const [portfolios, setPortfolios] = useState([]);

<<<<<<< HEAD
=======
    
>>>>>>> e4eea14916440ba0aecde5621da279bf37dcb0ff
    const pageAddress = "/main-page";
    const pageName = "General overview";

    const { collapseSidebar } = useProSidebar(); 


    const handleChange = (e) => {
        const{value} = e.target; 
        setPage(value);
    }  

<<<<<<< HEAD
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu>
      </SideMenu>
      <Stack sx={{display:'flex', width:"100%"}}>  
        <TopMenu pageAddress={pageAddress} pageName = {pageName}/>
        <Stack sx={{height:"80%", justifyContent:'center', alignItems:'center'}} >
          <DateAndTime locale={'fr-FR'} />
=======
    useEffect(()=> {
        const jwt = localStorage.getItem("jwt");
        const response = axios.get(PORTFOLIO_URL, {
            headers : {"Content-Type":"application/json",
            "Authorization" : `Bearer ${jwt}`,
            "Access-Control-Allow-Origin":true}
            }).then(response => {
                setPortfolios(response.data);
            })



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
                                        {portfolios.map(portfolio => 
                                             <MenuItem value={portfolio.id}>{portfolio.name}</MenuItem>
                                        )}
                                                    
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
>>>>>>> e4eea14916440ba0aecde5621da279bf37dcb0ff
        </Stack>
      </Stack>
    </Stack>
    );
}
export default MainPage