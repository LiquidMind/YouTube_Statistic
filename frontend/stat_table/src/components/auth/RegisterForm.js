import React, { useState } from "react";
import "./LoginForm.css"; // Застосування стилів з LoginForm, так як вони однакові

const RegisterForm = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit">
          Реєстрація
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
