import { Button, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import { useRef, useState } from 'react';
import { AppData } from '../contexts/AppContext';
import Typography from '@mui/material/Typography';
import { Timestamp } from 'firebase/firestore';
import ExpenseDataService from 'services/ExpenseDataService';

const AddExpense = ({ isOpen, setIsOpen, setIsNewGroupAdded, memberList, currentGroupId, getExpenses }) => {
    const { addGroup, userList, getAllUsers, setIsGroupListUpdated, userDetail } = AppData();
    const theme = useTheme();
    const [error, setError] = useState('');
    const [expense, setExpense] = useState({
        expenseTitle: '',
        expenseAmount: '',
        paidBy: ''
    });
    const [contributers, setContributers] = useState([]);
    const paidByRef = useRef();

    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const newExpense = {
            title: expense.expenseTitle,
            amount: expense.expenseAmount,
            paidBy: expense.paidBy,
            createdBy: userDetail.uid,
            createdDate: Timestamp.fromDate(new Date()),
            groupId: currentGroupId,
            splitAmount: Number(expense.expenseAmount / (contributers.length + 1)).toFixed(2),
            contributers: contributers.map((c) => {
                return { contributerId: c, isBillSettled: false };
            })
        };
        console.log(newExpense);
        try {
            await ExpenseDataService.addExpense(newExpense);
            console.log('Expense Added Successfully');
            setIsOpen(false);
            getExpenses(currentGroupId);
        } catch (err) {
            setError(err);
            console.log('Expense Add Error: ', err.message);
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

    return (
        <>
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
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
            <FormControl required variant="standard" sx={{ mt: 1, mb: 2, width: '100%' }}>
                <InputLabel id="paidBySelectLabel">Paid By</InputLabel>
                <Select labelId="paidBySelectLabel" id="paidBy" name="paidBy" onChange={handleChange} label="Paid By" fullWidth>
                    {memberList.length > 0 &&
                        userList.length > 0 &&
                        memberList.map((value) => {
                            const labelId = value;
                            const user = userList.filter((a) => a.uid === value)[0];
                            const userFullName = `${user.firstName} ${user.lastName}`;
                            return (
                                <MenuItem key={labelId} value={labelId}>
                                    {userFullName}
                                </MenuItem>
                            );
                        })}
                </Select>
            </FormControl>
            {expense.paidBy && (
                <>
                    <Typography component="span" variant="body1" color="gray">
                        Select contributers
                    </Typography>
                    <Paper elevation={3} sx={{ mb: 3 }}>
                        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {memberList.length > 0 &&
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
                                                <ListItemButton>
                                                    <ListItemText id={labelId} primary={userFullName} />
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                        </List>
                    </Paper>
                    <Typography component="span" variant="body1" color="gray">
                        Split Value: &#x20b9;{' '}
                        {expense.expenseAmount && contributers.length > 0 ? Number(expense.expenseAmount / (contributers.length + 1)) : ''}
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
