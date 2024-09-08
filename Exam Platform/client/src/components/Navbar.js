import React from "react";

const Navbar = ({ account }) => {
  return (
    <div style={{ textAlign: "center", color: "white" }}>
      <h1>Exam 3.0 TransParency++</h1>
      <p>Account: {account ? account : "Not connected"}</p>
    </div>
  );
};

export default Navbar;
