import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development' ? '/api' : process.env.BASE_URL;

export default axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});
