import { db } from '../firebase';

import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

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
}

export default new ExpenseDataService();
