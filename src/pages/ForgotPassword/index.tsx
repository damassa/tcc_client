import React from 'react';
import { Link } from 'react-router-dom'; // ou use <a> se não estiver usando react-router

const ForgotPassword: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white p-6 md:p-10 rounded-xl shadow-md">
        <div className="mb-8">
          <h2 className="text-center text-sm text-black px-4">
            Digite o e-mail vinculado à sua conta aqui para recuperar sua senha.
          </h2>
        </div>
        <form action="#!">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                E-mail
              </label>
              <div className="flex items-center border border-black rounded-md overflow-hidden">
                <span className="px-3 bg-white text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-envelope"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="E-mail"
                  className="w-full p-2.5 text-sm focus:outline-none"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium transition duration-300 ease-in-out hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 shadow-md"
              >
                Recuperar senha
              </button>
            </div>
          </div>
        </form>
        <hr className="my-8 border-gray-300" />
        <div className="flex justify-center gap-6">
          <Link to="/login" className="text-gray-600 hover:underline">
            Login
          </Link>
          <Link to="/register" className="text-gray-600 hover:underline">
            Registrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
