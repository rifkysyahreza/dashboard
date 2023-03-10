import React from "react";
import Navbar from "./Navbar";

function Baselayout(props) {
  return (
    <div>
      <Navbar></Navbar>
      {props.children}
    </div>
  );
}

export default Baselayout;
