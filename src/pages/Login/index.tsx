import React, { FormEvent, useState } from 'react';
import LoginImage from '../../assets/images/jiraya.jpg';
import { Link, useNavigate } from 'react-router-dom';
import api, { notAuthApi } from '../../api/api';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';

import './style.css';
import axios from 'axios';

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

      navigate('/');
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
                  placeholder="********"
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
              <Link to="/forgotPassword" className="text-[#57467b] hover:underline">
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
    </div>
    // <div className="min-h-screen flex flex-col md:flex-row bg-black-100">
    //   <div
    //     className="hidden md:flex w-1/2 bg-cover bg-center"
    //     style={{ backgroundImage: `url(${LoginImage})` }}
    //   >
    //     <div className="w-full h-full bg-black opacity-50 flex items-center justify-center">
    //       <h2 className="text-white text-3xl font-bold login-text-border">
    //         Bem vindo ao World of Tokusatsu!
    //       </h2>
    //     </div>
    //   </div>
    //   <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-100">
    //     <div className="w-full max-w-md bg-white p-8 rounded shadow border">
    //       <h2 className="text-2xl font-bold text-center mb-6">Área de login</h2>
    //       <form action="" onSubmit={handleSubmit} method="post" className="space-y-6">
    //         <div className="space-y-4">
    //           <div>
    //             <label className="block text-gray-700 text-md font-medium mb-1">E-mail:</label>
    //             <input
    //               required
    //               name="email"
    //               type="email"
    //               className="w-full h-10 text-sm px-4 py-2 placeholder:pl-4 border rounded-sm focus:outline-none focus:ring-1 focus:pl-4 transform transition duration-300 ease-in-out hover:scale-105"
    //               placeholder="seuemail@exemplo.com"
    //               onChange={handleChange}
    //             />
    //           </div>
    //           <div>
    //             <label className="block text-gray-700 text-md font-medium mb-1">Senha:</label>
    //             <input
    //               required
    //               name="password"
    //               type="password"
    //               className="w-full h-10 text-sm px-4 py-2 placeholder:pl-4 focus:pl-4 border rounded-sm focus:outline-none focus:ring-1 transform transition duration-300 ease-in-out hover:scale-105"
    //               placeholder="********"
    //               onChange={handleChange}
    //             />
    //           </div>
    //         </div>
    //         <button
    //           type="submit"
    //           className="login--button h-10 w-full bg-green-500 hover:bg-green-600 text-white px-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-400 uppercase transform transition duration-300 ease-in-out hover:scale-105 mt-6"
    //         >
    //           Login
    //         </button>
    //         <p className="forgot-password text-right text-black space-y-1">
    //           Esqueceu sua senha? Clique <Link to="/forgotPassword">aqui</Link>
    //         </p>
    //         <p className="register text-black text-center space-y-1">
    //           Não possui conta? Registre-se <Link to="/register">aqui</Link>
    //         </p>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
