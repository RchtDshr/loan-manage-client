import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoanListPage = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/loans', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLoans(response.data.loans);
    };
    fetchLoans();
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Loans</h2>
      {loans.map(loan => (
        <div key={loan._id} className="border-t border-gray-200 py-4">
          <p><strong>Amount:</strong> ${loan.amount}</p>
          <p><strong>Status:</strong> {loan.status}</p>
          <p><strong>Repayments:</strong></p>
          <ul className="ml-4">
            {loan.repayments.map(repayment => (
              <li key={repayment._id}>
                {new Date(repayment.dueDate).toLocaleDateString()}: ${repayment.amount} - {repayment.status}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default LoanListPage;
