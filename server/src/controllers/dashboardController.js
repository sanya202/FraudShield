const Transaction = require("../models/Transaction");

const getDashboardStats = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    });

    const totalTransactions = transactions.length;

    const fraudTransactions = transactions.filter(
      (t) => t.prediction === "Fraud"
    ).length;

    const safeTransactions = transactions.filter(
      (t) => t.prediction === "Safe"
    ).length;

    const pendingTransactions = transactions.filter(
      (t) => t.prediction === "Pending"
    ).length;

    const totalAmount = transactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const averageAmount =
      totalTransactions === 0
        ? 0
        : totalAmount / totalTransactions;

    res.json({
      success: true,
      totalTransactions,
      fraudTransactions,
      safeTransactions,
      pendingTransactions,
      totalAmount,
      averageAmount,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getDashboardStats,
};