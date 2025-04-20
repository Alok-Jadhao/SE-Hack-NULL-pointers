const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    GOOGLE_LOGIN: `${API_BASE_URL}/api/auth/google`,
    // Add other endpoints here
};

export default API_BASE_URL; 