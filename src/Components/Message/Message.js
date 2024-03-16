import { message } from 'antd';
import './Message.css';


export const showMessage = (type, content, duration) => {
    duration = (!duration) ? 1.5 : duration;

    switch (type) {
        case 'success':
        case 200:
            message.success({
                className: "success-message",
                content: content,
                duration: duration
            });
            break;

        case 'info':
            message.info({
                className: "info-message",
                content: content,
                duration: duration
            });
            break;

        case 'warning':
            message.warning({
                className: "warning-message",
                content: content,
                duration: duration
            });
            break;

        default:
            message.error({
                className: "error-message",
                content: content,
                duration: duration
            });
    }
};