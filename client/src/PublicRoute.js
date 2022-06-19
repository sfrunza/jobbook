import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'store';

export default function PublicRoute() {
  let location = useLocation();

  const { user } = useSelector((state) => state.auth);
  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
}
