import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  // Creating state for form data
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  // Handling Inputs
  const changeHandler = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  // Handling Submitted Form
  const signupHandler = async (e) => {
    // Preventing Reload on submission
    e.preventDefault();

    // Checking if password and confirm password matches
    if (signupData.password === signupData.cpassword) {
      try {
        const { name, email, password } = signupData;

        // Calling Api to create user
        const response = await fetch(
          "http://localhost:5000/api/auth/createuser",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          }
        );

        // Redirecting if Signup is successful
        const json = await response.json();
        console.log(json.success);
        console.log(json.authToken);
        if (json.success) {
          localStorage.setItem("token", json.authToken);
          navigate("/UserLogin");
          alert("Registeration Success full now you can login!");
        } else {
          console.log("backend error");
        }
      } catch (error) {
        console.log(error);
        alert("An error occured with failure");
      }
    } else {
      alert("Passwords do not match");
    }
  };
  return (
    <>
      {/* Signup Form */}
      <div className="container mt-5">
        <h2>Sign Up</h2>
        <form onSubmit={signupHandler}>
          <div className="my-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              minLength={3}
              required
              value={signupData.name}
              onChange={changeHandler}
            />
          </div>
          <div className="my-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              required
              value={signupData.email}
              onChange={changeHandler}
            />
          </div>
          <div className="my-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              required
              value={signupData.password}
              minLength={5}
              onChange={changeHandler}
              name="password"
              id="password"
            />
          </div>
          <div className="my-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              required
              value={signupData.cpassword}
              minLength={5}
              onChange={changeHandler}
              name="cpassword"
              id="cpassword"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
