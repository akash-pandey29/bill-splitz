import { db } from '../firebase';

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, runTransaction, updateDoc, where } from 'firebase/firestore';

const groupCollectionRef = collection(db, 'groups');

class GroupDataService {
    createUpdatedGroupObject = (currentGroup, expenseAmount, contributers, splitAmount, paidBy) => {
        let newMembersObj = currentGroup.membersObject.map((m) => {
            if (contributers.includes(m.uid) || m.uid === paidBy)
                return { ...m, userExpense: Number(Number(m.userExpense) + Number(splitAmount)) };
            else return m;
        });

        let updatedGroupObject = {
            ...currentGroup,
            totalGroupExpense: Number(Number(currentGroup.totalGroupExpense) + Number(expenseAmount)),
            membersObject: newMembersObj
        };
        return updatedGroupObject;
    };

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

    deleteGroupTransaction = async (groupId) => {
        const groupDocRef = doc(db, 'groups', groupId);

        try {
            await runTransaction(db, async (transaction) => {
                const groupDoc = await transaction.get(groupDocRef);
                if (!groupDoc.exists()) {
                    throw 'Group does not exist!';
                }
                await transaction.delete(groupDocRef);
                //console.log('Trasaction 1--Group Deleted Successfully');

                const expenseCollectionRef = collection(db, 'expenses');
                const queryexpenseByGroupId = query(expenseCollectionRef, where('groupId', '==', groupId));
                const expenseList = await getDocs(queryexpenseByGroupId);
                expenseList.forEach(async (expense) => {
                    const expenseDoc = doc(db, 'expenses', expense.id);
                    await transaction.delete(expenseDoc);
                });
                //console.log('Trasaction 2--Expenses Deleted Successfully');

                const balanceLogCollectionRef = collection(db, 'balanceLogs');
                const queryBalanceLogByGroupId = query(balanceLogCollectionRef, where('groupId', '==', groupId));
                const balanceLogList = await getDocs(queryBalanceLogByGroupId);
                balanceLogList.forEach(async (balanceLog) => {
                    const balanceLogDoc = doc(db, 'balanceLogs', balanceLog.id);
                    await transaction.delete(balanceLogDoc);
                });
                //console.log('Trasaction 3--Balance Logs Deleted Successfully');
            });
            //console.log('All Transactions Completed Successfully');
        } catch (e) {
            console.error(e);
        }
    };

    updateGroupMemberList = async (groupId, newMemberList) => {
        const groupDocRef = doc(db, 'groups', groupId);
        try {
            await runTransaction(db, async (transaction) => {
                const groupDoc = await transaction.get(groupDocRef);
                if (!groupDoc.exists()) {
                    throw 'Group does not exist!';
                }
                const newGroupMembersObject = newMemberList.map((u) => ({ uid: u, userExpense: 0 }));
                const existingGroupObject = groupDoc.data();
                const updatedGroupObject = {
                    ...existingGroupObject,
                    memberIds: [...existingGroupObject.memberIds, ...newMemberList],
                    membersObject: [...existingGroupObject.membersObject, ...newGroupMembersObject]
                };
                await transaction.update(groupDocRef, updatedGroupObject);
                //console.log('New Members added to the group');
            });
        } catch (e) {
            console.error(e.message);
        }
    };
}

export default new GroupDataService();
