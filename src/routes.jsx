import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/UserContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import SignUpPage from './pages/SignupPage.jsx';
import Sidebar from './components/Sidebar.jsx';
import HeaderBar from './components/HeaderBar.jsx';
import AddTransaction from './pages/AddTransaction.jsx';

import TransactionSuccess from './pages/TransactionSuccess.jsx';
import AddTransactionFailed from './pages/TransactionFailed.jsx';
import AllTransactions from './pages/AllTransactions.jsx';
import BudgetPage from './pages/Budget.jsx';
import ReportPage from './pages/ReportPage.jsx';
import HelpPage from './pages/HelpPage.jsx';

const AppRouter = () => {
    const { user, authInitialized } = useContext(UserContext);
    const firstName = user?.displayName?.split(" ")[0];

    if (!authInitialized) {
        return (
            <h1 className='flex items-center justify-center h-screen text-gray-600'>
                Loading...
            </h1>
        );
    }

    // Define routes
    const routes = [
        { path: '/', element: <Dashboard />, protected: true },
        { path: '/login', element: <LoginPage /> },
        { path: '/signup', element: <SignUpPage /> },
        { path: '/forgot-password', element: <ForgotPassword /> },
        { path: '/transactions', element: <AllTransactions />, protected: true },
        { path: '/transactions/add', element: <AddTransaction />, protected: true },
        { path: '/transactions/success', element: <TransactionSuccess />, protected: true },
        { path: '/transactions/failed', element: <AddTransactionFailed />, protected: true },
        { path: '/budget', element: <BudgetPage />, protected: true },
        { path: '/reports', element: <ReportPage />, protected: true },
        { path: '/help', element: <HelpPage />, protected: true },
    ];

    return (
        <Router>
            {/* Show header/sidebar only if user exists */}
            {user && (
                <>
                    <HeaderBar user={user} />
                    <Sidebar firstName={firstName} />
                </>
            )}

            <Routes>
                {routes.map(({ path, element, protected: isProtected }) => {
                    const isAuthPage =
                        path === '/login' || path === '/signup' || path === '/forgot-password';

                    // Redirect protected routes to login if user is not created/logged in
                    if (isProtected && !user) {
                        return <Route key={path} path={path} element={<Navigate to="/login" />} />;
                    }
                    else if (!isProtected && user) {
                        return <Route key={path} path={path} element={<Navigate to="/" />} />;
                    }

                    // Apply margin for non-auth pages
                    const WrappedElement = (
                        <div className={!isAuthPage ? 'ml-64 pt-20 bg-gray-50' : ''}>{element}</div>
                    );

                    return <Route key={path} path={path} element={WrappedElement} />;
                })}
            </Routes>
        </Router>
    );
};

export default AppRouter;
