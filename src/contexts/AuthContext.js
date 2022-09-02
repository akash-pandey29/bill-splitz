import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const usersCollectionRef = collection(db, 'users');

    const createUser = async (email, password, firstName, lastName) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        return await addUserDetails(res.user.uid, email, firstName, lastName);
    };

    function addUserDetails(uid, email, firstName, lastName) {
        return setDoc(doc(db, 'users', uid), {
            firstName: firstName,
            lastName: lastName,
            email: email
        });
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
            //if (currentUser) getUserDetailsById(currentUser.uid);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return <UserContext.Provider value={{ createUser, user, logout, login }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
    return useContext(UserContext);
};
