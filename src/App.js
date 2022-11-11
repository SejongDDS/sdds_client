import React from "react";
import Modal from "react-modal";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./components/IntroPage/IntroPage";
import LayoutPage from "./components/IntroPage/LayoutPage";
import ShopLayoutPage from "./components/IntroPage/ShopLayoutPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import PersonalPage from "./components/PersonalPage/PersonalPage";
import ManagerPage from "./components/ManagerPage/Pages/ManagerPage";
import { RecoilRoot } from "recoil";
import ProductManagePage from "./components/ManagerPage/Pages/ProductManagePage";
import OrderManagePage from "./components/ManagerPage/Pages/OrderManagePage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <RecoilRoot>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<IntroPage />} />
                        <Route path="/layout" element={<LayoutPage />} />
                        <Route
                            path="/shoplayout"
                            element={<ShopLayoutPage />}
                        />
                        <Route path="/personal" element={<PersonalPage />} />
                        <Route path="/main" element={<MainPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />

                        <Route path="/manager" element={<ManagerPage />} />
                        <Route path="/manager/" element={<ManagerPage />} />
                        <Route
                            path="/manager/client"
                            element={<ManagerPage />}
                        />
                        <Route
                            path="/manager/product"
                            element={<ProductManagePage />}
                        />
                        <Route
                            path="/manager/order"
                            element={<OrderManagePage />}
                        />
                        <Route
                            path="/manager/statistic"
                            element={<ManagerPage />}
                        />
                        <Route
                            path="/manager/setting"
                            element={<ManagerPage />}
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        </RecoilRoot>
    );
}

export default App;
