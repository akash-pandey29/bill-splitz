import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Copyright from 'components/Copyright';
import config from 'configs/config';
import { UserAuth } from 'contexts/AuthContext';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../node_modules/@mui/material/index';
import { AppData } from 'contexts/AppContext';

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
    header: {
        backgroundColor: config.appPrimaryColor,
        color: 'white',
        textAlign: 'center'
    }
};

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = UserAuth();
    const { setPageLoader } = AppData();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setPageLoader((prev) => prev + 1);
        setLoading(true);
        setError('');
        try {
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/userDashboard');
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
        setLoading(false);
        setPageLoader((prev) => prev - 1);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Card>
                    <Grid nowrap sx={{ flexGrow: 1 }} justifyContent="center" style={classes.header} padding={2}>
                        <Typography variant="h4" component="span" color="inherit">
                            Bill
                        </Typography>
                        <Typography variant="h4" component="span" color="secondary">
                            Splitz
                        </Typography>
                    </Grid>
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <Avatar sx={{ bgcolor: '#424242' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Log In
                            </Typography>
                            {error && <Alert severity="error">{error}</Alert>}
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    inputRef={emailRef}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    inputRef={passwordRef}
                                />
                                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                                    LogIn
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link to="/">Forgot password?</Link>
                                    </Grid>
                                    <Grid item>
                                        <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
