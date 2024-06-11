import axios from 'axios';
import { store } from '../index';
import { setAccessToken } from '../Features/authSlice';
import { useCustomNavigate } from '../Utils/navigation';

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
            const state = store.getState();
            const token = state.auth.accessToken;

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
            if (error.response && !error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const { data } = await axiosInstance.post('/user/refreshToken');

                    store.dispatch(setAccessToken(data.accessToken));
                    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                    return axiosInstance(originalRequest);
                } catch (err) {
                    console.log('Error refreshing token:', err);
                    customNavigate('/'); // Use the custom navigate function
                    return Promise.reject(err);
                }
            } else if (error.response && error.response.status === 401) {
                console.log('Error 401:', error.response.data.message);
                customNavigate('/'); // Use the custom navigate function
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};