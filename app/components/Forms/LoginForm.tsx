import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../../../styles/login.module.css";

interface LoginFormValues {
  username: string;
  password: string;
  // remember: boolean;
}

const LoginForm: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (credentials) => {

    // console.log(credentials);

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      })

      const data = await response.json()
      // console.log("LoginForm data: ", data)

      if (response.ok) {
        setMessage('Signed in successfully!')
        localStorage.setItem('token', data.token)
      } else {
        setMessage(data.message)
      }
    } catch (error) {
      setMessage( 'An error occurred. Please try again.' )
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.header}>Login</h2>
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
      {/* <div className={styles.rememberMe}>
        <input id="remember" type="checkbox" {...register("remember")} />
        <label htmlFor="remember">Remember me</label>
      </div> */}
      <button type="submit" className={styles.submitButton}>
        Login
      </button>
      { message && <p>{message}</p>}
    </form>
  );
};

export default LoginForm;
