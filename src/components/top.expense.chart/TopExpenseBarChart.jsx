import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const TopExpenseBarChart = ({ transactions }) => {
  const expenseByCategory = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      if (t.amount < 0) {
        const category = t.category || 'Misc';
        map[category] = (map[category] || 0) + Math.abs(t.amount);
      }
    });
    const arr = Object.entries(map).map(([cat, amt]) => ({ category: cat, amount: amt }));
    arr.sort((a, b) => b.amount - a.amount);
    return arr.slice(0, 5);
  }, [transactions]);

  return (
    <div style={{ width: '48%', height: 300, backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
      <h4>Top 5 Expense Source</h4>
      <br />
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={expenseByCategory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopExpenseBarChart;
