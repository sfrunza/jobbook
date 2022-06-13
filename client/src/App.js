import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import { verifyAuth } from './slices/auth';
import { useDispatch } from 'store';
import { useSelector } from './store/index';
import Jobs from 'pages/Jobs';
import Employees from 'pages/Employees';
import Employee from 'pages/Employee';

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
    }, 100);
  }, [dispatch, JSON.stringify(user)]);

  if (action) return <>loading...</>;
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute user={user} />}>
        <Route path="/" element={<Jobs />} />
        {user?.admin && (
          <>
            <Route path="dashboard/employees" element={<Employees />} />
            <Route path="dashboard/employees/:id" element={<Employee />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

export default App;
