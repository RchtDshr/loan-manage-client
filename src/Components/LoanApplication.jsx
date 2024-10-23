import React, { useState } from 'react';
import axios from 'axios';

const LoanApplication = () => {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [startDate, setStartDate] = useState('');

  const submitLoanApplication = async () => {
    if (amount === '' || term === '' || startDate === '')
      return alert('All fields are required');
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
        <input type="number" min="0" className="mt-1 block py-1 bg-green-200 pl-1 border rounded-md w-full" placeholder='Total amount of loan in Rs' value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Term (weeks)</label>
        <input type="number" min="1" className="mt-1 block py-1 bg-green-200 pl-1 border rounded-md w-full" placeholder='Term in weeks' value={term} onChange={e => setTerm(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Start Date</label>
        <input type="date" className="mt-1 block py-1 bg-green-200 pl-1 border rounded-md w-full" min={new Date().toISOString().split('T')[0]} value={startDate} onChange={e => setStartDate(e.target.value)} />
      </div>
      <button className="btn text-white px-4 py-2 rounded" onClick={submitLoanApplication}>Submit</button>
    </div>
  );
};

export default LoanApplication;
