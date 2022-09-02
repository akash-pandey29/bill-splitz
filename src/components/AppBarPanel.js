import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { stringAvatar } from 'utils/avatar';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { AppData } from 'contexts/AppContext';

const styles = {
    titlePrefix: {
        color: ''
    }
};
const AppBarPanel = () => {
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

    return (
        <AppBar position="absolute" color="primary" open={open}>
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Grid nowrap sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" component="span" color="inherit">
                        Bill
                    </Typography>
                    <Typography variant="h4" component="span" color="secondary">
                        Splitz
                    </Typography>
                </Grid>
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
                            <Button onClick={() => navigate('/signup')} variant="contained" color="secondary" sx={{ my: 1, mx: 1.5 }}>
                                Sign Up
                            </Button>
                        </>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarPanel;
