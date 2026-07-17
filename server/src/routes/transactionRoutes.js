const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createTransaction,
  getTransactions,
  getTransactionById,
  deleteTransaction,
} = require("../controllers/transactionController");

router.post("/", protect, createTransaction);
router.get("/", protect, getTransactions);
router.get("/:id", protect, getTransactionById);
router.delete("/:id", protect, deleteTransaction)

module.exports = router;
