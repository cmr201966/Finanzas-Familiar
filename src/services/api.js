import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api/accounts',
  headers: {
    'Content-Type': 'application/json'
  }
});