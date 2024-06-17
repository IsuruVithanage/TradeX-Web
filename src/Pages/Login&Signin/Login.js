import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import trade from "../../Assets/Images/trade.png";
import BasicPage from "../../Components/BasicPage/BasicPage";
import "./Login.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../Features/User";

function Login({ firebase }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(values);
    axios
      .post("http://localhost:8004/user/login", values)
      .then((res) => {
        const token = res.data.token;
        const user = res.data.user;

        const userData = {
          id: user.userId,
          username: user.userName,
          email: user.email,
          isVerified: user.isVerified,
          hasTakenQuiz: user.hasTakenQuiz,
          level: user.level,
        };

        console.log("Token:", token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("access-token", token);
        console.log("Login success");
        firebase.getToken();

        if (user.hasTakenQuiz) {
          navigate("/watchlist");
        } else {
          navigate("/quiz");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  return (
    <BasicPage
      sideNavBar={false}
      TopNavBar={false}
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
