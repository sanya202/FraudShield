function StatCard({ title, value }) {
  return (
    <div
      className="
bg-gray-900
border
border-gray-800
rounded-xl
p-6
shadow-lg
hover:border-blue-500
transition
"
    >
      <h3 className="text-gray-400">{title}</h3>

      <h1 className="text-3xl font-bold mt-3">{value}</h1>
    </div>
  );
}

export default StatCard;
