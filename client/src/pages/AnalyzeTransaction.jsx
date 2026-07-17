import { useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

function AnalyzeTransaction() {
  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    amount: "",
    merchantName: "Amazon India",
    transactionType: "Transfer",
    paymentMethod: "Credit Card",
    deviceType: "Desktop",
    location: "Delhi",
    currency: "INR",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/transactions", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setResult(res.data.transaction);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Analyze Transaction</h1>

        <div
          className="bg-gray-900 rounded-xl p-8 max-w-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="amount"
              placeholder="Amount"
              className="w-full bg-gray-800 p-3 rounded"
              onChange={handleChange}
            />

            <input
              name="merchantName"
              placeholder="Merchant"
              className="w-full bg-gray-800 p-3 rounded"
              onChange={handleChange}
            />

            <select
              name="transactionType"
              className="w-full bg-gray-800 p-3 rounded"
              onChange={handleChange}
            >
              <option>Transfer</option>
              <option>Purchase</option>
              <option>Deposit</option>
              <option>Withdrawal</option>
            </select>

            <select
              name="paymentMethod"
              className="w-full bg-gray-800 p-3 rounded"
              onChange={handleChange}
            >
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>UPI</option>
              <option>Wallet</option>
            </select>

            <select
              name="deviceType"
              className="w-full bg-gray-800 p-3 rounded"
              onChange={handleChange}
            >
              <option>Desktop</option>
              <option>Mobile</option>
              <option>Tablet</option>
            </select>

            <button
              className="bg-blue-600 px-6 py-3 rounded-lg font-semibold"
            >
              Analyze Fraud
            </button>
          </form>
        </div>

        {result && (
          <div
            className="mt-8 bg-gray-900 p-6 rounded-xl"
          >
            <h2 className="text-xl font-bold">Prediction Result</h2>

            <p className="mt-3">Prediction: {result.prediction}</p>

            <p>Risk: {(result.fraudProbability * 100).toFixed(2)}%</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default AnalyzeTransaction;
