//재발급 때문에 ...............
import axiosInstance from './axios';

const securedAxios = axiosInstance;

securedAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post('/api/auth/refresh', null, {
          withCredentials: true,
        });

        // 재요청
        return securedAxios(originalRequest);
      } catch (refreshError) {
        console.error('재발급 실패:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default securedAxios;
