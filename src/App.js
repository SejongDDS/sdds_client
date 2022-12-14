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

import PersonalPage from './components/PersonalPage/PersonalPage';
import ManagerPage from './components/ManagerPage/Pages/ManagerPage';
import {RecoilRoot} from 'recoil';
import ProductManagePage from './components/ManagerPage/Pages/ProductManagePage';
import OrderManagePage from './components/ManagerPage/Pages/OrderManagePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemberManagePage from './components/ManagerPage/Pages/MemberManagePage';
import ProductDetailPage from './components/ManagerPage/DetailPages/ProductDetailPage';
import NewProductPage from './components/ManagerPage/DetailPages/NewProductPage';
import OrderDetailPage from './components/ManagerPage/DetailPages/OrderDetailPage';
import MemberDetailPage from './components/ManagerPage/DetailPages/MemberDetailPage';



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
                        <Route path="/main/:layout_id" element={<MainPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUpPage />} />


                    <Route path="/manager/:website" element={<ManagerPage/>}/>
                    <Route path="/manager/:website/product" element={<ProductManagePage/>}/>
                    <Route path="/manager/:website/order" element={<OrderManagePage/>}/>
                    <Route path="/manager/:website/member" element={<MemberManagePage/>}/>
                    <Route path="/manager/:website/statistic" element={<ManagerPage/>}/>
                    <Route path="/manager/:website/setting" element={<ManagerPage/>}/>
                    <Route path="/manager/:website/product/detail" element={<ProductDetailPage/>}/>
                    <Route path="/manager/:website/product/new" element={<NewProductPage/>}/>
                    <Route path='/manager/:website/order/detail' element={<OrderDetailPage/>}/>
                    <Route path='/manager/:website/member/detail' element={<MemberDetailPage/>}/>
                    
                </Routes>
            </BrowserRouter>
        </div>


        </RecoilRoot>
    );
}

export default App;
