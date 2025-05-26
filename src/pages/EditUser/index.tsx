import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { editUser } from '../../api/UserApi';
// import { useNavigate } from 'react-router-dom';
const EditUser: React.FC = () => {
  const handleMyData = () => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    return userData;
  };

  const [formData, setFormData] = useState({
    name: '',
  });

  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = handleMyData();
    setFormData({
      name: userData.name || '',
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'newPassword' || name === 'confirmPassword') {
      setPasswords((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { name } = formData;
    const { newPassword, confirmPassword } = passwords;

    if (!name) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      setIsLoading(false);
      return;
    }

    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        toast.error('As senhas não conferem. Por favor, tente novamente.');
        setIsLoading(false);
        return;
      }
      if (newPassword.length < 3) {
        toast.error('A senha deve ter pelo menos 3 caracteres.');
        setIsLoading(false);
        return;
      }
    }

    const payload: { name: string; newPassword?: string } = {
      name: formData.name.trim(),
    };

    if (newPassword && newPassword.trim()) {
      payload.newPassword = newPassword.trim();
    }

    console.log('Payload enviado: ', payload);

    try {
      const response = await editUser(payload);

      if (response.ok) {
        toast.success('Dados alterados com sucesso.');

        const currUser = handleMyData();
        const updatedUser = { ...currUser, name: formData.name };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        if (payload.newPassword) {
          toast.info('Sua senha foi alterada. Você será redirecionado para a tela de login.');
          setTimeout(() => {
            localStorage.clear();
            localStorage.removeItem('jwt');
            navigate('/login');
          }, 2000);
        } else {
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        }
      }
    } catch (error: unknown) {
      console.error(error);
      toast.error('Erro ao alterar dados. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="backdrop-blur-md bg-zinc-900/70 border border-purple-700 rounded-2xl shadow-xl p-12 w-full max-w-2xl text-zinc-100">
          <h2 className="text-3xl font-semibold text-center mb-8 tracking-wide text-white drop-shadow-lg">
            Editar dados da Conta
          </h2>

          <h4 className="text-lg text-center tracking-wide text-white drop-shadow-lg">
            Bem vindo, {handleMyData().name}.
          </h4>

          <h5 className="text-xs text-center mb-6 tracking-wide text-white drop-shadow-lg">
            Gerencie seus dados e segurança para que o site atenda suas necessidades.
          </h5>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Nome</label>
              <input
                placeholder="Digite o seu nome"
                disabled={isLoading}
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Email</label>
              <input
                placeholder="Digite o seu email"
                disabled
                id="email"
                type="email"
                name="email"
                value={handleMyData().email}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Nova senha</label>
              <input
                placeholder="Digite a nova senha"
                disabled={isLoading}
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Confirmar nova senha
              </label>
              <input
                placeholder="Confirme a nova senha"
                disabled={isLoading}
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className={`w-full px-4 py-2 rounded-md text-white cursor-pointer
          ${isLoading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}
            >
              {isLoading ? 'Atualizando...' : 'Atualizar'}
            </button>
          </form>
        </div>
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
