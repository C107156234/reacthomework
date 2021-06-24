import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Report from 'src/pages/Report';
import CustomerList from 'src/pages/CustomerList';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';
import Order from 'src/pages/Order';
import InsertOrder from 'src/components/order/InsertOrder.js';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'Report', element: <Report /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'Order', element: <Order /> },
      { path: 'InsertOrder', element: <InsertOrder /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
