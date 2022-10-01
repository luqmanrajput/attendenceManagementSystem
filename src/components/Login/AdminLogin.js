import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  // Storing Credentials
  const adminEmail = "luqman@gmail.com";
  const adminPass = "123";
  const [credentials, setCredentials] = useState({ email: "", password: "" });

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
      credentials.email === adminEmail &&
      credentials.password === adminPass
    ) {
      localStorage.setItem("roleCheck", "admin");
      navigate("/");
      alert(`Welcome to eNotes!`, "success");
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
              Email address
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              required
              value={credentials.email}
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
