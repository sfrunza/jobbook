import React from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Layout = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default Layout;
