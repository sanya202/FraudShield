const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());

// Parses JSON from incoming requests
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FraudShield API Running 🚀");
});

// Authentication Routes
app.use("/api/auth", authRoutes);

module.exports = app;