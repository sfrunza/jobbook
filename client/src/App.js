import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import { verifyAuth } from './slices/auth';
import { useDispatch } from 'store';
import { useSelector } from './store/index';
import Jobs from 'pages/Jobs';
import Employees from 'pages/Employees';
import Employee from 'pages/Employee';
import Spinner from './components/Spinner';
import { Box } from '@mui/material';
import ForgotPassword from './ForgotPassword';
import NewPassword from './NewPassword';

function App() {
  const dispatch = useDispatch();
  const [action, setAction] = useState(true);
  const { user, isAuthenticated, isVerifying } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(verifyAuth());
    setTimeout(() => {
      setAction(false);
    }, 600);
  }, [dispatch, JSON.stringify(user)]);

  if (action)
    return (
      <Box sx={{ '&> div': { height: '60vh' } }}>
        <Spinner />
      </Box>
    );

  return (
    <Routes>
      {user ? (
        <Route path="*" element={<Navigate to="/" />} />
      ) : (
        <Route path="/login" element={<LoginPage />} />
      )}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/new_password" element={<NewPassword />} />
      <Route element={<PrivateRoute user={user} />}>
        <Route path="/" element={<Jobs />} />
        {user?.admin && (
          <>
            <Route path="dashboard/employees" element={<Employees />} />
            <Route path="dashboard/employees/:id" element={<Employee />} />
          </>
        )}
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
