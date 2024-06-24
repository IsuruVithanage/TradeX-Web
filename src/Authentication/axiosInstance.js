import axios from 'axios';
import { useCustomNavigate } from "../Utils/navigation";
import { setAccessToken, getAccessToken } from '../Storage/SecureLs';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_GATEWAY,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include credentials (cookies)
});

export const useAuthInterceptor = () => {
    const customNavigate = useCustomNavigate();

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = getAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response && (error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
                console.log('Access token expired, attempting to refresh');
                originalRequest._retry = true;
                try {
                    const { data } = await axios.post(`${process.env.REACT_APP_API_GATEWAY}/user/refreshToken`, {}, { withCredentials: true });
                    setAccessToken(data.accessToken);
                    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                    console.log('Access token refreshed successfully');
                    return axiosInstance(originalRequest);
                } catch (err) {
                    console.log('Failed to refresh token', err);
                    customNavigate('/');
                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
}