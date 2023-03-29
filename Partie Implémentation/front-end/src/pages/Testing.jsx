import { Card, Grid, Stack } from '@mui/material';
import React, {useState} from 'react';
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';
import ChartFooter from '../components/ChartFooter';
import ChartHeader from '../components/ChartHeader';
import BiAx from '../components/BiAx';

const Testing = () => {
  const pageName = "test";
	const pageAddress = "/test";

  const [switchesChecked , setSwitchesChecked] = useState({
    waterSwitch: true,
    elecSwitch: true,
    gasSwitch: true,
  });

  function handleSwitchChange(switchName, checked) {
    setSwitchesChecked({ ...switchesChecked, [switchName]: checked });
  }

  return (

    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}} >
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Stack sx={{height:"80%", justifyContent:'start', alignItems:'center'}}>
            <ChartHeader />
            <BiAx scale={"day"} switchesChecked={switchesChecked} />
            <Stack sx={{width:"80%", justifyContent:"center"}} >
              <ChartFooter switchesChecked={switchesChecked} onSwitchChange={handleSwitchChange} />
            </Stack>
          </Stack>
        </Stack>
    </Stack>

  );
}
export default Testing