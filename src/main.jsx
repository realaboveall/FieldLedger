import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./Home.jsx";
import Problem from "./Problem.jsx";
import Chatbox from "./ChatBox.jsx";
import ScrollAnimationSection from "./ScrollAnimationSection.jsx";
import Navbar from "./Navbar.jsx";
import ScrollAnimationSectionNodes from "./ScrollAnimationSectionNodes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Navbar /> */}
    <App />
    <Home />
    <Chatbox />
    <ScrollAnimationSectionNodes />
    {/* <Problem /> */}
  </StrictMode>
);
