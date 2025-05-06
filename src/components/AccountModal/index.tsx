import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleInitials = () => {
    const name = handleMyData().name.trim();
    const parts = name.split(/\s+/);

    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    } else {
      const first = parts[0][0];
      const last = parts[parts.length - 1][0];
      return (first + last).toUpperCase();
    }
  };

  const handleMyData = () => {
    const data = JSON.parse(localStorage.getItem('user') || '{}');
    return data;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 mt-55 flex items-center justify-center bg-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-gradient-to-br from-[#0F0F0F] to-[#1F1F1F] rounded-2xl p-8 w-11/12 max-w-md text-white shadow-2xl border border-gray-700"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
          >
            ✖
          </button>

          {/* Perfil do Usuário com Borda Animada */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse-slow opacity-70 blur-md"></div>
              <button
                className="flex items-center justify-center w-8 h-8 rounded-full bg-green-400 hover:bg-green-800 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label="Abrir menu do usuário"
              >
                {handleInitials()}
              </button>
            </div>
            <h2 className="text-2xl font-semibold mt-3">{handleMyData().name}</h2>
            <p className="text-sm text-gray-400">{handleMyData().email}</p>
          </div>

          {/* Opções de Conta */}
          <div className="space-y-4">
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-700 to-purple-800 hover:opacity-90 transition">
              <Link to="/editUser">Editar Perfil</Link>
            </button>
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:opacity-90 transition">
              Sair
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AccountModal;
