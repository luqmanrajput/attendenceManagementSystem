import React, { useState } from "react";
import { Link } from "react-router-dom";

const AttendenceRecord = (props) => {
  const [email, setEmail] = useState("");
  const [attendence, setAttendence] = useState(null);

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
  // Add Attendence Module
  const [attendEmail, setAttendEmail] = useState("");
  const addAttendChangeHandler = (e) => {
    setAttendEmail(e.target.value);
  };
  // Handling second form to add attendence
  const addAttendSubmitHandler = async (e) => {
    e.preventDefault();
    let selectedDate = document.getElementById("date").value;
    try {
      const response = await fetch(
        "http://localhost:5000/api/adminfeatures/markattendence",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ attendEmail, selectedDate }),
        }
      );
      const json = await response.json();
      if (json.success) {
        props.showAlert(`${json.error}`, "success");
      } else {
        props.showAlert(`${json.error}`, "danger");
      }
    } catch (error) {
      console.log(error);
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

        {/* Adding Attendence */}

        {/* Button trigger modal  */}
        <button
          type="button"
          className="btn btn-primary mt-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
        >
          <i className="fa-solid fa-file-circle-plus"> Add Attendence</i>
        </button>

        {/* Modal  */}
        <div
          className="modal fade"
          id="exampleModal2"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel2"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel2">
                  Add Attendence
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* Form */}
                <form onSubmit={addAttendSubmitHandler}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={attendEmail}
                      onChange={addAttendChangeHandler}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
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
      </div>
    </>
  );
};

export default AttendenceRecord;
