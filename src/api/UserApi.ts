import { UserResponse, UserUpdate } from '../types/user';
import api from './api';

export const editUser = async (user: UserUpdate) => {
  try {
    const response = await api.patch(`/api/v1/users/edit-user`, user);
    return response;
  } catch (error) {
    console.error(error);
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
