import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ConfirmEmail: React.FC = () => {
  const [message, setMessage] = useState('Confirmando e-mail...');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setMessage('Token inválido ou ausente.');
      setLoading(false);
      return;
    }

    // fetch(`https://tccserver-f1d0375900a5.herokuapp.com/confirm-email?token=${token}`, {
    //   method: 'GET',
    // })
    fetch(`localhost:8080/confirm-email?token=${token}`, {
      method: 'GET',
    })
      .then((res) => {
        if (res.ok) {
          setMessage('E-mail confirmado com sucesso! Você já pode fazer login.');
          setSuccess(true);
        } else {
          setMessage('Token inválido ou expirado.');
        }
      })
      .catch(() => {
        setMessage('Erro ao confirmar e-mail. Tente novamente mais tarde.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md text-center p-8 bg-[#0e0e0e] rounded-2xl border border-[#57467b] shadow-lg"
      >
        <h1 className="text-white text-xl font-semibold mb-4">Confirmação de E-mail</h1>

        {loading ? (
          <motion.div
            className="w-10 h-10 mx-auto border-4 border-t-[#57467b] border-gray-700 rounded-full animate-spin"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        ) : (
          <>
            <p className={`text-sm ${success ? 'text-green-400' : 'text-red-400'}`}>{message}</p>

            {success && (
              <button
                onClick={() => navigate('/login')}
                className="mt-6 px-6 py-2 bg-[#57467b] text-white rounded-md shadow hover:bg-purple-700 transition"
              >
                Ir para Login
              </button>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ConfirmEmail;
