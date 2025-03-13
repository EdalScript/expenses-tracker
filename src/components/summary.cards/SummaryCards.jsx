import React from 'react';
import './styles.css';

const SummaryCards = ({ totalIncome, totalExpense, totalSavings }) => {
  return (
    <div className="summary-cards">
      <div className="card summary-card income">
        <h4>Total Income</h4>
        <p>${(totalIncome || 0).toLocaleString()}</p>
      </div>
      <div className="card summary-card expense">
        <h4>Total Expense</h4>
        <p>${totalExpense.toLocaleString()}</p>
      </div>
      <div className="card summary-card savings">
        <h4>Total Savings</h4>
        <p>${totalSavings.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
