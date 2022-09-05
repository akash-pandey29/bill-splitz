import AddchartIcon from '@mui/icons-material/Addchart';
import GroupsIcon from '@mui/icons-material/Groups';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import PaidIcon from '@mui/icons-material/Paid';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

export const FeatureIcons = ({ featureIndex }) => {
    switch (featureIndex) {
        case 0:
            return <GroupsIcon sx={{ fontSize: 50 }} />;
        case 1:
            return <PaidIcon sx={{ fontSize: 50 }} />;
        case 2:
            return <AddchartIcon sx={{ fontSize: 50 }} />;
        case 3:
            return <PriceCheckIcon sx={{ fontSize: 50 }} />;
        case 4:
            return <ReceiptLongIcon sx={{ fontSize: 50 }} />;
        case 5:
            return <MobileFriendlyIcon sx={{ fontSize: 50 }} />;
    }
};

export const featureList = [
    {
        title: 'Manage Group Expenses',
        description:
            'No hustle for splitting bills while going for any trip or vacation with your friends. Just Create a group and add your friends in it, we will take care of all your money management'
    },
    {
        title: 'Add Expenses easily',
        description:
            'No matter who pays the bill from your group, just add that expense with one simple click and we will make sure that your expense will be distributed and managed properly'
    },
    {
        title: 'Track balances',
        description:
            'Struggling with calculation? Do not worry just enjoy your trip, we will take care of this. We will manage all the balances and in the end you can see how much you have lended out or borrowed'
    },
    {
        title: 'Settle Bills',
        description:
            'Do you have bad memory when it comes to remeber your bill settlements? We got that covered as well. You can see a Settle Button for all the bills that you need to clear'
    },

    {
        title: 'Monitor Transactions',
        description:
            'Budget Tracking is a cruisial part of any expense. And that is why we provide a transaction summary, so that you can know about all your expense and plan wisely '
    },
    {
        title: 'Responsive Web App',
        description:
            'Well you do not need to open your computer to manage all these things. You can do it on your phone as well. Yes! we are mobile friendly web application'
    }
];
