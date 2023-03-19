import React from 'react'
import { Box, Stack, Grid, List, ListItem, ListItemButton, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FixedSizeList} from 'react-window';

const ElementsList = () => {
  function generate(element) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }
  return (
    <Box sx={{height:'100%', width:'100%'}} alignment='center'>
      <List style={{maxHeight: '100%', overflow: 'auto', backgroundColor:'#f3f4f6'}}>
        {generate(<ListItem>
          <ListItemButton textAlign='center'>
            <ListItemText primary="Bouton test" className='list-button'/>
          </ListItemButton>
          <IconButton>
              <DeleteIcon/>
            </IconButton>
        </ListItem>)}
      </List>
    </Box>
  );
}

export default ElementsList