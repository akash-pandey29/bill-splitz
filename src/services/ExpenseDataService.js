import { db } from '../firebase';

import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where, runTransaction } from 'firebase/firestore';
import GroupDataService from './GroupDataService';
import BalanceLogDataService from './BalanceLogDataService';

const expenseCollectionRef = collection(db, 'expenses');

class ExpenseDataService {
    addExpense = (newExpense) => {
        return addDoc(expenseCollectionRef, newExpense);
    };

    updateBook = (id, updatedExpense) => {
        const expenseDoc = doc(db, 'expenses', id);
        return updateDoc(expenseDoc, updatedExpense);
    };

    deleteExpense = (id) => {
        const expenseDoc = doc(db, 'expenses', id);
        return deleteDoc(expenseDoc);
    };

    getAllExpensesByGroupId = (gid) => {
        const q = query(expenseCollectionRef, where('groupId', '==', gid));
        return getDocs(q);
    };

    getExpense = (id) => {
        const expenseDoc = doc(db, 'expense', id);
        return getDoc(expenseDoc);
    };

    addExpenseTransaction = async (newExpense, groupId, contributers) => {
        const groupDocRef = doc(db, 'groups', groupId);

        try {
            await runTransaction(db, async (transaction) => {
                const groupDoc = await transaction.get(groupDocRef);
                if (!groupDoc.exists()) {
                    throw 'Group does not exist!';
                }
                let newExpenseDocRef = doc(expenseCollectionRef);
                const addExpenseResponse = await transaction.set(newExpenseDocRef, newExpense);
                console.log('Trasaction 1--Expense Added Successfully');
                const newGroupObject = GroupDataService.createUpdatedGroupObject(
                    groupDoc.data(),
                    newExpense.amount,
                    contributers,
                    newExpense.splitAmount,
                    newExpense.paidBy
                );
                await transaction.update(groupDocRef, newGroupObject);
                console.log('Trasaction 2--Group Updated Successfully');

                const newBalanceLogs = BalanceLogDataService.getNewBalanceLogObjectList(
                    newExpense.paidBy,
                    contributers,
                    newExpense.splitAmount,
                    groupId,
                    newExpenseDocRef.id
                );
                const balanceLogCollectionRef = collection(db, 'balanceLogs');
                newBalanceLogs.forEach(async (balanceLog) => {
                    let newBalanceLogRef = doc(balanceLogCollectionRef);
                    await transaction.set(newBalanceLogRef, balanceLog);
                });
                console.log('Trasaction 3--Balance Logs Added Successfully');
            });
            console.log('All Transactions Completed Successfully');
        } catch (e) {
            console.error(e);
        }
    };

    deleteExpenseTransaction = async (deleteExpenseObj) => {
        const groupDocRef = doc(db, 'groups', deleteExpenseObj.groupId);

        try {
            const addExpenseResponse = await runTransaction(db, async (transaction) => {
                const groupDoc = await transaction.get(groupDocRef);
                if (!groupDoc.exists()) {
                    throw 'Group does not exist!';
                }
                const expenseDoc = doc(db, 'expenses', deleteExpenseObj.eid);
                await transaction.delete(expenseDoc);
                console.log('Trasaction 1--Expense Deleted Successfully');
                const newGroupObject = GroupDataService.createUpdatedGroupObject(
                    groupDoc.data(),
                    -deleteExpenseObj.amount,
                    deleteExpenseObj.contributers.map((c) => c.contributerId),
                    -deleteExpenseObj.splitAmount,
                    deleteExpenseObj.paidBy
                );
                await transaction.update(groupDocRef, newGroupObject);
                console.log('Trasaction 2--Group Updated Successfully');

                const balanceLogCollectionRef = collection(db, 'balanceLogs');
                const queryBalanceLogByExpenseId = query(balanceLogCollectionRef, where('expenseId', '==', deleteExpenseObj.eid));
                const balanceLogList = await getDocs(queryBalanceLogByExpenseId);
                balanceLogList.forEach(async (balanceLog) => {
                    const balanceLogDoc = doc(db, 'balanceLogs', balanceLog.id);
                    await transaction.delete(balanceLogDoc);
                });
                console.log('Trasaction 3--Balance Logs Deleted Successfully');
            });
            console.log('All Transactions Completed Successfully');
        } catch (e) {
            console.error(e);
        }
    };
}

export default new ExpenseDataService();
