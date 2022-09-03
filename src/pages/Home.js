import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import AppBarPanel from 'components/AppBarPanel';
import Copyright from 'components/Copyright';
import Feature from 'components/Feature';
import HeaderTextAnimation from 'components/HeaderTextAnimation';
import config from 'configs/config';
import { useNavigate } from 'react-router-dom';

const titleItems = ['on Trips', 'with Flatmates', 'with your Partner', 'in Hotels', 'with Anyone'];

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

const classes = {
    scrollItem: {
        height: '80px',
        overflow: 'hidden',
        backgroundColor: 'green',
        animation: 'move 10s ease-in-out infinite alternate'
    }
};

export default function Home() {
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
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
                    <Container maxWidth={false}>
                        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                            Splitting Bills
                            <HeaderTextAnimation textList={titleItems} align="center" />
                            made easy
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Split your shared bills of Trips, meals, rent with your friends, family, group easily and efficiently. Register
                            today with your friends
                        </Typography>
                        <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                            <Button variant="contained">Get Started</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container maxWidth={false}>
                    {/* End hero unit */}
                    <Grid container padding={2} spacing={2} style={{ backgroundColor: config.appPrimaryColor }}>
                        <Feature />
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}
