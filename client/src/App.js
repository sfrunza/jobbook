import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Jobs from 'pages/Jobs';
import Employees from 'pages/Employees';
import Employee from 'pages/Employee';
import ForgotPassword from './ForgotPassword';
import NewPassword from './NewPassword';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new_password" element={<NewPassword />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Jobs />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<Employee />} />
        </Route>
      </Route>
      {/* catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
