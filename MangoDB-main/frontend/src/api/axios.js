import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('vt_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

// Response Interceptor: Error Normalization & 401 Handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        let message = error.response?.data?.message || error.message || 'An unexpected error occurred';

        if (status === 401) {
            console.warn('[API Auth Error] Token expired or unauthorized.');
            localStorage.removeItem('vt_token');
            localStorage.removeItem('vt_user');
            if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
                window.location.href = '/login?expired=true';
            }
        } else if (status === 403) {
            message = message || 'You do not have permission to perform this action.';
        } else if (status === 404) {
            message = message || 'Requested resource not found.';
        } else if (status === 409) {
            message = message || 'Conflict error: Resource already exists.';
        } else if (status >= 500) {
            message = message || 'Server error. Please try again later.';
        }

        console.error(`[API Error ${status || 'NET'}]:`, message, error);

        const customError = new Error(message);
        customError.status = status;
        customError.data = error.response?.data;
        return Promise.reject(customError);
    }
);

export default api;
