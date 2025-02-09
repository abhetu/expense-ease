
import axios from 'axios';

export const signUp = async (email, password) => {
  return await axios.post('http://localhost:3000/api/auth/signup', { email, password });
};

export const login = async (email, password) => {
  return await axios.post('http://localhost:3000/api/auth/login', { email, password });
};
