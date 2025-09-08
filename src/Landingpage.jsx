import App from "./App.jsx";
import Home from "./Home.jsx";
import Problem from "./Problem.jsx";
import Chatbox from "./Chatbox.jsx";
import React from 'react'
import ScrollAnimationSection from "./ScrollAnimationSection.jsx";
import Navbar from "./Navbar.jsx";
import ScrollAnimationSectionNodes from "./ScrollAnimationSectionNodes.jsx";

export default function Landingpage() {
    return (
        <div>

            {/* <Navbar /> */}
            <App />
            <Home />
            <Chatbox />
            <ScrollAnimationSectionNodes />
            {/* <Problem /> */}
        </div>
    )
}

// export default Landingpage

