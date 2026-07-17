function TransactionTable({ transactions }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Recent Transactions</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              <th className="p-3">Merchant</th>

              <th className="p-3">Amount</th>

              <th className="p-3">Type</th>

              <th className="p-3">Status</th>

              <th className="p-3">Risk</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr
                key={t._id}
                className="border-b border-gray-800 hover:bg-gray-800"
              >
                <td className="p-3">{t.merchantName}</td>

                <td className="p-3">₹{t.amount}</td>

                <td className="p-3">{t.transactionType}</td>

                <td className="p-3">
                  <span
                    className={`
px-3 py-1 rounded-full text-sm

${
  t.prediction === "Fraud"
    ? "bg-red-500/20 text-red-400"
    : "bg-green-500/20 text-green-400"
}

`}
                  >
                    {t.prediction}
                  </span>
                </td>

                <td className="p-3">
                  {(t.fraudProbability * 100).toFixed(0)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
