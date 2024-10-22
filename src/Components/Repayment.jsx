import React, { useState } from 'react';

export default function Repayment() {
  const [formData, setFormData] = useState({
    loanId: '',
    amount: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to submit repayment here
    console.log(formData);
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Submit Repayment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Loan ID</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formData.loanId}
            onChange={(e) => setFormData({ ...formData, loanId: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Repayment Amount</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit Repayment
        </button>
      </form>
    </div>
  );
}
