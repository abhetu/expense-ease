
import React, { useEffect, useState } from 'react';
import { getTransactions } from '../services/transactionService';
import AddTransaction from '../components/AddTransaction';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTransactions();
      setTransactions(data);
      setIncome(data.filter(txn => txn.type === 'income').reduce((acc, txn) => acc + txn.amount, 0));
      setExpenses(data.filter(txn => txn.type === 'expense').reduce((acc, txn) => acc + txn.amount, 0));
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>Total Income: {income}</div>
      <div>Total Expenses: {expenses}</div>
      <AddTransaction onAdd={(txn) => setTransactions([...transactions, txn])} />
    </div>
  );
};

export default Dashboard;
