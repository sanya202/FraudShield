const Transaction = require("../models/Transaction");
const axios = require("axios");
//POST TRANSACTION
const createTransaction = async (req, res) => {
  try {
    const {
      amount,
      merchantName,
      transactionType,
      paymentMethod,
      deviceType,
      location,
      currency,
    } = req.body;

    //CONNECT TO ML MODEL
    const mlResponse = await axios.post(
  "http://127.0.0.1:8000/predict",
  {
    amount,

    merchantName: 4,

    transactionType:
      transactionType === "Purchase" ? 1 :
      transactionType === "Transfer" ? 2 :
      transactionType === "Deposit" ? 0 : 3,

    paymentMethod:
      paymentMethod === "Debit Card" ? 1 :
      paymentMethod === "Credit Card" ? 0 :
      paymentMethod === "Wallet" ? 4 :
      paymentMethod === "UPI" ? 3 : 2,

    deviceType:
      deviceType === "Mobile" ? 1 :
      deviceType === "Tablet" ? 2 : 0,

    location: 1,
    currency: 0,

    hourOfDay: new Date().getHours(),
    isWeekend: [0,6].includes(new Date().getDay()) ? 1 : 0
  }
);

    const { prediction, fraudProbability } = mlResponse.data;

    //REST OF THE CODE

    //POST TRANSACTION CONTINUED
    const transaction = await Transaction.create({
      amount,
      merchantName,
      transactionType,
      paymentMethod,
      deviceType,
      location,
      currency,

      prediction,
      fraudProbability,

      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//GET ALL TRANSACTIONS
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//GET ONE TRANSACTION
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//DELETE ONE TRANSACTION
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  deleteTransaction,
};
