import React from 'react';
import FlightIcon from '@mui/icons-material/Flight';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ConstructionIcon from '@mui/icons-material/Construction';
import GroupsIcon from '@mui/icons-material/Groups';

const CustomGroupIcon = ({ groupType }) => {
    switch (groupType) {
        case 'trip':
            return <FlightIcon />;
        case 'rent':
            return <MapsHomeWorkIcon />;
        case 'couple':
            return <FavoriteIcon />;
        case 'event':
            return <CelebrationIcon />;
        case 'project':
            return <ConstructionIcon />;
        default:
            return <GroupsIcon />;
    }
};

export default CustomGroupIcon;
