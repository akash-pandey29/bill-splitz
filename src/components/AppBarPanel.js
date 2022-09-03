import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { stringAvatar } from 'utils/avatar';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import Grid from '@mui/material/Grid';
import { AppData } from 'contexts/AppContext';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function AppBarPanel(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const { logout, user } = UserAuth();
    const { userDetail } = AppData();
    const [userName, setUserName] = useState('Akash Pandey');
    useEffect(() => {
        console.log(userDetail.firstName);
        setUserName(`${userDetail.firstName} ${userDetail.lastName}`);
    }, [userDetail]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = async () => {
        handleCloseNavMenu();
        try {
            await logout();
            navigate('/');
        } catch (e) {
            console.log(e.message);
        }
    };
    const handleLogin = () => {
        navigate('/login');
    };
    const handleSignUp = () => {
        navigate('/signup');
    };
    const handleOpenGroups = () => {
        navigate('userDashboard');
    };
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', bgcolor: 'primary' }}>
            <Box sx={{ bgcolor: 'primary' }}>
                <Typography variant="h4" component="span" color="inherit">
                    Bill
                </Typography>
                <Typography variant="h4" component="span" color="secondary">
                    Splitz
                </Typography>
            </Box>

            {user !== null ? (
                <>
                    <Box sx={{ bgcolor: 'primary' }}>
                        {/* <Avatar {...stringAvatar(userName)} /> */}
                        <Typography component="span" variant="subtitle1" color="gray" nowrap sx={{ flexGrow: 1 }}>
                            @{userName}
                        </Typography>
                    </Box>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary="Groups" onClick={handleOpenGroups} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary="Logout" onClick={handleLogout} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </>
            ) : (
                <>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary="Login" onClick={handleLogin} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ textAlign: 'center' }} onClick={handleSignUp}>
                                <ListItemText primary="Sign Up" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </>
            )}
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Grid nowrap sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" component="span" color="inherit">
                            Bill
                        </Typography>
                        <Typography variant="h4" component="span" color="secondary">
                            Splitz
                        </Typography>
                    </Grid>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Grid nowrap sx={{ flexGrow: 1 }} justifyContent="flex-end" style={{ display: 'flex' }}>
                            {user !== null ? (
                                <>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar {...stringAvatar(userName)} />
                                        <Typography component="span" variant="subtitle1" color="white" nowrap sx={{ flexGrow: 1 }}>
                                            {userName}
                                        </Typography>
                                    </IconButton>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right'
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right'
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={handleLogout}>
                                            <Typography textAlign="center">Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => navigate('/login')} variant="outlined" color="inherit" sx={{ my: 1, mx: 1.5 }}>
                                        Login
                                    </Button>
                                    <Button
                                        onClick={() => navigate('/signup')}
                                        variant="contained"
                                        color="secondary"
                                        sx={{ my: 1, mx: 1.5 }}
                                    >
                                        Sign Up
                                    </Button>
                                </>
                            )}
                        </Grid>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

export default AppBarPanel;
