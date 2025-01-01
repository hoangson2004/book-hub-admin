import api from './api';
import { User } from '../types/User';

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/auth/users');
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error('Dữ liệu không hợp lệ, không phải mảng người dùng.');
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error);
    throw error;
  }
};

export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await api.get(`/auth/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy chi tiết người dùng (ID: ${id}):`, error);
    throw error;
  }
};
