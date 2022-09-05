import CelebrationIcon from '@mui/icons-material/Celebration';
import ConstructionIcon from '@mui/icons-material/Construction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlightIcon from '@mui/icons-material/Flight';
import GroupsIcon from '@mui/icons-material/Groups';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

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
