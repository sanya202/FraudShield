import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Login failed");
    }
  };

  return (
    <div
      className="
min-h-screen
bg-gray-950
flex
items-center
justify-center
text-white
"
    >
      <div
        className="
bg-gray-900
p-8
rounded-2xl
w-96
border
border-gray-800
shadow-xl
"
      >
        <h1
          className="
text-3xl
font-bold
text-center
mb-2
"
        >
          🛡 FraudShield
        </h1>

        <p
          className="
text-gray-400
text-center
mb-8
"
        >
          AI Fraud Detection Platform
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="
w-full
bg-gray-800
p-3
rounded-lg
outline-none
"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="
w-full
bg-gray-800
p-3
rounded-lg
outline-none
"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="
w-full
bg-blue-600
hover:bg-blue-700
p-3
rounded-lg
font-semibold
transition
"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
