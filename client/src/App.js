import { Routes, Route, Navigate, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Jobs from 'pages/Jobs';
import Employees from 'pages/Employees';
import ForgotPassword from './ForgotPassword';
import NewPassword from './NewPassword';
import General from 'pages/Employee/General';
import UserJobs from 'pages/Employee/Jobs';
import { useSelector } from 'store';

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Jobs />} />
        {user?.admin && (
          <>
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/:id/general" element={<General />} />
            <Route path="/employees/:id/jobs" element={<UserJobs />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/login" />} />
      </Route>
      {/* catch all */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
