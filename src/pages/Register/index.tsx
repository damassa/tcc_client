import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative">
      {/* Card animado */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-xl bg-white p-6 md:p-10 rounded-xl shadow-md z-10"
      >
        <h3 className="text-center text-lg font-semibold text-black mb-8">
          World of Tokusatsu - Área de Registro
        </h3>
        <form className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              className="w-full border border-black rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="w-full border border-black rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Senha"
              className="w-full border border-black rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirme sua senha"
              className="w-full border border-black rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium transition duration-300 ease-in-out hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 shadow-md"
            >
              CRIAR CONTA
            </button>
          </div>
        </form>
      </motion.div>

      {/* Link animado e responsivo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 md:mt-10 text-center text-sm text-gray-600 md:static fixed bottom-4 w-full px-4 z-0"
      >
        <p className="flex justify-center items-center gap-2">
          <LogIn className="w-4 h-4 text-indigo-600" />
          Já tem uma conta?{' '}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline hover:text-indigo-800 transition"
          >
            Faça login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
