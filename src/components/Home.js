import React from "react";
import picture from "../images/Professional-Pic.jpeg";
import { BsFiletypeSql, BsLock } from "react-icons/bs";
import {
  DiCode,
  DiHtml5,
  DiCss3,
  DiJavascript1,
  DiReact,
  DiNpm,
  DiTerminal,
  DiPostgresql,
  DiGit,
  DiNodejs,
} from "react-icons/di";
import { CgSmartphone } from "react-icons/cg";
import {
  SiTailwindcss,
  SiJinja,
  SiSequelize,
  SiSqlite,
  SiExpress,
  SiPassport,
  SiNodemon,
  SiPython,
  SiFlask,
  SiRender,
  SiCanva,
  SiZoom,
  SiSlack,
  SiVsco,
  SiVisualstudiocode,
  SiPostman,
  SiGithub,
  SiGit,
  SiNetlify,
} from "react-icons/si";
import { BiUniversalAccess } from "react-icons/bi";

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
      <div className="grid grid-cols-1 px-4 gap-8 sm:grid-cols-3 absolute -mt-12 w-screen z-10 mx-auto mb-12">
        <div className="text-center bg-sand shadow-xl rounded-md h-fit">
          <div className="h-20 w-20 mx-auto mt-3 rounded-full bg-denim">
            <DiCode className="text-center text-5xl h-20 mx-auto text-sand" />
          </div>
          <h1 className="text-2xl my-5">Frontend Enthusiast</h1>
          <p className="text-lg mb-10 px-2">
            I'm passionate about turning design concepts into captivating web experiences, crafting
            every pixel with precision.
          </p>
          <ul>
            <p className="mb-4">Experienced with the following:</p>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <DiHtml5 />
              <li className="ml-4">HTML5</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <DiCss3 />
              <li className="ml-4">CSS</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <DiJavascript1 />
              <li className="ml-4">JavaScript</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <DiReact />
              <li className="ml-4">React</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <SiTailwindcss />
              <li className="ml-4">TailwindCSS</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <SiJinja />
              <li className="ml-4">Jinja Templating</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <CgSmartphone />
              <li className="ml-4">Responsive Design</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <BiUniversalAccess />
              <li className="ml-4">Accessibility</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <DiNpm />
              <li className="ml-4">Node Package Manager</li>
            </div>
          </ul>
        </div>
        <div className="text-center bg-sand shadow-xl rounded-md h-fit">
          <div className="h-20 w-20 mx-auto mt-3 rounded-full bg-denim">
            <DiTerminal className="text-center text-5xl h-20 mx-auto text-sand" />
          </div>
          <h1 className="text-2xl my-5">Backend Magician</h1>
          <p className="text-lg mb-10 px-2">
            I'm the wizard behind the scenes, making sure everything runs smoothly in the world of
            servers, databases, and logic.
          </p>
          <ul>
            <p className="mb-4">Experienced with the following:</p>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <DiNodejs />
              <li className="ml-4">Node.js</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <SiExpress />
              <li className="ml-4">Express.js</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <DiPostgresql />
              <li className="ml-4">PostgreSQL</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <SiSequelize />
              <li className="ml-4">Sequelize</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <SiSqlite />
              <li className="ml-4">SQLite3</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <SiPython />
              <li className="ml-4">Python</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <SiFlask />
              <li className="ml-4">Flask</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <BsFiletypeSql />
              <li className="ml-4">SQLAlchemy</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <BsLock />
              <li className="ml-4">Authentication</li>
            </div>
          </ul>
        </div>
        <div className="text-center bg-sand shadow-xl rounded-md h-fit">
          <div className="h-20 w-20 mx-auto mt-3 rounded-full bg-denim">
            <DiGit className="text-center text-5xl h-20 mx-auto text-sand" />
          </div>
          <h1 className="text-2xl my-5">Developer Tools I Love</h1>
          <p className="text-lg mb-10 px-2">
            These are the trusty companions in my coding adventures—tools that help me build and
            shape digital wonders.
          </p>
          <ul>
            <p className="mb-4">Experienced with the following:</p>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <SiGit />
              <li className="ml-4">Git</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <SiGithub />
              <li className="ml-4">GitHub</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <SiPostman />
              <li className="ml-4">Postman</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <SiVisualstudiocode />
              <li className="ml-4">VSCode</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <SiSlack />
              <li className="ml-4">Slack</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <SiZoom />
              <li className="ml-4">Zoom</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <SiCanva />
              <li className="ml-4">Canva</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <SiRender />
              <li className="ml-4">Render</li>
            </div>
            <div className="flex items-center ml-[115px] text-lg text-left mb-4">
              <SiNetlify />
              <li className="ml-4">Netlify</li>
            </div>
          </ul>
        </div>
      </div>
      <div className=" mt-[2200px] sm:mt-[700px] w-screen px-2">
        <h1 className="text-center">My Portfolio</h1>
        <p className="text-center">Please explore through my work below.</p>

        <div>
          <div>CozyNest</div>
          <div>Pledge Palooza</div>
          <div>Budget Buddy</div>
          <div>Pristine Clean</div>
          <div>Florida Medical Spa</div>
        </div>
      </div>
    </>
  );
}

export default Home;
