import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./Home.jsx";
import Problem from "./Problem.jsx";
import Chatbox from "./Chatbox.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Home />
    <Chatbox />
    <App />
    <Problem />
  </StrictMode>
);
