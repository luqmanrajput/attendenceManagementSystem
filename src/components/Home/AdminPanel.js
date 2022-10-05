import React from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <>
      <div className="container mt-2">
        <em>
          <h1>Welcome to admin panel!</h1>
        </em>
        <hr />
        <Link className="btn btn-primary mx-3" to="/ViewUsers">
          View Users
        </Link>
        <Link className="btn btn-primary mx-3" to="/AttendenceRecord">
          Attendence Record
        </Link>
        <Link className="btn btn-primary mx-3" to="/ManageLeaves">
          Manage Leaves
        </Link>
      </div>
    </>
  );
};

export default AdminPanel;
