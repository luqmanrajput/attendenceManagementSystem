import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ViewAttendence = () => {
  const [attendence, setAttendence] = useState();

  useEffect(() => {
    const fetchingUsers = async () => {
      const response = await fetch(
        "http://localhost:5000/api/userfeatures/viewattendence",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      setAttendence(json.attendence);
    };
    fetchingUsers();
  }, []);

  const displayAttendence = (attendence) => {
    if (!attendence) {
      console.log("no attendence");
      return (
        <tr>
          <td>Loading...</td>
          <td>Loading...</td>
          <td>Loading...</td>
        </tr>
      );
    }
    debugger;
    return attendence.map((attendence, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{attendence.date}</td>
        <td>{attendence.hasMarked ? "Present" : ""}</td>
      </tr>
    ));
  };
  return (
    <>
      <div className="container mt-2">
        <div className="d-flex">
          <Link to="/UserPanel" className="btn btn-primary mx-2">
            Back
          </Link>
          <h3>Your attendence</h3>
        </div>
        <hr />
        {/* Users Attendence */}
        <div>
          <table className="table table table-success table-striped ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Attendence</th>
              </tr>
            </thead>
            <tbody>{displayAttendence(attendence)}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewAttendence;
