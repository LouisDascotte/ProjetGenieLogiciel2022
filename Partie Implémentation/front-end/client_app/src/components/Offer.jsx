import React from 'react'
import {Stack, Box, Button} from "@mui/material";

const Offer = ({offer, selectOffer}) => {

  return (
    <Stack alignItems={'center'} justifyContent={'space-evenly'}>
      <Box alignContent={'center'} alignItems={"center"} justifyContent={'space-evenly'}>
        <Stack alignItems={'center'} justifyContent={'space-evenly'}>
          <h1>{offer.name}</h1>
          <h2>{offer.description}</h2>
          <Button onClick={() => selectOffer(offer.offer_id)}>
            Select
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default Offer