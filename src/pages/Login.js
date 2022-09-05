import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from '@mui/icons-material/Login';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AppData } from 'contexts/AppContext';
import { UserAuth } from 'contexts/AuthContext';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../node_modules/@mui/material/index';
import { firebaseErrors } from '../configs/firebaseConfig';

const Login = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });
    const [formError, setFormError] = useState('');
    const [inputError, setInputError] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const { login } = UserAuth();
    const { setPageLoader } = AppData();
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        //console.log(formValues);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (await checkValidation()) {
            setPageLoader((prev) => prev + 1);
            setLoading(true);
            setFormError('');
            try {
                await login(formValues.email, formValues.password);
                navigate('/userDashboard');
            } catch (e) {
                setFormError(firebaseErrors[e.message]);
            }
            setLoading(false);
            setPageLoader((prev) => prev - 1);
        }
    };

    const checkValidation = () => {
        //Check for email
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        let emailErrorMessage = '';
        let passwordErrorMessage = '';
        if (formValues.email === '') emailErrorMessage = 'Email field cannot be empty';
        else if (!formValues.email.match(emailRegex)) emailErrorMessage = 'Email is invalid';
        else emailErrorMessage = '';

        //Check for password
        if (formValues.password === '') passwordErrorMessage = 'Password field cannot be empty';
        else passwordErrorMessage = '';
        setInputError({ email: emailErrorMessage, password: passwordErrorMessage });
        return emailErrorMessage === '' && passwordErrorMessage === '' ? true : false;
    };

    return (
        <Container component="main" maxWidth="xs">
            <Card>
                <Grid
                    justifyContent="center"
                    sx={{ flexGrow: 1, backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}
                    padding={2}
                >
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
                        {formError && <Alert severity="error">{formError}</Alert>}
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleOnChange}
                                error={Boolean(inputError.email !== '')}
                                helperText={inputError.email}
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
                                onChange={handleOnChange}
                                error={Boolean(inputError.password !== '')}
                                helperText={inputError.password}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={loading}
                                endIcon={<LoginIcon />}
                            >
                                LogIn
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to="/signup">
                                        <Typography component="span" variant="body2">
                                            Don't have an account? Sign Up
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
