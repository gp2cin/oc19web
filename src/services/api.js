import axios from 'axios';
import { getToken, logout } from './auth';
const { REACT_APP_API_URL } = process.env;

const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log(error.response.data.message);
  if (error.response.data.message && error.response.data.message === 'Token has expired') {
    logout();
  }
  return Promise.reject(error);
});

export const awsApi = axios.create({});

export default api;