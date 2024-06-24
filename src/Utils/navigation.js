import { useNavigate } from "react-router-dom";

export const useCustomNavigate = () => {
    const navigate = useNavigate();

    const customNavigate = (path) => {
        navigate(path);
    };

    return customNavigate;
};