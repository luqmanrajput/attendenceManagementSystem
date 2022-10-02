import React from "react";
import { Link } from "react-router-dom";

const UserPanel = () => {
  return (
    <>
      <div className="container mt-5">
        <em>
          <h1>Welcome, User</h1>
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
