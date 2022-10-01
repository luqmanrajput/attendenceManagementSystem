import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  // Storing Credentials
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // For redirecting after successfull login
  let navigate = useNavigate();

  // for handling Login
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log(json.success, json.authToken, json.roleCheck);
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        localStorage.setItem("roleCheck", json.roleCheck);
        navigate("/");
        alert(`Welcome to eNotes!`, "success");
      } else {
        alert(`Invalid Credentials`, "danger");
      }
    } catch (error) {
      console.log(error);
      alert(`An error occured`, "danger");
    }
  };

  // For handling entered values
  const changeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Login Form */}
      <div className="container mt-5">
        <h2>Login to continue!</h2>
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

export default Login;
