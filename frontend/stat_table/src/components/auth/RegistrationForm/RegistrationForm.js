import React, { useState } from "react";
import styles from "./RegistrationForm.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const register = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name: ${name}\nEmail: ${email}\nPassword: ${password}`);
    axios.post("http://localhost:3000/register", {
      nick_name: name,
      email: email,
      password: password,
    });
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.registrationForm}>
      <h1 className={styles.title}>Registration Form</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name" className={styles.label}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          className={styles.input}
        />

        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className={styles.input}
        />

        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <div className={styles.password}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
          />
          <span
            onClick={() => setShowPassword((prevState) => !prevState)}
            className={`${styles.showPassword} ${
              showPassword ? styles.showPasswordActive : ""
            }`}
          >
            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
          </span>
        </div>

        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
