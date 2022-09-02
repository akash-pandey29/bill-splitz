import { addDoc, collection, doc, getDoc, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { createContext, useContext, useState } from 'react';
import { db } from '../firebase';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [userDetail, setUserDetail] = useState({});
    const [userList, setUserList] = useState([]);

    const getAllUsers = async () => {
        const q = query(collection(db, 'users'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let tempUserDetail = { uid: doc.id, ...doc.data() };
            setUserList((prev) => [...prev, tempUserDetail]);
            //console.log(doc.id, ' => ', doc.data());
        });
    };

    const getUserDetailsById = async (uid) => {
        if (uid) {
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
        }
    };

    return (
        <AppContext.Provider
            value={{
                userDetail,
                getUserDetailsById,
                userList,
                getAllUsers
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const AppData = () => {
    return useContext(AppContext);
};
