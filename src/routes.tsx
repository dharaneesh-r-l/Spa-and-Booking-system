import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import MyBookingsPage from './pages/MyBookingsPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <HomePage />
  },
  {
    name: 'Login',
    path: '/login',
    element: <LoginPage />,
    visible: false
  },
  {
    name: 'Register',
    path: '/register',
    element: <RegisterPage />,
    visible: false
  },
  {
    name: 'Admin Login',
    path: '/admin-login',
    element: <AdminLoginPage />,
    visible: false
  },
  {
    name: 'My Bookings',
    path: '/my-bookings',
    element: <MyBookingsPage />,
    visible: false
  },
  {
    name: 'Admin',
    path: '/admin',
    element: <AdminPage />,
    visible: false
  }
];

export default routes;
