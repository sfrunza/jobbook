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
import FindJob from 'pages/FindJob';
import Trucks from 'pages/Trucks';
import TotalHours from 'pages/TotalHours';
import TruckImages from 'pages/TruckImages';
// import Articles from 'pages/Articles/Articles';
import OnTheJob from 'pages/OnTheJob/OnTheJob';
import Lesson from 'pages/Lesson/Lesson';
import Settings from 'pages/Settings';
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
        {/* <Route path="/articles" element={<Articles />} /> */}
        <Route path="/on-the-job" element={<OnTheJob />} />
        <Route path="/on-the-job/:slug" element={<Lesson />} />
        {(user?.admin || user?.role_names.includes('driver')) && (
          <Route path="/truck-photos" element={<TruckImages />} />
        )}
        {user?.admin && (
          <>
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/:id/general" element={<General />} />
            <Route path="/employees/:id/jobs" element={<UserJobs />} />
            <Route path="/find-job" element={<FindJob />} />
            <Route path="/trucks" element={<Trucks />} />
            <Route path="/total-hours" element={<TotalHours />} />
            <Route path="/settings" element={<Settings />} />
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
