import { Button, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import GroupDataService from 'services/GroupDataService';
import { AppData } from '../contexts/AppContext';
import SearchMember from './SearchMember';

const AddGroup = ({ setIsOpen, setIsNewGroupAdded }) => {
    const [error, setError] = useState('');
    const [groupId, setGroupId] = useState('');
    const groupTitleRef = useRef();
    const groupDescriptionRef = useRef();
    const { userDetail } = AppData();
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
            <DialogActions>
                <Button varient="contained" onClick={handleSubmit}>
                    Create
                </Button>
            </DialogActions>
        </>
    );
};

export default AddGroup;
