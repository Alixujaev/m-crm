import axios, { AxiosInstance } from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';


export const BASE_URL = 'https://dummyjson.com';


const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    Accept: 'application/json',

  },
});

// Request interceptors
axiosInstance.interceptors.request.use(async config => {
  // Serverda `localStorage` mavjud emas, tokenni qo'lda qo'shish kerak
  if (typeof window !== "undefined") {
    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptors
axiosInstance.interceptors.response.use(
  response => response.data,
  async error => {
    if (error.message === 'Network Error') {
      toast.error(`Internal server error. Error status: 500`);
    }
    if (error.response?.status === 400) {
      console.error('Bad Request', 'Invalid request');
      toast.error(`Bad Request', 'Invalid request`);
    }
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem('access_token');
      }
      toast.error(`Sessiya tugadi', "Iltimos qayta kirishni urinib ko'ring`);
      
    }
    if (error.response?.status === 403) {
      toast.error(`Forbidden', 'You have no permission to access this resource`);
    }
    // if (error.response?.status === 404) {
    //   console.error('Not Found', 'Resource not found');
    //   toast.error(`Not Found', 'Resource not found`);
    // }
    if (error.response?.status === 500) {
      toast.error(`Server Error', 'Internal server error`);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
