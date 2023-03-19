import { Grid, Typography } from '@mui/material';
import {React, useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const DatePickers = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (
        <Grid container
        direction='row'
        alignItems='center'
        justifyContent='space-evenly'
        columns={4}
        rowSpacing={0}
        columnSpacing={1}
        >
            <Grid item>
                <Typography variant="h6" component="div" gutterBottom> From: </Typography>
            </Grid>
            <Grid item>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </Grid>
            <Grid item>
                <Typography variant="h6" component="div" gutterBottom> To: </Typography>
            </Grid>
            <Grid item>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            </Grid>
        </Grid>
    );
}

export default DatePickers