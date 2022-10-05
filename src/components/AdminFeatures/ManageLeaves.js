import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ManageLeaves = (props) => {
  const [leaves, setLeaves] = useState();

  useEffect(() => {
    // Getting leaves
    const fetchingLeaves = async () => {
      const response = await fetch(
        "http://localhost:5000/api/adminfeatures/manageleaves",
        {
          method: "GET",
        }
      );
      const json = await response.json();
      console.log(json);
      setLeaves(json.leaves);
    };
    fetchingLeaves();
  }, []);

  // Displaying leaves
  const displayLeaves = (leaves) => {
    if (!leaves) {
      return (
        <tr>
          <td>Loading...</td>
          <td>Loading...</td>
          <td>Loading...</td>
          <td>Loading...</td>
          <td>Loading...</td>
        </tr>
      );
    }

    return leaves.map((leaves, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{leaves.date}</td>
        <td>{leaves.message}</td>
        <td>{leaves.category}</td>
        <td>
          <button
            className="btn-success btn mx-2"
            onClick={() => acceptHandler(leaves._id, leaves.user, leaves.date)}
          >
            Accept
          </button>
          <button
            className="btn-danger btn mx-2"
            onClick={() => deleteHandler(leaves._id)}
          >
            Decline
          </button>
        </td>
      </tr>
    ));
  };

  // Accepting Leave API
  const acceptHandler = async (id, userId, leaveDate) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/adminfeatures/acceptleaves/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, leaveDate }),
        }
      );

      const json = await response.json();
      console.log(json);
      if (json.success) {
        props.showAlert("Leave Accepted!", "success");
      } else {
        props.showAlert(`${json.error}`, "danger");
      }
    } catch (error) {
      props.showAlert("An error occured", "danger");
    }
  };
  //   Deleting Leave Api
  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/adminfeatures/deleteleaves/${id}`,
        {
          method: "DELETE",
        }
      );

      const json = await response.json();
      console.log(json);
      if (json.success) {
        props.showAlert("Record deleted!", "success");
      } else {
        props.showAlert(`${json.error}`, "danger");
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
          <h3>Manage Leaves</h3>
        </div>
        <hr />
        {/* DIsplaying Leaves */}
        <div className="mt-3">
          <table className="table table table-success table-striped ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Message</th>
                <th scope="col">Type</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{displayLeaves(leaves)}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageLeaves;
