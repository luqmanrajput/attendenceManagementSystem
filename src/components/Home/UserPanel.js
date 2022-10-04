import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserPanel = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:5000/api/auth/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setUsername(json.name);
    };
    fetchUser();
  }, []);
  return (
    <>
      <div className="container mt-2">
        <em>
          <h1>
            Welcome,<em> {username} </em>!
          </h1>
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
