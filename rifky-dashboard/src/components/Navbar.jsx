import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="w-full flex flex-row justify-between items-center py-10">
        <h1 className="text-3xl font-bold">Logo</h1>
        <div className="menu flex gap-5">
          <Link to={"/"}>
            <h1>Home</h1>
          </Link>
          <Link to={"/customer"}>
            <h1>Customer</h1>
          </Link>
          <Link to={"inventory"}>
            <h1>Inventory</h1>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
