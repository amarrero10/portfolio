import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    setOpened(false);
  };

  return (
    <div className="md:flex flex-1 justify-between text-Midnight-Blue md:w-8/12 md:mx-auto items-center h-20 text-xl">
      <div className="max-[767px]:w-full flex justify-between items-center h-12 px-4 ">
        <NavLink className="group text-Midnight-Blue transition duration-300" to="/">
          <h1 className=" max-[767px]:h-20 max-[767px]:flex max-[767px]:items-center">
            Albert Marrero
            <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-Midnight-Blue"></span>
          </h1>
        </NavLink>
        {/* Hamburger menu */}
        <svg
          className={classNames({ opened }, "h-8 w-8 min-[767px]:hidden")}
          onClick={() => setOpened(!opened)}
          width="100"
          height="100"
          viewBox="0 0 100 100"
        >
          <path
            className="line line1"
            d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
          />
          <path className="line line2" d="M 20,50 H 80" />
          <path
            className="line line3"
            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
          />
        </svg>
      </div>
      <div className=" flex flex-2 w-1/2 bg-blue-300 justify-between items-center px-4 max-[767px]:hidden">
        <NavLink to="/" className="group text-Midnight-Blue transition duration-300">
          Home
          <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-Midnight-Blue "></span>
        </NavLink>
        <NavLink to="/About" className="group text-Midnight-Blue transition duration-300">
          About
          <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-Midnight-Blue "></span>
        </NavLink>
        <NavLink to="/Portfolio" className="group text-Midnight-Blue transition duration-300">
          Portfolio
          <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-Midnight-Blue "></span>
        </NavLink>
        <NavLink to="/Contact" className="group text-Midnight-Blue transition duration-300">
          Contact
          <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-Midnight-Blue "></span>
        </NavLink>
      </div>

      <Transition
        show={opened}
        enter="transform transition ease-in-out duration-500"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500 "
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="flex flex-col z-10 h-screen bg-Deep-Blue text-Dusty-Rose ">
          <NavLink
            className={"h-20 text-3xl text-center flex justify-center items-center"}
            onClick={handleClick}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={"h-20 text-3xl text-center flex justify-center items-center"}
            onClick={handleClick}
            to="/About"
          >
            About
          </NavLink>
          <NavLink
            className={"h-20 text-3xl text-center flex justify-center items-center"}
            onClick={handleClick}
            to="/Portfolio"
          >
            Portfolio
          </NavLink>
          <NavLink
            className={"h-20 text-3xl text-center flex justify-center items-center"}
            onClick={handleClick}
            to="/Contact"
          >
            Contact
          </NavLink>
        </div>
      </Transition>
    </div>
  );
}

export default Navbar;
