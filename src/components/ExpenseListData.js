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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ExpenseDataService from 'services/ExpenseDataService';
import ConfirmDialog from './ConfirmDialog';
import deleteIconImage from '../assets/images/delete.png';
import { useState } from 'react';

const ExpenseListData = ({ expenseList, getExpenses }) => {
    const { userList, userDetail } = AppData();
    const [expanded, setExpanded] = React.useState();
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [deleteExpenseObj, setDeleteExpenseObj] = useState();
    const confirmDialogObj = {
        confirmDialogHeader: 'Delete Expense',
        confirmDialogMessage: 'Are you sure you want to delete this expense record?',
        confirmDialogImageIcon: deleteIconImage,
        type: 'danger'
    };

    const handleChange = (key) => {
        if (expanded === key) setExpanded('');
        else setExpanded(key);
    };

    const handleDeleteExpense = (expenseObj) => {
        setDeleteExpenseObj(expenseObj);
        setOpenConfirmDialog(true);
    };

    const handleSubmitConfirmDialog = async () => {
        await ExpenseDataService.deleteExpenseTransaction(deleteExpenseObj);
        getExpenses(deleteExpenseObj.groupId);
        setDeleteExpenseObj();
        setOpenConfirmDialog(false);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {/* <List sx={{ width: '100%', bgcolor: 'background.paper' }}> */}
            {expenseList &&
                expenseList.map((expense) => {
                    return (
                        <>
                            {/* <ListItem key={expense.eid} alignItems="flex-start"> */}
                            <Accordion expanded={expanded === expense.eid} key={expense.eid} onChange={() => handleChange(expense.eid)}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Typography component="h6" variant="h6" color="primary">
                                                {expense.title}
                                            </Typography>
                                            <Typography component="h6" variant="body2" color="gray">
                                                Paid By:{' '}
                                                <b>
                                                    {userDetail.uid && userDetail.uid === expense.paidBy
                                                        ? 'You'
                                                        : userList.length > 0 &&
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
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography component="div" variant="body2" color="gray">
                                        Split Amount:
                                        <b>&#x20b9;{expense.splitAmount}</b>
                                    </Typography>
                                    <Typography component="div" variant="body2" color="gray">
                                        Participants:
                                    </Typography>
                                    {userDetail.uid &&
                                        userList.length > 0 &&
                                        expense.contributers.length > 0 &&
                                        expense.contributers.map((contributer) => {
                                            return (
                                                <>
                                                    <Typography
                                                        component="div"
                                                        key={`participant-${contributer.contributerId}`}
                                                        variant="body2"
                                                        color="gray"
                                                    >
                                                        <b>
                                                            {userDetail.uid === contributer.contributerId
                                                                ? 'You'
                                                                : userList.filter((user) => user.uid === contributer.contributerId)[0]
                                                                      .firstName}
                                                        </b>
                                                    </Typography>
                                                </>
                                            );
                                        })}
                                    {userDetail.uid && userDetail.uid === expense.createdBy && (
                                        <Grid sx={{ textAlign: 'end' }}>
                                            <IconButton aria-label="delete" color="danger" onClick={() => handleDeleteExpense(expense)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            {/* <IconButton aria-label="edit" color="info">
                                            <BorderColorIcon />
                                        </IconButton> */}
                                        </Grid>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                            {/* </ListItem> */}
                        </>
                    );
                })}
            {/* </List> */}
            <ConfirmDialog
                confirmDialogObj={confirmDialogObj}
                openConfirmDialog={openConfirmDialog}
                setOpenConfirmDialog={setOpenConfirmDialog}
                handleSubmitConfirmDialog={handleSubmitConfirmDialog}
            />
        </Paper>
    );
};

export default ExpenseListData;
