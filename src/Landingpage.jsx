import App from "./App.jsx";
import Home from "./Home.jsx";
import Problem from "./Problem.jsx";
import Chatbox from "./ChatBox.jsx";
import React from "react";
import ScrollAnimationSection from "./ScrollAnimationSection.jsx";
import Navbar from "./Navbar.jsx";
import ScrollAnimationSectionNodes from "./ScrollAnimationSectionNodes.jsx";
import FloatMenu from "./FloatMenu.jsx";
import Footer from "./footer.jsx";

function Landingpage() {
  return (
    <div>
      <Navbar />
      {/* <App /> */}
      <Home />
      {/* <Chatbox /> */}
      {/* <ScrollAnimationSectionNodes /> */}
      {/* <Problem /> */}
      <Footer />
    </div>
  );
}

export default Landingpage
