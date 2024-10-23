import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners"; 

const Repayment = () => {
  const [loans, setLoans] = useState([]);
  const [enteredAmounts, setEnteredAmounts] = useState({}); 
  const [loading, setLoading] = useState(false); 

  // Fetch loans when the component mounts
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/loan/approved"); 
        setLoans(response.data.loans);
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };

    fetchLoans();
  }, [setLoans]);

  // Handle repayment logic
  const handleRepayment = async (
    loanId,
    repaymentId,
    repaymentAmount,
    enteredAmount
  ) => {
    if (enteredAmount < repaymentAmount) {
      alert("Amount entered should not be less than the repayment amount.");
      return;
    }

    setLoading(true); 
    try {
      await axios.post("http://localhost:5000/loan/repayment", {
        loanId,
        repaymentId,
        amount: enteredAmount,
      });

      // After successful payment, re-fetch the loan data to reflect all updates
      const response = await axios.get("http://localhost:5000/loan/approved");
      setLoans(response.data.loans); 

      alert("Payment successful!");
    } catch (error) {
      console.error("Error making repayment:", error);
    } finally {
      setLoading(false); 
    }
  };

  // Handle the change of entered amounts
  const handleAmountChange = (repaymentId, value) => {
    setEnteredAmounts({ ...enteredAmounts, [repaymentId]: value });
  };

  // Determine if repayment is the closest due
  const isClosestDueRepayment = (repayments) => {
    const pendingRepayments = repayments.filter(
      (repayment) => repayment.status === "PENDING"
    );
    if (pendingRepayments.length === 0) return null;

    // Get the repayment closest to the current date
    return pendingRepayments.reduce((closest, repayment) => {
      const closestDueDate = new Date(closest.dueDate).getTime();
      const currentDueDate = new Date(repayment.dueDate).getTime();
      return currentDueDate < closestDueDate ? repayment : closest;
    });
  };

  // Determine if repayment is the last installment
  const isLastInstallment = (repayments, repayment) => {
    const pendingRepayments = repayments.filter((rep) => rep.status === 'PENDING');
    return pendingRepayments.length === 1 && repayment.status === 'PENDING';
  };

  return (
    <div className="p-5 box">
      <h1 className="text-2xl font-semibold mb-4">Repayment Options</h1>
      {loading ? (
        <div className="flex justify-center">
          <ClipLoader color="#000" size={50} /> {/* Spinner */}
        </div>
      ) : loans.length === 0 ? (
        "Loans need to be approved to start the repayment"
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Loan Amount</th>
              <th className="border border-gray-300 p-2">End Date</th>
              <th className="border border-gray-300 p-2">Due Amount</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Amount Paid</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => {
              const closestDueRepayment = isClosestDueRepayment(loan.repayments);
              
              return loan.repayments.map((repayment) => {
                const isLast = isLastInstallment(loan.repayments, repayment);
                return (
                  <tr key={repayment._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{loan.amount}</td>
                    <td className="border border-gray-300 p-2">
                      {new Date(repayment.dueDate).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {repayment.amount.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {repayment.status}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {/* For the last installment, only allow exact payment */}
                      {(repayment.status === 'PENDING' && repayment === closestDueRepayment) ? (
                        <input
                          type="number"
                          min={repayment.amount}
                          max={isLast ? repayment.amount : undefined} // Lock max for the last installment
                          value={enteredAmounts[repayment._id] || repayment.amount.toFixed(2)}
                          onChange={(e) => handleAmountChange(repayment._id, e.target.value)}
                          className="border px-2 py-1 w-full"
                          disabled={isLast} // Disable input modification for the last installment
                        />
                      ) : repayment.amountPaid.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {repayment.status === "PENDING" &&
                        repayment === closestDueRepayment && (
                          <button
                            onClick={() =>
                              handleRepayment(
                                loan._id,
                                repayment._id,
                                repayment.amount,
                                parseFloat(
                                  enteredAmounts[repayment._id] || repayment.amount
                                )
                              )
                            }
                            className="btn text-white px-4 py-2 rounded"
                          >
                            Pay Now
                          </button>
                        )}
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Repayment;
