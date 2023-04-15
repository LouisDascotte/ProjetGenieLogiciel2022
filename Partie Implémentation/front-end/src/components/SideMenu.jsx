import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ElectricMeterOutlinedIcon from '@mui/icons-material/ElectricMeterOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Divider} from '@mui/material';
import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';




const SideMenu = (mainPage) => {
    const { collapseSidebar } = useProSidebar(); 
    const [page, setPage] = useState("");
    const changePage = (event) => {
        setPage(event.target.value);
        
    }
    
    return (
    
    
       <Sidebar style={{ height:"100vh"}} defaultCollapsed >
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
                        General overview
                    </MenuItem>
                </Link>
                <Link to="/clients" className='link'>
                    <MenuItem icon={<AssignmentIndOutlinedIcon />} onClick={()=>{}}>
                        Manage clients
                    </MenuItem>
                </Link>
                <Link to="/contracts" className='link'>
                    <MenuItem icon={<ReceiptOutlinedIcon />}>
                        Manage contracts
                    </MenuItem>
                </Link>
                <Link to="/consumption" className='link'>
                    <MenuItem icon={<ElectricMeterOutlinedIcon />}>
                        Manage consumption
                    </MenuItem>
                </Link>
            </Menu>
        </Sidebar>
  );

};
export default SideMenu