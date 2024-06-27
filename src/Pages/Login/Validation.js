export default function Validation({username, email, password}) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (username === "") {
        return "Username should not be empty";
    }
    if (/[^a-zA-Z\s]/.test(username)) {
        return "Username can only contain letters and spaces.";
    }
    if (email === "") {
        return "E-mail should not be empty";
    }
    if (!emailPattern.test(email)) {
        return "Invalid E-mail Address";
    }
    if (password === "") {
        return "Password should not be empty";
    }
    if (password.length < 8) {
        return "Password must be at least 8 characters long.";
    }
    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }
    if (!/\d/.test(password)) {
        return "Password must contain at least one digit.";
    }
    if (/[^a-zA-Z0-9@]/.test(password)) {
        return "Password can only contain letters, numbers, and the '@' symbol.";
    }
    return "";
};