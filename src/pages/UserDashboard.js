import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import AppBarPanel from 'components/AppBarPanel';
import Copyright from 'components/Copyright';
import GroupList from 'components/GroupList';
import config from 'configs/config';
import { Route, Routes, Outlet } from 'react-router-dom';

const theme = createTheme({
    status: {
        danger: '#e53e3e'
    },
    palette: {
        primary: {
            main: config.appPrimaryColor,
            darker: config.appPrimaryColor
        },
        secondary: {
            main: '#ffc107',
            darker: config.appPrimaryColor
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff'
        }
    }
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

function DashboardContent() {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBarPanel />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto'
                    }}
                >
                    <Toolbar />
                    <Outlet />

                    <Copyright />
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function UserDashboard() {
    return <DashboardContent />;
}
