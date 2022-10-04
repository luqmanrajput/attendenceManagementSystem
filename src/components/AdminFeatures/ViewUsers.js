import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ViewUsers = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchingUsers = async () => {
      const response = await fetch(
        "http://localhost:5000/api/adminfeatures/viewusers",
        { method: "GET" }
      );
      const json = await response.json();
      setUsers(json.users);
    };
    fetchingUsers();
  }, []);
  console.log(users);
  const displayUsers = (users) => {
    if (!users) {
      console.log("no users");
      return (
        <tr>
          <td>Loading...</td>
          <td>Loading...</td>
          <td>Loading...</td>
        </tr>
      );
    }
    return users.map((users, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{users.name}</td>
        <td>{users.email}</td>
      </tr>
    ));
  };
  return (
    <>
      <div className="container mt-2">
        <div className="d-flex">
          <Link to="/AdminPanel" className="btn btn-primary mx-2">
            Back
          </Link>
          <h3>Users List</h3>
        </div>
        <hr />
        {/* Users Display */}
        <div>
          <table className="table table table-success table-striped ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>{displayUsers(users)}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewUsers;
