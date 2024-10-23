import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/loans', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        setLoans(response.data);
      } catch (err) {
        setError('Failed to fetch loans');
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-5 box">
      <h1 className="text-2xl font-semibold mb-4">All Loan Requests</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">User</th>
            <th className="border border-gray-300 p-2">Loan Amount</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Date Applied</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{loan.user.name} ({loan.user.email})</td>
              <td className="border border-gray-300 p-2">{loan.amount}</td>
              <td className="border border-gray-300 p-2">{loan.status}</td>
              <td className="border border-gray-300 p-2">{new Date(loan.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLoans;
