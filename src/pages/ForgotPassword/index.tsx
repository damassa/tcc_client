import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ForgotPassword: React.FC = () => {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode fazer a requisição ao backend
    setEmailSent(true);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: '#070707' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md p-8 sm:p-10 rounded-2xl shadow-2xl border"
        style={{
          backgroundColor: '#0e0e0e',
          borderColor: '#57467b',
          backdropFilter: 'blur(10px)',
        }}
      >
        {!emailSent ? (
          <>
            <h2 className="text-center text-base sm:text-lg text-white mb-8 px-4">
              Digite o e-mail vinculado à sua conta para recuperar sua senha.
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="relative">
                  <label htmlFor="email" className="sr-only">
                    E-mail
                  </label>
                  <FiMail className="absolute top-3.5 left-3 text-[#57467b]" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="E-mail"
                    className="w-full h-11 pl-10 pr-4 py-2 text-sm border rounded-md bg-black text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#57467b] border-[#57467b] transition"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full h-11 rounded-md text-white font-semibold uppercase shadow-lg transition"
                  style={{ backgroundColor: '#57467b' }}
                >
                  Recuperar senha
                </motion.button>
              </div>
            </form>
          </>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-white space-y-6"
            >
              <FiCheckCircle size={64} className="mx-auto text-[#57467b]" />
              <h3 className="text-2xl font-semibold">E-mail enviado!</h3>
              <p className="text-sm text-gray-400 px-4">
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </p>
            </motion.div>
          </AnimatePresence>
        )}

        <hr className="my-8 border-gray-600" />

        <div className="flex justify-center gap-6">
          <Link to="/login" className="text-[#57467b] hover:underline">
            Login
          </Link>
          <Link to="/register" className="text-[#57467b] hover:underline">
            Registrar
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
