import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
                "No Hassle while splitting your bills!!!"
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                Created with React and Material UI!
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="#">
                    Bill Splitz
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
            <a href="https://www.linkedin.com/in/akash-pandey97/">
                <Stack direction="row" justifyContent="center" spacing={2}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Connect with me on
                    </Typography>
                    <LinkedInIcon />
                </Stack>
            </a>
        </Box>
    );
};

export default Footer;
