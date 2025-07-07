import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card"; // Adjust path
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

function Transactions() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 3000, type: "income" },
    { id: 2, description: "Rent", amount: 1000, type: "expense" },
  ]);

  const addTransaction = (txn) => {
    txn.id = Date.now();
    setTransactions([...transactions, txn]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const editTransaction = (updated) => {
    setTransactions(
      transactions.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const balance = transactions.reduce((acc, item) => {
    const amount = Number(item.amount) || 0;
    return item.type === "expense" ? acc - amount : acc + amount;
  }, 0);

  return (
    <div className="main-container p-5">
      <h2 className="sub-heading-large mb-4">Your Transactions</h2>

      <Card>
        <CardContent className="p-6">
          <div className="main-container">
            <span className="sub-heading-small">Current Balance</span>
            <span
              className="sub-heading-medium"
              style={{ color: balance >= 0 ? "green" : "red" }}
            >
              ${balance.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      <TransactionForm addTransaction={addTransaction} />
      <TransactionList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}
      />
    </div>
  );
}

export default Transactions;
