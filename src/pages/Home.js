import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AppBarPanel from 'components/AppBarPanel';
import Feature from 'components/Feature';
import HeaderTextAnimation from 'components/HeaderTextAnimation';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';

const titleItems = ['on Trips', 'with Flatmates', 'with your Partner', 'in Hotels', 'with Anyone'];

export default function Home() {
    const { user } = UserAuth();
    const navigate = useNavigate();
    return (
        <>
            <CssBaseline />
            <AppBarPanel />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6
                    }}
                >
                    <Container sx={{ m: 0, p: 0, pl: 0, pr: 0 }} maxWidth={false}>
                        <Typography component="h1" sx={{ mt: 5 }} variant="h2" align="center" color="text.primary" gutterBottom>
                            Splitting Bills
                            <HeaderTextAnimation textList={titleItems} align="center" />
                        </Typography>
                        <Typography sx={{ mt: 10 }} variant="h5" align="center" color="text.secondary" paragraph>
                            Split your shared bills of Trips, meals, rent with your friends, family, group easily and efficiently. Register
                            today with your friends
                        </Typography>
                        <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                            <Button variant="contained" onClick={() => (user !== null ? navigate('/userDashboard') : navigate('/signup'))}>
                                Get Started
                            </Button>
                        </Stack>
                        <Feature />
                    </Container>
                </Box>
            </main>
        </>
    );
}
