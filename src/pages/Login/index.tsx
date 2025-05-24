import React, { FormEvent, useState } from 'react';
import LoginImage from '../../assets/images/jiraya.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { notAuthApi } from '../../api/api';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';

import './style.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

/**
 * Login component for user authentication
 * @returns JSX.Element
 */
const Login: React.FC = () => {
  const [error, setError] = useState('');

  const [credential, setCredential] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredential({
      ...credential,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Handle login logic
    try {
      const response = await notAuthApi.post('/api/v1/login', {
        email: credential.email,
        senha: credential.password,
      });
      const { token } = response.data;

      localStorage.setItem('jwt', token);

      const localApi = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
      });
      const user = await localApi.get('/api/v1/users/me');

      localStorage.setItem('user', JSON.stringify(user.data));
      if (response.status === 200) {
        const userName = user.data.name;

        setTimeout(() => {
          toast.success('Bem vindo', userName);
          navigate('/');
        }, 2000);
      } else {
        const text = await response.data.text();
        setError(text || 'Falha no login.');
      }
    } catch (error) {
      // Handle login error

      setError('Falha no login. Cheque suas credenciais.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: '#070707' }}>
      {/* Lado esquerdo com imagem e overlay */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden md:flex w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${LoginImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/60 to-black/10 backdrop-blur-sm flex items-center justify-center">
          <h2 className="text-white text-4xl md:text-5xl font-extrabold text-center px-6 leading-tight tracking-wide drop-shadow-xl text-border">
            Bem-vindo ao{' '}
            <span
              style={{
                color: '#57467b',
                WebkitTextStrokeColor: '#f6f6f6',
                WebkitTextStrokeWidth: '1px',
              }}
            >
              World of Tokusatsu
            </span>
            !
          </h2>
        </div>
      </motion.div>

      {/* Formulário */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10"
        style={{ backgroundColor: '#070707' }}
      >
        <div
          className="w-full max-w-md p-8 sm:p-10 rounded-2xl shadow-2xl border"
          style={{
            backgroundColor: '#0e0e0e',
            borderColor: '#57467b',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 uppercase tracking-wide text-white">
            Área de Login
          </h2>

          <form action="" method="post" className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-white text-md font-medium mb-1">E-mail:</label>
                <FiMail className="absolute top-10 left-3 text-[#57467b]" />
                <input
                  required
                  name="email"
                  type="email"
                  className="w-full h-11 pl-10 pr-4 py-2 text-sm border border-purple-400 rounded-md bg-black text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 transition"
                  placeholder="seuemail@exemplo.com"
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <label className="block text-white text-md font-medium mb-1">Senha:</label>
                <FiLock className="absolute top-10 left-3 text-[#57467b]" />
                <input
                  required
                  name="password"
                  type="password"
                  className="w-full h-11 pl-10 pr-4 py-2 text-sm border border-purple-400 rounded-md bg-black text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 transition"
                  placeholder="Digite sua senha"
                  onChange={handleChange}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="h-11 w-full text-white font-semibold rounded-md transition shadow-lg uppercase cursor-pointer"
              style={{ backgroundColor: '#57467b' }}
            >
              Login
            </motion.button>

            <p className="text-sm text-gray-400 text-center">
              Esqueceu sua senha?{' '}
              <Link to="/forgot-password" className="text-[#57467b] hover:underline">
                Clique aqui
              </Link>
            </p>
            <p className="text-sm text-gray-400 text-center">
              Não possui conta?{' '}
              <Link to="/register" className="text-[#57467b] hover:underline">
                Registre-se aqui
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
