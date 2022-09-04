import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, Container, Grid, Hidden, Paper } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ confirmDialogObj, handleSubmitConfirmDialog, openConfirmDialog, setOpenConfirmDialog }) {
    const [open, setOpen] = React.useState(false);
    const backgroundColorPalatte = {
        info: 'primary.dark',
        warning: '',
        danger: ''
    };

    const handleClose = () => {
        setOpenConfirmDialog(false);
    };

    return (
        <div>
            <Dialog
                open={openConfirmDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ backgroundColor: confirmDialogObj.type === 'info' ? 'primary.dark' : 'danger.main', color: 'white' }}>
                    {confirmDialogObj.confirmDialogHeader}
                </DialogTitle>
                <Grid
                    sx={{
                        width: '100%',
                        backgroundColor: confirmDialogObj.type === 'info' ? 'primary.dark' : 'danger.main'
                    }}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <img width={'40%'} src={confirmDialogObj.confirmDialogImageIcon} alt="" />
                </Grid>

                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">{confirmDialogObj.confirmDialogMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleSubmitConfirmDialog}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
