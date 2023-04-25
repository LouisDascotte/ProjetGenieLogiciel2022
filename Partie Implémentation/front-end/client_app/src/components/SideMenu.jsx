import React from 'react'
import {Box, Stack, Divider, Select, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react'; 
import { Sidebar, Menu, MenuItem, useProSidebar} from 'react-pro-sidebar';
import {  Link} from 'react-router-dom';
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ElectricMeterOutlinedIcon from '@mui/icons-material/ElectricMeterOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';

import {useTranslation} from 'react-i18next';


const SideMenu = (mainPage) => {
    const { collapseSidebar } = useProSidebar(); 
    const [page, setPage] = useState("");
    const {t} = useTranslation();
    const changePage = (event) => {
        setPage(event.target.value);
        
    }
    
    return (
    
    
       <Sidebar style={{ height:"100vh"}}>
            <Menu>
                <MenuItem
                    icon= {<MenuOutlinedIcon/>}
                    onClick={() => {
                        collapseSidebar();
                    }}
                    style={{ textAlign: 'center'}}>
                        
                        
                        
                </MenuItem>
                
                <MenuItem onClick={()=>{}}> 
                    <Divider/>
                </MenuItem>
                <Link to="/main-page" className='link' >
                    <MenuItem icon={<VisibilityOutlinedIcon />} onClick={()=>{}}>
                        {t('general_overview')}
                    </MenuItem>
                </Link>
                <Link to="/manage-portfolios" className='link'>
                    <MenuItem icon={<AccountBalanceWalletOutlinedIcon />} onClick={()=>{}}>
                        {t('manage_portfolios')}
                    </MenuItem>
                </Link>
                <Link to="/manage-meters" className='link'>
                    <MenuItem icon={<ElectricMeterOutlinedIcon />}>
                        {t('manage_meters')}
                    </MenuItem>
                </Link>
                <Link to="/manage-contracts" className='link'>
                    <MenuItem icon={<AssignmentIndOutlinedIcon />}>
                        {t('manage_contracts')}
                    </MenuItem>
                </Link>
            </Menu>
        </Sidebar>
  );

};
export default SideMenu