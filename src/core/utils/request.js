import axios from 'axios';
import { getCurrentUser, logout } from '../auth/auth.service';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5200/api',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleReject = (error) => {
  if (error?.response?.status === 401) {
    logout();
  }
  throw error;
};

const authorizationHeader = (token) => ({ Authorization: token });

export const request = (options) => {
  const user = getCurrentUser();
  const headers = user ? { ...authorizationHeader(user.token), ...options.headers } : { ...options.headers };

  return axiosInstance({
    ...options,
    headers: { ...headers },
  }).catch(handleReject);
};
