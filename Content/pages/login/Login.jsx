import React, { useState, useEffect } from "react";
import validateUser from "./validateUser.jsx";
import useFormLogin from "./useFormLogin.jsx";
import axios from "axios";
import { useHistory } from "react-router";

import { Link } from "react-router-dom";
const Login = ({ isAuthenticated, authenticated }) => {
  console.log(isAuthenticated);
  const history = useHistory();
  const [errorLogin, setErorLogin] = useState("");
  const submitForm = () => {
    console.log(user);
    let userFormLogin = new FormData();
    userFormLogin.append("username", user.username);
    userFormLogin.append("password", user.password);
    axios
      .post("/data/login", userFormLogin)
      .then((res) => {
        // localStorage.setItem("user", JSON.stringify(res.data));
        authenticated();
      })
      .catch((e) => {
        setErorLogin("Tên tài khoản hoặc mật khẩu không chính xác");
      });
  };
  const { handleChange, handleSubmit, user, errors } = useFormLogin(
    submitForm,
    validateUser
  );

  return (
    <div className="login-container">
      <div
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log("test enter");
            handleSubmit(e);
          }
        }}
        className="login-form"
      >
        <h3 id="login-form-title">ĐĂNG NHẬP</h3>

        <div className="login-form-inputs">
          <input
            value={user.username}
            className="login-form-input"
            type="text"
            placeholder="Tài khoản"
            onChange={handleChange}
            name="username"
          />
          <p className="login-form-error">{errors.username}</p>
        </div>
        <div className="login-form-inputs">
          <input
            className="login-form-input"
            type="password"
            placeholder="Mật khẩu"
            value={user.password}
            name="password"
            onChange={handleChange}
          />
          <p className="login-form-error">{errors.password}</p>
        </div>

        <div className="login-form-row login-failed">
          <p>{errorLogin}</p>
        </div>
        <div className="login-form-item">
          <button onClick={handleSubmit} className="btn-login">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
