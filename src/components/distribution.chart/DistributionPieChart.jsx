import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#FF8042'];

const DistributionPieChart = ({ transactions }) => {
  const data = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach(t => {
      if (t.amount > 0) totalIncome += t.amount;
      else totalExpense += Math.abs(t.amount);
    });
    return [
      { name: 'Income', value: totalIncome },
      { name: 'Expense', value: totalExpense },
    ];
  }, [transactions]);

  return (
    <div style={{ width: '48%', height: 300, backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
      <h4>Report Overview</h4>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistributionPieChart;
