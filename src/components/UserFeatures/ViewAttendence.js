import React, { useState } from "react";

const ViewAttendence = () => {
  const [attendence, setAttendence] = useState([]);

  const fetchingUsers = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };
  const displayAttendence = (attendence) => {
    attendence.map((attendence, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{attendence.date}</td>
          <td>{attendence.hasMarked ? "Present" : ""}</td>
        </tr>
      );
    });
  };
  return (
    <>
      <div className="container mt-2">
        <h3>Your attendence</h3>
        <button className="btn btn-primary" onClick={fetchingUsers}>
          Show
        </button>
        <hr />
        {/* Users data */}
        <div>
          <table className="table table table-success table-striped ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Attendence</th>
              </tr>
            </thead>
            <tbody>
              {
                // displaying data
                displayAttendence(attendence)
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewAttendence;
