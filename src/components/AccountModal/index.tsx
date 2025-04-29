import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
              <img
                src="https://i.pravatar.cc/150?img=3"
                alt="Avatar"
                className="w-20 h-20 rounded-full border-4 border-purple-600 shadow-md relative z-10"
              />
            </div>
            <h2 className="text-2xl font-semibold mt-3">Administrador</h2>
            <p className="text-sm text-gray-400">fdfreekazoid@gmail.com</p>
          </div>

          {/* Opções de Conta */}
          <div className="space-y-4">
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-700 to-purple-800 hover:opacity-90 transition">
              Ver Perfil
            </button>
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-700 to-purple-800 hover:opacity-90 transition">
              Configurações
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
