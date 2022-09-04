import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Stack, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { alpha, styled } from '@mui/material/styles';
import { UserAuth } from 'contexts/AuthContext';
import { AppData } from '../contexts/AppContext';
import { stringAvatar } from '../utils/avatar';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch'
            }
        }
    }
}));

const SearchMember = ({ selectedUsers, setSelectedUsers }) => {
    const { user } = UserAuth();
    const { addGroup, userList, getAllUsers, userDetail } = AppData();
    const [filterUsers, setFilterUsers] = useState([]);
    // const [searchText, setSearchText] = useState('');

    const handleSearchTextChange = (event) => {
        let filterValue = event.target.value.toLowerCase();
        if (filterValue === '') setFilterUsers([]);
        else {
            setFilterUsers(
                userList.filter(
                    (a) =>
                        a.uid !== userDetail.uid &&
                        (a.firstName.toLowerCase().includes(filterValue) || a.lastName.toLowerCase().includes(filterValue))
                )
            );
        }
    };

    const handleFilteredMemberClick = (value) => {
        // setSearchText('');
        setSelectedUsers((prev) => [...prev, value]);
    };

    const handleRemoveSelectedMembers = (uid) => {
        setSelectedUsers((prev) => prev.filter((a) => a.uid !== uid));
    };
    return (
        <>
            <Typography variant="h6" component="h6" color="gray" textAlign="center" sx={{ flexGrow: 1 }}>
                Add Member
            </Typography>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onChange={handleSearchTextChange} />
            </Search>
            <Stack direction="row" spacing={1}>
                {selectedUsers &&
                    selectedUsers.map((selectedUsr) => {
                        return (
                            <Chip
                                label={selectedUsr.firstName}
                                onDelete={() => handleRemoveSelectedMembers(selectedUsr.uid)}
                                disabled={selectedUsr.uid === user.uid}
                            />
                        );
                    })}
            </Stack>

            <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <Paper elevation={3}>
                    {filterUsers.map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value.uid}`;
                        return (
                            <ListItem key={value.uid} disablePadding>
                                <ListItemButton
                                    onClick={() => handleFilteredMemberClick(value)}
                                    disabled={selectedUsers && selectedUsers.some((a) => a.uid === value.uid)}
                                >
                                    <ListItemAvatar>
                                        <Avatar {...stringAvatar(`${value.firstName} ${value.lastName}`)} />
                                    </ListItemAvatar>
                                    <ListItemText id={labelId} primary={`${value.firstName} ${value.lastName}`} secondary={value.email} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </Paper>
            </List>
        </>
    );
};

export default SearchMember;
