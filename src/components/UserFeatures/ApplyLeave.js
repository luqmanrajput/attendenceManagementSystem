import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const ApplyLeave = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const showDate = new Date();
  const leaveDate =
    showDate.getDate() +
    "-" +
    (showDate.getMonth() + 1) +
    "-" +
    showDate.getFullYear();

  const changeHandler = (e) => {
    setMessage(e.target.value);
  };
  const leaveHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/userfeatures/applyleave",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ message, leaveDate }),
        }
      );

      const json = await response.json();
      console.log(json);
      if (json.dateCheck.toString() === "false") {
        navigate("/UserPanel");
        props.showAlert("Leave already applied", "danger");
      } else {
        navigate("/UserPanel");
        props.showAlert("Request for leave submitted!", "success");
      }
    } catch (error) {
      props.showAlert("An error occured", "danger");
    }
  };
  return (
    <>
      <div className="container mt-2">
        <div className="d-flex">
          <Link to="/UserPanel" className="btn btn-primary mx-2">
            Back
          </Link>
          <h3>Submit your leave request</h3>
        </div>
        <hr />
        <form onSubmit={leaveHandler}>
          <div className="mb-3">
            <label htmlFor="leaveDate" className="mt-2">
              Applying Leave for:
            </label>
            <br />
            <input
              value={leaveDate}
              readOnly={true}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Your Message:
            </label>
            <input
              type="String"
              className="form-control"
              required
              value={message}
              onChange={changeHandler}
            />
          </div>
          <br />
          <button className="btn btn-primary mt-2">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ApplyLeave;
