const db = require("../db/dbConfig.js");

const getAllTransactions = async () => {
    try {
        const allTransactions = await db.any("SELECT * FROM transactions");
        return allTransactions;
        console.log(allTransactions)
        }   catch (error) {
            return error
        }
    };
    //ONE Transaction 
    const getTransaction = async (id) => {
        try {
            const oneTransaction = await db.one("SELECT * FROM transactions WHERE id=$1", id);
            return oneTransaction;
        } catch (error) {
            return error;
        }
    };

    //CREATE
    const createTransaction = async (transaction) => {
        try {
          const newTransaction = await db.one(
            "INSERT INTO transactions (date, name, amount, source) VALUES ($1, $2, $3, $4) RETURNING *",
            [transaction.date, transaction.name, parseFloat(transaction.amount), transaction.source]
          );
          return newTransaction;
        } catch (error) {
          return error;
        }
      };

    //DELETE
    const deleteTransaction = async (id) => {
        try {
          const deletedTransaction = await db.one(
            "DELETE FROM transactions WHERE id = $1 RETURNING *",
            id
          );
          return deletedTransaction;
        } catch (error) {
          return error;
        }
      };

    //UPDATE
const updateTransaction = async (id, transaction) => {
  try {
    const updatedTransaction = await db.one(
      "UPDATE transactions SET date=$1, name=$2, amount=$3, source=$4 WHERE id =$5 RETURNING *",
      [transaction.date, transaction.name, parseFloat(transaction.amount), transaction.source, id]
    );
    return updatedTransaction;
  } catch (error) {
    return error;
  }
};

  module.exports = {
    getAllTransactions,
    createTransaction,
    getTransaction,
    deleteTransaction,
    updateTransaction
  };
