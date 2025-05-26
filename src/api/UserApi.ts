import { UserResponse } from '../types/user';
import api from './api';

export const editUser = async (user: { name: string; newPassword?: string }) => {
  const token = localStorage.getItem('jwt');
  try {
    console.log('Dados sendo enviados:', user);

    const response = await fetch(`http://localhost:8080/api/v1/users/edit-user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      method: 'PATCH',
      body: JSON.stringify({
        name: user.name,
        newPassword: user.newPassword || null,
      }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Erro ao editar o usuário.');
    }

    return response;
  } catch (error) {
    console.error('Erro ao editar o usuário:', error);
    throw error;
  }
};

export const register = async (user: UserResponse) => {
  try {
    const response = await api.post(`/api/v1/users/register`, user);
    return response;
  } catch (error) {
    console.error(error);
  }
};
