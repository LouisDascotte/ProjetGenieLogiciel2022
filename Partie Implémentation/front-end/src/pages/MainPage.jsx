import React from 'react';
import { useState } from "react";
import {Stack, Box, Grid, Divider} from '@mui/material';
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


const MainPage = () => {
  // hardcoded const in order to test the "create portfolio message"
  const hasCreatedPortfolios = true; 
  const pageAddress = "/main-page";
  const pageName = "General overview";

  const { collapseSidebar } = useProSidebar(); 
    const [page, setPage] = useState("");
    const changePage = (event) => {
        setPage(event.target.value);
        
    }
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
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