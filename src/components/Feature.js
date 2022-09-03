import { Box, Container, Grid, Hidden, Paper } from '@mui/material';
import React from 'react';
// import { RenderSectionHeading } from '../common/commonComponent';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Typography from '@mui/material/Typography';
import ScrollAnimation from 'react-animate-on-scroll';
import { Card, CardContent, CardHeader } from '../../node_modules/@mui/material/index';

export default function Feature() {
    const cardMediaData = [
        {
            title: ' Web Development',
            description: 'Lorem ipsum dolor sit amet Consectetur adipisicing elit.',
            icon: <AcUnitIcon />
        },
        {
            title: 'Graphic Design',
            description: 'Lorem ipsum dolor sit amet Consectetur adipisicing elit.',
            icon: <AcUnitIcon />
        },
        {
            title: 'Mobile Apps',
            description: 'Lorem ipsum dolor sit amet Consectetur adipisicing elit.',
            icon: <AcUnitIcon />
        },
        {
            title: 'Marketing',
            description: 'Lorem ipsum dolor sit amet Consectetur adipisicing elit.',
            icon: <AcUnitIcon />
        }
    ];
    return (
        <Box id="About">
            <ScrollAnimation animateIn="fadeIn">
                <Container>
                    <Grid container spacing={1}>
                        <Grid item sm={5}>
                            <Paper elevation={3}></Paper>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <Typography variant="h4" color="white" nowrap sx={{ flexGrow: 1 }}>
                                Features
                            </Typography>
                            <Typography variant="h6" color="white" nowrap sx={{ flexGrow: 1 }}>
                                Hello I'm Himanshu lal
                            </Typography>
                            <br />
                            <Grid container>
                                {cardMediaData.map((item, i) => (
                                    <Grid item xs={12} sm={6} key={i}>
                                        <Card>
                                            <CardHeader title={cardMediaData.title} />
                                            <CardContent>{cardMediaData.description}</CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </ScrollAnimation>
        </Box>
    );
}
