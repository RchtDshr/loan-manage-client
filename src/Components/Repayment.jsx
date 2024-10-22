import React, { useState } from 'react';
import axios from 'axios';

const Repayment = () => {
  const [loanId, setLoanId] = useState('');
  const [repaymentId, setRepaymentId] = useState('');
  const [amount, setAmount] = useState('');

  const submitRepayment = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/loan/${loanId}/repayment/${repaymentId}`, { amount }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Repayment submitted successfully!');
    } catch (error) {
      alert('Error submitting repayment');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Repayment Submission</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Loan ID</label>
        <input type="text" className="mt-1 block w-full" value={loanId} onChange={e => setLoanId(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Repayment ID</label>
        <input type="text" className="mt-1 block w-full" value={repaymentId} onChange={e => setRepaymentId(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Amount</label>
        <input type="number" className="mt-1 block w-full" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={submitRepayment}>Submit</button>
    </div>
  );
};

export default Repayment;
