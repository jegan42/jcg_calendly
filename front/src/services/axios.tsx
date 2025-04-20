// src/services/axios.tsx
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true, // si cookie JWT
});

let csrfToken: string | null = null;

axiosInstance.interceptors.request.use(async (config) => {
    const methodsRequiringCsrf = ["post", "put", "delete"];
    if (methodsRequiringCsrf.includes(config.method?.toLowerCase() ?? "")) {
        if (!csrfToken) {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/csrf-token`, {
                withCredentials: true,
            });
            csrfToken = response.data.csrfToken;
        }
        config.headers["X-CSRF-Token"] = csrfToken;
    }
    return config;
});

export default axiosInstance;
