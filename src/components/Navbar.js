import React from "react";
import logo from "../images/LOGO.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className=" flex justify-between px-4 pt-2">
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className=" h-14" />
        </Link>
      </div>
      <div className=" md:w-1/6 sm:1/4 flex justify-between items-center">
        <a
          href="https://docs.google.com/document/d/1hs4EUcQC2Ki3npJKCCwj43yyOj5s62qd/edit?usp=sharing&ouid=110756131260014420215&rtpof=true&sd=true"
          target="_blank"
          rel="noreferrer"
        >
          <button className=" hidden sm:block hover:underline hover:text-blurple text-lg">
            Resume
          </button>
        </a>
        <Link to="/contact">
          <button className=" text-lg border border-cherry px-5 h-fit py-2 rounded-md text-cherry hover:bg-cherry hover:text-sand">
            Say Hi 👋🏼
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
