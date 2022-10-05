import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = (props) => {
  // Storing Credentials
  const adminUsername = "luqman123";
  const adminPass = "123";
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // For Redirecting
  let navigate = useNavigate();

  // For Handling Entered Values
  const changeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // for Handling Login Submit
  const loginHandler = async (e) => {
    e.preventDefault();
    if (
      credentials.username === adminUsername &&
      credentials.password === adminPass
    ) {
      localStorage.setItem("roleCheck", "admin");
      navigate("/");
      props.showAlert("Login Successful!", "success");
    } else {
      props.showAlert("Invalid login", "danger");
    }
  };
  return (
    <>
      {/* Login Form */}
      <div className="container mt-5">
        <h2>Admin Login</h2>
        <form onSubmit={loginHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              required
              value={credentials.username}
              onChange={changeHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={changeHandler}
              name="password"
              id="password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
