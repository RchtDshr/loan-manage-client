import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoanListPage = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/loan', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLoans(response.data.loans);
    };
    fetchLoans();
  }, []);

  return (
    <div className="max-w-6xl mx-auto box bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Loans</h2>
      {loans.length === 0 ? (
        <p>No loans</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Loan Amount</th>
              <th className="border border-gray-300 px-4 py-2">Approval Status</th>
              <th className="border border-gray-300 px-4 py-2">Repayment Due Date</th>
              <th className="border border-gray-300 px-4 py-2">Repayment Amount</th>
              <th className="border border-gray-300 px-4 py-2">Repayment Status</th>
              <th className="border border-gray-300 px-4 py-2">Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              loan.repayments.map((repayment, index) => (
                <tr key={`${loan._id}-${repayment._id}`} className="hover:bg-gray-100">
                  {index === 0 && (
                    <>
                      <td rowSpan={loan.repayments.length} className="border border-gray-300 px-4 py-2">
                        ${loan.amount.toFixed(2)}
                      </td>
                      <td rowSpan={loan.repayments.length} className="border border-gray-300 px-4 py-2">
                        {loan.status}
                      </td>
                    </>
                  )}
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(repayment.dueDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">${repayment.amount.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">{repayment.status}</td>
                  <td className="border border-gray-300 px-4 py-2">${repayment.amountPaid.toFixed(2)}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LoanListPage;
