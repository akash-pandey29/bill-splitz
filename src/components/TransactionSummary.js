import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { AppData } from 'contexts/AppContext';
import { useState } from 'react';
import Grid from '@mui/material/Grid';

export default function TransactionSummary({ balanceLogListAsLender, balanceLogListAsBorrower, expenseList, groupList }) {
    const { userDetail, userList } = AppData();
    const [alignment, setAlignment] = useState('dataPaid');
    const [expanded, setExpanded] = useState(false);
    const tempExpenseList = [];

    const handleAccordianChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleToggleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <>
            <Stack spacing={1} direction="column">
                <Typography variant="h5" component="span" color="gray" textAlign="center" sx={{ flexGrow: 1 }}>
                    Transaction Summary
                </Typography>
                <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleToggleChange} aria-label="Platform">
                    <ToggleButton value="dataPaid">Paid</ToggleButton>
                    <ToggleButton value="dataReceived">Received</ToggleButton>
                </ToggleButtonGroup>
                {alignment === 'dataPaid' ? (
                    <>
                        {groupList && groupList.length > 0 && balanceLogListAsLender && balanceLogListAsLender.length > 0 ? (
                            balanceLogListAsLender.map((b, index) => {
                                let borrower = userList.filter((u) => u.uid === b.borrower)[0];
                                let borrowerName = `${borrower.firstName} ${borrower.lastName}`;
                                let groupName = groupList.filter((g) => g.gid === b.groupId)[0].title;
                                let expenseName = expenseList.filter((e) => e.expenseId === b.expenseId)[0]?.expenseTitle;
                                let transactionDate = b.createdDate.toDate().toDateString();
                                if (b.expenseId !== '') tempExpenseList.push(b.expenseId);
                                if (tempExpenseList.filter((te) => te === b.expenseId).length <= 1) {
                                    return (
                                        <Accordion
                                            expanded={expanded === `panel-${b.bid}`}
                                            onChange={handleAccordianChange(`panel-${b.bid}`)}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                            >
                                                <Typography sx={{ width: '33%', flexShrink: 0, color: 'danger.main' }}>
                                                    &#x20b9; {b.amount}
                                                </Typography>
                                                <ArrowForwardIcon />
                                                <Typography sx={{ color: 'text.secondary' }}>
                                                    {b.expenseId === '' ? `To ${borrowerName}` : `For ${expenseName}`}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography component="div" variant="body2" color="gray">
                                                    Group:
                                                    <b>{groupName}</b>
                                                </Typography>
                                                <Typography component="div" variant="body2" color="gray">
                                                    Transaction Date:
                                                    <b>{transactionDate}</b>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    );
                                } else return '';
                            })
                        ) : (
                            <Grid sx={{ width: '100%', bgcolor: 'background.paper', p: 2 }}>
                                <Typography variant="subtitle1" component="h6" color="gray" textAlign="center" sx={{ flexGrow: 1 }}>
                                    No Payment made yet...
                                </Typography>
                            </Grid>
                        )}
                    </>
                ) : (
                    <>
                        {groupList && groupList.length > 0 && balanceLogListAsBorrower && balanceLogListAsBorrower.length > 0 ? (
                            balanceLogListAsBorrower.map((b, index) => {
                                let lender = userList.filter((u) => u.uid === b.lender)[0];
                                let lenderName = `${lender.firstName} ${lender.lastName}`;
                                let groupName = groupList.filter((g) => g.gid === b.groupId)[0].title;
                                let transactionDate = b.createdDate.toDate().toDateString();
                                return (
                                    <Accordion expanded={expanded === `panel-${b.bid}`} onChange={handleAccordianChange(`panel-${b.bid}`)}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0, color: 'green' }}>
                                                &#x20b9; {b.amount}
                                            </Typography>
                                            <ArrowBackIcon />
                                            <Typography sx={{ color: 'text.secondary' }}>{`From ${lenderName}`}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography component="div" variant="body2" color="gray">
                                                Group:
                                                <b>{groupName}</b>
                                            </Typography>
                                            <Typography component="div" variant="body2" color="gray">
                                                Transaction Date:
                                                <b>{transactionDate}</b>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                );
                            })
                        ) : (
                            <Grid sx={{ width: '100%', bgcolor: 'background.paper', p: 2 }}>
                                <Typography variant="subtitle1" component="h6" color="gray" textAlign="center" sx={{ flexGrow: 1 }}>
                                    No Payment received yet...
                                </Typography>
                            </Grid>
                        )}
                    </>
                )}
            </Stack>
        </>
    );
}
