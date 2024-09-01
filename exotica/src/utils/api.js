import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // Ensure cookies are sent with requests
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAuthToken();
        if (newToken) {
          originalRequest.headers['x-auth-token'] = newToken;
          return api(originalRequest);
        }
      } catch (err) {
        console.error('Error during token refresh:', err);
      }
    }
    return Promise.reject(error);
  }
);

const refreshAuthToken = async () => {
  try {
    const response = await api.post('/refresh-token');
    if (!response.data.accessToken) {
      throw new Error('Failed to refresh token');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', response.data.accessToken);
    }
    return response.data.accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    clearAuthToken();
    return null;
  }
};

const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
  // Implement actual redirect logic here, e.g., redirect to login page
  // window.location.href = '/login'; // Example redirect
};

export default api;