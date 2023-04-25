import React from 'react'
import {Stack, Box, Button, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const Offer = ({offer, selectOffer}) => {
  const {t} = useTranslation();

  return (
    <Stack alignItems={'center'} justifyContent={'space-evenly'}>
      <Box alignContent={'center'} alignItems={"center"} justifyContent={'space-evenly'} sx={{mt:2}}>
        <Stack alignItems={'center'} justifyContent={'space-evenly'}>
          <Typography variant={'h5'}> {t('offer')} #{offer.id}</Typography>
          <Typography variant={'h6'}>{t('price_type')}: {offer.priceType === "FIXED_PRICE" ? t('fixed_price') : t('var_price')}</Typography>
          {offer.energyType !== "WATER" ? <Typography variant ={'h6'}> {t('price')} : {offer.cost} €/kWh</Typography> : <Typography variant ={'h6'}> {t('price')} : {offer.cost} €/m3</Typography> }
          {offer.nightCost !== 0 ? <Typography variant={"h6"}>{t('night_cost')} : {offer.nightCost} €/kWh</Typography> : null}
          <Typography variant={'h6'}> {t('duration')} : {offer.contractLength} {t('months')}</Typography>
          <Typography variant={'h6'}> {t('energy')} : {offer.energyType}</Typography>
          <Typography variant={'h6'}> {t('hour')} : {offer.hourType}</Typography>
          <Typography variant={'h6'}> {t('supplier')} : {offer.supplierName}</Typography>
          <Button onClick={() => selectOffer(offer.id)} sx={{m:2}}>
            {t('select')}
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default Offer