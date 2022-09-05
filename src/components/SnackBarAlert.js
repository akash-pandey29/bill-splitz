import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import { AppData } from '../contexts/AppContext';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const vertical = 'top';
const horizontal = 'center';

const SnackBarAlert = () => {
    const { snackBarAlertObject, setSnackBarAlertObject } = AppData();
    const handleClose = () => {
        setSnackBarAlertObject({ ...snackBarAlertObject, open: false, severity: '', alertMessage: '' });
    };
    return (
        <Snackbar open={snackBarAlertObject.open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackBarAlertObject.severity} sx={{ mt: 7, width: '100%' }}>
                {snackBarAlertObject.alertMessage}
            </Alert>
        </Snackbar>
    );
};

export default SnackBarAlert;
