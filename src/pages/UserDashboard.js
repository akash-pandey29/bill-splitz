import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import AppBarPanel from 'components/AppBarPanel';
import { Outlet } from 'react-router-dom';

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
        <>
            <CssBaseline />
            <AppBarPanel />
            <Box sx={{ display: 'flex' }}>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: 'default',
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto'
                    }}
                >
                    <Toolbar />
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}

export default function UserDashboard() {
    return <DashboardContent />;
}
