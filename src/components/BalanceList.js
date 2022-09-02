import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CurrencyRupeeSharpIcon from '@mui/icons-material/CurrencyRupeeSharp';

export default function BalanceList() {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Chip
                                label={
                                    <>
                                        <h1>&#x20b9;1000</h1>
                                    </>
                                }
                                color="success"
                            />
                        </React.Fragment>
                    }
                    secondary={
                        <React.Fragment>
                            <Stack direction="row">
                                <Typography sx={{ display: 'inline' }} component="span" variant="body1" color="text.primary">
                                    <b>Levi</b>
                                </Typography>
                                <Typography sx={{ display: 'inline' }} component="span" variant="body1" color="gray">
                                    Owes
                                </Typography>
                                <Typography sx={{ display: 'inline' }} component="span" variant="body1" color="green"></Typography>
                                <Typography sx={{ display: 'inline' }} component="span" variant="body1" color="gray">
                                    To
                                </Typography>
                                <Typography sx={{ display: 'inline' }} component="span" variant="body1" color="text.primary">
                                    <b>Mikasa</b>
                                </Typography>
                                <Button variant="outlined" startIcon={<CurrencyRupeeSharpIcon />}></Button>
                            </Stack>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    );
}
