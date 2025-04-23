import React, { FormEvent, useState } from 'react';
import './style.css';
import LoginImage from '../../assets/images/undraw_home_cinema_l7yl.svg';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';

/**
 * Login component for user authentication
 * @returns JSX.Element
 */
const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [credential, setCredential] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`Valores do input: ${event.target.name} = ${event.target.value}`);

    setCredential({
      ...credential,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Handle login logic
    try {
      const response = await api.post(`/api/v1/login`, {
        email: credential.email,
        senha: credential.password,
      });
      const { token } = response.data;
      localStorage.setItem('jwt', token);
      const user = await api.get('/api/v1/users/me');
      localStorage.setItem('user', JSON.stringify(user.data));
      navigate('/');
    } catch (error) {
      // Handle login error
      setError('Login failed. Please check your credentials.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black-100">
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${LoginImage})` }}
      >
        <div className="w-full h-full bg-black opacity-50 flex items-center justify-center">
          <h2 className="text-white text-3xl font-bold login-text-border">
            Bem vindo ao World of Tokusatsu!
          </h2>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Área de login</h2>
          <form action="" onSubmit={handleSubmit} method="post" className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-md font-medium mb-1">E-mail:</label>
                <input
                  required
                  name="email"
                  type="email"
                  className="w-full h-10 text-sm px-4 py-2 placeholder:pl-4 border rounded-sm focus:outline-none focus:ring-1 focus:pl-4 transform transition duration-300 ease-in-out hover:scale-105"
                  placeholder="seuemail@exemplo.com"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-md font-medium mb-1">Senha:</label>
                <input
                  required
                  name="password"
                  type="password"
                  className="w-full h-10 text-sm px-4 py-2 placeholder:pl-4 focus:pl-4 border rounded-sm focus:outline-none focus:ring-1 transform transition duration-300 ease-in-out hover:scale-105"
                  placeholder="********"
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="login--button h-10 w-full bg-green-500 hover:bg-green-600 text-white px-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-400 uppercase transform transition duration-300 ease-in-out hover:scale-105 mt-6"
            >
              Login
            </button>
            <p className="forgot-password text-right text-black space-y-1">
              Esqueceu sua senha? Clique <Link to="/forgotPassword">aqui</Link>
            </p>
            <p className="register text-black text-center space-y-1">
              Não possui conta? Registre-se <Link to="/register">aqui</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
