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

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/signin" replace />;
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
