import React from 'react'
import { Stack } from '@mui/material';
import Item from './Item';

const NavigationBar = () => (
    
    <Stack sx={{ flexDirection: {sx: 'column', md: 'row'}}} direction="row" spacing={5}>
        <Item/>
        <Item/>
    </Stack>
    
);

export default NavigationBar