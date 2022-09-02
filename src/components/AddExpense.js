import { useEffect, useState } from 'react';
import { Button, Modal, TextField, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import { UserAuth } from 'contexts/AuthContext';
import { useRef } from 'react';
import { AppData } from '../contexts/AppContext';
import { Timestamp } from 'firebase/firestore';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import SearchMember from './SearchMember';
import GroupDataService from 'services/GroupDataService';

const AddExpense = ({ isOpen, setIsOpen, setIsNewGroupAdded }) => {
    const [error, setError] = useState('');
    const [groupId, setGroupId] = useState('');
    const expenseTitleRef = useRef();
    const expenseAmountRef = useRef();
    const { addGroup, userList, getAllUsers, setIsGroupListUpdated, userDetail } = AppData();
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    };
    const handleChange = () => {};

    return (
        <>
            <Box bgcolor={'background.default'} color={'text.primary'} p={3} borderRadius={3}>
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
                    inputRef={expenseTitleRef}
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
                    inputRef={expenseAmountRef}
                />
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={handleChange}
                    label="Adkgfkdsjfhksdfjhsdkfjhge"
                    fullWidth
                    color="primary"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <SearchMember selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
                <Button variant="contained" onClick={handleSubmit}>
                    Create
                </Button>
            </Box>
        </>
    );
};

export default AddExpense;
