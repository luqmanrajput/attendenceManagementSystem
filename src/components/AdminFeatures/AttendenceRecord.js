import React, { useState } from "react";
import { Link } from "react-router-dom";

const AttendenceRecord = (props) => {
  const [email, setEmail] = useState("");
  const [attendence, setAttendence] = useState(null);
  const [totalPresent, setTotalPresent] = useState(null);
  // const [totalLeaves, setTotalLeaves] = useState(null);

  const changeHandler = (e) => {
    setEmail(e.target.value);
  };

  // Fetching Attendence record from database
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let key = email;
      const response = await fetch(
        `http://localhost:5000/api/adminfeatures/attendencerecord/${key}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      console.log(json);
      setAttendence(json.attendence);
      setTotalPresent(json.attendence.length);
    } catch (error) {
      props.showAlert("An error occured", "danger");
    }
  };

  // Displaying Attendence
  const displayAttendence = (attendence) => {
    if (!attendence) {
      return (
        <tr>
          <th colSpan={4}>Search to view records...</th>
        </tr>
      );
    }

    return attendence.map((attendence, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{attendence.date}</td>
        <td>{attendence.attendenceType === "present" ? "Present" : "Leave"}</td>
        <td>
          <button
            className="btn-danger btn mx-2"
            onClick={() => {
              deleteAttendence(attendence._id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  // Deleting Attendence
  const deleteAttendence = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/adminfeatures/deleteattendence/${id}`,
        {
          method: "DELETE",
        }
      );

      const json = await response.json();
      console.log(json);
      if (json.success) {
        props.showAlert("Record deleted!", "success");
      } else {
        props.showAlert("An error occured with backend!", "danger");
      }
    } catch (error) {
      props.showAlert("An error occured", "danger");
    }
  };
  return (
    <>
      <div className="container mt-2">
        <div className="d-flex">
          <Link to="/AdminPanel" className="btn btn-primary mx-2">
            Back
          </Link>
          <h3>Attendence Record</h3>
        </div>
        <hr />
        <form onSubmit={submitHandler} className="d-flex">
          <input
            required
            type="email"
            name="email"
            onChange={changeHandler}
            className="form-control"
            value={email}
            placeholder="Enter User's email"
          />
          <button className="btn btn-primary mx-2">Search</button>
        </form>
        {/* Users Attendence */}
        <div className="mt-3">
          <table className="table table table-success table-striped ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Attendence</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{displayAttendence(attendence)}</tbody>
          </table>
        </div>
        {/* Record OverView */}
        <h6>Total Presents:</h6>
        <p>
          <strong>{totalPresent}</strong>
        </p>
      </div>
    </>
  );
};

export default AttendenceRecord;
