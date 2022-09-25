import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import IntroPage from "./components/IntroPage/IntroPage";
import MainPage from "./components/MainPage/MainPage";

import grapesjs from "grapesjs";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<IntroPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/SignUp" element={<SignUpPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
