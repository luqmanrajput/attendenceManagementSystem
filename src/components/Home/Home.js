import React from "react";
import Login from "../Login/Login";
import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";

const Home = () => {
  return (
    <>
      {localStorage.getItem("roleCheck") === "user" ? (
        <UserPanel />
      ) : localStorage.getItem("roleCheck") === "admin" ? (
        <AdminPanel />
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
