import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../utils/Button";
import "./Navbar.css";

function Navbar({ history }) {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    SDDS
                    <i className="fa-solid fa-laptop-code"></i>
                </Link>
                <div className="menu-icon">
                    <i className={click ? "fas fa-times" : "fas fa-bars"} />
                </div>
                <ul className={click ? "navbar-menu active" : "navbar-menu"}>
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">
                            주요기능
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link">
                            템플릿
                        </Link>
                    </li>
                    {/* <li className="navbar-item">
                        <Link to="/" className="navbar-links-moblie">
                            Login
                        </Link>
                    </li> */}
                </ul>

                <Link to="/login">
                    <button
                        className="nav_btn btn--custom btn--pink btn--medium"
                        type="button"
                        name="Login"
                    >
                        Login
                    </button>
                </Link>

                <Link to="/layout">
                    <button
                        className="nav_btn btn--custom btn--white btn--medium"
                        type="button"
                        name="시작하기"
                    >
                        시작하기
                    </button>
                </Link>

                {/* <Button
                    className="nav_btn"
                    buttonStyle="btn--pink"
                    buttonSize="btn--medium"
                    name="Login"
                    onClick={() => {
                        window.location.href = "/login";
                    }}
                >
                    Login
                </Button>
                <Button
                    className="nav_btn"
                    buttonStyle="btn--white"
                    buttonSize="btn--medium"
                    name="시작하기"
                    onClick={() => {
                        window.location.href = "/layout";
                    }}
                >
                    시작하기
                </Button> */}
            </div>
        </nav>
    );
}

export default Navbar;
