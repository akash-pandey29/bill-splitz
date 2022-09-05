import { Button, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import GroupDataService from 'services/GroupDataService';
import { AppData } from '../contexts/AppContext';
import SearchMember from './SearchMember';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { groupTypes } from 'utils/groupType';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const AddGroup = ({ setIsOpen, setIsNewGroupAdded }) => {
    const [formValues, setFormValues] = useState({
        groupTitle: '',
        groupDescription: '',
        groupType: ''
    });
    const [formError, setFormError] = useState('');
    const [inputError, setInputError] = useState({
        groupTitle: ''
    });

    const [groupId, setGroupId] = useState('');
    const { userDetail } = AppData();
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        if (userDetail.uid) {
            setSelectedUsers((prev) => [...prev, userDetail]);
        }
    }, [userDetail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        if (await checkValidation()) {
            let finalSelectedUsers = selectedUsers.map((usr) => {
                return { uid: usr.uid, userExpense: 0 };
            });
            const newGroup = {
                title: formValues.groupTitle,
                description: formValues.groupDescription,
                createdBy: userDetail.uid,
                createdDate: Timestamp.fromDate(new Date()),
                membersObject: finalSelectedUsers,
                memberIds: finalSelectedUsers.map((a) => a.uid),
                totalGroupExpense: 0,
                groupType: formValues.groupType
            };
            //console.log(newGroup);

            try {
                if (groupId !== undefined && groupId !== '') {
                    await GroupDataService.updateGroup(groupId, newGroup);
                    setBookId('');
                } else {
                    await GroupDataService.addGroup(newGroup);
                    //console.log('Group Added Successfully');
                    setIsNewGroupAdded(true);
                    setIsOpen(false);
                }
            } catch (err) {
                setFormError(err.message);
            }
        }
    };

    const handleOnChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        //console.log(formValues);
    };

    const checkValidation = () => {
        //Check for Group Title
        let groupTitleErrorMessage = '';
        let groupMemberErrorMessage = '';
        if (formValues.groupTitle === '') groupTitleErrorMessage = 'Title is mandatory';
        else groupTitleErrorMessage = '';

        //Check for Members
        if (selectedUsers.length === 1) {
            groupMemberErrorMessage = 'Please select atleast one member';
            setFormError(groupMemberErrorMessage);
        } else groupMemberErrorMessage = '';
        setInputError({ groupTitle: groupTitleErrorMessage });
        return groupTitleErrorMessage === '' && groupMemberErrorMessage === '' ? true : false;
    };

    return (
        <>
            {formError && <Alert severity="error">{formError}</Alert>}
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
                onChange={handleOnChange}
                error={Boolean(inputError.groupTitle !== '')}
                helperText={inputError.groupTitle}
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
                onChange={handleOnChange}
            />
            <FormControl required variant="standard" sx={{ mt: 1, mb: 2, width: '100%' }}>
                <InputLabel id="groupTypeSelectLabel">Group Type</InputLabel>
                <Select
                    labelId="groupTypeSelectLabel"
                    id="groupType"
                    name="groupType"
                    onChange={handleOnChange}
                    label="Group Type"
                    fullWidth
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {groupTypes.map((groupType) => {
                        return (
                            <MenuItem key={groupType.type} value={groupType.type}>
                                {groupType.displayName}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            <SearchMember selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} sx={{ mt: 1, mb: 2, width: '100%' }} />
            <DialogActions>
                <Button varient="contained" onClick={handleSubmit}>
                    Create
                </Button>
            </DialogActions>
        </>
    );
};

export default AddGroup;
