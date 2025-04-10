// src/services/axios.tsx
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // si cookie JWT
});

export default axiosInstance;
