import React from "react";
import Navbar from "./Navbar/Navbar";
import Navbar2 from "./Navbar/Navbar2";
import shop_logo from "../../resources/imgs/smart_shop.png";
import layout_logo1 from "../../resources/imgs/layout_logo1.png";
import layout_logo2 from "../../resources/imgs/layout_logo2.png";
import "./LayoutPage.scss";
import { useNavigate } from "react-router-dom";

function ShopLayoutPage() {
    const navigate = useNavigate();

    return (
        <div className="page">
            <div className="layout_page">
                <div className="notice">
                    <p>원하는 쇼핑몰 레이아웃을 선택해주세요</p>
                </div>

                <div className="category-container">
                    <div
                        className="card-container"
                        //이거 레이아웃 다르게 불러오는 세팅 필요
                        onClick={() => {
                            navigate("/main/1");
                        }}
                    >
                        <div className="img-container">
                            <img
                                className="card-img"
                                src={layout_logo1}
                                alt="layout_1"
                            ></img>
                        </div>
                        <p className="card-title">쇼핑몰 레이아웃 1</p>
                        <p className="card-description">
                            카드 형식 메뉴를 활용해서
                            <br />
                            자유롭게 쇼핑몰을
                            <br />
                            만들어 보세요!
                        </p>
                    </div>

                    <div
                        className="card-container"
                        onClick={() => {
                            navigate("/main/2");
                        }}
                    >
                        <div className="img-container">
                            <img
                                className="card-img"
                                src={layout_logo2}
                                alt="layout_1"
                            ></img>
                        </div>
                        <p className="card-title">쇼핑몰 레이아웃 2</p>
                        <p className="card-description">
                            나열된 메뉴를 활용해서
                            <br />
                            자유롭게 쇼핑몰을
                            <br />
                            만들어 보세요!
                        </p>
                    </div>

                    {/* <div
                        className="card-container"
                        onClick={() => {
                            window.location.href = "/main/3";
                        }}
                    >
                        <div className="img-container">
                            <img
                                className="card-img"
                                src={shop_logo}
                                alt="layout_1"
                            ></img>
                        </div>
                        <p className="card-title">레이아웃 3</p>
                        <p className="card-description">
                            좌우슬라이더를 활용해서
                            <br />
                            자유롭게 쇼핑몰을
                            <br />
                            만들어 보세요!
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default ShopLayoutPage;
