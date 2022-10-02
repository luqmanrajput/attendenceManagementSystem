import React from "react";
// import { useNavigate } from "react-router-dom";

const MarkAttendence = () => {
  // For redirecting
  // const navigate = useNavigate();
  // Current Date
  const showDate = new Date();
  const todaysDate =
    showDate.getDate() +
    "-" +
    showDate.getMonth() +
    "-" +
    showDate.getFullYear();
  const attendenceHandler = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/userfeatures/markattendence",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ todaysDate }),
        }
      );
      const json = await response.json();
      console.log(json.success, json.dateCheck);
      if (json.dateCheck !== "false") {
        alert("Present");
      } else {
        alert("already marked");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <form>
          <h3> Mark Your Attendence</h3>
          <hr />
          <label htmlFor="todaysDate" className="mt-2">
            Add attendence for:
          </label>
          <br />
          <input
            type="text"
            value={todaysDate}
            readOnly={true}
            className="mt-3"
          />
          <br />
          <button className="btn btn-primary mt-2" onClick={attendenceHandler}>
            Present
          </button>
        </form>
      </div>
    </>
  );
};

export default MarkAttendence;
