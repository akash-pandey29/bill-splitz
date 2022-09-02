import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { AppData } from 'contexts/AppContext';

export default function ExpenseListData({ expenseList }) {
    const { userList } = AppData();
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {expenseList &&
                    expenseList.map((expense) => {
                        return (
                            <>
                                <ListItem key={expense.eid} alignItems="flex-start">
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography component="h6" variant="h6" color="primary">
                                                {expense.title}
                                            </Typography>
                                            <Typography component="h6" variant="body2" color="gray">
                                                Paid By:{' '}
                                                <b>
                                                    {userList.length > 0 &&
                                                        userList.filter((user) => user.uid === expense.paidBy)[0].firstName}
                                                </b>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sx={{ textAlign: 'end' }}>
                                            <Typography component="h6" variant="h6" color="primary">
                                                &#x20b9;{expense.amount}
                                            </Typography>
                                            <Typography component="h6" variant="body2" color="gray">
                                                {expense.createdDate.toDate().toDateString()}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </>
                        );
                    })}
            </List>
        </Paper>
    );
}
