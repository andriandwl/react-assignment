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
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => emailValidator(e)}
        />
        <span>{emailError}</span>
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => passwordValidator(e)}
        />
        <span>{passwordError}</span>
        <button type="button" onClick={handleClick}>
          Login
        </button>
      </form>
    </div>
  );
}
