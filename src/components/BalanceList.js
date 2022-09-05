import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { AppData } from 'contexts/AppContext';
import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import BalanceLogDataService from 'services/BalanceLogDataService';
import payIconImage from '../assets/images/pay2.png';
import ConfirmDialog from './ConfirmDialog';

const itemList = (value, lender, borrower, labelId, userDetail, handleSettleButtonClick) => {
    return (
        <ListItem
            sx={{ mb: 2 }}
            key={`${value.lender}-${value.borrower}`}
            secondaryAction={
                (value.lender === userDetail.uid && value.amount < 0) || value.borrower === userDetail.uid ? (
                    <Button size="small" variant="contained" onClick={() => handleSettleButtonClick(value)}>
                        <PriceCheckIcon />
                    </Button>
                ) : (
                    ''
                )
            }
            disablePadding
        >
            <ListItemText
                id={labelId}
                primary={
                    <>
                        <Typography component="div" variant="body1" color="gray">
                            {value.amount > 0 ? (
                                <>
                                    <b>{value.borrower === userDetail.uid ? 'You' : borrower.firstName}</b> Owe &#x20b9;{' '}
                                    {Math.abs(value.amount).toFixed(2)} To{' '}
                                    <b>{value.lender === userDetail.uid ? 'You' : lender.firstName}</b>
                                </>
                            ) : (
                                <>
                                    <b>{value.lender === userDetail.uid ? 'You' : lender.firstName}</b> Owe &#x20b9;{' '}
                                    {Math.abs(value.amount).toFixed(2)} To{' '}
                                    <b>{value.borrower === userDetail.uid ? 'You' : borrower.firstName}</b>
                                </>
                            )}
                        </Typography>
                    </>
                }
            />
        </ListItem>
    );
};

export default function BalanceList({ balanceLogList, getBalanceLogs }) {
    const { userDetail, userList, setSnackBarAlertObject, snackBarAlertObject } = AppData();
    const [balanceList, setBalanceList] = useState([]);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [newBalanceLogObject, setNewBalanceLogObject] = useState();
    const [expanded, setExpanded] = React.useState('panel1');
    const confirmDialogObj = {
        confirmDialogHeader: 'Do you want to settle this Bill??',
        confirmDialogMessage:
            'Currently our application does not support any UPI/Payment Gatway integration, do you want to pay the bill with cash and settle this bill?',
        confirmDialogImageIcon: payIconImage,
        type: 'info'
    };

    const handleAccordianChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    useEffect(() => {
        createBalanceList();
    }, [balanceLogList]);

    const handleSettleButtonClick = (balanceListObject) => {
        setOpenConfirmDialog(true);
        setNewBalanceLogObject({
            groupId: balanceListObject.groupId,
            expenseId: '',
            lender: userDetail.uid,
            borrower: userDetail.uid === balanceListObject.lender ? balanceListObject.borrower : balanceListObject.lender,
            amount: Number(Math.abs(balanceListObject.amount).toFixed(2)),
            createdDate: Timestamp.fromDate(new Date())
        });
        //console.log(newBalanceLogObject);
    };
    const handleSubmitConfirmDialog = async () => {
        try {
            await BalanceLogDataService.addBalanceLog(newBalanceLogObject);
            //console.log('Balance Log Added Successfully');
            getBalanceLogs(newBalanceLogObject.groupId);
            setSnackBarAlertObject({
                ...snackBarAlertObject,
                open: true,
                severity: 'success',
                alertMessage: `Bill Settled Successfully`
            });
            setOpenConfirmDialog(false);
        } catch (err) {
            setError(err);
            //console.log('Balance Log Add Error: ', err.message);
        }
    };

    const createBalanceList = () => {
        let tempBalanceList = [];
        balanceLogList.forEach((e) => {
            let lender = e.lender;
            let borrower = e.borrower;
            if (tempBalanceList.length > 0) {
                const isBalanceExist = tempBalanceList.find(
                    (b) => (b.lender === lender && b.borrower === borrower) || (b.lender === borrower && b.borrower === lender)
                );
                if (isBalanceExist) {
                    tempBalanceList = tempBalanceList.filter((x) => x !== isBalanceExist);
                    isBalanceExist.amount =
                        isBalanceExist.lender === lender ? isBalanceExist.amount + e.amount : isBalanceExist.amount - e.amount;
                    tempBalanceList.push({ ...isBalanceExist, amount: Number(isBalanceExist.amount) });
                } else {
                    tempBalanceList.push({ lender: lender, borrower: borrower, amount: e.amount, groupId: e.groupId });
                }
            } else {
                tempBalanceList.push({ lender: lender, borrower: borrower, amount: e.amount, groupId: e.groupId });
            }
        });
        setBalanceList(tempBalanceList);
    };
    return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleAccordianChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography variant="h6" component="span" color="gray" textAlign="center" sx={{ flexGrow: 1 }}>
                        Your
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {balanceList.length > 0 &&
                        userList.length > 0 &&
                        userDetail.uid &&
                        balanceList.filter(
                            (a) =>
                                Math.floor(a.amount) !== 0 &&
                                a.amount !== NaN &&
                                (a.lender === userDetail.uid || a.borrower === userDetail.uid)
                        ).length > 0 ? (
                            balanceList
                                .filter(
                                    (a) =>
                                        Math.floor(a.amount) !== 0 &&
                                        a.amount !== NaN &&
                                        (a.lender === userDetail.uid || a.borrower === userDetail.uid)
                                )
                                .map((value) => {
                                    const labelId = value;
                                    const lender = userList.filter((a) => a.uid === value.lender)[0];
                                    const borrower = userList.filter((a) => a.uid === value.borrower)[0];
                                    return itemList(value, lender, borrower, labelId, userDetail, handleSettleButtonClick);
                                })
                        ) : (
                            <Grid sx={{ width: '100%', bgcolor: 'background.paper', p: 2 }}>
                                <Typography variant="subtitle1" component="h6" color="gray" textAlign="center" sx={{ flexGrow: 1 }}>
                                    No Balance to settle...
                                </Typography>
                            </Grid>
                        )}
                    </List>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleAccordianChange('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography variant="h6" component="span" color="gray" textAlign="center" sx={{ flexGrow: 1 }}>
                        Other's
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {balanceList.length > 0 &&
                        userList.length > 0 &&
                        userDetail.uid &&
                        balanceList.filter(
                            (a) =>
                                !(a.lender === userDetail.uid || a.borrower === userDetail.uid) &&
                                Math.floor(a.amount) !== 0 &&
                                a.amount !== NaN
                        ).length > 0 ? (
                            balanceList
                                .filter(
                                    (a) =>
                                        !(a.lender === userDetail.uid || a.borrower === userDetail.uid) &&
                                        Math.floor(a.amount) !== 0 &&
                                        a.amount !== NaN
                                )
                                .map((value) => {
                                    const labelId = value;
                                    const lender = userList.filter((a) => a.uid === value.lender)[0];
                                    const borrower = userList.filter((a) => a.uid === value.borrower)[0];
                                    return itemList(value, lender, borrower, labelId, userDetail);
                                })
                        ) : (
                            <Grid sx={{ width: '100%', bgcolor: 'background.paper', p: 2 }}>
                                <Typography variant="subtitle1" component="h6" color="gray" textAlign="center" sx={{ flexGrow: 1 }}>
                                    No Balance to settle...
                                </Typography>
                            </Grid>
                        )}
                    </List>
                </AccordionDetails>
            </Accordion>

            <Divider variant="middle" />

            <ConfirmDialog
                confirmDialogObj={confirmDialogObj}
                openConfirmDialog={openConfirmDialog}
                setOpenConfirmDialog={setOpenConfirmDialog}
                handleSubmitConfirmDialog={handleSubmitConfirmDialog}
            />
        </>
    );
}
