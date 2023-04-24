import React from 'react'
import { Paper } from '@mui/material';

const PortfolioPlaceHolder = () => {
  return (
    <Paper
    sx={{
      backgroundColor: "#d9d9d9", display:'inline', color:"black", fontSize: 34, fontWeight:'medium', m: 1,
      p: 1,
    }}>
      To get started, click on "Manage portfolio" and then create a new portfolio.
    </Paper>
  )
}

export default PortfolioPlaceHolder