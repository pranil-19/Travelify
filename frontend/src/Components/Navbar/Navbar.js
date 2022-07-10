import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import image from '../../images/post-icon.jpg'
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper'
import Card from '../Card/Card';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddTravelModel from '../AddTravelModel/AddTravelModel';
import { useNavigate, Link } from 'react-router-dom';

const drawerWidth = 260;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openaddtravel, setaddtravel] = React.useState(false);
    const navigate = useNavigate();
    //console.log(openaddtravel)
    const handleaddtravel = () => {
        console.log(openaddtravel)
        setaddtravel(true);
    }

    const handlefiltertravel = () => {

    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handlelogout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AddTravelModel isOpen={openaddtravel} setIsOpen={setaddtravel} />
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white' }} >
                        <Typography variant="h5" noWrap component="div">
                            Travelify
                        </Typography>
                    </Link>
                    <IconButton
                        color="inherit"
                        aria-label="add travel"
                        onClick={handleaddtravel}
                        edge="start"
                        sx={{
                            marginLeft: 5,
                        }}
                    >
                        <AddCircleOutlineIcon /> <Typography variant="subtitle1" style={{ marginLeft: '10px' }} >Add Travel</Typography>
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="add travel"
                        onClick={handlefiltertravel}
                        edge="start"
                        sx={{
                            marginLeft: 4,
                        }}
                    >
                        <FilterAltIcon /> <Typography variant="subtitle1" style={{ marginLeft: '10px' }} >Filter Travel</Typography>
                    </IconButton>
                    <div style={{ marginLeft: 'auto', marginRight: '50px' }} >
                        <Button color="inherit" style={{ marginRight: '30px' }} onClick={handlelogout} >Logout</Button>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Travellers Post', 'Travelling Experiences'].map((text, index) => (
                        <ListItemButton
                            key={text}
                            sx={{
                                minHeight: 50,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {index % 2 === 0 ? <img height="25px" width="25px" src={image} /> : <img height="25px" width="25px" src={image} />}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    ))}
                </List>
                <Divider />
            </Drawer>
        </Box>
    );
}
