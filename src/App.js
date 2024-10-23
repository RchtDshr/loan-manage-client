import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './Pages/SignUp';
import DashboardLayout from './Layout/DashboardLayout';
import { setAuthToken } from './utils/authUtils';
import Signin from './Pages/SignIn';
import LoanApplication from './Components/LoanApplication';
import LoanList from './Components/LoanListPage';
import Repayment from './Components/Repayment';
import AdminLoans from './Pages/AdminView';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

// AdminRoute component to protect admin routes
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = JSON.parse(atob(token.split('.')[1])).role; // Decode JWT to get user role (assuming you use JWT)

  console.log(userRole)
  if (!token || userRole !== 'admin') {
    return <Navigate to="/loan-application" replace />; // Redirect to loan application if not admin
  }
  return children;
};

function App() {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Protected Routes */}
        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/loan-application" element={<LoanApplication />} />
          <Route path="/view-loan" element={<LoanList />} />
          <Route path="/repayment" element={<Repayment />} />
          <Route element={
            <AdminRoute>
              <AdminLoans />
            </AdminRoute>
          } path="/admin/loans" /> {/* Admin Loans Route */}
        </Route>

        {/* Public Routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Redirect any unknown route to SignIn if not authenticated, otherwise to loan-application */}
        <Route path="*" element={
          token ? <Navigate to="/loan-application" replace /> : <Navigate to="/signin" replace />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
