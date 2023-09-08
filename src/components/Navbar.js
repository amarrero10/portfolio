import React from "react";
import logo from "../images/LOGO.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className=" flex justify-between px-4 pt-2 w-screen">
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className=" h-14" />
        </Link>
      </div>
      <div className=" w-1/6 flex justify-between items-center">
        <button className=" hidden sm:block hover:underline hover:text-blurple text-lg">
          Resume
        </button>
        <button className=" text-lg border border-cherry px-5 h-fit py-2 rounded-md text-cherry hover:bg-cherry hover:text-sand">
          Say Hi 👋🏼
        </button>
      </div>
    </div>
  );
}

export default Navbar;
