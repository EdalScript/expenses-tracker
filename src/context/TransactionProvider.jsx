// TransactionProvider.js
import React, { useState, useEffect } from 'react';
import { TransactionContext } from './TransactionContext';

const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // Load transactions from localStorage on mount
  useEffect(() => {
    const localTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (localTransactions) {
      setTransactions(localTransactions);
    }
  }, []);

  // Persist transactions to localStorage on change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = transaction => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const removeTransaction = id => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, removeTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
