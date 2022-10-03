import React from "react";
import { Link } from "react-router-dom";

const UserPanel = () => {
  // const fetchUser = async () => {
  //   const response = await fetch("http://localhost:5000/api/auth/getuser", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token": localStorage.getItem("token"),
  //     },
  //   });
  //   const json = response.json();
  //   return json.user.name;
  // };
  return (
    <>
      <div className="container mt-2">
        <em>
          <h1>Welcome!</h1>
        </em>
        <hr />
        <Link className="btn btn-primary mx-3" to="/MarkAttendence">
          Mark Attendence
        </Link>
        <Link className="btn btn-primary mx-3" to="/ApplyLeave">
          Apply Leave
        </Link>
        <Link className="btn btn-primary mx-3" to="/ViewAttendence">
          View Attendence
        </Link>
      </div>
    </>
  );
};

export default UserPanel;
