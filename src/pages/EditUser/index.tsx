import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUser } from '../../api/UserApi';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
  const handleMyData = () => {
    const data = JSON.parse(localStorage.getItem('user') || '{}');
    return data;
  };

  const [formData, setFormData] = useState({
    name: handleMyData().name,
    email: handleMyData().email,
  });

  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles the form submission event.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const { name, email } = formData;
    const { newPassword, confirmPassword } = passwords;

    if (!name) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if ((newPassword || confirmPassword) && newPassword !== confirmPassword) {
      toast.error('As senhas não conferem. Por favor, tente novamente.');
      return;
    }

    // Monta payload dinamicamente
    const payload: { name: string; email: string; newPassword: string | undefined } = {
      name: formData.name,
      email: formData.email,
      newPassword: undefined,
    };

    if (newPassword) {
      payload.newPassword = passwords.newPassword;
    }

    try {
      console.log(payload);
      //TODO: rotear para login quando alterar senha
      const response = await editUser(payload);

      if (response?.status === 200) {
        toast.success('Dados atualizados com sucesso!');
        const updatedUser = { ...handleMyData(), name };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setFormData({ name, email });
        setPasswords({ newPassword: '', confirmPassword: '' });
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        toast.error('Erro ao atualizar os dados.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar os dados.');
    }
  };

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
            Bem vindo, {handleMyData().name}.
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
                disabled
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Nova senha</label>
              <input
                placeholder="Digite uma nova senha"
                className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Confirme sua senha
              </label>
              <input
                placeholder="Confirme sua nova senha"
                className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2 px-4 bg-purple hover:bg-purple-700 transition-colors duration-200 text-white rounded-xl font-semibold shadow-md cursor-pointer"
            >
              Salvar Alterações
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
