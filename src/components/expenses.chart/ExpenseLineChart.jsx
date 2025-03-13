import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

const ExpenseLineChart = ({ transactions }) => {
  const data = useMemo(() => {
    const expenseMap = {};
    transactions.forEach(t => {
      if (t.amount < 0) {
        const dateStr = dayjs(t.date).format('YYYY-MM-DD');
        expenseMap[dateStr] = (expenseMap[dateStr] || 0) + Math.abs(t.amount);
      }
    });

    const arr = Object.entries(expenseMap).map(([date, amount]) => ({ date, amount }));
    arr.sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix());
    return arr;
  }, [transactions]);

  return (
    <div style={{ width: '100%', height: 300, backgroundColor: '#fff', padding: 20, borderRadius: 10, marginTop: 20 }}>
      <h4>Expense Activity</h4>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#ff6c6c" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseLineChart;
