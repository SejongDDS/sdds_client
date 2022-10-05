import React from "react";
import Modal from "react-modal";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./components/IntroPage/IntroPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import MainPage from "./components/MainPage/MainPage";
import grapesjs from "grapesjs";
import LoginPage from "./components/LoginPage/LoginPage";
import PersonalPage from './components/PersonalPage/PersonalPage';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<IntroPage />} />
                    <Route path="/personal" element={<PersonalPage/>}/>
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
