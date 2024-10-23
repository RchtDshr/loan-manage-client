import axios from 'axios';
import { LayoutDashboard, LayoutDashboardIcon, LogOut, Megaphone, Wallet2 } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/signin');
  };

  return (
    <div className='text-white z-100 bg-primary h-full w-[20vw] gap-4 fixed text-wrap md:p-7 p-5 flex flex-col justify-between items-start'>
      <h1 className="welcome text-wrap text-3xl font-bold break-words">
        Welcome!
      </h1>
      <div className='flex flex-col justify-between items-start h-full'>


        <div className="route text-md flex flex-col gap-6 items-start justify-center">
          <Link to='/loan-application' className='flex gap-3 items-start justify-center'>
            <LayoutDashboardIcon /> Loan Application
          </Link>

          <Link to='/view-loan' className='flex gap-3 items-start justify-center'>
            <Megaphone /> View Loans
          </Link>
          <Link to='/repayment' className='flex gap-3 items-start justify-center'>
            <Wallet2 /> Repayments
          </Link>

        </div>
        <div className="logout">
          <div>
            <button onClick={handleLogout} className="flex gap-3 items-start justify-center">
              <LogOut /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
