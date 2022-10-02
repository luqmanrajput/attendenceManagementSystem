import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const ApplyLeave = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const showDate = new Date();
  const leaveDate =
    showDate.getDate() +
    "-" +
    showDate.getMonth() +
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
        alert("Leave already applied");
      } else {
        navigate("/UserPanel");
        alert("Request for leave submitted!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <form onSubmit={leaveHandler}>
          <h3>Submit your leave request</h3>
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
