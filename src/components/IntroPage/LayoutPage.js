import React from "react";
import Navbar from "./Navbar/Navbar";
import Navbar2 from "./Navbar/Navbar2";
import "./LayoutPage.scss";
import shop_logo from "../../resources/imgs/smart_shop.png";
import folder_logo from "../../resources/imgs/folder_logo.png";
import { useNavigate } from "react-router-dom";

function LayoutPage() {
    const navigate = useNavigate();

    return (
        <div className="page">
            <Navbar2 />
            <div className="layout_page">
                <div className="notice">
                    <p>만들 페이지를 선택해주세요</p>
                </div>

                <div className="category-container">
                    <div
                        className="card-container"
                        onClick={() => {
                            navigate("/main/0");
                        }}
                    >
                        <div className="img-container">
                            <img
                                className="card-img"
                                src={folder_logo}
                                alt="포트폴리오"
                            ></img>
                        </div>

                        <p className="card-title">포트폴리오</p>
                        <p className="card-description">
                            드래그앤드랍으로
                            <br />
                            간편하게 포트폴리오를
                            <br />
                            만들어 보세요!
                        </p>
                    </div>
                    <div
                        className="card-container"
                        onClick={() => {
                            navigate("/shoplayout");
                        }}
                    >
                        <div className="img-container">
                            <img
                                className="card-img"
                                src={shop_logo}
                                alt="온라인 쇼핑몰"
                            ></img>
                        </div>
                        <p className="card-title">온라인 쇼핑몰</p>
                        <p className="card-description">
                            드래그앤드랍으로
                            <br />
                            간편하게 온라인 쇼핑몰을
                            <br />
                            만들어 보세요!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutPage;
