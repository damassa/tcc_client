import React from 'react';
import './style.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const UpdatePassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('As senhas não conferem. Por favor, tente novamente.');
      return;
    }

    try {
      await axios.post('https://tccserver-f1d0375900a5.herokuapp.com/api/v1/users/reset-password', null, {
        params: {
          token,
          newPassword,
        },
      });
      setMessage('Senha alterada com sucesso.');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (e) {
      setMessage('Token inválido ou expirado. Por favor, tente novamente.');
    }
  };

  return (
    <div className="page-container content">
      <div className="container p-5">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
              <div className="row gy-3 mb-5">
                <div className="col-12">
                  <h2 className="fs-6 fw-normal text-center text-black m-0 px-md-5">
                    Após receber o link, você é redirecionado para cá. Atualize sua senha.
                  </h2>
                </div>
              </div>
              <form action="#!" onSubmit={handleSubmit}>
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col-12">
                    <div className="input-group">
                      <input
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        placeholder="Nova senha"
                        type="password"
                        className="form-control border-black"
                        name="password"
                        id="password"
                        required
                      />
                    </div>
                    <div className="input-group col-margin">
                      <input
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder="Confirme a senha"
                        type="password"
                        className="form-control border-black"
                        name="password"
                        id="password"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button className="updatePassword--button">Atualizar senha</button>
                    </div>
                  </div>
                </div>
              </form>
              {message && <p>{message}</p>}
              <div className="row">
                <div className="col-12">
                  <hr className="mt-5 mb-4 border-secondary-subtle" />
                  <div className="d-flex gap-4 justify-content-center">
                    <a href="/login" className="link-secondary text-decoration-none">
                      Login
                    </a>
                    <a href="/register" className="link-secondary text-decoration-none">
                      Registrar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
