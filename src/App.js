import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/resume" element={<Resume />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
