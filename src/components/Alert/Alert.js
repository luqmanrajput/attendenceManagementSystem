import React from "react";

const Alerts = (props) => {
  return (
    <>
      <div style={{ height: "50px" }}>
        {props.alert && (
          <div
            className={`alert alert-${props.alert.type} alert-dismissible fade show`}
            role="alert"
          >
            <em>{props.alert.msg}</em>
          </div>
        )}
      </div>
    </>
  );
};

export default Alerts;
