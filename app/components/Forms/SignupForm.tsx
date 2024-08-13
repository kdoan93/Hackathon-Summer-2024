import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../../../styles/login.module.css";

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormValues>();

  const onSubmit: SubmitHandler<SignupFormValues> = async (newUser) => {
    if (newUser.password !== newUser.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('User created successfully!');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.header}>Sign Up</h2>
      <div className={styles.field}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
          className={`${styles.input} ${errors.username ? styles.errorInput : ""}`}
          placeholder="Enter your username"
        />
        {errors.username && (
          <span className={styles.errorMessage}>{errors.username.message}</span>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          {...register("email", {
            required: "Email is required",
            minLength: {
              value: 3,
              message: "Email must be at least 3 characters",
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email must be a valid email address",
            }
          })}
          className={`${styles.input} ${errors.email ? styles.errorInput : ""}`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email.message}</span>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
          className={`${styles.input} ${errors.password ? styles.errorInput : ""}`}
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className={styles.errorMessage}>{errors.password.message}</span>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === watch("password") || "Passwords do not match",
          })}
          className={`${styles.input} ${errors.confirmPassword ? styles.errorInput : ""}`}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <span className={styles.errorMessage}>{errors.confirmPassword.message}</span>
        )}
      </div>
      {/* <div className={styles.rememberMe}>
        <input id="remember" type="checkbox" {...register("remember")} />
        <label htmlFor="remember">Remember me</label>
      </div> */}
      <button type="submit" className={styles.submitButton}>
        Sign Up
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SignupForm;
