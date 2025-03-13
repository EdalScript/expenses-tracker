import React, { useContext } from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import SummaryCards from '../summary.cards/SummaryCards';
import TopExpenseBarChart from '../top.expense.chart/TopExpenseBarChart';
import ExpenseLineChart from '../expenses.chart/ExpenseLineChart';
import DistributionPieChart from '../distribution.chart/DistributionPieChart';

import './styles.css';

const Dashboard = () => {
  const { transactions } = useContext(TransactionContext);

  // default data while I figure a way to implement user input and storing it. Maybe MongoDB? Let's see
  const defaultTransactions = [
    { id: 1, date: '2025-03-01', amount: 45000, category: 'Salary' },
    { id: 2, date: '2025-03-02', amount: -5000, category: 'Repairs' },
    { id: 3, date: '2025-03-03', amount: -9000, category: 'House Rent' },
    { id: 4, date: '2025-03-04', amount: -300,  category: 'Transport' },
    { id: 5, date: '2025-03-05', amount: -150,  category: 'Licenses' },
  ];

  const effectiveTransactions = transactions.length > 0
    ? transactions
    : defaultTransactions;

  let totalIncome = 0;
  let totalExpense = 0;
  effectiveTransactions.forEach(t => {
    if (t.amount > 0) {
      totalIncome += t.amount;
    } else {
      totalExpense += Math.abs(t.amount);
    }
  });
  const totalSavings = totalIncome - totalExpense;

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>Expenses Tracker</h2>
        </div>
        <ul className="sidebar-menu">
          <li>Sales</li>
          <li>Purchase</li>
          <li>Inventory</li>
          <li>Accounts</li>
          <li>Reports</li>
          <li>Settings</li>
          <li>Help</li>
        </ul>
        <div className="sidebar-footer">
          <div className="user-info">
            {/*<img src="https://via.placeholder.com/40" alt="User" />*/}
            <div>
              <h4>Edalscript</h4>
              <p>edalscript@gmail.com</p>
            </div>
          </div>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="header">
          <h3>Dashboard</h3>
          <div className="header-actions">
            <button className="btn">Last 30 days</button>
          </div>
        </div>

        <SummaryCards
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          totalSavings={totalSavings}
        />

        <div className="charts-row">
          <TopExpenseBarChart transactions={effectiveTransactions} />
          <DistributionPieChart transactions={effectiveTransactions} />
        </div>

        <ExpenseLineChart transactions={effectiveTransactions} />
      </main>
    </div>
  );
};

export default Dashboard;
