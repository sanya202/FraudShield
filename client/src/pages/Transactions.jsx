import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

function Transactions() {
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

  return (
    <Layout>
      <div className="text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Transactions</h1>

        <div className="bg-gray-900 rounded-xl p-6">
          {transactions.map((t) => (
            <div
              key={t._id}
              className="
                    border-b
                    border-gray-800
                    py-4
                    flex
                    justify-between
                    "
            >
              <div>
                <h3 className="font-semibold">{t.merchantName}</h3>

                <p className="text-gray-400">{t.transactionType}</p>
              </div>

              <div>
                <p>₹{t.amount}</p>

                <span
                  className={
                    t.prediction === "Fraud" ? "text-red-400" : "text-green-400"
                  }
                >
                  {t.prediction}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Transactions;
