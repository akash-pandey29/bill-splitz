import { db } from '../firebase';

import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

const groupCollectionRef = collection(db, 'groups');

class GroupDataService {
    addGroup = (newGroup) => {
        return addDoc(groupCollectionRef, newGroup);
    };

    updateGroup = (id, updatedGroup) => {
        const groupDoc = doc(db, 'groups', id);
        return updateDoc(groupDoc, updatedGroup);
    };

    deleteGroup = (id) => {
        const groupDoc = doc(db, 'groups', id);
        return deleteDoc(groupDoc);
    };

    getAllGroupsByGroupId = (gid) => {
        return getDocs(groupCollectionRef);
    };

    getGroup = (id) => {
        const groupDoc = doc(db, 'groups', id);
        return getDoc(groupDoc);
    };

    getGroupListByCurrentUserId = (uid) => {
        const q = query(collection(db, 'groups'), where('memberIds', 'array-contains', uid));
        return getDocs(q);
    };

    // addGroup = (title, description, uid, memberList) => {
    //     return addDoc(groupCollectionRef, {
    //         title: title,
    //         description: description,
    //         createdBy: uid,
    //         createdDate: Timestamp.fromDate(new Date()),
    //         membersObject: memberList,
    //         memberIds: memberList.map((a) => a.uid),
    //         totalGroupExpense: 0
    //     });
    // };
}

export default new GroupDataService();
