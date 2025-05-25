import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
interface UserUpdate {
  id: number;
  name?: string;
  email?: string;
}
const EditUser: React.FC = () => {
  // const handleMyData = () => {
  //   const data = JSON.parse(localStorage.getItem('user') || '{}');
  //   return data;
  // };

  const [userData, setUserData] = useState<UserUpdate | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await api.get('/api/v1/users/me');
      const data = response.data;
      setUserData(data);
      setFormData({ name: data.name, email: data.email });
    } catch (error: unknown) {
      if (error.response?.status === 401) {
        toast.error('Sua sessão expirou, faça login novamente');
        navigate('/login');
      } else {
        toast.error('Erro ao buscar informações do usuário');
      }
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // const [passwords, setPasswords] = useState({
  //   newPassword: '',
  //   confirmPassword: '',
  // });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) return;

    setIsLoading(true);

    try {
      await api.patch('/api/v1/users/edit-user', {
        id: userData.id,
        name: formData.name,
        email: formData.email,
      });
      toast.success('Informações atualizadas com sucesso');
      await fetchUser();
    } catch (error: unknown) {
      const errorMessage = error.response?.data || 'Erro ao atualizar informações';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the form submission event.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
  //   e.preventDefault();

  //   const { name, email } = formData;
  //   const { newPassword, confirmPassword } = passwords;

  //   if (!name) {
  //     toast.error('Por favor, preencha todos os campos obrigatórios.');
  //     return;
  //   }

  //   if ((newPassword || confirmPassword) && newPassword !== confirmPassword) {
  //     toast.error('As senhas não conferem. Por favor, tente novamente.');
  //     return;
  //   }

  //   // Monta payload dinamicamente
  //   const payload: { name: string; email: string; newPassword: string | undefined } = {
  //     name: formData.name,
  //     email: formData.email,
  //     newPassword: undefined,
  //   };

  //   if (newPassword) {
  //     payload.newPassword = passwords.newPassword;
  //   }

  //   try {
  //     const response = await editUser(payload);

  //     if (response?.status === 200) {
  //       toast.success('Dados atualizados com sucesso!');
  //       const updatedUser = { ...handleMyData(), name };
  //       localStorage.setItem('user', JSON.stringify(updatedUser));
  //       setFormData({ name, email });
  //       setPasswords({ newPassword: '', confirmPassword: '' });
  //       setTimeout(() => {
  //         if (payload.newPassword) {
  //           localStorage.removeItem('jwt');
  //           navigate('/login');
  //         } else {
  //           navigate(-1);
  //         }
  //       }, 2000);
  //     } else {
  //       toast.error('Erro ao atualizar os dados.');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Erro ao atualizar os dados.');
  //   }
  // };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="backdrop-blur-md bg-zinc-900/70 border border-purple-700 rounded-2xl shadow-xl p-12 w-full max-w-2xl text-zinc-100"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl font-semibold text-center mb-8 tracking-wide text-white drop-shadow-lg"
          >
            Editar dados da Conta
          </motion.h2>

          <motion.h4
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-center tracking-wide text-white drop-shadow-lg"
          >
            Bem vindo.
          </motion.h4>

          <motion.h5
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xs text-center mb-6 tracking-wide text-white drop-shadow-lg"
          >
            Gerencie seus dados e segurança para que o site atenda suas necessidades.
          </motion.h5>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.div whileFocus={{ scale: 1.02 }}>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Nome</label>
              <input
                disabled={isLoading}
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </motion.div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <motion.button
              disabled={isLoading}
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full px-4 py-2 rounded-md text-white cursor-pointer
          ${isLoading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}
            >
              {isLoading ? 'Atualizando...' : 'Atualizar'}
            </motion.button>
          </motion.form>
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

export default EditUser;
