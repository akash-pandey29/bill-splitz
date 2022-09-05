import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { stringAvatar } from 'utils/avatar';
import { AppData } from '../contexts/AppContext';

export default function MemberList({ memberList }) {
    const { userList, userDetail } = AppData();
    return (
        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {userDetail.uid &&
                memberList.length > 0 &&
                userList.length > 0 &&
                memberList.map((value) => {
                    const labelId = value;
                    const user = userList.filter((a) => a.uid === value)[0];
                    const userFullName = `${user.firstName} ${user.lastName}`;
                    return (
                        <ListItem key={value}>
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar {...stringAvatar(userFullName, 20)} />
                                </ListItemAvatar>
                                <ListItemText
                                    id={labelId}
                                    primary={userDetail.uid === value ? 'You' : userFullName}
                                    secondary={user.email}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
        </List>
    );
}
