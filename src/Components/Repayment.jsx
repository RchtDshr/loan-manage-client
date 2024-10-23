import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Repayment = () => {
  const [loans, setLoans] = useState([]);
  const [enteredAmounts, setEnteredAmounts] = useState({}); // Store user-entered amounts

  // Fetch loans when the component mounts
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:5000/loan'); // Ensure this is the correct endpoint
        setLoans(response.data.loans);


      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
  }, []);

  // Handle repayment logic
  const handleRepayment = async (repaymentId, repaymentAmount, enteredAmount) => {
    if (enteredAmount < repaymentAmount) {
      alert('Amount entered should not be less than the repayment amount.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/loan/repayment', { repaymentId, amount: enteredAmount });

      // Update local loan state after successful payment
      const updatedLoans = loans.map((loan) => ({
        ...loan,
        repayments: loan.repayments.map((repayment) =>
          repayment._id === repaymentId ? { ...repayment, status: 'PAID' } : repayment
      ),
    }));
    setLoans(updatedLoans);
    alert('Payment successful!');
    } catch (error) {
      console.error('Error making repayment:', error);
    }
  };

  // Handle the change of entered amounts
  const handleAmountChange = (repaymentId, value) => {
    setEnteredAmounts({ ...enteredAmounts, [repaymentId]: value });
  };

  // Determine if repayment is the closest due
  const isClosestDueRepayment = (repayments) => {
    const pendingRepayments = repayments.filter((repayment) => repayment.status === 'PENDING');
    if (pendingRepayments.length === 0) return null;

    // Get the repayment closest to the current date
    return pendingRepayments.reduce((closest, repayment) => {
      const closestDueDate = new Date(closest.dueDate).getTime();
      const currentDueDate = new Date(repayment.dueDate).getTime();
      return currentDueDate < closestDueDate ? repayment : closest;
    });
  };

  return (
    <div className="p-5 box">
      <h1 className="text-2xl font-semibold mb-4">Repayment Options</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Loan Amount</th>
            <th className="border border-gray-300 p-2">End Date</th>
            <th className="border border-gray-300 p-2">Due Amount</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Enter Amount</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => {
            const closestDueRepayment = isClosestDueRepayment(loan.repayments);

            return loan.repayments.map((repayment) => (
              <tr key={repayment._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{loan.amount}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(repayment.dueDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 p-2">{repayment.amount.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">{repayment.status}</td>
                <td className="border border-gray-300 p-2">
                  {repayment.status === 'PENDING' && repayment === closestDueRepayment && (
                    <input
                      type="number"
                      min={repayment.amount}
                      value={enteredAmounts[repayment._id] || repayment.amount}
                      onChange={(e) => handleAmountChange(repayment._id, e.target.value)}
                      className="border px-2 py-1 w-full"
                    />
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {repayment.status === 'PENDING' && repayment === closestDueRepayment && (
                    <button
                      onClick={() =>
                        handleRepayment(
                          repayment._id,
                          repayment.amount,
                          parseFloat(enteredAmounts[repayment._id] || repayment.amount)
                        )
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Repayment;
