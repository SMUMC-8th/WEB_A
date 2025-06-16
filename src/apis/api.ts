import axios from 'axios';

export const BASE_URL = 'https://api-smp.shop';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;
