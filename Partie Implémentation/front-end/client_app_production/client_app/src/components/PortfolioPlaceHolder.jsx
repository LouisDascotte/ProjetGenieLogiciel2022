import React from 'react'
import { Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

const PortfolioPlaceHolder = () => {
  const { t } = useTranslation();
  return (
    <Paper
    sx={{
      backgroundColor: "#d9d9d9", display:'inline', color:"black", fontSize: 34, fontWeight:'medium', m: 1,
      p: 1,
    }}>
      {t('portfolio_placeholder')}
    </Paper>
  )
}

export default PortfolioPlaceHolder