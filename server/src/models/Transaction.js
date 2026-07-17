const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },

    merchantName: {
      type: String,
      required: true,
      trim: true,
    },

    transactionType: {
      type: String,
      enum: ["Purchase", "Transfer", "Withdrawal", "Deposit"],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Debit Card", "UPI", "Net Banking", "Wallet"],
      required: true,
    },

    deviceType: {
      type: String,
      enum: ["Mobile", "Desktop", "Tablet"],
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },

    fraudProbability: {
      type: Number,
      default: 0,
    },

    prediction: {
      type: String,
      enum: ["Pending", "Fraud", "Safe"],
      default: "Pending",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);