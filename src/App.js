import Home from 'pages/Home';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import UserDashboard from 'pages/UserDashboard';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { UserAuth } from 'contexts/AuthContext';
import { AppData } from 'contexts/AppContext';
import { useEffect } from 'react';
import ExpenseList from 'components/ExpenseList';
import GroupList from 'components/GroupList';
import CssBaseline from '@mui/material/CssBaseline';
import { Loader } from 'components/Loader';

function App() {
    const { user } = UserAuth();
    const { userDetail, getUserDetailsById, getAllUsers, pageLoader } = AppData();

    function loadInitialData(uid) {
        getUserDetailsById(uid);
        getAllUsers();
    }

    //load all Initial Data
    useEffect(() => {
        console.log('logging user Value');
        console.log(user);
        if (user && user.uid) {
            loadInitialData(user.uid);
        }
    }, [user]);

    return (
        <div className="App">
            {pageLoader && <Loader />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/userDashboard"
                    element={
                        <ProtectedRoute>
                            <UserDashboard />
                        </ProtectedRoute>
                    }
                >
                    <Route path="" element={<GroupList />} />
                    <Route path="expense/:id" element={<ExpenseList />} />
                    <Route path="*" element={<GroupList />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
