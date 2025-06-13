import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-smp.shop',
  withCredentials: true,
});

export default api;
