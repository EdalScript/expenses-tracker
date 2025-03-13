import React, { useState, useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const { addTransaction } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '' || amount.trim() === '') {
      alert('Please add a text and amount');
      return;
    }
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
    };
    addTransaction(newTransaction);
    setText('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="text">What would you like to track?</label>
        <input
          type="text"
          id="text"
          placeholder="Example: Electricity bill"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="amount">
          How much?<br />
          <span className="tooltip">
            If it's over 0, it will go to income. If it's below 0, it will go to expenses
          </span>
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Example: -100"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button className="btn" type="submit">Add transaction</button>
    </form>
  );
};

export default AddTransaction;
