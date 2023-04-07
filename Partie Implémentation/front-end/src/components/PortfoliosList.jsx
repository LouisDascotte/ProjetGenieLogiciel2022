import React, { useState } from 'react'
import { Box, Stack, Grid, List, ListItem, ListItemButton, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FixedSizeList} from 'react-window';

const PortfoliosList = () => {
  const [portfolios, setPortfolios] = useState({});
  const data = this.props;
  // For now, usage of a hardcoded portfolio. Will later be replaced with an axios GET request to get the details.
  

  
  return (
    <Box sx={{height:'100%', width:'100%'}} alignment='center'>
      <List style={{maxHeight: '100%', overflow: 'auto'}}>
        <ListItem>
          <ListItemButton>
            <ListItemText>
              Portfolio 1
            </ListItemText>
          </ListItemButton>
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </ListItem>
      </List>
    </Box>
  )
}

export default PortfoliosList