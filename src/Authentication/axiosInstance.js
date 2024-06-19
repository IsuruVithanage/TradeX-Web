import axios from 'axios';
import {useCustomNavigate} from "../Utils/navigation";
import {setAccessToken, getAccessToken} from '../Storage/SecureLs';


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
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                console.log('error.response', error.response);
                originalRequest._retry = true;
                try {
                    const {data} = await axiosInstance.post('/user/refreshToken');
                    setAccessToken(data.accessToken);
                    originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                    return axiosInstance(originalRequest);
                } catch (err) {
                    customNavigate('/');
                    return Promise.reject(err);
                }
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
}

