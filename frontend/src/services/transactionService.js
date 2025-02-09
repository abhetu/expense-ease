
import axios from 'axios';

export const getTransactions = async () => {
  return await axios.get('http://localhost:3000/api/transactions', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

export const addTransaction = async (transaction) => {
  return await axios.post('http://localhost:3000/api/transactions', transaction, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};
