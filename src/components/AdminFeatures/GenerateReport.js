import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const GenerateReport = (props) => {
  const [email, setEmail] = useState("");
  const [presentCount, setPresentCount] = useState(null);
  const [leaveCount, setLeaveCount] = useState(null);
  const [user, setUser] = useState(null);
  const ref = useRef(null);

  const changeHandler = (e) => {
    setEmail(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let key = email;
      const response = await fetch(
        `http://localhost:5000/api/adminfeatures/generatereport/${key}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      if (json.success) {
        setPresentCount(json.presentCount);
        setLeaveCount(json.leaveCount);
        setUser(json.user[0]);
      }
    } catch (error) {
      props.showAlert(`${error}`, "danger");
    }
    ref.current.click();
  };

  return (
    <>
      <div className="container mt-2">
        <div className="d-flex">
          <Link to="/AdminPanel" className="btn btn-primary mx-2">
            Back
          </Link>
          <h3>Generate Report</h3>
        </div>
        <hr />

        {/* Button trigger modal  */}
        <form className="d-flex" onSubmit={submitHandler}>
          <input
            required
            type="email"
            name="email"
            onChange={changeHandler}
            className="form-control"
            value={email}
            placeholder="Enter email to generate report of user"
          />
          <button className="btn btn-primary mx-2">
            <i className="fa-solid fa-file-circle-plus"></i>Generate
          </button>
        </form>
        {/* referaal button */}
        <button
          ref={ref}
          type="button"
          className="btn btn-primary mx-3 d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
        >
          <i className="fa-solid fa-file-circle-plus"> Generate</i>
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
                  Attendence Report
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <h4>Name:</h4>
                <p>{user ? user.name : ""}</p>
                <h4>Email:</h4>
                <p>{user ? user.email : ""}</p>
                <h5>Present Count:</h5>
                <p>{presentCount}</p>
                <h5>Leave Count:</h5>
                <p>{leaveCount}</p>
                <h5>Your Grade:</h5>
                <p>
                  {presentCount >= 26
                    ? "A Grade"
                    : presentCount <= 10
                    ? "D Grade"
                    : "B"}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateReport;
