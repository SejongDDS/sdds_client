import React from "react";
// import Button from "../../utils/Button";
import web_intro from "../../../resources/imgs/web_intro.png";
import "./Intro.css";
import { useNavigate } from "react-router-dom";

function Intro() {
    const navigate = useNavigate();

    return (
        <div className="intro__container">
            <div className="display__container">
                <div className="img_container">
                    <img className="web_img" src={web_intro} alt="web_img" />
                </div>
                <div className="sentence__container">
                    <b>
                        쉽고 완벽하게,
                        <br />
                        세종대의
                        <br />
                        웹페이지 빌더
                    </b>
                </div>
            </div>

            <button
                type="button"
                class="btn btn-light btn-lg"
                onClick={() => {
                    navigate("/layout");
                }}
            >
                시작하기
            </button>

            {/* <Button
                buttonStyle="btn--white"
                buttonSize="btn--large"
                name="시작하기"
                className="btn"
                onClick={() => {
                    window.location.href = "/layout";
                }}
            ></Button> */}
        </div>
    );
}

export default Intro;
