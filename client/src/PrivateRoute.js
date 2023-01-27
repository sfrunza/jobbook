import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'store';
import Spinner from 'components/Spinner';

export default function PrivateRoute() {
  let location = useLocation();

  const { user, isVerifying } = useSelector((state) => state.auth);
  // if (!user) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // } else {
  //   return <Outlet />;
  // }

  if (isVerifying) {
    return <Spinner />;
  } else if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
}
