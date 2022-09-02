import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
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

export default function SignUp() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { createUser } = UserAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match');
        }

        try {
            setError('');
            setLoading(true);
            await createUser(emailRef.current.value, passwordRef.current.value, firstNameRef.current.value, lastNameRef.current.value);
            navigate('/userDashboard');
        } catch (err) {
            console.error(err);
            setError('Failed to create the account');
        }
        setLoading(false);
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
                                <AccountCircleIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Create Your Account
                            </Typography>
                            {error && <Alert severity="error">{error}</Alert>}
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            // eslint-disable-next-line jsx-a11y/no-autofocus
                                            autoFocus
                                            inputRef={firstNameRef}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="family-name"
                                            inputRef={lastNameRef}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            inputRef={emailRef}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            inputRef={passwordRef}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="passwordConfirm"
                                            label="Confirm Password"
                                            type="password"
                                            id="passwordConfirm"
                                            autoComplete="new-password"
                                            inputRef={passwordConfirmRef}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    color="primary"
                                    disabled={loading}
                                >
                                    Sign Up
                                </Button>

                                <Grid container justifyContent="center">
                                    <Grid item>
                                        <Link to="/login">Already have an account? Sign in</Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
