import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 p-6 text-white">
      <h1 className="text-2xl font-bold mb-10">🛡 FraudShield</h1>

      <nav className="space-y-4">
        <Link to="/dashboard" className="block text-gray-300 hover:text-white">
          Dashboard
        </Link>

        <Link
          to="/analyze"
          className="block text-gray-300 hover:text-white"
        >
          Analyze Transaction
        </Link>

        <Link
          to="/transactions"
          className="block text-gray-300 hover:text-white"
        >
          Transactions
        </Link>

        <Link to="/analytics" className="block text-gray-300 hover:text-white">
          Analytics
        </Link>

        <Link to="/settings" className="block text-gray-300 hover:text-white">
          Settings
        </Link>
      </nav>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        className="mt-10 text-red-400 hover:text-red-300"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
