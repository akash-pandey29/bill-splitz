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

const ExpenseList = () => {
    const params = useParams();
    const [groupId, setGroupId] = useState(params.id);
    const [groupList, setGroupList] = useState([]);
    const [currentGroup, setCurrentGroup] = useState();
    const [isOpen, setIsOpen] = React.useState(false);
    const [expenseList, setExpenseList] = useState([]);
    const [balanceList, setBalanceList] = useState([]);
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
        if (expenseList.length > 0) {
            createBalanceList();
            console.log('balance', balanceList);
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
        }
    };

    const createBalanceList = () => {
        expenseList.forEach((e) => {
            let lender = e.paidBy;
            e.contributers.forEach((c) => {
                if (!c.isBillSettled) {
                    let borrower = c.contributerId;
                    if (balanceList.length > 0) {
                        isBalanceExist = balanceList.find(
                            (b) => (b.lender === lender && b.borrower === borrower) || (b.lender === borrower && b.borrower === lender)
                        );
                        if (isBalanceExist) {
                            setBalanceList(balanceList.filter((x) => x !== isBalanceExist));
                            isBalanceExist.balanceAmount =
                                isBalanceExist.lender === lender
                                    ? isBalanceExist.balanceAmount + e.splitAmount
                                    : isBalanceExist.balanceAmount - e.splitAmount;
                            setBalanceList((prev) => [...prev, isBalanceExist]);
                        } else {
                            setBalanceList((prev) => [...prev, { lender: lender, borrower: borrower, balanceAmount: e.splitAmount }]);
                        }
                    } else {
                        setBalanceList([{ lender: lender, borrower: borrower, balanceAmount: e.splitAmount }]);
                    }
                }
            });
        });
    };

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: 600
                            }}
                        >
                            <Stack direction="row" spacing={2}>
                                <IconButton color="primary" aria-label="back-to-group-list" onClick={() => handleBackButtonClick()}>
                                    <ArrowBackIosSharpIcon />
                                </IconButton>
                                <Typography variant="h5" component="span" color="gray" textAlign="center" nowrap sx={{ flexGrow: 1 }}>
                                    Your Expenses
                                </Typography>
                                <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={() => setIsOpen(true)}>
                                    Add
                                </Button>
                                {/* <AddExpense isOpen={isOpen} setIsOpen={setIsOpen} /> */}
                                <Popup title="Add Expense" openPopup={isOpen} setOpenPopup={setIsOpen}>
                                    <AddExpense />
                                </Popup>
                            </Stack>
                            <ExpenseListData expenseList={expenseList} />
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: 240
                            }}
                        >
                            <Stack spacing={1} direction="column">
                                <Typography variant="h5" component="span" color="gray" textAlign="center" nowrap sx={{ flexGrow: 1 }}>
                                    Members
                                </Typography>
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
                                <Typography variant="h5" component="span" color="gray" textAlign="center" nowrap sx={{ flexGrow: 1 }}>
                                    Balances
                                </Typography>
                                <BalanceList />
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default ExpenseList;
