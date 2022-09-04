import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AppBarPanel from 'components/AppBarPanel';
import Feature from 'components/Feature';
import HeaderTextAnimation from 'components/HeaderTextAnimation';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';

const titleItems = ['on Trips', 'with Flatmates', 'with your Partner', 'in Hotels', 'with Anyone'];

const classes = {
    scrollItem: {
        height: '80px',
        overflow: 'hidden',
        backgroundColor: 'green',
        animation: 'move 10s ease-in-out infinite alternate'
    }
};
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));
export default function Home() {
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
                    <Container maxWidth={false}>
                        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                            Splitting Bills
                            <HeaderTextAnimation textList={titleItems} align="center" />
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Split your shared bills of Trips, meals, rent with your friends, family, group easily and efficiently. Register
                            today with your friends
                        </Typography>
                        <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                            <Button variant="contained" onClick={() => navigate('/signup')}>
                                Get Started
                            </Button>
                        </Stack>
                    </Container>
                </Box>
                <Grid container spacing={2} sx={{ minHeight: '85vh', p: 2 }}>
                    <Grid item xs={12} md={4} lg={5}>
                        <Paper
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: '80%'
                            }}
                        ></Paper>
                    </Grid>
                    <Grid item xs={12} md={8} lg={7}>
                        <Paper
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'row',
                                minHeight: '80%',
                                backgroundColor: 'complimentary.main'
                            }}
                        >
                            {/* <Typography component="h4" variant="h4" align="left" color="white" gutterBottom>
                                <b>Our Features</b>
                            </Typography> */}
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                    {Array.from(Array(6)).map((_, index) => (
                                        <Grid item xs={12} sm={4} md={4} key={index} sx={{ height: '50%' }}>
                                            <Item>xs=2</Item>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </main>
        </>
    );
}
