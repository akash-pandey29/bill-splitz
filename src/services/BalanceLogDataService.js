import { db } from '../firebase';

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, Timestamp, where, writeBatch } from 'firebase/firestore';

const balanceLogCollectionRef = collection(db, 'balanceLogs');

class BalanceLogDataService {
    getNewBalanceLogObjectList = (lender, borrowerList, amount, groupId, expenseId) => {
        const newBalanceLogs = borrowerList.map((borrower) => {
            return {
                groupId: groupId,
                expenseId: expenseId,
                lender: lender,
                borrower: borrower,
                amount: Number(amount),
                createdDate: Timestamp.fromDate(new Date())
            };
        });
        return newBalanceLogs;
    };

    addBalanceLog = (newBalanceLog) => {
        return addDoc(balanceLogCollectionRef, newBalanceLog);
    };

    deleteBalanceLog = (id) => {
        const balanceLogDoc = doc(db, 'balanceLogs', id);
        return deleteDoc(balanceLogDoc);
    };

    getAllBalanceLogsByGroupId = (gid) => {
        const q = query(balanceLogCollectionRef, where('groupId', '==', gid));
        return getDocs(q);
    };
    getAllLenderBalanceLogsByUserId = (uid) => {
        const qLender = query(balanceLogCollectionRef, where('lender', '==', uid));
        return getDocs(qLender);
    };
    getAllBorrowerBalanceLogsByUserId = async (uid) => {
        const qBorrower = query(balanceLogCollectionRef, where('expenseId', '==', ''), where('borrower', '==', uid));
        return getDocs(qBorrower);
    };

    getBalanceLog = (id) => {
        const balanceLogDoc = doc(db, 'balanceLogs', id);
        return getDoc(balanceLogDoc);
    };

    addBatchBalanceLog = (newBalanceLogsList) => {
        const batch = writeBatch(db);

        newBalanceLogsList.forEach((balanceLog) => {
            let newBalanceLogRef = doc(balanceLogCollectionRef);
            batch.set(newBalanceLogRef, balanceLog);
        });
        // Commit the batch
        batch.commit();
    };
}

export default new BalanceLogDataService();
