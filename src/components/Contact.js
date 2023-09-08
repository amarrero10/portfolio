import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("Submit!");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const myEmail = "albert.marrero10@gmail.com";

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_zlanr09", "template_4czqznn", form.current, "jwLUixlerwVK9ReDL").then(
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
    <div className=" w-6/12 bg-Midnight-Blue mx-auto mt-20">
      <div className="w-full md:w-8/12 mx-auto text-Misty-Grey">
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
          <label htmlFor="name" className="text-Dusty-Rose text-xl">
            Name:
          </label>
          <input
            type="text"
            required="true"
            id="name"
            className="px-1 mb-4 mt-2 py-2 text-Midnight-Blue"
            placeholder="Albert Marrero"
            name="user_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email" className="text-Dusty-Rose text-xl">
            Email:
          </label>
          <input
            type="email"
            required="true"
            id="email"
            className="px-1 mb-4 mt-2 py-2 text-Midnight-Blue"
            placeholder="example@example.com"
            name="user_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="message" className="text-Dusty-Rose text-xl">
            Message:
          </label>
          <textarea
            id="message"
            required="true"
            className="px-1 mb-4 mt-2 py-2 text-Midnight-Blue"
            placeholder="Hey there! I'd love to chat about..."
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button
            type="submit"
            className={`text-xl border-solid border-Misty-Grey border-2 w-1/2 mx-auto rounded-full py-2 flex items-center justify-center `}
          >
            {status}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
