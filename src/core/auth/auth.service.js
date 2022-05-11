import { request } from '../utils/request';

export const login = async (email, password) => {
  try {
    const response = await request({
      method: 'post',
      url: '/auth/login',
      data: { email, password },
    });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const signUp = async (data) => {
  try {
    const response = await request({
      method: 'post',
      url: '/auth/register',
      data,
    });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};
