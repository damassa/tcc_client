import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';

const Register: React.FC = () => {
  return (
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

        <form className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Nome"
              required
              className="w-full h-11 px-4 py-2 text-sm border rounded-md bg-black text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#57467b] border-[#57467b] transition"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              required
              className="w-full h-11 px-4 py-2 text-sm border rounded-md bg-black text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#57467b] border-[#57467b] transition"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Senha"
              required
              className="w-full h-11 px-4 py-2 text-sm border rounded-md bg-black text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#57467b] border-[#57467b] transition"
            />
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirme sua senha"
              required
              className="w-full h-11 px-4 py-2 text-sm border rounded-md bg-black text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#57467b] border-[#57467b] transition"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full h-11 rounded-md text-white font-semibold uppercase shadow-lg transition"
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
  );
};

export default Register;
