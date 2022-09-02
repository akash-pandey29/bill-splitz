import { useEffect, useState } from 'react';
import { Button, Modal, TextField, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/system';
import { UserAuth } from 'contexts/AuthContext';
import { useRef } from 'react';
import { AppData } from '../contexts/AppContext';
import { Timestamp } from 'firebase/firestore';

import { styled } from '@mui/material/styles';
import SearchMember from './SearchMember';
import GroupDataService from 'services/GroupDataService';

const SytledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const UserBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px'
});

const AddGroup = ({ isOpen, setIsOpen, setIsNewGroupAdded }) => {
    const [error, setError] = useState('');
    const [groupId, setGroupId] = useState('');
    const groupTitleRef = useRef();
    const groupDescriptionRef = useRef();
    const { addGroup, userList, getAllUsers, setIsGroupListUpdated, userDetail } = AppData();
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        if (userDetail.uid) {
            setSelectedUsers((prev) => [...prev, userDetail]);
        }
    }, [userDetail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (groupTitleRef.current.value === '') {
            setError('Title field is mandatory');
            return;
        }
        let finalSelectedUsers = selectedUsers.map((usr) => {
            return { uid: usr.uid, userExpense: 0 };
        });
        const newGroup = {
            title: groupTitleRef.current.value,
            description: groupDescriptionRef.current.value,
            createdBy: userDetail.uid,
            createdDate: Timestamp.fromDate(new Date()),
            membersObject: finalSelectedUsers,
            memberIds: finalSelectedUsers.map((a) => a.uid),
            totalGroupExpense: 0
        };
        console.log(newGroup);

        try {
            if (groupId !== undefined && groupId !== '') {
                await GroupDataService.updateGroup(groupId, newGroup);
                setBookId('');
            } else {
                await GroupDataService.addGroup(newGroup);
                console.log('Group Added Successfully');
                setIsNewGroupAdded(true);
                setIsOpen(false);
            }
        } catch (err) {
            setError(err);
            console.log('Group Add Error: ', err.message);
        }
    };

    return (
        <>
            <SytledModal
                open={isOpen}
                onClose={(e) => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box bgcolor={'background.default'} color={'text.primary'} p={3} borderRadius={3}>
                    <Box sx={{ flexWrap: 'wrap' }}>
                        <Typography variant="h5" component="span" color="gray" textAlign="center" nowrap sx={{ flexGrow: 1 }}>
                            Create Group
                        </Typography>
                        <Button onClick={() => setIsOpen(false)} nowrap sx={{ flexGrow: 1 }}>
                            X
                        </Button>
                    </Box>

                    <TextField
                        sx={{ width: '100%' }}
                        id="groupTitle"
                        placeholder="Ex: Goa Trip 2022"
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        label="Title"
                        name="groupTitle"
                        autoComplete="Title"
                        inputRef={groupTitleRef}
                    />
                    <TextField
                        sx={{ width: '100%' }}
                        id="groupDescription"
                        placeholder="Ex: This group will have all our 2022 Goa trip expenses!!!"
                        multiline
                        rows={2}
                        variant="standard"
                        margin="normal"
                        fullWidth
                        label="Description"
                        name="groupDescription"
                        autoComplete="Description"
                        inputRef={groupDescriptionRef}
                    />
                    <Divider />
                    <SearchMember selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
                    <Button onClick={handleSubmit}>Create</Button>
                </Box>
            </SytledModal>
        </>
    );
};

export default AddGroup;
