import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function Analytics() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  const fraud = transactions.filter((t) => t.prediction === "Fraud").length;

  const safe = transactions.filter((t) => t.prediction === "Safe").length;

  const data = [
    {
      name: "Fraud",
      value: fraud,
    },

    {
      name: "Safe",
      value: safe,
    },
  ];

  return (
    <Layout>
      <div className="text-white p-8">
        <h1 className="text-3xl font-bold mb-8">Analytics</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-gray-400">Total Transactions</h2>

            <p className="text-4xl font-bold mt-3">{transactions.length}</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-gray-400">Fraud Cases</h2>

            <p className="text-4xl font-bold text-red-400 mt-3">{fraud}</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-gray-400">Safe Cases</h2>

            <p className="text-4xl font-bold text-green-400 mt-3">{safe}</p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mt-8">
          <h2 className="text-xl font-bold mb-5">Fraud Distribution</h2>

          <PieChart width={400} height={300}>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </div>
      </div>
    </Layout>
  );
}

export default Analytics;
