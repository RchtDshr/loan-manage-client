import React, { useState } from 'react';
import axios from 'axios';

const LoanApplication = () => {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [startDate, setStartDate] = useState('');

  const submitLoanApplication = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post('http://localhost:5000/loan', { amount, term, startDate }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status == '200'){

          alert('Loan application submitted!');
      } 
    } catch (error) {
      alert('Error submitting loan application');
    }
  };

  return (
    <div className="max-w-md mx-auto box">
      <h2 className="text-xl font-bold mb-4">Loan Application</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Amount</label>
        <input type="number" className="mt-1 block w-full" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Term (weeks)</label>
        <input type="number" className="mt-1 block w-full" value={term} onChange={e => setTerm(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Start Date</label>
        <input type="date" className="mt-1 block w-full" value={startDate} onChange={e => setStartDate(e.target.value)} />
      </div>
      <button className="bg-primary text-white px-4 py-2 rounded" onClick={submitLoanApplication}>Submit</button>
    </div>
  );
};

export default LoanApplication;
