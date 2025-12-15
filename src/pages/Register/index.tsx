import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import Footer from '../../components/Footer';
import { toast, ToastContainer } from 'react-toastify';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    senha: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, email, senha, confirmPassword } = formData;

    if (!name || !email || !senha || !confirmPassword) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (senha !== confirmPassword) {
      setError('As senhas não conferem. Por favor, tente novamente.');
      return;
    }

    try {
      const response = await fetch(
        'https://tccserver-f1d0375900a5.herokuapp.com/api/v1/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, senha }),
        },
      );

      if (response.status === 201) {
        toast.success('Cadastro realizado com sucesso. Verifique seu e-mail para confirmação.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const text = await response.text();
        setError(text || 'Ocorreu um erro ao registrar. Por favor, tente novamente.');
      }
    } catch (error) {
      setError('Erro ao conectar com o servidor');
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
        style={{ backgroundColor: '#070707' }}
      >
        {/* Card animado */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-xl p-8 sm:p-10 rounded-2xl shadow-2xl border"
          style={{
            backgroundColor: '#0e0e0e',
            borderColor: '#57467b',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h3 className="text-center text-2xl font-bold text-white mb-8">
            World of Tokusatsu - Registro
          </h3>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 py-2 text-sm border rounded-md bg-black text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#57467b] border-[#57467b] transition"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 py-2 text-sm border rounded-md bg-black text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#57467b] border-[#57467b] transition"
              />
            </div>

            <div>
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 py-2 text-sm border rounded-md bg-black text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#57467b] border-[#57467b] transition"
              />
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 py-2 text-sm border rounded-md bg-black text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#57467b] border-[#57467b] transition"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full h-11 rounded-md text-white font-semibold uppercase shadow-lg transition cursor-pointer"
              style={{ backgroundColor: '#57467b' }}
            >
              Criar Conta
            </motion.button>
          </form>
        </motion.div>

        {/* Link animado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 md:mt-10 text-center text-sm text-white"
        >
          <p className="flex justify-center items-center gap-2">
            <LogIn className="w-4 h-4 text-[#57467b]" />
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="text-[#57467b] hover:underline hover:text-purple-300 transition"
            >
              Faça login
            </Link>
          </p>
        </motion.div>
      </div>
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
      <Footer />
    </>
  );
};

export default Register;
