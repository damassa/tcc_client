import { UserUpdate } from '../types/user';
import api from './api';

export const editUser = async (user: UserUpdate) => {
  try {
    const response = await api.patch(`/api/v1/users/me/edit`, user);
    return response;
  } catch (error) {
    console.error(error);
  }
};
