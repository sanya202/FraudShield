const express = require("express");
const cors = require("cors");
const protect = require("./middleware/authMiddleware");

const transactionRoutes = require("./routes/transactionRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());

// Parses JSON from incoming requests
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FraudShield API Running 🚀");
});

// Authentication Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route",
    user: req.user,
  });
});

module.exports = app;