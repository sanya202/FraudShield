import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function FraudChart({ fraudCount, safeCount }) {
  const data = [
    {
      name: "Fraud",
      value: fraudCount,
    },
    {
      name: "Safe",
      value: safeCount,
    },
  ];

  return (
    <div>
      <h2>Fraud Distribution</h2>

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
  );
}

export default FraudChart;
