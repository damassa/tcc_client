import axios from 'axios';

// Cria API com autenticação
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  },
});

// Interceptor de request para sempre atualizar o token
api.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete config.headers['Authorization'];
  }
  return config;
});

// API sem autenticação para endpoints públicos
export const notAuthApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  },
});

export default api;
