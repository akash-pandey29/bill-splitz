import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { AppData } from '../contexts/AppContext';
import { stringAvatar } from 'utils/avatar';

export default function MemberList({ memberList }) {
    const { userList } = AppData();
    return (
        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {memberList.length > 0 &&
                userList.length > 0 &&
                memberList.map((value) => {
                    const labelId = value;
                    const user = userList.filter((a) => a.uid === value)[0];
                    const userFullName = `${user.firstName} ${user.lastName}`;
                    return (
                        <ListItem key={value}>
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar {...stringAvatar(userFullName)} />
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={userFullName} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
        </List>
    );
}
