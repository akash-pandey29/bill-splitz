import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import AddGroup from 'components/AddGroup';
import GroupsIcon from '@mui/icons-material/Groups';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { AppData } from 'contexts/AppContext';
import { UserAuth } from 'contexts/AuthContext';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import GroupDataService from 'services/GroupDataService';
import Popup from './Popup';

const GroupList = () => {
    const [groupList, setGroupList] = useState();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isNewGroupAdded, setIsNewGroupAdded] = useState(false);
    const { userDetail, setPageLoader } = AppData();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            getGroupList(userDetail.uid);
        } catch (e) {
            console.error(e.message);
        }
    }, [userDetail]);

    useEffect(() => {
        if (isNewGroupAdded) {
            try {
                getGroupList(userDetail.uid);
            } catch (e) {
                console.error(e.message);
            }
            setIsNewGroupAdded(false);
        }
    }, [isNewGroupAdded]);

    const getGroupList = async (uid) => {
        if (uid) {
            setPageLoader((prev) => prev + 1);
            const data = await GroupDataService.getGroupListByCurrentUserId(uid);
            console.log(data.docs);
            setGroupList(data.docs.map((doc) => ({ ...doc.data(), gid: doc.id })));
            setPageLoader((prev) => prev - 1);
        }
    };

    const handleOpenGroup = (gid) => {
        navigate('expense/' + gid);
    };

    return (
        <>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Stack direction="row" spacing={2}>
                                <Typography variant="h5" component="span" color="gray" textAlign="center" nowrap sx={{ flexGrow: 1 }}>
                                    Your Groups
                                </Typography>
                                <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={() => setIsOpen(true)}>
                                    Create
                                </Button>
                                <Popup title="Create Group" isOpen={isOpen} setIsOpen={setIsOpen}>
                                    <AddGroup setIsNewGroupAdded={setIsNewGroupAdded} />
                                </Popup>
                            </Stack>

                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                {groupList &&
                                    groupList.map((group) => {
                                        return (
                                            <>
                                                <ListItem alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <GroupsIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={group.title}
                                                        secondary={
                                                            <React.Fragment>
                                                                {" — I'll be in your neighborhood doing errands this…"}
                                                                <Stack direction="row" spacing={2}>
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        <b>Members:</b> {group.memberIds.length}
                                                                    </Typography>
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        <b>Total Group Expense:</b> &#x20b9; {group.totalGroupExpense}
                                                                    </Typography>
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        <b>Your Expense:</b> &#x20b9;{' '}
                                                                        {
                                                                            group.membersObject.filter((a) => a.uid === userDetail.uid)[0]
                                                                                .userExpense
                                                                        }
                                                                    </Typography>
                                                                </Stack>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        endIcon={<SendIcon />}
                                                        onClick={() => handleOpenGroup(group.gid)}
                                                    >
                                                        Open
                                                    </Button>
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </>
                                        );
                                    })}
                            </List>
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240
                            }}
                        ></Paper>
                    </Grid>
                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}></Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default GroupList;
