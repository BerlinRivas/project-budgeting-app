const express = require("express");
const transactions = express.Router();
const {
    getAllTransactions,
    getTransaction,
    createTransaction,
    deleteTransaction,
    updateTransaction,

} = require("../queries/transactions");
const { checkName} = require("../validations/checkTransactions.js");

// INDEX
transactions.get("/", async (req, res) => {
    const allTransactions = await getAllTransactions();
    // console.log(allTransactions)
    if (allTransactions[0]) {
      res.status(200).json(allTransactions);
    } else {
      res.status(500).json({ error: "server error" });
    }
  });

  // SHOW
  transactions.get("/:id", async (req, res) => {
    const { id } = req.params;
    const transaction = await getTransaction(id);
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ error: "not found" });
    }
  });

  // CREATE
  transactions.post("/", checkName, async (req, res) => {
    console.log(req.body)
    try {
      const transaction = await createTransaction(req.body);
      res.json(transaction);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  });

// DELETE
transactions.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedTransaction = await deleteTransaction(id);
    if (deletedTransaction.id) {
      res.status(200).json(deletedTransaction);
    } else {
      res.status(404).json("Transaction not found");
    }
  });

// UPDATE
transactions.put("/:id",checkName, async (req, res) => {
    const { id } = req.params;
    const updatedTransaction = await updateTransaction(id, req.body);
    res.status(200).json(updatedTransaction);
  });

module.exports = transactions;