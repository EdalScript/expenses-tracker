import React from 'react';

const TransactionList = ({ transactions, removeTransaction }) => {
  return (
      <ul className="list">
        {transactions.map(transaction => {
          const sign = transaction.amount < 0 ? '-' : '+';
          return (
            <li key={transaction.id} className={transaction.amount < 0 ? 'out' : 'in'}>
              {transaction.text} <span>{sign}{Math.abs(transaction.amount)}</span>
              <button className="delete-btn" onClick={() => removeTransaction(transaction.id)}>
                x
              </button>
            </li>
          );
        })}
      </ul>
  );
};

export default TransactionList;
