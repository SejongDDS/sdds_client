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
import ManagerPage from './components/ManagerPage/Pages/ManagerPage';
import {RecoilRoot} from 'recoil';
import ProductManagePage from './components/ManagerPage/Pages/ProductManagePage';
import OrderManagePage from './components/ManagerPage/Pages/OrderManagePage';

function App() {
    return (
        <RecoilRoot>
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<IntroPage />} />
                    <Route path="/personal" element={<PersonalPage/>}/>
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />

                    <Route path="/manager" element={<ManagerPage/>}/>
                    <Route path="/manager/" element={<ManagerPage/>}/>
                    <Route path="/manager/client" element={<ManagerPage/>}/>
                    <Route path="/manager/product" element={<ProductManagePage/>}/>
                    <Route path="/manager/order" element={<OrderManagePage/>}/>
                    <Route path="/manager/statistic" element={<ManagerPage/>}/>
                    <Route path="/manager/setting" element={<ManagerPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
        </RecoilRoot>
    );
}

export default App;
