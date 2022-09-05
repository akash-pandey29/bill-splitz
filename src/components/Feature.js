import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FeatureIcons, featureList } from 'utils/homePageData';

const bull = (
    <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
        •
    </Box>
);

const Feature = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 2, mt: 10, backgroundColor: 'primary.light' }}>
            <Stack sx={{ pt: 4 }} direction="column" spacing={2}>
                <Typography component="h3" sx={{}} variant="h4" align="left" color="#99b6bf" gutterBottom>
                    Our Features
                </Typography>
                <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {featureList.map((feature, index) => (
                        <Grid item xs={12} sm={4} md={4} key={index}>
                            <Card sx={{ backgroundColor: 'primary.dark', p: 3 }}>
                                <CardContent>
                                    <Stack sx={{ width: '100%', textAlign: 'right' }} direction="row" spacing={2}>
                                        <Paper
                                            sx={{
                                                width: 60,
                                                height: 60,
                                                backgroundColor: 'primary.main',
                                                textAlign: 'center',
                                                color: '#7e72c4'
                                            }}
                                            elevation={3}
                                        >
                                            <FeatureIcons featureIndex={index} />
                                        </Paper>
                                        <Typography
                                            component="h6"
                                            sx={{ color: '#99b6bf' }}
                                            variant="h6"
                                            align="right"
                                            color="white"
                                            gutterBottom
                                        >
                                            {feature.title}
                                        </Typography>
                                    </Stack>

                                    <Typography variant="subtitle1" sx={{ color: '#99b6bf' }} component="div">
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Box>
    );
};

export default Feature;
