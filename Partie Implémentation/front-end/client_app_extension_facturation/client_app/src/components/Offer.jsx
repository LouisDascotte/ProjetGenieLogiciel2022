import React from 'react'
import {Stack, Box, Button, Typography} from "@mui/material";

const Offer = ({offer, selectOffer}) => {

  return (
    <Stack alignItems={'center'} justifyContent={'space-evenly'}>
      <Box alignContent={'center'} alignItems={"center"} justifyContent={'space-evenly'} sx={{mt:2}}>
        <Stack alignItems={'center'} justifyContent={'space-evenly'}>
          <Typography variant={'h5'}>Offer #{offer.id}</Typography>
          <Typography variant={'h6'}>Price type : {offer.priceType}</Typography>
          <Typography variant={'h6'}>Duration : {offer.contractLength} months</Typography>
          <Typography variant={'h6'}>Energy : {offer.energyType}</Typography>
          <Typography variant={'h6'}>Hour : {offer.hourType}</Typography>
          <Typography variant={'h6'}>Supplier : {offer.supplierName}</Typography>
          <Button onClick={() => selectOffer(offer.id)} sx={{m:2}}>
            Select
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default Offer