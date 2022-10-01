import React from "react";
import UserLogin from "../Login/UserLogin";
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
        <UserLogin />
      )}
    </>
  );
};

export default Home;
