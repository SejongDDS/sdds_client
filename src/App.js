import React from "react";
import Modal from "react-modal";
import "./App.css";
import { BrowserRouter, Routes,Route} from "react-router-dom";
import IntroPage from "./components/IntroPage/IntroPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import MainPage from "./components/MainPage/MainPage";
import Modal from "react-modal";
import grapesjs from "grapesjs";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<IntroPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Routes>
            </BrowserRouter>
            
        </div>
    );
}

export default App;
