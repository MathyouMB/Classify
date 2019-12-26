import React from "react";

const cardStyles = {
  background: "whitesmoke",
  borderRadius: 3,
  width: "350px",
  height: "500px",
  cursor: "pointer",
  userSelect: "none",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "4px 8px 1px #9E9E9E",
  top: 0
};

const Card = ({ zIndex = 0, children }) => (
  <div className="card" style={{ ...cardStyles, zIndex }}>{children}</div>
);

export default Card;