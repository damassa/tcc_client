import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const EditUser = () => {
  const handleMyData = () => {
    const data = JSON.parse(localStorage.getItem('user') || '{}');
    return data;
  };

  const [formData, setFormData] = useState({
    name: handleMyData().name,
    email: handleMyData().email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles the form submission event.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const {
      name,
      email,
      newPassword,
      confirmPassword,
    }: {
      name: string;
      email: string;
      newPassword?: string;
      confirmPassword?: string;
    } = formData;

    // Validate form data
    if (!name || !email) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      alert('As senhas não conferem. Por favor, tente novamente.');
      return;
    }

    // If validation passes, submit the form data
    console.log(formData);
    // You can also make an API call to update the user data here
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
                type="password"
                name="newPassword"
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="******"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Confirme sua senha
              </label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="******"
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
      <Footer />
    </>
  );
};

export default EditUser;
