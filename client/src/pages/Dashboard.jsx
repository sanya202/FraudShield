import { useEffect, useState } from "react";
import API from "../api/axios";
import StatCard from "../components/StatCard";
import FraudChart from "../components/FraudChart";
import TransactionTable from "../components/TransactionTable";
import Layout from "../components/Layout";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTransactions(res.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  //ADDING CALCULATED VALUES
  const fraudCount = transactions.filter(
    (t) => t.prediction === "Fraud",
  ).length;

  const safeCount = transactions.filter((t) => t.prediction === "Safe").length;

  const fraudRate =
    transactions.length === 0
      ? 0
      : ((fraudCount / transactions.length) * 100).toFixed(2);

  const averageRisk =
    transactions.length === 0
      ? 0
      : (
          (transactions.reduce((sum, t) => sum + t.fraudProbability, 0) /
            transactions.length) *
          100
        ).toFixed(2);

  //RETURN FUNCTION

  return (
    <Layout>
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold">🛡 FraudShield</h1>

        <p className="text-gray-400 mt-2">
          AI Powered Fraud Detection Dashboard
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Transactions" value={transactions.length} />

        <StatCard title="Fraud Detected" value={fraudCount} />

        <StatCard title="Safe Transactions" value={safeCount} />

        <StatCard title="Risk Score" value={`${averageRisk}%`} />
      </div>

      {/* Chart */}

      <div className="bg-gray-900 rounded-xl p-6 mb-8">
        <FraudChart fraudCount={fraudCount} safeCount={safeCount} />
      </div>

      {/* Table */}

      <div className="bg-gray-900 rounded-xl p-6">
        <TransactionTable transactions={transactions} />
      </div>
    </div>
    </Layout>
  );
}

export default Dashboard;
