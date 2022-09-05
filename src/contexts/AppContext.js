import { addDoc, collection, doc, getDoc, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { createContext, useContext, useState } from 'react';
import { db } from '../firebase';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [userDetail, setUserDetail] = useState({});
    const [userList, setUserList] = useState([]);
    const [pageLoader, setPageLoader] = useState(0);
    const [snackBarAlertObject, setSnackBarAlertObject] = useState({
        open: false,
        severity: '',
        alertMessage: ''
    });

    const getAllUsers = async () => {
        setPageLoader((prev) => prev + 1);
        const q = query(collection(db, 'users'));
        const querySnapshot = await getDocs(q);
        setUserList(querySnapshot.docs.map((doc) => ({ ...doc.data(), uid: doc.id })));
        setPageLoader((prev) => prev - 1);
    };

    const getUserDetailsById = async (uid) => {
        if (uid) {
            setPageLoader((prev) => prev + 1);
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let tempUserDetail = { uid: uid, ...docSnap.data() };
                setUserDetail(tempUserDetail);
                //console.log('Document data:', tempUserDetail);
            } else {
                // doc.data() will be undefined in this case
                console.log('No such document!');
            }
            setPageLoader((prev) => prev - 1);
        }
    };

    return (
        <AppContext.Provider
            value={{
                userDetail,
                getUserDetailsById,
                userList,
                getAllUsers,
                pageLoader,
                setPageLoader,
                snackBarAlertObject,
                setSnackBarAlertObject
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const AppData = () => {
    return useContext(AppContext);
};
