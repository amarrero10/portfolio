import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="w-8/12 mx-auto bg-slate-500 h-screen text-Midnight-Blue ">
      <div>
        <h1 className="text-4xl text-center my-4">About Me!</h1>
        <p className=" leading-10 text-justify">
          Hi, I'm Albert Marrero, a passionate Fullstack Engineer. I recently graduated from a
          coding bootcamp, App Academy, where I honed my skills and embarked on a successful
          transition into the software engineering field. With a strong interest in technology and
          problem-solving, I have always been fascinated by the process of building robust and
          innovative applications. My journey into software engineering started with self-learning,
          where I gained proficiency in programming languages like{" "}
          <span className="font-bold">JavaScript</span>, <span className="font-bold">Python</span>,
          and HTML/CSS. However, it was the intensive curriculum and mentorship at App Academy that
          allowed me to solidify my knowledge and acquire a comprehensive understanding of
          full-stack development. During my time at App Academy, I immersed myself in hands-on
          projects and collaborated with talented individuals from diverse backgrounds. This
          experience not only refined my technical skills but also enhanced my ability to work
          effectively in a team-oriented environment. Proficient in both front-end and back-end
          technologies, I have a strong foundation in <span className="font-bold">HTML</span> ,{" "}
          <span className="font-bold">CSS</span>, <span className="font-bold">JavaScript</span> ,
          and frameworks like <span className="font-bold">React</span>. On the back-end, I am
          skilled in <span className="font-bold">Node.js</span>,{" "}
          <span className="font-bold">Express</span>, and databases such as{" "}
          <span className="font-bold">PostgreSQL</span> and{" "}
          <span className="font-bold">SQLite</span>. I have also worked with ORMs like{" "}
          <span className="font-bold">Sequelize</span> and{" "}
          <span className="font-bold">SQLAlchemy</span> to interact with databases efficiently. I
          invite you to explore my portfolio, where you can see examples of projects I've worked on
          and the technologies I've used. It showcases my ability to create responsive web
          applications, handle data efficiently, and deliver intuitive user experiences. As a
          software engineer, I am eager to contribute my skills and passion to develop impactful
          solutions. I have a natural curiosity and drive to continuously learn and stay updated
          with the latest industry trends. I thrive in dynamic environments and excel at
          problem-solving, adaptability, and collaborative work. I am actively seeking opportunities
          to kickstart my career in software engineering, where I can leverage my skills and make a
          meaningful impact. If you are looking for a dedicated and motivated team member, I would
          love to connect and discuss how I can contribute to your organization's success.
        </p>
      </div>
      <div className="mt-10 sm:w-96 mx-auto flex flex-col sm:flex-row items-center sm:mt-4 w-screen">
        <Link
          to="/Portfolio"
          className="w-1/2 bg-Midnight-Blue text-Dusty-Rose sm:mr-3 py-3 rounded-full hover:bg-Dusty-Rose hover:text-Midnight-Blue"
        >
          <p className="text-center">View My Work!</p>
        </Link>
        <Link
          to="/Contact"
          className="w-1/2 bg-Midnight-Blue text-Dusty-Rose py-3 rounded-full hover:bg-Dusty-Rose hover:text-Midnight-Blue sm:mt-0 mt-4"
        >
          <p className="text-center">Contact Me</p>
        </Link>
      </div>
    </div>
  );
}

export default About;
