import App from "./App.jsx";
import Home from "./Home.jsx";
import Problem from "./Problem.jsx";
import Chatbox from "./Chatbox.jsx";
import React from 'react'

export default function Landingpage () {
    return (
        <div>
            <Home />
            <Chatbox />
            <App />
            {/* <Problem /> */}
        </div>
    )
}

// export default Landingpage

