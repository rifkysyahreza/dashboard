import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { supabase } from "../supabaseClient";

function Navbar() {
  async function signOut() {
    const logOut = await supabase.auth.signOut();
  }

  return (
    <div>
      <nav className="w-full flex flex-row justify-between items-center py-10">
        <h1 className="text-3xl font-bold">Logo</h1>
        <div className="menu flex flex-row items-center justify-center gap-5">
          <Link to={"/"}>
            <h1>Home</h1>
          </Link>
          <Link to={"/customer"}>
            <h1>Customer</h1>
          </Link>
          <Link to={"/inventory"}>
            <h1>Inventory</h1>
          </Link>
          <Link to={"/staff"}>
            <h1>Staff</h1>
          </Link>
          <Button colorScheme="blue" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
