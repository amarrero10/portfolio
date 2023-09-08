import React from "react";
import picture from "../images/Professional-Pic.jpeg";

function Home() {
  return (
    <>
      <div className="w-screen px-2">
        <div className="mt-10">
          <h1 className="text-center text-2xl">Full-Stack Engineer & Tech Explorer</h1>
          <p className=" text-center text-lg">
            Exploring the tech landscape, architecting solutions, and infusing every project with
            passion.
          </p>
          <img
            src={picture}
            alt="Albert Marrero, Software Engineer"
            className=" rounded-full h-72 mt-10 mx-auto"
          />
        </div>
      </div>
      <div className=" h-fit bg-blurple text-sand w-screen mt-20 -z-10">
        <h1 className="text-center font-bold text-2xl pt-10">
          Hey there, I'm Albert. Pleasure to meet you!
        </h1>
        <p className="text-justify px-6 mt-4 text-lg pb-32">
          I'm a passionate software engineer who embarked on an exciting journey into the tech world
          through a non-traditional path, with App Academy as my launchpad. Coding and design is
          what I am passionate about, and I thrive on creating elegant solutions that blend form and
          function. With a blend of creativity and technical prowess, I'm ready to bring fresh
          perspectives and innovative solutions to the ever-evolving tech landscape.
        </p>
      </div>
      <div className="grid grid-cols-1 px-4 gap-4 sm:grid-cols-3 absolute -mt-12 w-screen z-10 mx-auto">
        <div className="text-center bg-sand shadow-xl h-fit">
          <div className="h-20 w-20 mx-auto mt-3 rounded-full bg-denim"></div>
          <h1>Frontend</h1>
          <p>I craft web experiences from scratch and bring ideas to life!</p>
          <ul>
            <p>Experience with the following:</p>
            <li>HTML5</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>TailwindCSS</li>
            <li>Jinja Templating</li>
            <li>Responsive Design</li>
            <li>Accessibility</li>
          </ul>
        </div>
        <div className="text-center bg-sand shadow-xl h-32">Card 2</div>
        <div className="text-center bg-sand shadow-xl h-32">Card 3</div>
      </div>
    </>
  );
}

export default Home;
