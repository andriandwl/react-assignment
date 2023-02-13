import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

export default function LoginInput() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const emailValidator = (e) => {
    setEmail(e.target.value);

    if (validator.isEmail(email)) {
      setEmailError("Email Valid");
    } else {
      setEmailError("Email Tidak Valid");
    }
  };

  const passwordValidator = (e) => {
    setPassword(e.target.value);
    if (validator.isStrongPassword(password)) {
      setPasswordError("Password Valid");
    } else {
      setPasswordError("Password Tidak Valid");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          "https://reqres.in/api/login",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data.token);
          navigate("/");
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <form className="container d-flex">
        <div className="form-floating mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => emailValidator(e)}
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
          <span>{emailError}</span>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            value={password}
            onChange={(e) => passwordValidator(e)}
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
          <span>{passwordError}</span>
        </div>
        <button type="button" onClick={handleClick}>
          Login
        </button>
      </form>
    </div>
  );
}
