import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Box, Grid } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Card from '../Card/Card';
import { getAllTravel } from '../../api/travel';
import CircularProgress from '@mui/material/CircularProgress';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Dashboard = () => {
    const theme = useTheme();
    const [data, setData] = useState(null);
    useEffect(() => {
        getAllTravel()
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((e) => console.log(e));
    }, [])


    return (
        <Box sx={{ display: 'flex' }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader theme={theme} />
                {data === null ? (
                    <CircularProgress />
                ) : (
                    <Grid style={{ marginLeft: '10px' }} container spacing={2} >
                        {data.map((travel) => {
                            return (
                                <Grid key={travel._id} item md={4} sm={6} xs={11} >
                                    <Card travel={travel} />
                                </Grid>
                            )
                        })}
                    </Grid>
                )}
            </Box>
        </Box>
    )
}

export default Dashboard;