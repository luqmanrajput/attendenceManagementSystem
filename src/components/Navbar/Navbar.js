import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  // For toggling activ class in Navbar
  const location = useLocation();

  // Removing token and redirecting to login page
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleCheck");
    navigate("/Login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="fa-solid fa-file-pen"></i>
            <strong>
              <em>A.M.S</em>
            </strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  to="/About"
                >
                  About
                </Link>
              </li>
            </ul>
            {localStorage.getItem("token") ? (
              <Link
                className="btn btn-primary mx-1"
                to="/Login"
                onClick={logoutHandler}
                role="button"
              >
                Logout
              </Link>
            ) : (
              <div className="d-flex">
                <div>
                  {/* Login Drop down */}
                  <li
                    className="nav-item dropdown btn btn-primary"
                    style={{ color: "white" }}
                  >
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Login
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/Login">
                          As User
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          As Admin
                        </Link>
                      </li>
                    </ul>
                  </li>
                </div>
                {/* Signup */}
                <Link
                  className="btn btn-primary mx-1"
                  to="/Signup"
                  role="button"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
