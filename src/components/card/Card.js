import React from "react";

const cardStyles = {
  background: "white",
  borderRadius: 3,
  width: "350px",
  height: "500px",
  cursor: "pointer",
  userSelect: "none",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.08)",
  top: 0
};

const Card = ({ zIndex = 0, children }) => (
  <div className="card" style={{ ...cardStyles, zIndex }}>{children}</div>
);

export default Card;