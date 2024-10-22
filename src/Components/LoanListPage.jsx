import React, { useEffect, useState } from 'react';

export default function LoanList() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    // Fetch user's loans from API here
    const fetchLoans = async () => {
      // Replace with actual API call
      const response = [
        { id: 1, amount: 10000, term: 3, status: 'Pending' },
        { id: 2, amount: 5000, term: 2, status: 'Approved' },
      ];
      setLoans(response);
    };
    fetchLoans();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">My Loans</h1>
      <div className="space-y-4">
        {loans.length === 0 ? (
          <p>No loans found</p>
        ) : (
          loans.map((loan) => (
            <div key={loan.id} className="p-4 border rounded-md">
              <p><strong>Loan Amount:</strong> {loan.amount}</p>
              <p><strong>Term:</strong> {loan.term} weeks</p>
              <p><strong>Status:</strong> {loan.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
