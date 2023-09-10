import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
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
  SiPython,
  SiFlask,
  SiRender,
  SiCanva,
  SiZoom,
  SiSlack,
  SiVisualstudiocode,
  SiPostman,
  SiGithub,
  SiGit,
  SiNetlify,
} from "react-icons/si";
import { BiUniversalAccess } from "react-icons/bi";
import cozynest from "../images/cozy-nest-screenshot.png";
import pledge from "../images/pledge-palooza-screenshot.png";
import pristine from "../images/pristine-clean-screenshot.png";

function Home() {
  const form = useRef();
  const [status, setStatus] = useState("Submit!");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const myEmail = "albert.marrero10@gmail.com";

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_zlanr09", "template_nupgdxh", form.current, "jwLUixlerwVK9ReDL").then(
      (result) => {
        setStatus("Sent!");

        setTimeout(() => {
          setStatus("Submit!"); // Change the status back to "Submit!" after a delay
        }, 2000);
      },
      (error) => {
        console.log(error.text);
      }
    );

    setStatus("Sending...");
    setName("");
    setEmail("");
    setMessage("");
  };
  return (
    <>
      <div className=" px-2">
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
      <div className=" h-fit bg-blurple text-sand mt-20 -z-10">
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
      <div className="grid grid-cols-1 px-4 gap-8 sm:grid-cols-3 absolute -mt-12 z-10 mx-auto mb-12">
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
      <div className=" mt-[2230px] sm:mt-[700px] h-fit px-2 py-10">
        <h1 className="text-center text-2xl font-bold">My Portfolio</h1>
        <p className="text-center text-lg">Please explore through my work below.</p>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="group h-[400px] rounded-md shadow-xl ">
            <img
              src={cozynest}
              className=" group-hover:hidden h-full object-fit "
              alt="cozy nest website"
            />
            <div className="group-hover:visible group-hover:bg-blurple group-hover:text-sand group-hover:h-full invisible flex flex-col items-center justify-between py-2 px-3">
              <h1 className="text-2xl sm:text-3xl">CozyNest: an Airbnb clone</h1>
              <p className="text-justify">
                CozyNest is a robust full-stack application that leverages a backend powered by
                Express and Node.js, supported by a PostgreSQL database managed through Sequelize.
                On the frontend, React takes the lead, coupled with CSS for a polished design.
                Authenticated users can create spots, explore the listings, access spot details,
                leave reviews and ratings, and seamlessly book accommodations. For unauthenticated
                users, CozyNest offers the ability to browse all spots and view detailed
                information.
              </p>
              <div className=" flex w-3/4 justify-between sm:w-64">
                <a href="https://cozynest.onrender.com" target="_blank" rel="noopener noreferrer">
                  <button className="text-lg border border-sand px-5 h-fit py-2 rounded-md text-sand hover:bg-cherry hover:text-sand hover:border-cherry">
                    Visit Here
                  </button>
                </a>
                <a
                  href="https://github.com/amarrero10/CozyNest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-lg border border-sand px-5 h-fit py-2 rounded-md text-sand hover:bg-cherry hover:text-sand hover:border-cherry">
                    GitHub
                  </button>
                </a>
              </div>
              <div className="flex text-3xl w-full mx-auto justify-between px-2 sm:w-1/2">
                <DiReact />
                <SiExpress />
                <DiNodejs />
                <SiSequelize />
                <DiPostgresql />
                <DiCss3 />
                <SiRender />
              </div>
            </div>
          </div>

          <div className="group h-[400px] rounded-md shadow-xl ">
            <img
              src={pledge}
              className=" group-hover:hidden h-full object-fit "
              alt="cozy nest website"
            />
            <div className="group-hover:visible group-hover:bg-blurple group-hover:text-sand sm:group-hover:h-full group-hover:h-[800px] invisible flex flex-col items-center sm:justify-between sm:py-2 px-3">
              <h1 className="text-2xl sm:text-3xl">Pledge Palooza: a Kickstarter clone</h1>
              <p className="text-justify">
                Pledge Palooza is a dynamic full-stack application, inspired by Kickstarter and
                created as a collaborative group project. Its foundation rests upon a Flask and
                SQLAlchemy backend, orchestrated alongside a React frontend with captivating CSS
                styling. Authenticated users hold the keys to project creation, shaping reward
                tiers, and pledging support across diverse projects, all underpinned by PostgreSQL
                and Alembic for robust data management. Meanwhile, guests can navigate a rich
                landscape of projects and explore in-depth project details, immersing themselves in
                the world of Pledge Palooza.
              </p>
              <div className=" flex w-3/4 justify-between sm:w-64">
                <a
                  href="https://pledgepalooza.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="invisible group-hover:visible text-lg border border-sand px-5 h-fit py-2 rounded-md text-sand hover:bg-cherry hover:text-sand hover:border-cherry">
                    Visit Here
                  </button>
                </a>
                <a
                  href="https://github.com/LukeConnors/PledgePalooza"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-lg border border-sand px-5 h-fit py-2 rounded-md text-sand hover:bg-cherry hover:text-sand hover:border-cherry invisible group-hover:visible">
                    GitHub
                  </button>
                </a>
              </div>
              <div className="flex text-3xl w-full mx-auto justify-between px-2 sm:w-1/2">
                <DiReact />
                <SiFlask />
                <BsFiletypeSql />
                <DiPostgresql />
                <DiCss3 />
                <SiRender />
              </div>
            </div>
          </div>

          <div className="group h-[400px] rounded-md shadow-xl ">
            <img
              src={pristine}
              className=" group-hover:hidden h-full object-fit "
              alt="cozy nest website"
            />
            <div className="group-hover:visible group-hover:bg-blurple group-hover:text-sand group-hover:h-full invisible flex flex-col items-center sm:justify-between sm:py-2 px-3">
              <h1 className="text-2xl sm:text-3xl">Pristine Home Cleaning</h1>
              <p className="text-justify">
                Pristine Home Cleaning is a sleek, responsive website representing a professional
                housekeeping service. Crafted with React and adorned with Tailwind CSS, this
                platform exudes both style and functionality. It delivers a hassle-free experience
                on all devices, including mobile. Discover an array of services and transparent
                pricing options as you explore the site. When you're ready to book, our
                user-friendly contact form awaits your service requests, ensuring a seamless
                connection. Elegance meets convenience on Pristine Home Cleaning's website, where
                cleanliness is a click away.
              </p>
              <div className=" flex w-3/4 justify-between sm:w-64">
                <a
                  href="https://pristineclean.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="invisible group-hover:visible text-lg border border-sand px-5 h-fit py-2 rounded-md text-sand hover:bg-cherry hover:text-sand hover:border-cherry">
                    Visit Here
                  </button>
                </a>
                <a
                  href="https://github.com/amarrero10/Housekeeping"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-lg border border-sand px-5 h-fit py-2 rounded-md text-sand hover:bg-cherry hover:text-sand hover:border-cherry invisible group-hover:visible">
                    GitHub
                  </button>
                </a>
              </div>
              <div className="flex text-3xl w-1/2 mx-auto justify-between px-2 sm:w-1/3">
                <DiReact />
                <SiTailwindcss />
                <SiNetlify />
              </div>
            </div>
          </div>

          <div className=" h-[400px]  rounded-md shadow-xl">
            <h1>Budget Buddy</h1>
            <p>
              Budget Buddy is a personal project made for my family and friends as a tool to use for
              managing your money. It's a tool used for budgeting, savings, and bills
            </p>
          </div>
          <div className=" h-[400px]  rounded-md shadow-xl">
            <h1>Florida Medical Spa</h1>
            <p>
              This is a professional website for an aesthetic/weight loss business that provides a
              general overview of their services as well as contact form and the ability to book an
              appoinment. It also has an admin dashboard where a user can check on the appointments.
            </p>
          </div>
        </div>
      </div>
      <div className=" sm:w-6/12  px-2 mx-auto mt-10 pb-3">
        <div className="w-full md:w-8/12 mx-auto">
          <header className="text-center py-12 ">
            <h2 className="text-3xl font-bold text-gray-900">Let's Connect!</h2>
            <p className="mt-4 text-lg text-gray-600">
              Hey there! I'm thrilled to connect with you and explore exciting opportunities. Feel
              free to reach out to me by filling out the form below, or if you prefer, shoot me an{" "}
              <span className="font-bold underline">
                <a href={`mailto:${myEmail}`} className="text-blue-500 hover:underline">
                  email
                </a>
              </span>
              . I'm always ready to dive into new projects and collaborations!
            </p>
          </header>
          <form className="flex flex-col w-8/12 mx-auto pb-14" ref={form} onSubmit={handleSubmit}>
            <label htmlFor="name" className=" text-xl">
              Name:
            </label>
            <input
              type="text"
              required
              id="name"
              className="px-1 mb-4 mt-2 py-2 outline-cherry"
              placeholder="Albert Marrero"
              name="user_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email" className=" text-xl">
              Email:
            </label>
            <input
              type="email"
              required
              id="email"
              className="px-1 mb-4 mt-2 py-2 outline-cherry"
              placeholder="example@example.com"
              name="user_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="message" className=" text-xl">
              Message:
            </label>
            <textarea
              rows={4}
              maxLength={2000}
              id="message"
              required
              className="px-1 mb-4 mt-2 py-2 resize-none outline-cherry"
              placeholder="Hey there! I'd love to chat about..."
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className=" text-lg border border-cherry px-5 h-fit py-2 rounded-md text-cherry hover:bg-cherry hover:text-sand"
            >
              {status}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
