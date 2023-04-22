import React from 'react'
import {Stack, Grid, Card, Box, TextField, Typography, Button} from '@mui/material'
import SideMenu from '../components/SideMenu'
import TopMenu from '../components/TopMenu'
import {Link, useParams, useLocation} from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'

const pageAddress = '/contracts'
const pageName = 'Contract'

const ViewContract = () => {
  const location = useLocation();

  console.log(location.state)
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
    <SideMenu mainPage={'false'} />
    <Stack sx={{display:'flex', width:"100%"}}>
      <TopMenu pageAddress={pageAddress} pageName={pageName}/>
      <Grid align='center'>
        <Card sx={{width:'80%', m:2, height:'auto' }} >
          <Box sx={{height:'100%', width:'100%'}} alignment='center' >
            <Link to={'/manage-contracts'} >
              <Button variant="contained" fullWidth color="primary" startIcon={<ArrowBack />} >
                Retour
              </Button>
            </Link>
            <Typography variant="h5" component="h2" align="center" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
              Contract n°{location.state.id}
            </Typography>
            <Typography variant="h6" component="h2" align="left" fontWeight={800} sx={{paddingLeft: '4px', paddingTop: '4px'}} >
              Your Details
            </Typography>
            <Grid container 
            columnSpacing={2}
            alignItems="center"
            justifyContent="left"
            paddingLeft={2}
            paddingBottom={2}
            spacing={1}
            >
              <Grid item container xs={5}
              columnSpacing={1}
              rowSpacing={2}
              justifyContent='left'
              >
                <Grid item xs='auto' >
                  <Typography variant="h6" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                    Your id :
                  </Typography>
                </Grid>
                <Grid item xs='auto' >
                  <TextField
                  name="clientId"
                  value={location.state.clientId}
                  size='small'
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{width: '150px'}}
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                  name="clientName"
                  label="Client name"
                 
                  size='small'
                  
                  />
                </Grid>
              </Grid>
              <Grid item container xs={7}
              columnSpacing={1}
              rowSpacing={2}
              justifyContent='left'
              >
                <Grid item xs='auto' >
                  <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs='auto' >
                  <TextField
                  name="clientEmail"
                  label="Client email"
                  
                  size='small'
                  
                  />
                </Grid>
                <Box sx={{width:'100%', height:'10px'}} />
                <Grid item xs='auto' >
                  <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                    Phone:
                  </Typography>
                </Grid>
                <Grid item xs='auto' >
                  <TextField
                  name="clientPhone"
                  label="Client phone"
                  
                  size='small'
                  
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} >
                <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                  Consumption address
                </Typography>
              </Grid>
              <Grid item xs={12}
              justifyContent='left'
              >
                <TextField
                name="consumptionAddress"
                label="Consumption address"
                
                
                size='small'
                
                sx={{width:'80%'}}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" component="h2" align="left" fontWeight={800} sx={{paddingLeft: '4px', paddingTop: '4px'}} >
              Technical characteristics
            </Typography>
            <Grid container
            spacing={2}
            columnSpacing={2}
            alignItems="center"
            justifyContent="left"
            paddingLeft={4}
            paddingBottom={2}
            >
              <Grid item xs={12} >
                <Typography variant="h6" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                  
                </Typography>
              </Grid>
              <Grid item xs='auto' >
                <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                  Furniture Number (EAN) :
                </Typography>
              </Grid>
              <Grid item xs='auto' >
                <TextField
                name="meter"
                label="EAN"
                
                size='small'
                
                />
              </Grid>
              <Grid item xs={2} >
              </Grid>
              <Grid item container xs='auto'
              columnSpacing={1}
              >
                <Grid item xs='auto' >
                  <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                    Begin Date :
                  </Typography>
                </Grid>
                <Grid item xs='auto' >
                  <TextField
                  name="beginDate"
                  label="Begin Date"
                  
                  size='small'
                  
                  sx={{width: '110px'}}
                  />
                </Grid>
              </Grid>
              <Grid item container xs='auto'
              columnSpacing={1}
              >
                <Grid item xs='auto' >
                  <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                    End Date :
                  </Typography>
                </Grid>
                <Grid item xs='auto' >
                  <TextField
                  name="endDate"
                  label="End Date"
                  
                  size='small'
                  
                  sx={{width: '110px'}}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Typography variant="h6" component="h2" align="left" fontWeight={800} sx={{paddingLeft: '4px', paddingTop: '4px'}} >
              Client's offer
            </Typography>
            <Grid >
              <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                Subscribed to the base offer of €/month for to .
              </Typography>
            </Grid>
          </Box>
        </Card>
      
          <Grid container
          direction='row'
          justifyContent='center'
          alignItems='center'
          >
            <Grid item xs={6} >
              <Button  variant='outlined' color='error'  sx={{mt:2, width:'80%', mb:5}}>
                Cancel Contract
              </Button>
            </Grid>
          </Grid>
        
      </Grid>
    </Stack>
  </Stack>
  )
}

export default ViewContract