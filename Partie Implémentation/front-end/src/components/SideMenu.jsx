import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import ElectricMeterOutlinedIcon from '@mui/icons-material/ElectricMeterOutlined';
import InsertedChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import { Box, Divider, FormControl, InputLabel, Select } from '@mui/material';
import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';




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
                <Link to="/stats" className='link'>
                    <MenuItem icon={<InsertedChartOutlinedIcon />} >
                        Statistical analysis
                    </MenuItem>
                </Link>
                <Link to="/test" className='link'>
                    <MenuItem icon={<InsertedChartOutlinedIcon />} >
                        Test
                    </MenuItem>
                </Link>
            </Menu>
        </Sidebar>
    
  );

};
export default SideMenu