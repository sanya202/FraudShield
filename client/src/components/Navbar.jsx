function Navbar() {
  const user = localStorage.getItem("user");

  return (
    <div
      className="h-16bg-gray-900border-b
border-gray-800
flex
items-center
justify-between
px-8
text-white
"
    >
      <div>
        <h2 className="font-semibold">Fraud Detection System</h2>

        <p
          className="
text-xs
text-green-400
"
        >
          🟢 ML Engine Active
        </p>
      </div>

      <div className="text-gray-300">{user || "User"}</div>
    </div>
  );
}

export default Navbar;
