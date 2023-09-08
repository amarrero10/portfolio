import React from "react";
import portrait from "../images/Professional Pic.jpeg";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="lg:flex-row md:w-8/12 md:mx-auto px-4 md:flex-col md:flex justify-between items-center text-center mt-32 w-screen">
      <div className="lg:w-1/2  text-Midnight-Blue w-screen">
        <h1 className="px-4 2xl:text-6xl text-4xl font-bold ">👋🏼 I am Albert!</h1>
        <h2 className="px-4 2xl:text-2xl text-xl mt-4 ">Software Engineer</h2>
        <p className="mt-4">
          With a strong foundation in both front-end and back-end technologies, I strive to create
          innovative, accessible, and user-friendly applications that solve real-world problems. I
          invite you to explore my portfolio, where you'll find a collection of my projects that
          showcase my skills and expertise. Let's create something amazing together!
        </p>
        <div className="mt-10 sm:w-96 mx-auto flex flex-col sm:flex-row items-center sm:mt-4 w-screen">
          <Link
            to="/Portfolio"
            className="w-1/2 bg-Midnight-Blue text-Dusty-Rose sm:mr-3 py-3 rounded-full hover:bg-Dusty-Rose hover:text-Midnight-Blue"
          >
            <p>View My Work!</p>
          </Link>
          <Link
            to="/Contact"
            className="w-1/2 bg-Midnight-Blue text-Dusty-Rose py-3 rounded-full hover:bg-Dusty-Rose hover:text-Midnight-Blue sm:mt-0 mt-4"
          >
            <p>Contact Me</p>
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-[220px] md:max-w-[350px] mt-10">
          <img src={portrait} alt="professional portrait" className="rounded-full "></img>
        </div>
      </div>
    </div>
  );
}

export default Main;
