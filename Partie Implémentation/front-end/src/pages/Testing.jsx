import { Grid, Stack } from '@mui/material';
import React from 'react';
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';
import DatePickers from '../components/DatePickers';
import ScaleButtons from '../components/ScaleButtons';
import BiAxLineChart from '../components/BiAxLineChart';
import Module1 from '../components/Module1';


const ErrorPage = () => {
  const pageName = "test";
	const pageAddress = "/test";
  return (
		<Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
			<SideMenu/>
			<Stack direction='column' sx={{width:"100%"}}>
				<TopMenu pageAddress={pageAddress} pageName={pageName}/>
				<Stack direction='column' spacing={6} sx={{height:"90%", justifyContent:'center', alignItems:'center'}}>
					<Stack direction='row' sx={{height:"90%", justifyContent:'center', alignItems:'center'}}>
						<ScaleButtons />
						<DatePickers />
					</Stack>
					<BiAxLineChart />
				</Stack>
				<Stack direction='row' sx={{height:"90%", justifyContent:'center', alignItems:'center'}}>
					<Module1 />
					<Module1 />
					<Stack direction='column' sx={{height:"90%", justifyContent:'center', alignItems:'center'}}>
						<Module1/>
						<Module1/>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
  );
}
export default ErrorPage