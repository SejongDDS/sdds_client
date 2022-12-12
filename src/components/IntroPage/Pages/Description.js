import React from "react";
import "./Description.css";
import img_webpage from "../../../resources/imgs/webpage_ex.png";

function Description() {
    return (
        <div className="description__container">
            <h1>SDDS란?</h1>
            <p>
                SDDS란 쉽고 간편하게 코드 작성없이, 디자인 부터 웹피이지 생성,
                배포까지 해주는 웹빌더 입니다.
            </p>

            <div className="description__img">
                <img
                    className="img_webpage"
                    src={img_webpage}
                    alt="웹페이지 사진"
                ></img>
            </div>
        </div>
    );
}

export default Description;
