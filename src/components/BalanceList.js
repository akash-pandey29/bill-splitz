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
import { AppData } from 'contexts/AppContext';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

export default function BalanceList({ balanceList }) {
    const { userDetail, userList } = AppData();
    return (
        <>
            {/* <h3>Your</h3> */}
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {balanceList.length > 0 &&
                    userList.length > 0 &&
                    userDetail.uid &&
                    balanceList
                        // .filter((a) => a.lender === userDetail.uid || a.borrower === userDetail.uid)
                        .map((value) => {
                            const labelId = value;
                            const lender = userList.filter((a) => a.uid === value.lender)[0];
                            const borrower = userList.filter((a) => a.uid === value.borrower)[0];
                            return (
                                <ListItem
                                    sx={{ mb: 2 }}
                                    key={value}
                                    secondaryAction={
                                        <Button size="small" variant="contained" endIcon={<CurrencyRupeeIcon />}>
                                            Send
                                        </Button>
                                    }
                                    disablePadding
                                >
                                    <ListItemText
                                        id={labelId}
                                        primary={
                                            <>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body1"
                                                    color="text.primary"
                                                >
                                                    <b>{value.borrower === userDetail.uid ? 'You' : borrower.firstName}</b>
                                                </Typography>
                                                <Typography sx={{ display: 'inline' }} component="span" variant="body1" color="gray">
                                                    Owes
                                                </Typography>
                                                <Typography sx={{ display: 'inline' }} component="span" variant="body1" color="green">
                                                    {' '}
                                                    &#x20b9; {value.balanceAmount}
                                                </Typography>
                                                <Typography sx={{ display: 'inline' }} component="span" variant="body1" color="gray">
                                                    To
                                                </Typography>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body1"
                                                    color="text.primary"
                                                >
                                                    <b>{value.lender === userDetail.uid ? 'You' : lender.firstName}</b>
                                                </Typography>
                                                <Divider variant="inset" component="li" />
                                            </>
                                        }
                                    />
                                </ListItem>
                            );
                        })}
            </List>

            {/* <h3>Others'</h3>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {balanceList.length > 0 &&
                    userList.length > 0 &&
                    userDetail.uid &&
                    balanceList
                        .filter((a) => !(a.lender === userDetail.uid || a.borrower === userDetail.uid))
                        .map((value) => {
                            const labelId = value;
                            const lender = userList.filter((a) => a.uid === value.lender)[0];
                            const borrower = userList.filter((a) => a.uid === value.borrower)[0];
                            return (
                                <ListItem key={value}>
                                    {borrower.firstName} owes {lender.firstName} &#x20b9; {value.balanceAmount}
                                </ListItem>
                            );
                        })}
            </List> */}
        </>
    );
}
