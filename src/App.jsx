import { useState } from "react";
import "./App.css";

const App = () => {
  return (
    <>
      <ExpenseTracker />
    </>
  );
};

export default App;

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomeValue, setIncomeValue] = useState("0.00");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");

  // Handle changes in the income field
  const handleIncome = (e) => {
    const value = e.target.value;
    // Remove any non-numeric characters (allowing for decimal point)
    const formattedValue = value.replace(/[^0-9.]/g, "");
    setIncomeValue(formattedValue);
  };

  // Handle changes in the label (expense category)
  const handleLabel = (e) => {
    setLabel(e.target.value);
  };

  // Handle changes in the amount field
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  // Handle adding a transaction
  const handleButton = () => {
    const expenseAmount = parseFloat(amount) || 0;
    if (label && expenseAmount) {
      setExpenses((prevExpenses) => {
        const existingExpense = prevExpenses.find(
          (expense) => expense.label.toLowerCase() === label.toLowerCase()
        );

        if (existingExpense) {
          // Update the amount for the existing label
          return prevExpenses.map((expense) =>
            expense.label.toLowerCase() === label.toLowerCase()
              ? { ...expense, amount: expense.amount + expenseAmount }
              : expense
          );
        } else {
          // Add a new expense
          return [...prevExpenses, { label, amount: expenseAmount }];
        }
      });
      // Clear input fields after adding
      setLabel("");
      setAmount("");
    }
  };

  // Calculate total expenses and balance
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const balance = parseFloat(incomeValue) - totalExpenses;

  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <h1>Expense Tracker</h1>
        <p>Manage your finances effortlessly</p>
      </header>

      {/* Balance Card */}
      <div className="card balance-card">
        <h2>Balance</h2>
        <p className="balance">${balance.toFixed(2)}</p>
        <div className="income-expense-summary">
          <div className="income">
            <span>Income</span>
            <p>${parseFloat(incomeValue).toFixed(2) || "0.00"}</p>
            {/* New input field for income */}
            <input
              type="text"
              name="incomeInput"
              placeholder="$0.00"
              onChange={handleIncome}
              value={incomeValue}
              maxLength={10}
            />
          </div>
          <div className="expense">
            <span>Expense</span>
            <p>${totalExpenses.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Add Transaction Card */}
      <div className="card transaction-card">
        <h3>Add Transaction</h3>
        <div className="transaction-inputs">
          <input
            type="text"
            placeholder="Label (e.g., Grocery)"
            value={label}
            onChange={handleLabel}
          />
          <input
            type="text"
            placeholder="Amount (e.g., $50.00)"
            value={amount}
            onChange={handleAmount}
          />
        </div>
        <button className="btn primary-btn" onClick={handleButton}>
          Add Transaction
        </button>
      </div>

      {/* Expense Details Card */}
      <div className="card expenses-card">
        <h3>Transaction History</h3>
        {expenses.length > 0 ? (
          <ul className="transaction-list">
            {expenses.map((expense, index) => (
              <li key={index} className="transaction-item">
                <span>{expense.label}</span>
                <span className="amount">${expense.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-transactions">No transactions yet. Start adding!</p>
        )}
      </div>
    </div>
  );
};
