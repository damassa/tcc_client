import { UserUpdate } from '../types/user';
import api from './api';

export const editUser = async (user: UserUpdate) => {
  try {
    await api.patch(`/api/v1/users/me/edit`, user);
  } catch (error) {
    console.error(error);
  }
};
