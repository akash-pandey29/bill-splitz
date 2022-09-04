import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
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

const SignUp = () => {
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [formError, setFormError] = useState('');
    const [inputError, setInputError] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { createUser } = UserAuth();
    const [loading, setLoading] = useState(false);
    const { setPageLoader } = AppData();
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (await checkValidation()) {
            try {
                setFormError('');
                setPageLoader((prev) => prev + 1);
                setLoading(true);
                await createUser(formValues.email, formValues.password, formValues.firstName, formValues.lastName);
                navigate('/userDashboard');
            } catch (e) {
                setFormError(firebaseErrors[e.message]);
            }
            setLoading(false);
            setPageLoader((prev) => prev - 1);
        }
    };

    const checkValidation = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        let firstNameErrorMessage = '';
        let lastNameErrorMessage = '';
        let emailErrorMessage = '';
        let passwordErrorMessage = '';
        let confirmPasswordErrorMessage = '';

        //Check for firstName
        if (formValues.firstName === '') firstNameErrorMessage = 'First Name is Mandatory';
        else firstNameErrorMessage = '';

        //Check for lastName
        if (formValues.lastName === '') lastNameErrorMessage = 'Last Name is Mandatory';
        else lastNameErrorMessage = '';

        //Check for email
        if (formValues.email === '') emailErrorMessage = 'Email field cannot be empty';
        else if (!formValues.email.match(emailRegex)) emailErrorMessage = 'Email is invalid';
        else emailErrorMessage = '';

        //Check for password
        if (formValues.password === '') passwordErrorMessage = 'Password field cannot be empty';
        else if (formValues.password.length < 6) passwordErrorMessage = 'Password length should be atleast 6 characters';
        else passwordErrorMessage = '';

        //Check for confirm password
        if (formValues.confirmPassword === '') confirmPasswordErrorMessage = 'Confirm Password field cannot be empty';
        else if (formValues.password !== formValues.confirmPassword) confirmPasswordErrorMessage = 'Password do not match';
        else confirmPasswordErrorMessage = '';

        setInputError({
            firstName: firstNameErrorMessage,
            lastName: lastNameErrorMessage,
            email: emailErrorMessage,
            password: passwordErrorMessage,
            confirmPassword: confirmPasswordErrorMessage
        });
        return firstNameErrorMessage === '' &&
            lastNameErrorMessage === '' &&
            emailErrorMessage === '' &&
            passwordErrorMessage === '' &&
            confirmPasswordErrorMessage === ''
            ? true
            : false;
    };

    return (
        <Container component="main" maxWidth="xs">
            <Card>
                <Grid
                    sx={{ flexGrow: 1, backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}
                    justifyContent="center"
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
                            <AccountCircleIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Create Your Account
                        </Typography>
                        {formError && <Alert severity="error">{formError}</Alert>}
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
                                        onChange={handleOnChange}
                                        error={Boolean(inputError.firstName !== '')}
                                        helperText={inputError.firstName}
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
                                        onChange={handleOnChange}
                                        error={Boolean(inputError.lastName !== '')}
                                        helperText={inputError.lastName}
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
                                        onChange={handleOnChange}
                                        error={Boolean(inputError.email !== '')}
                                        helperText={inputError.email}
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
                                        onChange={handleOnChange}
                                        error={Boolean(inputError.password !== '')}
                                        helperText={inputError.password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="new-password"
                                        onChange={handleOnChange}
                                        error={Boolean(inputError.confirmPassword !== '')}
                                        helperText={inputError.confirmPassword}
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
                                endIcon={<PersonAddAltIcon />}
                            >
                                Sign Up
                            </Button>

                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Link to="/login">
                                        <Typography component="span" variant="body2">
                                            Already have an account? Sign in
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

export default SignUp;
