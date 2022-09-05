import { Button, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import ExpenseDataService from 'services/ExpenseDataService';
import { AppData } from '../contexts/AppContext';

const AddExpense = ({ isOpen, setIsOpen, setIsNewGroupAdded, memberList, currentGroupId, getExpenses, currentGroup, getBalanceLogs }) => {
    const { addGroup, userList, getAllUsers, setIsGroupListUpdated, userDetail, setSnackBarAlertObject, snackBarAlertObject } = AppData();
    const [expense, setExpense] = useState({
        expenseTitle: '',
        expenseAmount: '',
        paidBy: ''
    });
    const [formError, setFormError] = useState('');
    const [inputError, setInputError] = useState({
        expenseTitle: '',
        expenseAmount: '',
        paidBy: ''
    });
    const [contributers, setContributers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        if (await checkValidation()) {
            const splitAmount = Number(expense.expenseAmount / (contributers.length + 1)).toFixed(2);
            let newExpense = {
                title: expense.expenseTitle,
                amount: Number(expense.expenseAmount),
                paidBy: expense.paidBy,
                createdBy: userDetail.uid,
                createdDate: Timestamp.fromDate(new Date()),
                groupId: currentGroupId,
                splitAmount: Number(splitAmount),
                contributers: contributers.map((c) => {
                    return { contributerId: c, isBillSettled: false };
                })
            };
            await ExpenseDataService.addExpenseTransaction(newExpense, currentGroupId, contributers);
            getExpenses(currentGroupId);
            getBalanceLogs(currentGroupId);
            setSnackBarAlertObject({ ...snackBarAlertObject, open: true, severity: 'success', alertMessage: 'Expense Added Successfully' });
            setIsOpen(false);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'paidBy') setContributers([]);
        setExpense((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleToggle = (value) => () => {
        if (contributers.some((v) => v === value)) setContributers(contributers.filter((a) => a !== value));
        else setContributers((prev) => [...prev, value]);
    };

    const checkValidation = () => {
        const amountRegex = /^[0-9]/i;
        let expenseTitleErrorMessage = '';
        let expenseAmountErrorMessage = '';
        let expensePaidByErrorMessage = '';
        let expenseContributersErrorMessage = '';

        //Check for Expense Title
        if (expense.expenseTitle === '') expenseTitleErrorMessage = 'Title is mandatory';
        else expenseTitleErrorMessage = '';

        //Check for Expense Amount
        if (expense.expenseAmount === '') expenseAmountErrorMessage = 'Enter an Amount';
        else if (!expense.expenseAmount.match(amountRegex)) expenseAmountErrorMessage = 'Amount is not valid. Please enter a numeric value';
        else expenseAmountErrorMessage = '';

        //Check for Paid By
        if (expense.paidBy === '') expensePaidByErrorMessage = 'Please select a payer';
        else expensePaidByErrorMessage = '';

        //Check for Contributers
        if (contributers.length === 0) {
            expenseContributersErrorMessage = 'Please select atleast one participant';
            setFormError(expenseContributersErrorMessage);
        } else expenseContributersErrorMessage = '';

        setInputError({
            expenseTitle: expenseTitleErrorMessage,
            expenseAmount: expenseAmountErrorMessage,
            paidBy: expensePaidByErrorMessage
        });
        return expenseTitleErrorMessage === '' &&
            expenseAmountErrorMessage === '' &&
            expensePaidByErrorMessage === '' &&
            expenseContributersErrorMessage === ''
            ? true
            : false;
    };

    return (
        <>
            {formError && <Alert severity="error">{formError}</Alert>}
            <TextField
                sx={{ width: '100%' }}
                id="expenseTitle"
                placeholder="Ex: Hotel Expense"
                variant="standard"
                margin="normal"
                required
                fullWidth
                label="Title"
                name="expenseTitle"
                autoComplete="Title"
                onChange={handleChange}
                error={Boolean(inputError.expenseTitle !== '')}
                helperText={inputError.expenseTitle}
            />
            <TextField
                sx={{ width: '100%' }}
                id="expenseAmount"
                placeholder="Ex: 2000"
                variant="standard"
                margin="normal"
                required
                fullWidth
                label="Amount"
                name="expenseAmount"
                autoComplete="Amount"
                onChange={handleChange}
                error={Boolean(inputError.expenseAmount !== '')}
                helperText={inputError.expenseAmount}
            />
            <FormControl required variant="standard" sx={{ mt: 1, mb: 2, width: '100%' }} error={Boolean(inputError.paidBy !== '')}>
                <InputLabel id="paidBySelectLabel">Paid By</InputLabel>
                <Select labelId="paidBySelectLabel" id="paidBy" name="paidBy" onChange={handleChange} label="Paid By" fullWidth>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {userDetail.uid &&
                        memberList.length > 0 &&
                        userList.length > 0 &&
                        memberList.map((value) => {
                            const labelId = value;
                            const user = userList.filter((a) => a.uid === value)[0];
                            const userFullName = `${user.firstName} ${user.lastName}`;
                            return (
                                <MenuItem key={labelId} value={labelId}>
                                    {userDetail.uid === value ? 'You' : userFullName}
                                </MenuItem>
                            );
                        })}
                </Select>
                <FormHelperText>{inputError.paidBy}</FormHelperText>
            </FormControl>
            {expense.paidBy && (
                <>
                    <Typography component="span" variant="body1" color="gray">
                        Select Participants
                    </Typography>
                    <Paper elevation={3} sx={{ mb: 3 }}>
                        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {userDetail.uid &&
                                memberList.length > 0 &&
                                userList.length > 0 &&
                                memberList
                                    .filter((a) => a !== expense.paidBy)
                                    .map((value) => {
                                        const labelId = value;
                                        const user = userList.filter((a) => a.uid === value)[0];
                                        const userFullName = `${user.firstName} ${user.lastName}`;
                                        return (
                                            <ListItem
                                                key={labelId}
                                                secondaryAction={
                                                    <Checkbox
                                                        edge="end"
                                                        onChange={handleToggle(labelId)}
                                                        checked={contributers.indexOf(labelId) !== -1}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                }
                                                disablePadding
                                            >
                                                <ListItemButton onClick={handleToggle(labelId)}>
                                                    <ListItemText id={labelId} primary={userDetail.uid === value ? 'You' : userFullName} />
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                        </List>
                    </Paper>
                    <Typography component="span" variant="body1" color="gray">
                        Split Value: &#x20b9;{' '}
                        {expense.expenseAmount && contributers.length > 0
                            ? Number(expense.expenseAmount / (contributers.length + 1)).toFixed(2)
                            : ''}
                    </Typography>
                </>
            )}

            <DialogActions>
                <Button varient="contained" onClick={handleSubmit}>
                    Add
                </Button>
            </DialogActions>
        </>
    );
};

export default AddExpense;
