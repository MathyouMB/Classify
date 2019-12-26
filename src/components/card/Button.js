import React from "react";

const buttonStyles = {
  //padding: "24px 24px",
  width: "2.7em",
  height: "2.7em",
  background: "white",
  cursor: "pointer",
  border: "none",
  borderRadius: 3,
  marginTop: "1em",
  borderRadius: "50%",
  fontSize: "25px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"

};

const Button = ({ children, onClick, id }) => (
  <button id={id} onClick={onClick} style={{ ...buttonStyles }}>
    {children}
  </button>
);

export default Button;
