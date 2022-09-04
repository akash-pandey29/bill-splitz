import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddGroup from 'components/AddGroup';
import { AppData } from 'contexts/AppContext';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupDataService from 'services/GroupDataService';
import { stringAvatar } from 'utils/avatar';
import Popup from './Popup';
import CreateIcon from '@mui/icons-material/Create';
import CustomGroupIcon from './CustomGroupIcon';

const GroupList = () => {
    const [groupList, setGroupList] = useState();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isNewGroupAdded, setIsNewGroupAdded] = useState(false);
    const { userDetail, setPageLoader, userList } = AppData();
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
            const data = await GroupDataService.getGroupListByCurrentUserId(uid);
            console.log(data.docs);
            setGroupList(data.docs.map((doc) => ({ ...doc.data(), gid: doc.id })));
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
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Stack direction="row" spacing={2}>
                                <Typography variant="h5" component="span" color="gray" textAlign="center" sx={{ flexGrow: 1 }}>
                                    Your Groups
                                </Typography>
                                <Button variant="contained" size="small" onClick={() => setIsOpen(true)}>
                                    <GroupAddIcon />
                                </Button>
                                <Popup title="Create Group" isOpen={isOpen} setIsOpen={setIsOpen}>
                                    <AddGroup setIsOpen={setIsOpen} setIsNewGroupAdded={setIsNewGroupAdded} />
                                </Popup>
                            </Stack>

                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                {groupList &&
                                    groupList.map((group) => {
                                        return (
                                            <>
                                                <ListItemButton key={group.gid} onClick={(event) => handleOpenGroup(group.gid)}>
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: 'primary.light', width: 45, height: 45 }}>
                                                                <CustomGroupIcon groupType={group.groupType} />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <Grid container>
                                                            <Grid item xs={6}>
                                                                <Typography component="span" variant="h6" color="primary">
                                                                    {group.title}
                                                                </Typography>

                                                                <Typography component="h6" variant="body2" color="gray">
                                                                    <b>{group.description}</b>
                                                                </Typography>
                                                                <Typography component="h6" variant="body2" color="gray">
                                                                    Members:
                                                                </Typography>
                                                                <Grid>
                                                                    {group.memberIds.length > 1 ? (
                                                                        <Stack direction="row" spacing={-1}>
                                                                            {userDetail.uid
                                                                                ? group.memberIds.map((m, i) => {
                                                                                      let user = userList.filter((a) => a.uid === m)[0];
                                                                                      let userName = `${user.firstName} ${user.lastName}`;
                                                                                      if (i < 3) {
                                                                                          return (
                                                                                              <>
                                                                                                  <Avatar
                                                                                                      key={m}
                                                                                                      {...stringAvatar(userName)}
                                                                                                  />
                                                                                              </>
                                                                                          );
                                                                                      } else if (i + 1 === group.memberIds.length) {
                                                                                          return (
                                                                                              <>
                                                                                                  <Avatar
                                                                                                      key={m}
                                                                                                      {...stringAvatar(`+ ${i + 1 - 3}`)}
                                                                                                  />
                                                                                              </>
                                                                                          );
                                                                                      }
                                                                                  })
                                                                                : ''}
                                                                        </Stack>
                                                                    ) : (
                                                                        ''
                                                                    )}
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item xs={6} sx={{ textAlign: 'end' }}>
                                                                <Typography component="div" variant="h6" color="gray">
                                                                    Expense: <b>&#x20b9;{group.totalGroupExpense}</b>
                                                                </Typography>
                                                                <Typography component="div" variant="body2" color="green">
                                                                    Your Expense:
                                                                    <b>
                                                                        &#x20b9;
                                                                        {
                                                                            group.membersObject.filter((a) => a.uid === userDetail.uid)[0]
                                                                                .userExpense
                                                                        }
                                                                    </b>
                                                                </Typography>
                                                                <Typography component="h6" variant="body2" color="gray">
                                                                    {group.createdDate.toDate().toDateString()}
                                                                </Typography>
                                                                <Typography component="h6" variant="body2" color="gray">
                                                                    Created By:{' '}
                                                                    {userList.length > 0 &&
                                                                    userDetail.uid &&
                                                                    userDetail.uid !== group.createdBy
                                                                        ? userList.filter((user) => user.uid === group.createdBy)[0]
                                                                              .firstName
                                                                        : 'You'}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                </ListItemButton>
                                                <Divider variant="inset" component="li" />
                                            </>
                                        );
                                    })}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default GroupList;
