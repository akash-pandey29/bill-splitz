import { createTheme, ThemeProvider } from '@mui/material/styles';
import ExpenseList from 'components/ExpenseList';
import Footer from 'components/Footer';
import GroupList from 'components/GroupList';
import { Loader } from 'components/Loader';
import { themeConfig } from 'configs/themeConfig';
import { AppData } from 'contexts/AppContext';
import { UserAuth } from 'contexts/AuthContext';
import Home from 'pages/Home';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import SignUp from 'pages/SignUp';
import UserDashboard from 'pages/UserDashboard';
import { useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const theme = createTheme(themeConfig);
    const { user } = UserAuth();
    const { userDetail, getUserDetailsById, getAllUsers, pageLoader } = AppData();
    const navigate = useNavigate();

    function loadInitialData(uid) {
        getUserDetailsById(uid);
        getAllUsers();
    }

    //load all Initial Data
    useEffect(() => {
        console.log('logging user Value');
        console.log(user);
        if (user && user.uid) {
            //navigate('userDashboard');
            loadInitialData(user.uid);
        }
    }, [user]);

    return (
        <ThemeProvider theme={theme}>
            <div style={{ backgroundColor: '#dbe5f1', minHeight: '100vh' }}>
                {pageLoader !== 0 ? <Loader /> : ''}
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
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
            <Footer />
        </ThemeProvider>
    );
}

export default App;
