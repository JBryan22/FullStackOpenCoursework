import React from "react";

const Notification = ({ message, addedClass }) => {
  if (message === null) {
    return null;
  }

  const successClass = addedClass ? "success" : "error";
  return <div className={`notification ${successClass}`}>{message}</div>;
};

export default Notification;
