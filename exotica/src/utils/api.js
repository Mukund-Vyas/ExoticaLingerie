import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true, // Ensure cookies are sent with requests
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newToken = await refreshAuthToken();
            if (newToken) {
                originalRequest.headers['x-auth-token'] = newToken;
                return api(originalRequest);
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
        localStorage.setItem('authToken', response.data.accessToken);
        return response.data.accessToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        clearAuthToken();
        return null;
    }
};

const clearAuthToken = () => {
    localStorage.removeItem('authToken');
    gotoLogin('login');
};

export default api;