import React from "react";
import { Link } from "react-router-dom";

const AttendenceRecord = () => {
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
        <div className="d-flex">
          <input
            required
            type="email"
            name="email"
            className="form-control"
            // value=""
            placeholder="Enter User's email"
          />
          <button className="btn btn-primary mx-2">Search</button>
        </div>
        {/* Users Attendence */}
        <div className="mt-3">
          <table className="table table table-success table-striped ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Attendence</th>
              </tr>
            </thead>
            <tbody>{/* {displayAttendence(attendence)} */}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AttendenceRecord;
