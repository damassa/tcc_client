import { useNavigate } from 'react-router-dom';

/**
 * Remove todas as informações de autenticação do usuário
 */
export function logout(): void {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
}

/**
 * Hook para usar logout com redirecionamento
 */
export function useLogout() {
  const navigate = useNavigate();

  const doLogout = () => {
    logout();
    navigate('/login');
  };

  return doLogout;
}
