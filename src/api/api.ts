import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  },
});

export default api;

// export const getAxiosConfig = (): AxiosRequestConfig => {
//   const token = localStorage.getItem('jwt');
//   return {
//     headers: {
//       Authorization: token,
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': 'http://localhost:3000',
//     },
//   };
// };
