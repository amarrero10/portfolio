import React from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { RiTwitterXFill } from "react-icons/ri";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col justify-between items-center mx-auto py-3 sm:h-[220px]  bg-cherry text-sand">
      <h1> &copy; {currentYear} Albert Marrero </h1>

      <div className="flex flex-col text-center justify-between w-1/3 mx-auto">
        <p>Open to relocation</p>
        <p>Contact me at: </p>
        <p>albert.marrero10@gmail.com</p>
      </div>
      <p className="text-center">Social Media Links:</p>
      <div className="w-1/3">
        <div className="flex w-1/2 justify-between mx-auto text-xl">
          <a href="https://github.com/amarrero10" target="blank" rel="noopener noreferrer">
            <SiGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/albert-marrero-412a101b2/"
            rel="noopener noreferrer"
            target="blank"
          >
            <SiLinkedin />
          </a>
          <a href="https://twitter.com/al_the_coder" rel="noopener noreferrer" target="blank">
            <RiTwitterXFill />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
