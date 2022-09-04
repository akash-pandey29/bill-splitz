import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddGroup from 'components/AddGroup';
import { AppData } from 'contexts/AppContext';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExpenseDataService from 'services/ExpenseDataService';
import ExpenseListData from './ExpenseListData';
import { Link, useNavigate } from 'react-router-dom';
import AddExpense from './AddExpense';
import MemberList from './MemberList';
import GroupDataService from 'services/GroupDataService';
import BalanceList from './BalanceList';
import Popup from './Popup';
import BalanceLogDataService from 'services/BalanceLogDataService';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SnackBarAlert from './SnackBarAlert';
import ConfirmDialog from './ConfirmDialog';
import deleteGroupIconImage from '../assets/images/deleteGroup.png';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SearchMember from './SearchMember';

const ExpenseList = () => {
    const params = useParams();
    const [groupId, setGroupId] = useState(params.id);
    const [groupList, setGroupList] = useState([]);
    const [currentGroup, setCurrentGroup] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isAddMemberOpen, setIsAddMemberOpen] = React.useState(false);
    const [expenseList, setExpenseList] = useState([]);
    const [balanceLogList, setBalanceLogList] = useState([]);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const confirmDialogObj = {
        confirmDialogHeader: 'Delete Group',
        confirmDialogMessage:
            'Are you sure you want to delete this Group Permanently? All the records related to this group will be deleted as well',
        confirmDialogImageIcon: deleteGroupIconImage,
        type: 'danger'
    };

    const { userDetail } = AppData();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            getExpenses(groupId);
            getCurrentGroup(groupId);
        } catch (e) {
            console.error(e.message);
        }
    }, []);

    useEffect(() => {
        if (groupId) {
            getBalanceLogs(groupId);
        }
    }, [expenseList]);

    const getExpenses = async (gid) => {
        if (gid) {
            const data = await ExpenseDataService.getAllExpensesByGroupId(gid);
            console.log(data.docs);
            setExpenseList(data.docs.map((doc) => ({ ...doc.data(), eid: doc.id })));
        }
    };

    const getCurrentGroup = async (gid) => {
        if (gid) {
            const snapDoc = await GroupDataService.getGroup(gid);
            setCurrentGroup(snapDoc.data());
            setSelectedUsers(snapDoc.data().memberIds);
        }
    };

    const getBalanceLogs = async (gid) => {
        if (gid) {
            const data = await BalanceLogDataService.getAllBalanceLogsByGroupId(gid);
            setBalanceLogList(data.docs.map((doc) => ({ ...doc.data(), balanceLogId: doc.id })));
        }
    };

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    const handleDeleteGroup = () => {
        setOpenConfirmDialog(true);
    };

    const handleSubmitConfirmDialog = async () => {
        await GroupDataService.deleteGroupTransaction(groupId);
        setOpenConfirmDialog(false);
        navigate(-1);
    };

    return (
        <>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <SnackBarAlert />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={7} lg={8}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Stack direction="row" spacing={2}>
                                <IconButton color="primary" aria-label="back-to-group-list" onClick={() => handleBackButtonClick()}>
                                    <ArrowBackIosSharpIcon />
                                </IconButton>
                                <Typography variant="h5" component="span" color="gray" textAlign="center" sx={{ flexGrow: 1 }}>
                                    Your Expenses
                                </Typography>
                                <Button variant="contained" size="small" onClick={() => setIsOpen(true)}>
                                    <PlaylistAddIcon />
                                </Button>
                                {/* <AddExpense isOpen={isOpen} setIsOpen={setIsOpen} /> */}
                                <Popup title="Add Expense" isOpen={isOpen} setIsOpen={setIsOpen}>
                                    <AddExpense
                                        memberList={currentGroup ? currentGroup.memberIds : []}
                                        currentGroupId={groupId}
                                        setIsOpen={setIsOpen}
                                        getExpenses={getExpenses}
                                        currentGroup={currentGroup}
                                        getBalanceLogs={getBalanceLogs}
                                    />
                                </Popup>
                            </Stack>
                            <ExpenseListData expenseList={expenseList} getExpenses={getExpenses} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={5} lg={4}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: 240
                            }}
                        >
                            <Stack spacing={1} direction="column">
                                <Stack direction="row" spacing={2}>
                                    <Typography variant="h5" component="span" color="gray" textAlign="center" sx={{ flexGrow: 1 }}>
                                        Members
                                    </Typography>
                                    <Button variant="contained" size="small" onClick={() => setIsAddMemberOpen(true)}>
                                        <PersonAddAlt1Icon />
                                    </Button>
                                </Stack>
                                <Popup title="Add Expense" isOpen={isAddMemberOpen} setIsOpen={setIsAddMemberOpen}>
                                    <SearchMember selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
                                    <Button>Save</Button>
                                </Popup>
                                <MemberList memberList={currentGroup ? currentGroup.memberIds : []} />
                            </Stack>
                        </Paper>
                        <Paper
                            sx={{
                                mt: 2,
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: 240
                            }}
                        >
                            <Stack spacing={1} direction="column">
                                <Typography variant="h5" component="span" color="gray" textAlign="center" sx={{ flexGrow: 1 }}>
                                    Balance Summary
                                </Typography>
                                <BalanceList balanceLogList={balanceLogList} getBalanceLogs={getBalanceLogs} />
                            </Stack>
                        </Paper>
                        {currentGroup && userDetail.uid && userDetail.uid === currentGroup.createdBy && (
                            <Paper
                                sx={{
                                    mt: 2,
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Button
                                    sx={{
                                        backgroundColor: 'danger.main',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'danger.dark'
                                        }
                                    }}
                                    onClick={handleDeleteGroup}
                                >
                                    Delete Group
                                </Button>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
            <ConfirmDialog
                confirmDialogObj={confirmDialogObj}
                openConfirmDialog={openConfirmDialog}
                setOpenConfirmDialog={setOpenConfirmDialog}
                handleSubmitConfirmDialog={handleSubmitConfirmDialog}
            />
        </>
    );
};

export default ExpenseList;
