import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-[20vw] h-screen bg-primary text-white fixed">
      <div className="py-6 px-4 text-xl font-bold">
        Dashboard
      </div>
      <nav className="flex flex-col mt-10">
        <Link to="/loan-application" className="py-2 px-4 hover:underline">
          Loan Application
        </Link>
        <Link to="/loan-list" className="py-2 px-4 hover:underline">
          Loan List
        </Link>
        <Link to="/repayment" className="py-2 px-4 hover:underline">
          Repayment
        </Link>
      </nav>
    </div>
  );
}
