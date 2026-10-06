import { DEFAULT_VALUES } from '@/shared/utils/default-values';
import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: `${process.env.API_BASE_URL}`,
});

api.interceptors.request.use(config => {
  const token = Cookies.get(DEFAULT_VALUES.COOKIE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
