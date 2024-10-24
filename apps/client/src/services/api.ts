import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
});



export const register = (userData: { email: string; password: string,name:string }) => api.post('/auth/register', userData);
export const login = (userData: { email: string; password: string }) => api.post('/auth/login', userData);
export const logout = () => api.post('/auth/logout');
export const getMe = () => api.get('/auth/me');

export default api;
