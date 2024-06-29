import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import notificationManager from "../Alert/notificationManager";
import trade from "../../Assets/Images/trade.png";
<<<<<<< HEAD
import BasicPage from "../../Components/BasicPage/BasicPage";
import { useAuthInterceptor } from "../../Authentication/axiosInstance";
import { setAccessToken, setUser } from "../../Storage/SecureLs";
=======
import BasicPage from "../../Components/Layouts/BasicPage/BasicPage";
import {useAuthInterceptor} from "../../Authentication/axiosInstance";
import {setAccessToken, setUser, getUser} from "../../Storage/SecureLs";
>>>>>>> cdde2f59dc332014889ca9e24cd066c500d7f438
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const axiosInstance = useAuthInterceptor();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post("/user/login", values);
      const token = response.data.accessToken;
      const user = response.data.user;
      setUser(user);
      setAccessToken(token);

      notificationManager.getToken();

<<<<<<< HEAD
      console.log("Login success");

      if (user.role === "User") {
        if (user.hasTakenQuiz) {
          navigate("/watchlist");
        } else {
          navigate("/quiz");
=======
            await notificationManager.getToken();

            console.log('Login success');

            if (user.role === 'User' || (user.role === 'Trader' && user.hasTakenQuiz)) {
                navigate('/watchlist');
            } else if (user.role === 'Admin') {
                navigate('/admin/AdDashboard');
            } else if (user.role === 'Trader' && !user.hasTakenQuiz) {
                navigate('/quiz');
            }
        } catch (err) {
            console.error('Login error:', err);
>>>>>>> cdde2f59dc332014889ca9e24cd066c500d7f438
        }
      } else {
        navigate("/admin/AdDashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <BasicPage
      sideNavBar={false}
      topNavBar={false}
      icon={<img src={trade} width="73px" alt="tradex" />}
    >
      <div>
        <div className="topic">
          <h1 className="welcome">WELCOME</h1>
          <h1 className="traders">TRADERS</h1>
        </div>
        <div className="black-background">
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="User Name"
              className="uname-input"
              name="email"
              onChange={handleInput}
            />
            {errors.email && (
              <span className="text-danger-uname"> {errors.email}</span>
            )}
            <input
              type="password"
              placeholder="Password"
              className="password-input"
              name="password"
              onChange={handleInput}
            />
            {errors.password && (
              <span className="text-danger-password"> {errors.password}</span>
            )}

            <div className="forgot-password">
              <label htmlFor="forgot-password">Forgot Password ?</label>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <div className="have-account">
            <div className="having-text">Do not have an account?</div>
            <Link to="/Signup">
              <div className="signup-link">SignUp</div>
            </Link>
          </div>
        </div>
      </div>
    </BasicPage>
  );
}

export default Login;
